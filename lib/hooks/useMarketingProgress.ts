import { useState, useEffect, useCallback } from 'react';
import { marketingService } from '../services/marketing';
import type { MarketingProgress, MarketingMaterial } from '../types/marketing';

interface UseMarketingProgressResult {
  progress: MarketingProgress | null;
  loading: boolean;
  error: string | null;
  completedSteps: Set<string>;
  isStepCompleted: (stepId: string) => boolean;
  completeStep: (stepId: string) => Promise<boolean>;
  uncompleteStep: (stepId: string) => Promise<boolean>;
  trackMaterialCreation: (materialData: {
    type: string;
    title: string;
    description?: string;
  }) => Promise<MarketingMaterial | null>;
}

/**
 * Hook for managing marketing progress
 */
export function useMarketingProgress(): UseMarketingProgressResult {
  const [userId, setUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState<MarketingProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Get the current user ID and load initial data
  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const currentUserId = await marketingService.getCurrentUserId();
        
        if (!currentUserId) {
          throw new Error('Failed to get user ID');
        }
        
        setUserId(currentUserId);
        
        // Migrate any existing localStorage data
        await marketingService.migrateFromLocalStorage(currentUserId);
        
        // Load marketing progress
        const result = await marketingService.getMarketingProgress(currentUserId);
        if (result.success && result.data) {
          setProgress(result.data);
          setCompletedSteps(new Set(result.data.completedSteps));
        } else if (result.error) {
          throw new Error(result.error.message);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error initializing marketing progress:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    
    init();
  }, []);

  // Check if a step is completed
  const isStepCompleted = useCallback((stepId: string): boolean => {
    return completedSteps.has(stepId);
  }, [completedSteps]);

  // Complete a step
  const completeStep = useCallback(async (stepId: string): Promise<boolean> => {
    if (!userId) {
      setError('User not authenticated');
      return false;
    }
    
    try {
      // Optimistically update UI
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.add(stepId);
      setCompletedSteps(newCompletedSteps);
      
      // Update progress in database
      if (progress) {
        const updatedProgress: MarketingProgress = {
          ...progress,
          completedSteps: Array.from(newCompletedSteps),
          lastUpdated: new Date().toISOString()
        };
        
        const result = await marketingService.updateMarketingProgress(userId, updatedProgress);
        if (result.success && result.data) {
          setProgress(result.data);
          return true;
        } else {
          // Rollback optimistic update
          setCompletedSteps(completedSteps);
          setError(result.error?.message || 'Failed to complete step');
          return false;
        }
      }
      
      return false;
    } catch (err) {
      // Rollback optimistic update
      setCompletedSteps(completedSteps);
      console.error('Error completing step:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    }
  }, [userId, progress, completedSteps]);

  // Uncomplete a step
  const uncompleteStep = useCallback(async (stepId: string): Promise<boolean> => {
    if (!userId) {
      setError('User not authenticated');
      return false;
    }
    
    try {
      // Optimistically update UI
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.delete(stepId);
      setCompletedSteps(newCompletedSteps);
      
      // Update progress in database
      if (progress) {
        const updatedProgress: MarketingProgress = {
          ...progress,
          completedSteps: Array.from(newCompletedSteps),
          lastUpdated: new Date().toISOString()
        };
        
        const result = await marketingService.updateMarketingProgress(userId, updatedProgress);
        if (result.success && result.data) {
          setProgress(result.data);
          return true;
        } else {
          // Rollback optimistic update
          setCompletedSteps(completedSteps);
          setError(result.error?.message || 'Failed to uncomplete step');
          return false;
        }
      }
      
      return false;
    } catch (err) {
      // Rollback optimistic update
      setCompletedSteps(completedSteps);
      console.error('Error uncompleting step:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    }
  }, [userId, progress, completedSteps]);

  // Track material creation
  const trackMaterialCreation = useCallback(async (materialData: {
    type: string;
    title: string;
    description?: string;
  }): Promise<MarketingMaterial | null> => {
    if (!userId) {
      setError('User not authenticated');
      return null;
    }
    
    try {
      const result = await marketingService.trackMaterialCreation(userId, materialData);
      if (result.success && result.data) {
        // Update local progress state
        if (progress) {
          const updatedProgress: MarketingProgress = {
            ...progress,
            materialsCreated: [...progress.materialsCreated, result.data],
            lastUpdated: new Date().toISOString()
          };
          setProgress(updatedProgress);
        }
        return result.data;
      } else {
        setError(result.error?.message || 'Failed to track material creation');
        return null;
      }
    } catch (err) {
      console.error('Error tracking material creation:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    }
  }, [userId, progress]);

  return {
    progress,
    loading,
    error,
    completedSteps,
    isStepCompleted,
    completeStep,
    uncompleteStep,
    trackMaterialCreation
  };
}