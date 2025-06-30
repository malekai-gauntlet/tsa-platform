'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Application } from '@/lib/types/coach';
import { calculateApplicationStats } from '@/lib/utils/coach';

// Mock applications data
const mockApplications: Application[] = [
  {
    id: '1',
    parentId: 'parent1',
    parentName: 'Sarah Johnson',
    parentEmail: 'sarah.johnson@parent.com',
    parentPhone: '(555) 123-4567',
    studentName: 'Emma Johnson',
    studentAge: 12,
    sportInterest: 'Basketball',
    coachId: 'coach1',
    status: 'PENDING',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
  {
    id: '2',
    parentId: 'parent2',
    parentName: 'Michael Davis',
    parentEmail: 'michael.davis@parent.com',
    parentPhone: '(555) 234-5678',
    studentName: 'Alex Davis',
    studentAge: 10,
    sportInterest: 'Soccer',
    coachId: 'coach1',
    status: 'APPROVED',
    createdAt: '2024-01-14T14:20:00.000Z',
    updatedAt: '2024-01-14T16:45:00.000Z',
  },
  {
    id: '3',
    parentId: 'parent3',
    parentName: 'Lisa Martinez',
    parentEmail: 'lisa.martinez@parent.com',
    parentPhone: '(555) 345-6789',
    studentName: 'Sofia Martinez',
    studentAge: 14,
    sportInterest: 'Tennis',
    coachId: 'coach1',
    status: 'WAITLIST',
    createdAt: '2024-01-12T09:15:00.000Z',
    updatedAt: '2024-01-13T11:30:00.000Z',
  },
  {
    id: '4',
    parentId: 'parent4',
    parentName: 'Robert Wilson',
    parentEmail: 'robert.wilson@parent.com',
    parentPhone: '(555) 456-7890',
    studentName: 'Jake Wilson',
    studentAge: 11,
    sportInterest: 'Basketball',
    coachId: 'coach1',
    status: 'PENDING',
    createdAt: '2024-01-11T16:45:00.000Z',
    updatedAt: '2024-01-11T16:45:00.000Z',
  },
];

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
   * Fetches applications from mock data
   */
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter applications by coach if needed
      const filteredApplications = coachId
        ? mockApplications.filter(app => app.coachId === coachId)
        : mockApplications;

      setApplications(filteredApplications);
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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const application = mockApplications.find(app => app.id === id);
      return application || null;
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Failed to load application. Please try again.');
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

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update local state
        setApplications(prevApplications =>
          prevApplications.map(app => 
            app.id === id 
              ? { ...app, status, updatedAt: new Date().toISOString() }
              : app
          )
        );

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
    if (autoFetch && session) {
      fetchApplications();
    }
  }, [autoFetch, session, fetchApplications]);

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
