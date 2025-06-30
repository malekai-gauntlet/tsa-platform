'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Application } from '@/lib/types/coach';
import { calculateApplicationStats } from '@/lib/utils/coach';

interface UseCoachApplicationsOptions {
  autoFetch?: boolean;
  coachEmail?: string;
  coachId?: string;
  coachLocation?: string;
}

/**
 * Custom hook for fetching and managing coach applications
 * @param options Hook options
 * @returns Applications data, loading state, error state, statistics, and fetch functions
 */
export function useCoachApplications(options: UseCoachApplicationsOptions = {}) {
  const { autoFetch = true, coachId, coachEmail } = options;
  const { data: session } = useSession();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches applications from our API endpoint with coach email filtering
   */
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build the API URL with coach email parameter
      const params = new URLSearchParams();
      if (coachEmail) {
        params.append('coachEmail', coachEmail);
      }
      
      const url = `/api/applications/list${params.toString() ? `?${params.toString()}` : ''}`;
      console.log(`📧 Fetching applications for coach: ${coachEmail || 'all'} from ${url}`);

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch applications');
      }

      const fetchedApplications = data.applications || [];
      setApplications(fetchedApplications);
      
      console.log(`✅ Successfully fetched ${fetchedApplications.length} applications for coach: ${coachEmail || 'all'}`);
      console.log(`📊 Total applications in system: ${data.totalApplications || 0}`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, [coachEmail]);

  /**
   * Fetches a single application by ID
   * @param id Application ID
   * @returns Application data or null if not found
   */
  const fetchApplicationById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const application = applications.find(app => app.id === id);
      return application || null;
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Failed to load application. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [applications]);

  /**
   * Updates an application status
   * @param id Application ID
   * @param status New status
   * @returns Updated application or null if update failed
   */
  const updateApplicationStatus = useCallback(
    async (id: string, status: 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED') => {
      try {
        setLoading(true);
        setError(null);

        // Update local state immediately for better UX
        setApplications(prevApplications =>
          prevApplications.map(app => 
            app.id === id 
              ? { ...app, status, updatedAt: new Date().toISOString() }
              : app
          )
        );

        // In a real implementation, you'd make an API call here
        // For now, just update the local state
        
        const updatedApplication = applications.find(app => app.id === id);
        return updatedApplication ? { ...updatedApplication, status } : null;
      } catch (err) {
        console.error('Error updating application:', err);
        setError('Failed to update application. Please try again.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [applications]
  );

  // Memoized application statistics
  const stats = useMemo(() => calculateApplicationStats(applications), [applications]);

  // Memoized recent applications (newest first, limit to 2)
  const recentApplications = useMemo(() => {
    return [...applications]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2);
  }, [applications]);

  /**
   * Fetches applications on mount if autoFetch is true
   */
  useEffect(() => {
    if (autoFetch) {
      fetchApplications();
    }
  }, [autoFetch, fetchApplications]);

  return {
    applications,
    loading,
    error,
    stats,
    recentApplications,
    fetchApplications,
    fetchApplicationById,
    updateApplicationStatus,
  };
}

export default useCoachApplications;
