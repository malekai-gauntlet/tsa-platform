'use client';

import { useState, useEffect, useCallback } from 'react';
import { handleApiError } from '@/lib/utils/coach/errorHandler';
import { getCurrentUser } from 'aws-amplify/auth';
import { client } from '@/lib/api/graphql-client';
import {
  EventInvitation,
  InvitationForm,
  InvitationType,
  mapInvitationToEventInvitation,
  mapFormToInvitationInput,
} from '@/lib/types/coach';

interface UseEventInvitationsOptions {
  eventId?: string;
  autoFetch?: boolean;
}

/**
 * Custom hook for managing event invitations using Amplify client
 * @param options Hook options
 * @returns Invitations data, loading state, error state, and invitation functions
 */
export function useEventInvitations(options: UseEventInvitationsOptions = {}) {
  const { eventId, autoFetch = true } = options;

  const [invitations, setInvitations] = useState<EventInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingInvitation, setSendingInvitation] = useState(false);

  /**
   * Fetches invitations for an event from Amplify GraphQL API
   */
  const fetchInvitations = useCallback(async () => {
    if (!eventId) return;

    // Create an AbortController for cleanup
    const abortController = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Use Amplify client to fetch invitations
      // We need to fetch all invitations and filter those with event_id in their message field
      const { data: allInvitations } = await client.models.Invitation.list();

      // Check if the request was aborted
      if (abortController.signal.aborted) return;

      // Convert to our EventInvitation format with type safety
      const allEventInvitations = allInvitations.map((invitation: any) => 
        mapInvitationToEventInvitation(invitation as InvitationType));

      // Filter invitations for this specific event
      const eventInvitations = allEventInvitations.filter(
        invitation => invitation.event_id === eventId
      );

      setInvitations(eventInvitations);
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
   * Sends an event invitation using Amplify client
   * @param invitationForm Invitation form data
   * @returns Success status
   */
  const sendInvitation = useCallback(
    async (invitationForm: InvitationForm) => {
      if (!eventId) return false;

      try {
        setSendingInvitation(true);
        setError(null);

        // Get current user
        const user = await getCurrentUser();
        const userId = user.userId;

        // Map form data to Invitation input
        const invitationInput = mapFormToInvitationInput(invitationForm, eventId, userId);

        // Create invitation using Amplify client with proper typing
        await client.models.Invitation.create(invitationInput as any);

        // Refresh the invitations list
        await fetchInvitations();

        return true;
      } catch (err) {
        handleApiError(err, setError);
        return false;
      } finally {
        setSendingInvitation(false);
      }
    },
    [eventId, fetchInvitations]
  );

  /**
   * Cancels an invitation
   * @param invitationId ID of invitation to cancel
   * @returns Success status
   */
  const cancelInvitation = useCallback(async (invitationId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Update status to CANCELLED
      await client.models.Invitation.update({
        id: invitationId,
        status: 'CANCELLED',
      });

      // Update local state
      setInvitations(prev =>
        prev.map(inv => (inv.invitation_id === invitationId ? { ...inv, status: 'declined' } : inv))
      );

      return true;
    } catch (err) {
      handleApiError(err, setError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetches invitations on mount if autoFetch is true
   */
  useEffect(() => {
    if (autoFetch && eventId) {
      let cleanupFunction: (() => void) | undefined;
      
      // Use async IIFE and handle the Promise properly
      (async () => {
        const result = await fetchInvitations();
        if (typeof result === 'function') {
          cleanupFunction = result;
        }
      })();
      
      // Return cleanup function
      return () => {
        if (cleanupFunction) cleanupFunction();
      };
    }
  }, [autoFetch, eventId, fetchInvitations]);

  return {
    invitations,
    loading,
    error,
    sendingInvitation,
    fetchInvitations,
    sendInvitation,
    cancelInvitation,
  };
}

export default useEventInvitations;
