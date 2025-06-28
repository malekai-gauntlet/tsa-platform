import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { client } from '@/data';
import { extractDisplayNameFromEmail } from '@/lib/utils';
import { generateGreeting } from '@/lib/utils/coach';
import type { CoachData } from '@/lib/types/coach';

export function useCoachData() {
  const [coachData, setCoachData] = useState<CoachData>({
    currentUser: null,
    coachRecord: null,
    profileRecord: null,
    coachLocation: '',
    greeting: 'Good afternoon, Coach',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        setLoading(true);

        // Get current user from Cognito
        const user = await getCurrentUser();
        if (!isMounted) return;

        const email = user.signInDetails?.loginId || user.userId || '';

        // Load Coach and Profile records in parallel
        const [coachRecord, profileRecord] = await Promise.all([
          loadCoachRecord(email, user.userId),
          loadProfileRecord(user.userId),
        ]);

        if (!isMounted) return;

        // Extract coach name and school name
        let firstName = 'Coach';
        let schoolName = 'Texas Sports Academy';

        if (coachRecord?.firstName) {
          firstName = coachRecord.firstName;
        } else if (user.signInDetails?.loginId) {
          firstName = extractDisplayNameFromEmail(user.signInDetails.loginId);
        }

        // Get school name from profile preferences
        if (
          profileRecord?.preferences &&
          typeof profileRecord.preferences === 'object' &&
          'schoolName' in profileRecord.preferences
        ) {
          schoolName = (profileRecord.preferences as any).schoolName || schoolName;
        }

        setCoachData({
          currentUser: user,
          coachRecord,
          profileRecord,
          coachLocation: schoolName,
          greeting: generateGreeting(firstName),
        });
      } catch (error) {
        console.error('Error loading user data:', error);
        if (isMounted) {
          setCoachData(prev => ({
            ...prev,
            greeting: 'Good afternoon, Coach',
          }));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadCoachRecord = async (email: string, amplifyUserId: string) => {
    try {
      const { data: users } = await client.models.User.list({
        filter: { email: { eq: email } },
      });

      if (users.length > 0) {
        return users[0];
      } else {
        const displayName = extractDisplayNameFromEmail(email);
        const newUser = await client.models.User.create({
          email: email,
          amplifyUserId: amplifyUserId,
          firstName: displayName,
          role: 'COACH',
          status: 'ACTIVE',
        });
        return newUser.data;
      }
    } catch (error) {
      console.error('Error loading user record:', error);
      return null;
    }
  };

  const loadProfileRecord = async (userId: string) => {
    try {
      const { data: profiles } = await client.models.Profile.list({
        filter: { userId: { eq: userId } },
      });

      if (profiles.length > 0) {
        return profiles[0];
      } else {
        const newProfile = await client.models.Profile.create({
          userId: userId,
          profileType: 'COACH',
          preferences: {
            googleCalendarEnabled: false,
          },
          onboardingComplete: false,
        });
        return newProfile.data;
      }
    } catch (error) {
      console.error('Error loading profile record:', error);
      return null;
    }
  };

  return { coachData, loading };
}
