// Simple marketing service without analytics
export type MarketingProgress = {
  completedSteps: string[];
  materialsCreated: MarketingMaterial[];
  lastUpdated: string;
};

export type MarketingMaterial = {
  id: string;
  type:
    | 'flyer'
    | 'brochure'
    | 'social-media'
    | 'email-template'
    | 'website-content'
    | 'presentation'
    | 'poster'
    | 'newsletter'
    | 'business-card'
    | 'event-material';
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
};

export const marketingService = {
  async getMarketingProgress(userId: string): Promise<MarketingProgress> {
    // Simple localStorage-based implementation
    if (typeof window === 'undefined') {
      return { completedSteps: [], materialsCreated: [], lastUpdated: new Date().toISOString() };
    }

    try {
      const saved = localStorage.getItem(`marketing-progress-${userId}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading marketing progress:', error);
    }

    return { completedSteps: [], materialsCreated: [], lastUpdated: new Date().toISOString() };
  },

  async updateMarketingProgress(userId: string, progress: MarketingProgress): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const updatedProgress = {
        ...progress,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(`marketing-progress-${userId}`, JSON.stringify(updatedProgress));
    } catch (error) {
      console.error('Error saving marketing progress:', error);
      throw error;
    }
  },

  async migrateFromLocalStorage(userId: string): Promise<void> {
    // One-time migration from old localStorage keys
    if (typeof window === 'undefined') return;

    try {
      const oldMaterials = localStorage.getItem('marketing-materials');
      const oldSteps = localStorage.getItem('completed-recruiting-steps');

      if (oldMaterials || oldSteps) {
        const progress: MarketingProgress = {
          materialsCreated: oldMaterials ? JSON.parse(oldMaterials) : [],
          completedSteps: oldSteps ? JSON.parse(oldSteps) : [],
          lastUpdated: new Date().toISOString(),
        };

        await this.updateMarketingProgress(userId, progress);

        // Clean up old keys
        localStorage.removeItem('marketing-materials');
        localStorage.removeItem('completed-recruiting-steps');
      }
    } catch (error) {
      console.error('Error migrating marketing data:', error);
    }
  },

  async trackMaterialCreation(materialData: {
    type: string;
    title: string;
    description?: string;
  }): Promise<void> {
    // Simple tracking - just log for now
    console.log('Material created:', materialData);
  },
};
