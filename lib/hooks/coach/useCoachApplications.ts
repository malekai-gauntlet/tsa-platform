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
  const { autoFetch = true, coachId } = options;
  const { data: session } = useSession();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches applications from our API endpoint
   */
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/applications/list');
      const data = await response.json();

      if (data.success) {
        // Transform the data to match the expected Application type
        const transformedApplications = data.applications.map((app: any) => ({
          id: app.id,
          parentId: app.parent1Email, // Use email as parent ID for now
          parentName: app.parent1Name,
          parentEmail: app.parent1Email,
          parentPhone: app.parent1Phone,
          studentName: app.studentName,
          studentAge: app.studentAge,
          studentGrade: app.studentGrade,
          sportInterest: app.sportInterest,
          coachId: app.coachEmail || 'coach1', // Default coach ID
          status: app.status,
          createdAt: app.submittedAt,
          updatedAt: app.submittedAt,
          // Additional fields from Zapier
          enrollmentType: app.enrollmentDate ? 'Scheduled' : 'Standard',
          startDate: app.enrollmentDate,
          currentSchool: app.currentSchool,
          schoolName: app.schoolName,
          whyApplying: app.whyApplying,
          // Baseball fields if available
          ...(app.primaryPosition && {
            primaryPosition: app.primaryPosition,
            batsThrows: app.batsThrows,
            height: app.height,
            weight: app.weight,
            graduationYear: app.graduationYear,
          }),
        }));

        setApplications(transformedApplications);
      } else {
        setError(data.error || 'Failed to load applications');
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
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
