'use client';

import { useState, useEffect, useCallback } from 'react';
import { client } from '@/lib/api/graphql-client';
import { handleApiError } from '@/lib/utils/coach/errorHandler';
import {
  RSVP,
  mapEventRegistrationToRSVP,
  mapRSVPToEventRegistrationUpdate,
} from '@/lib/types/coach';
import type { EventRegistrationType } from '@/lib/types/coach';

interface UseEventRSVPsOptions {
  eventId?: string;
  autoFetch?: boolean;
}

/**
 * Custom hook for fetching and managing event RSVPs using Amplify client
 * @param options Hook options
 * @returns RSVPs data, loading state, error state, and RSVP functions
 */
export function useEventRSVPs(options: UseEventRSVPsOptions = {}) {
  const { eventId, autoFetch = true } = options;

  const [rsvps, setRSVPs] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches RSVPs for an event from the Amplify API
   */
  const fetchRSVPs = useCallback(async () => {
    if (!eventId) return;

    // We'll still use AbortController for consistency
    const abortController = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Use Amplify client to fetch registrations
      const { data: registrations } = await client.models.EventRegistration.list({
        filter: { eventId: { eq: eventId } },
        // The client doesn't support AbortController directly,
        // but we're using it for our own cleanup
      });

      // Check if the request was aborted
      if (abortController.signal.aborted) return;

      // Map from EventRegistration schema to our RSVP interface with proper typing
      const mappedRSVPs = registrations.map((registration: any) => 
        mapEventRegistrationToRSVP(registration as EventRegistrationType));

      setRSVPs(mappedRSVPs);
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
  }, [eventId]);

  /**
   * Updates an RSVP status using the Amplify client
   * @param rsvpId RSVP ID
   * @param status New status
   * @returns Success status
   */
  const updateRSVPStatus = useCallback(
    async (rsvpId: string, status: 'confirmed' | 'pending' | 'declined' | 'waitlist') => {
      try {
        setLoading(true);
        setError(null);

        // Map the status to uppercase for the schema
        const registrationStatus = status.toUpperCase() as
          | 'CONFIRMED'
          | 'PENDING'
          | 'CANCELLED'
          | 'WAITLIST';

        // Update using Amplify client
        await client.models.EventRegistration.update({
          id: rsvpId,
          registrationStatus,
        });

        // Update local state
        setRSVPs(prevRSVPs =>
          prevRSVPs.map(rsvp => (rsvp.rsvp_id === rsvpId ? { ...rsvp, rsvp_status: status } : rsvp))
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
   * Calculate RSVP statistics
   */
  const getRSVPStats = useCallback(() => {
    const confirmed = rsvps.filter(r => r.rsvp_status === 'confirmed').length;
    const pending = rsvps.filter(r => r.rsvp_status === 'pending').length;
    const declined = rsvps.filter(r => r.rsvp_status === 'declined').length;
    const waitlist = rsvps.filter(r => r.rsvp_status === 'waitlist').length;

    return { confirmed, pending, declined, waitlist, total: rsvps.length };
  }, [rsvps]);

  /**
   * Creates a new RSVP for an event
   * @param rsvpData RSVP data
   * @returns Created RSVP or null if creation failed
   */
  const createRSVP = useCallback(
    async (rsvpData: Partial<RSVP>) => {
      if (!eventId) return null;

      try {
        setLoading(true);
        setError(null);

        // Map our RSVP data to EventRegistration schema
        const registrationData = mapRSVPToEventRegistrationUpdate({
          ...rsvpData,
          event_id: eventId,
        });

        // Create using Amplify client
        const { data: newRegistration } = await client.models.EventRegistration.create({
          eventId,
          userId: registrationData.userId || 'user-placeholder', // Adding required userId field
          studentName: registrationData.studentName || 'Unknown Student',
          registrationStatus: (registrationData.registrationStatus || 'PENDING') as any,
          registrationData: registrationData.registrationData || {},
          notes: registrationData.notes || '',
        });

        // Map the new registration to our RSVP interface
        const newRSVP = mapEventRegistrationToRSVP(newRegistration as EventRegistrationType);

        // Update local state
        setRSVPs(prevRSVPs => [...prevRSVPs, newRSVP]);

        return newRSVP;
      } catch (err) {
        handleApiError(err, setError);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [eventId]
  );

  /**
   * Fetches RSVPs on mount if autoFetch is true
   */
  useEffect(() => {
    if (autoFetch && eventId) {
      let cleanupFunction: (() => void) | undefined;
      
      // Use async IIFE and handle the Promise properly
      (async () => {
        const result = await fetchRSVPs();
        if (typeof result === 'function') {
          cleanupFunction = result;
        }
      })();
      
      // Return cleanup function
      return () => {
        if (cleanupFunction) cleanupFunction();
      };
    }
  }, [autoFetch, eventId, fetchRSVPs]);

  return {
    rsvps,
    loading,
    error,
    fetchRSVPs,
    updateRSVPStatus,
    createRSVP,
    getRSVPStats,
  };
}

export default useEventRSVPs;
