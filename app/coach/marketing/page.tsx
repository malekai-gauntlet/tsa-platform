'use client';

import React, { useState } from 'react';
import { useMarketingProgress } from '@/lib/hooks/useMarketingProgress';
import type { MarketingProgress } from '@/lib/types/marketing';
import { RecruitingChecklist } from './components/RecruitingChecklist';
import { ResourceModal } from './components/ResourceModal';
import { ErrorMessage } from './components/ErrorMessage';
import { recruitingSteps } from './data/recruiting-steps';
import type { ResourceMaterial, ErrorState } from './types';

interface MarketingPageState {
  showResourceModal: boolean;
  selectedResource: ResourceMaterial | null;
  processingSteps: Set<string>;
  errorState: ErrorState | null;
}

const initialState: MarketingPageState = {
  showResourceModal: false,
  selectedResource: null,
  processingSteps: new Set(),
  errorState: null,
};

export default function MarketingPage(): JSX.Element {
  const [state, setState] = useState<MarketingPageState>(initialState);
  const { completedSteps, loading, error, completeStep, uncompleteStep } = useMarketingProgress();

  const updateState = (updates: Partial<MarketingPageState>): void => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const clearError = (): void => {
    updateState({ errorState: null });
  };

  const handleStepComplete = async (stepId: string): Promise<void> => {
    if (state.processingSteps.has(stepId)) return;

    clearError();

    // Track processing state
    const wasCompleted = completedSteps.has(stepId);
    const updatedProcessingSteps = new Set(state.processingSteps);
    updatedProcessingSteps.add(stepId);
    updateState({ processingSteps: updatedProcessingSteps });

    try {
      // Use the hook functions to complete/uncomplete step
      const success = wasCompleted
        ? await uncompleteStep(stepId)
        : await completeStep(stepId);

      if (!success) {
        updateState({
          errorState: {
            type: 'step',
            message: `Failed to ${wasCompleted ? 'uncheck' : 'complete'} step. Please try again.`,
          },
        });
        setTimeout(clearError, 5000);
      }
    } catch (error) {
      console.error('Error updating step completion:', error);

      // Show error message
      updateState({
        errorState: {
          type: 'step',
          message: `Failed to ${wasCompleted ? 'uncheck' : 'complete'} step. Please try again.`,
        },
      });
      setTimeout(clearError, 5000);
    } finally {
      // Remove processing state
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

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading marketing progress...</span>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">Error loading marketing data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <RecruitingChecklist
          steps={recruitingSteps}
          completedSteps={completedSteps}
          processingSteps={state.processingSteps}
          onStepComplete={handleStepComplete}
          onResourceClick={handleResourceClick}
        />
      )}

      <ResourceModal
        isOpen={state.showResourceModal}
        resource={state.selectedResource}
        onClose={handleCloseResourceModal}
      />
    </>
  );
}
