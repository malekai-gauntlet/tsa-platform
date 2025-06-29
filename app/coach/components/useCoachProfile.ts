'use client';

/**
 * This file re-exports the enhanced useCoachProfile hook from lib/hooks/coach
 * to maintain backward compatibility while using the improved implementation.
 */

import { useCoachProfile as enhancedUseCoachProfile } from '@/lib/hooks/coach';

export function useCoachProfile() {
  // Use the enhanced hook but return the original interface
  // to maintain backward compatibility
  const { currentUser, profilePhoto, loading, error, ...rest } = enhancedUseCoachProfile();

  // Return the original interface shape
  return {
    currentUser,
    profilePhoto,
    loading,
  };
}

export default useCoachProfile;
