import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { extractDisplayNameFromEmail } from '@/lib/utils';
import { generateGreeting } from '@/lib/utils/coach';
import type { CoachData } from '@/lib/types/coach';

export function useCoachData() {
  const { data: session } = useSession();
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

        if (!session?.user) return;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        const email = session.user.email || '';
        const firstName = session.user.name || extractDisplayNameFromEmail(email) || 'Coach';
        const schoolName = 'Texas Sports Academy';

        // Mock coach and profile records
        const mockCoachRecord = {
          id: '1',
          email: email,
          firstName: firstName,
          lastName: 'User',
          role: 'COACH' as const,
          status: 'ACTIVE' as const,
          amplifyUserId: 'mock-user-id',
        };

        const mockProfileRecord = {
          id: '1',
          userId: 'mock-user-id',
          profileType: 'COACH' as const,
          preferences: {
            schoolName: schoolName,
            googleCalendarEnabled: false,
          },
          onboardingComplete: true,
        };

        setCoachData({
          currentUser: session.user,
          coachRecord: mockCoachRecord,
          profileRecord: mockProfileRecord,
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

    if (session) {
      loadUserData();
    }

    return () => {
      isMounted = false;
    };
  }, [session]);

  return { coachData, loading };
}
