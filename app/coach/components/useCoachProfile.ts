'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { userOperations } from '@/lib/services/graphql-client';

interface CoachProfile {
  currentUser: any | null;
  profilePhoto: string | null;
  loading: boolean;
}

export function useCoachProfile(): CoachProfile {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        // Get current user
        const user = await getCurrentUser();
        setCurrentUser(user);

        // Fetch profile photo
        const profile = await userOperations.getCurrentProfile();
        if (profile?.preferences && typeof profile.preferences === 'object') {
          const profileData = profile.preferences as any;
          if (profileData.profile_photo_url) {
            setProfilePhoto(profileData.profile_photo_url);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();

    // Listen for profile photo changes
    const handleProfilePhotoChange = (event: CustomEvent) => {
      setProfilePhoto(event.detail);
    };

    window.addEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);

    return () => {
      window.removeEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);
    };
  }, []);

  return {
    currentUser,
    profilePhoto,
    loading,
  };
}