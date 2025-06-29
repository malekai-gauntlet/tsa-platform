import { getCurrentUser } from 'aws-amplify/auth';
import { client } from '../api/graphql-client';
import type { MarketingProgress, MarketingMaterial, MarketingResponse } from '../types/marketing';

/**
 * Marketing Service
 * Handles interactions with marketing-related data including coach marketing progress and materials
 */
export const marketingService = {
  /**
   * Get marketing progress for a user from the Profile model in Amplify
   * With fallback to localStorage for offline mode
   */
  async getMarketingProgress(userId: string): Promise<MarketingResponse<MarketingProgress>> {
    try {
      // First try to get from Amplify
      const { data: profiles } = await client.models.Profile.list({
        filter: { userId: { eq: userId } },
      });
      
      if (profiles && profiles.length > 0 && profiles[0].marketingProgress) {
        // Return the marketing progress from the profile
        return {
          success: true,
          data: profiles[0].marketingProgress as unknown as MarketingProgress
        };
      }
      
      // If no profile or no marketing progress in profile, try localStorage as fallback
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(`marketing-progress-${userId}`);
        if (saved) {
          const parsedProgress = JSON.parse(saved) as MarketingProgress;
          return { 
            success: true,
            data: parsedProgress
          };
        }
      }
      
      // If nothing found, return empty progress
      const emptyProgress: MarketingProgress = { 
        completedSteps: [], 
        materialsCreated: [], 
        lastUpdated: new Date().toISOString() 
      };
      
      return { 
        success: true,
        data: emptyProgress 
      };
    } catch (error) {
      console.error('Error loading marketing progress:', error);
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: 'Failed to fetch marketing progress',
          operation: 'getMarketingProgress'
        }
      };
    }
  },

  /**
   * Update marketing progress in Amplify and localStorage as a backup
   */
  async updateMarketingProgress(userId: string, progress: MarketingProgress): Promise<MarketingResponse<MarketingProgress>> {
    try {
      // Ensure lastUpdated is set
      const updatedProgress = {
        ...progress,
        lastUpdated: new Date().toISOString(),
      };

      // First, try to save to Amplify
      const { data: profiles } = await client.models.Profile.list({
        filter: { userId: { eq: userId } },
      });

      if (profiles && profiles.length > 0) {
        // Update existing profile
        await client.models.Profile.update({
          id: profiles[0].id,
          marketingProgress: updatedProgress,
        });
      } else {
        // Create new profile with marketing progress
        await client.models.Profile.create({
          userId,
          profileType: 'COACH',
          marketingProgress: updatedProgress,
          onboardingComplete: false,
        });
      }

      // Also save to localStorage as a backup for offline mode
      if (typeof window !== 'undefined') {
        localStorage.setItem(`marketing-progress-${userId}`, JSON.stringify(updatedProgress));
      }

      return {
        success: true,
        data: updatedProgress
      };
    } catch (error) {
      console.error('Error saving marketing progress:', error);
      
      // Fallback to localStorage only if Amplify update fails
      if (typeof window !== 'undefined') {
        try {
          const updatedProgress = {
            ...progress,
            lastUpdated: new Date().toISOString(),
          };
          localStorage.setItem(`marketing-progress-${userId}`, JSON.stringify(updatedProgress));
          
          return {
            success: true,
            data: updatedProgress,
            error: {
              code: 'AMPLIFY_ERROR',
              message: 'Saved to localStorage only due to network error',
              operation: 'updateMarketingProgress'
            }
          };
        } catch (localStorageError) {
          console.error('Error saving to localStorage:', localStorageError);
        }
      }
      
      return {
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Failed to update marketing progress',
          operation: 'updateMarketingProgress'
        }
      };
    }
  },

  /**
   * Migrate data from localStorage to Amplify
   */
  async migrateFromLocalStorage(userId: string): Promise<MarketingResponse<void>> {
    if (typeof window === 'undefined') {
      return { success: false, error: { code: 'ENVIRONMENT_ERROR', message: 'Not a browser environment' } };
    }

    try {
      // Check for old localStorage keys
      const oldMaterials = localStorage.getItem('marketing-materials');
      const oldSteps = localStorage.getItem('completed-recruiting-steps');
      const oldProgress = localStorage.getItem(`marketing-progress-${userId}`);

      if (oldMaterials || oldSteps || oldProgress) {
        // Collect all data into one progress object
        const progress: MarketingProgress = {
          materialsCreated: [],
          completedSteps: [],
          lastUpdated: new Date().toISOString(),
        };

        // Parse and merge old data
        if (oldMaterials) {
          try {
            progress.materialsCreated = JSON.parse(oldMaterials);
          } catch (e) {
            console.error('Error parsing old materials:', e);
          }
        }

        if (oldSteps) {
          try {
            progress.completedSteps = JSON.parse(oldSteps);
          } catch (e) {
            console.error('Error parsing old steps:', e);
          }
        }

        if (oldProgress) {
          try {
            const parsedProgress = JSON.parse(oldProgress) as MarketingProgress;
            // Merge with priority to parsed progress
            progress.materialsCreated = [
              ...progress.materialsCreated,
              ...parsedProgress.materialsCreated.filter(
                newItem => !progress.materialsCreated.some(existing => existing.id === newItem.id)
              )
            ];
            progress.completedSteps = Array.from(
              new Set([...progress.completedSteps, ...parsedProgress.completedSteps])
            );
          } catch (e) {
            console.error('Error parsing old progress:', e);
          }
        }

        // Update marketing progress in Amplify
        const result = await this.updateMarketingProgress(userId, progress);

        if (result.success) {
          // Clean up old keys
          localStorage.removeItem('marketing-materials');
          localStorage.removeItem('completed-recruiting-steps');
          // Keep the userId-specific key as backup
        }

        return { success: result.success };
      }

      // No migration needed
      return { success: true };
    } catch (error) {
      console.error('Error migrating marketing data:', error);
      return {
        success: false,
        error: {
          code: 'MIGRATION_ERROR',
          message: 'Failed to migrate marketing data',
          operation: 'migrateFromLocalStorage'
        }
      };
    }
  },

  /**
   * Track material creation
   */
  async trackMaterialCreation(
    userId: string,
    materialData: {
      type: string;
      title: string;
      description?: string;
    }
  ): Promise<MarketingResponse<MarketingMaterial>> {
    try {
      // Generate a unique ID for the material
      const newMaterial: MarketingMaterial = {
        id: `material_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: materialData.type as any,
        title: materialData.title,
        description: materialData.description || '',
        thumbnail: '', // Could be updated later with actual thumbnail
        category: 'general',
        lastModified: new Date().toISOString(),
        status: 'draft'
      };
      
      // Get current progress
      const progressResult = await this.getMarketingProgress(userId);
      
      if (progressResult.success && progressResult.data) {
        const currentProgress = progressResult.data;
        
        // Add new material to the list
        const updatedProgress: MarketingProgress = {
          ...currentProgress,
          materialsCreated: [...currentProgress.materialsCreated, newMaterial],
          lastUpdated: new Date().toISOString()
        };
        
        // Update the progress
        const updateResult = await this.updateMarketingProgress(userId, updatedProgress);
        
        if (updateResult.success) {
          return {
            success: true,
            data: newMaterial
          };
        }
        
        return {
          success: false,
          error: updateResult.error
        };
      }
      
      return {
        success: false,
        error: progressResult.error || {
          code: 'PROGRESS_ERROR',
          message: 'Failed to get current progress',
          operation: 'trackMaterialCreation'
        }
      };
    } catch (error) {
      console.error('Error tracking material creation:', error);
      return {
        success: false,
        error: {
          code: 'MATERIAL_ERROR',
          message: 'Failed to track material creation',
          operation: 'trackMaterialCreation'
        }
      };
    }
  },
  
  /**
   * Get the current user's ID
   */
  async getCurrentUserId(): Promise<string | null> {
    try {
      const user = await getCurrentUser();
      return user.userId;
    } catch (error) {
      console.error('Error getting current user ID:', error);
      return null;
    }
  }
};
