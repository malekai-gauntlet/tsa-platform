'use client';

import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { marketingService, type MarketingProgress } from '@/lib/services/marketing';
import { RecruitingChecklist } from './components/RecruitingChecklist';
import { ResourceModal } from './components/ResourceModal';
import { ErrorMessage } from './components/ErrorMessage';
import { recruitingSteps } from './data/recruiting-steps';
import type { ResourceMaterial, ErrorState } from './types';

interface MarketingPageState {
  mounted: boolean;
  showResourceModal: boolean;
  selectedResource: ResourceMaterial | null;
  completedSteps: Set<string>;
  marketingProgress: MarketingProgress | null;
  currentUserId: string | null;
  processingSteps: Set<string>;
  errorState: ErrorState | null;
}

const initialState: MarketingPageState = {
  mounted: false,
  showResourceModal: false,
  selectedResource: null,
  completedSteps: new Set(),
  marketingProgress: null,
  currentUserId: null,
  processingSteps: new Set(),
  errorState: null,
};

export default function MarketingPage(): JSX.Element {
  const [state, setState] = useState<MarketingPageState>(initialState);

  const updateState = (updates: Partial<MarketingPageState>): void => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const clearError = (): void => {
    updateState({ errorState: null });
  };

  // Load marketing progress from Profile on component mount
  useEffect(() => {
    async function loadMarketingData(): Promise<void> {
      try {
        updateState({ mounted: true });

        const user = await getCurrentUser();
        const userId = user.userId;
        updateState({ currentUserId: userId });

        // Load marketing progress from Profile
        const progress = await marketingService.getMarketingProgress(userId);
        updateState({
          marketingProgress: progress,
          completedSteps: new Set(progress.completedSteps),
        });
      } catch (error) {
        console.error('Error loading marketing data:', error);
        // Fallback to localStorage if service fails
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('completed-recruiting-steps');
          const completedSteps = saved ? new Set(JSON.parse(saved) as string[]) : new Set<string>();
          updateState({ completedSteps });
        }
      }
    }

    loadMarketingData();
  }, []);

  const handleStepComplete = async (stepId: string): Promise<void> => {
    if (!state.currentUserId || state.processingSteps.has(stepId)) return;

    clearError();

    // Optimistically update UI
    const wasCompleted = state.completedSteps.has(stepId);
    const newCompleted = new Set(state.completedSteps);

    if (wasCompleted) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }

    const updatedProcessingSteps = new Set(state.processingSteps);
    updatedProcessingSteps.add(stepId);

    updateState({
      completedSteps: newCompleted,
      processingSteps: updatedProcessingSteps,
    });

    try {
      // Update progress via marketing service
      const currentProgress = state.marketingProgress || {
        completedSteps: [],
        materialsCreated: [],
        lastUpdated: new Date().toISOString(),
      };
      const updatedSteps = wasCompleted
        ? currentProgress.completedSteps.filter(id => id !== stepId)
        : [...currentProgress.completedSteps, stepId];

      const updatedProgress = {
        ...currentProgress,
        completedSteps: updatedSteps,
        lastUpdated: new Date().toISOString(),
      };
      await marketingService.updateMarketingProgress(state.currentUserId, updatedProgress);

      updateState({
        marketingProgress: updatedProgress,
        completedSteps: new Set(updatedProgress.completedSteps),
      });
    } catch (error) {
      console.error('Error updating step completion:', error);

      // Rollback optimistic update
      updateState({
        completedSteps: state.completedSteps,
        errorState: {
          type: 'step',
          message: `Failed to ${wasCompleted ? 'uncheck' : 'complete'} step. Please try again.`,
        },
      });

      setTimeout(clearError, 5000);
    } finally {
      const updatedProcessingSteps = new Set(state.processingSteps);
      updatedProcessingSteps.delete(stepId);
      updateState({ processingSteps: updatedProcessingSteps });
    }
  };

  const handleResourceClick = (resource: ResourceMaterial): void => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else {
      updateState({
        selectedResource: resource,
        showResourceModal: true,
      });
    }
  };

  const handleCloseResourceModal = (): void => {
    updateState({
      showResourceModal: false,
      selectedResource: null,
    });
  };

  return (
    <>
      <ErrorMessage errorState={state.errorState} onClear={clearError} />

      <RecruitingChecklist
        steps={recruitingSteps}
        completedSteps={state.completedSteps}
        processingSteps={state.processingSteps}
        onStepComplete={handleStepComplete}
        onResourceClick={handleResourceClick}
      />

      <ResourceModal
        isOpen={state.showResourceModal}
        resource={state.selectedResource}
        onClose={handleCloseResourceModal}
      />
    </>
  );
}
