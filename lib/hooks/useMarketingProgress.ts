import { useState, useEffect, useCallback } from 'react';
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
 * Simplified to work without user authentication since marketing resources are the same for all coaches
 */
export function useMarketingProgress(): UseMarketingProgressResult {
  const [progress, setProgress] = useState<MarketingProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Load initial data from localStorage
  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        
        // Load marketing progress from localStorage
        const storedProgress = localStorage.getItem('marketing-toolkit-progress');
        
        if (storedProgress) {
          try {
            const parsedProgress = JSON.parse(storedProgress) as MarketingProgress;
            setProgress(parsedProgress);
            setCompletedSteps(new Set(parsedProgress.completedSteps));
          } catch (parseError) {
            console.error('Error parsing stored progress:', parseError);
            // Initialize with empty progress if parsing fails
            const emptyProgress: MarketingProgress = {
              completedSteps: [],
              materialsCreated: [],
              lastUpdated: new Date().toISOString()
            };
            setProgress(emptyProgress);
            setCompletedSteps(new Set());
          }
        } else {
          // Initialize with empty progress
          const emptyProgress: MarketingProgress = {
            completedSteps: [],
            materialsCreated: [],
            lastUpdated: new Date().toISOString()
          };
          setProgress(emptyProgress);
          setCompletedSteps(new Set());
        }
        
        setError(null);
      } catch (err) {
        console.error('Error initializing marketing progress:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback to empty progress
        const emptyProgress: MarketingProgress = {
          completedSteps: [],
          materialsCreated: [],
          lastUpdated: new Date().toISOString()
        };
        setProgress(emptyProgress);
        setCompletedSteps(new Set());
      } finally {
        setLoading(false);
      }
    }
    
    init();
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((updatedProgress: MarketingProgress) => {
    try {
      localStorage.setItem('marketing-toolkit-progress', JSON.stringify(updatedProgress));
      setProgress(updatedProgress);
    } catch (err) {
      console.error('Error saving progress to localStorage:', err);
    }
  }, []);

  // Check if a step is completed
  const isStepCompleted = useCallback((stepId: string): boolean => {
    return completedSteps.has(stepId);
  }, [completedSteps]);

  // Complete a step
  const completeStep = useCallback(async (stepId: string): Promise<boolean> => {
    try {
      if (!progress) return false;
      
      // Optimistically update UI
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.add(stepId);
      setCompletedSteps(newCompletedSteps);
      
      // Update progress
      const updatedProgress: MarketingProgress = {
        ...progress,
        completedSteps: Array.from(newCompletedSteps),
        lastUpdated: new Date().toISOString()
      };
      
      saveProgress(updatedProgress);
      return true;
    } catch (err) {
      // Rollback optimistic update
      setCompletedSteps(completedSteps);
      console.error('Error completing step:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    }
  }, [progress, completedSteps, saveProgress]);

  // Uncomplete a step
  const uncompleteStep = useCallback(async (stepId: string): Promise<boolean> => {
    try {
      if (!progress) return false;
      
      // Optimistically update UI
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.delete(stepId);
      setCompletedSteps(newCompletedSteps);
      
      // Update progress
      const updatedProgress: MarketingProgress = {
        ...progress,
        completedSteps: Array.from(newCompletedSteps),
        lastUpdated: new Date().toISOString()
      };
      
      saveProgress(updatedProgress);
      return true;
    } catch (err) {
      // Rollback optimistic update
      setCompletedSteps(completedSteps);
      console.error('Error uncompleting step:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    }
  }, [progress, completedSteps, saveProgress]);

  // Track material creation
  const trackMaterialCreation = useCallback(async (materialData: {
    type: string;
    title: string;
    description?: string;
  }): Promise<MarketingMaterial | null> => {
    try {
      if (!progress) return null;
      
      // Generate a unique ID for the material
      const newMaterial: MarketingMaterial = {
        id: `material_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: materialData.type as any,
        title: materialData.title,
        description: materialData.description || '',
        thumbnail: '',
        category: 'general',
        lastModified: new Date().toISOString(),
        status: 'draft'
      };
      
      // Update progress with new material
      const updatedProgress: MarketingProgress = {
        ...progress,
        materialsCreated: [...progress.materialsCreated, newMaterial],
        lastUpdated: new Date().toISOString()
      };
      
      saveProgress(updatedProgress);
      return newMaterial;
    } catch (err) {
      console.error('Error tracking material creation:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    }
  }, [progress, saveProgress]);

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