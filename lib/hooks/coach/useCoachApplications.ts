'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Application } from '@/lib/types/coach';
import { handleApiError } from '@/lib/utils/coach/errorHandler';
import { applicationOperations } from '@/lib/api/graphql-client';
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
  const { autoFetch = true, coachEmail, coachId, coachLocation } = options;

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches applications from the API
   */
  const fetchApplications = useCallback(async () => {
    // Create an AbortController for cleanup
    const abortController = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Use GraphQL client for fetching
      const applicationsData = await applicationOperations.getApplications();

      // Check if the request was aborted
      if (abortController.signal.aborted) return;

      // Filter applications by coach if needed
      const filteredApplications = coachId
        ? (applicationsData as Application[]).filter(app => app.coachId === coachId)
        : (applicationsData as Application[]);

      setApplications(filteredApplications);
    } catch (err) {
      // Check if the request was aborted
      if (abortController.signal.aborted) return;

      handleApiError(err, setError);
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }

    return () => {
      abortController.abort();
    };
  }, [coachId]);

  /**
   * Fetches a single application by ID
   * @param id Application ID
   * @returns Application data or null if not found
   */
  const fetchApplicationById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const application = await applicationOperations.getApplicationById(id);
      return application as Application;
    } catch (err) {
      handleApiError(err, setError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

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

        const updatedApplication = await applicationOperations.updateApplicationStatus(id, status);

        // Update local state
        setApplications(prevApplications =>
          prevApplications.map(app => (app.id === id ? { ...app, status } : app))
        );

        return updatedApplication as Application;
      } catch (err) {
        handleApiError(err, setError);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
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
      let cleanupFunction: (() => void) | undefined;
      
      // Use async IIFE and handle the Promise properly
      (async () => {
        const result = await fetchApplications();
        if (typeof result === 'function') {
          cleanupFunction = result;
        }
      })();
      
      // Return cleanup function
      return () => {
        if (cleanupFunction) cleanupFunction();
      };
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
