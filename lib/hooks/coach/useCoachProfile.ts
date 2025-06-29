'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { userOperations } from '@/lib/api/graphql-client';
import { CoachProfile, CoachProfilePreferences } from '@/lib/types/coach';
import { handleApiError } from '@/lib/utils/coach/errorHandler';

interface UseCoachProfileOptions {
  autoFetch?: boolean;
}

interface UseCoachProfileResult {
  profile: CoachProfile | null;
  currentUser: any | null;
  profilePhoto: string | null;
  name: string | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfilePhoto: (url: string) => void;
  updateProfile: (profileData: Partial<CoachProfile>) => Promise<boolean>;
}

/**
 * Enhanced hook for fetching and managing coach profile data
 * @param options Hook options
 * @returns Profile data, user data, loading state, error state, and profile functions
 */
export function useCoachProfile(options: UseCoachProfileOptions = {}): UseCoachProfileResult {
  const { autoFetch = true } = options;

  const [profile, setProfile] = useState<CoachProfile | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches profile data from the API
   */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const user = await getCurrentUser();
      setCurrentUser(user);

      // Extract name from the user object if available
      if (user?.username) {
        setName(user.username);
      }

      // Fetch profile data
      const profileData = await userOperations.getCurrentProfile();

      // Handle profile photo and preferences with proper type guard
      if (profileData?.preferences) {
        // Type guard to ensure preferences is an object
        const prefs = profileData.preferences as CoachProfilePreferences;

        // Safely access properties with optional chaining
        if (prefs?.profile_photo_url) {
          setProfilePhoto(prefs.profile_photo_url);
        }

        // Set user name if available in profile
        if (prefs?.first_name || prefs?.last_name) {
          const firstName = prefs.first_name || '';
          const lastName = prefs.last_name || '';
          setName(`${firstName} ${lastName}`.trim());
        }
      }

      // Construct profile object properly to avoid duplicate userId
      const { userId: _, ...profileDataWithoutUserId } = profileData || {};
      
      setProfile({
        userId: user?.userId || '',
        email: user?.signInDetails?.loginId || '',
        name: name || user?.username || '',
        profilePhoto: profileData?.preferences ? 
          (profileData.preferences as CoachProfilePreferences).profile_photo_url || null : null,
        ...profileDataWithoutUserId,
      } as CoachProfile);
    } catch (err) {
      handleApiError(err, setError);
    } finally {
      setLoading(false);
    }
  }, [name]);

  /**
   * Updates profile data in the API
   * @param profileData Profile data to update
   * @returns Success status
   */
  const updateProfile = useCallback(
    async (profileData: Partial<CoachProfile>): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);

        // Format the data for the API
        const updatedProfile = await userOperations.updateProfile(profileData);

        // Update local state
        setProfile(prev =>
          prev ? ({ ...prev, ...updatedProfile } as CoachProfile) : (updatedProfile as CoachProfile)
        );

        return true;
      } catch (err) {
        handleApiError(err, setError);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Updates the profile photo URL
   * @param url New profile photo URL
   */
  const updateProfilePhoto = useCallback((url: string) => {
    setProfilePhoto(url);

    // Update local profile state
    setProfile(prev =>
      prev
        ? {
            ...prev,
            profilePhoto: url,
            preferences: {
              ...((prev.preferences as CoachProfilePreferences) || {}),
              profile_photo_url: url,
            } as CoachProfilePreferences,
          }
        : null
    );
  }, []);

  /**
   * Fetches profile on mount if autoFetch is true
   */
  useEffect(() => {
    if (autoFetch) {
      fetchProfile();
    }
  }, [autoFetch, fetchProfile]);

  /**
   * Listen for profile photo changes via custom events
   */
  useEffect(() => {
    const handleProfilePhotoChange = (event: CustomEvent) => {
      updateProfilePhoto(event.detail);
    };

    window.addEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);

    return () => {
      window.removeEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);
    };
  }, [updateProfilePhoto]);

  return {
    profile,
    currentUser,
    profilePhoto,
    name,
    loading,
    error,
    fetchProfile,
    updateProfilePhoto,
    updateProfile,
  };
}

export default useCoachProfile;
