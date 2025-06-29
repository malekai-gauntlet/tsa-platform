'use client';

import { useState, useEffect, useCallback } from 'react';
import { Event } from '@/lib/types/coach';
import { handleApiError } from '@/lib/utils/coach/errorHandler';
import { eventOperations } from '@/lib/api/graphql-client';

interface UseCoachEventsOptions {
  autoFetch?: boolean;
}

/**
 * Custom hook for fetching and managing coach events
 * @param options Hook options
 * @returns Events data, loading state, error state, and fetch functions
 */
export function useCoachEvents(options: UseCoachEventsOptions = {}) {
  const { autoFetch = true } = options;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches events from the API
   */
  const fetchEvents = useCallback(async () => {
    // Create an AbortController for cleanup
    const abortController = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Use GraphQL client for fetching
      const eventsData = await eventOperations.getEvents();

      // Check if the request was aborted
      if (abortController.signal.aborted) return;

      setEvents(eventsData as Event[]);
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
  }, []);

  /**
   * Fetches a single event by ID
   * @param id Event ID
   * @returns Event data or null if not found
   */
  const fetchEventById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const event = await eventOperations.getEventById(id);
      return event as Event;
    } catch (err) {
      handleApiError(err, setError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Creates a new event
   * @param eventData Event data
   * @returns Created event or null if creation failed
   */
  const createEvent = useCallback(async (eventData: Partial<Event>) => {
    try {
      setLoading(true);
      setError(null);

      const newEvent = await eventOperations.createEvent({
        title: eventData.title!,
        description: eventData.description,
        eventType: eventData.eventType || 'TRAINING',
        startDate: eventData.startDate!,
        endDate: eventData.endDate!,
        location: eventData.address,
        capacity: eventData.capacity,
        price: eventData.price,
      });

      // Add to local state
      setEvents(prevEvents => [...prevEvents, newEvent as Event]);

      return newEvent as Event;
    } catch (err) {
      handleApiError(err, setError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Updates an existing event
   * @param id Event ID
   * @param eventData Event data to update
   * @returns Updated event or null if update failed
   */
  const updateEvent = useCallback(async (id: string, eventData: Partial<Event>) => {
    try {
      setLoading(true);
      setError(null);

      const updatedEvent = await eventOperations.updateEvent(id, eventData);

      // Update local state
      setEvents(prevEvents => {
        return prevEvents.map(event => {
          if (event.id === id) {
            return { ...event, ...updatedEvent } as Event;
          }
          return event;
        });
      });

      return updatedEvent as Event;
    } catch (err) {
      handleApiError(err, setError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetches events on mount if autoFetch is true
   */
  useEffect(() => {
    if (autoFetch) {
      let cleanupFunction: (() => void) | undefined;
      
      // Use async IIFE and handle the Promise properly
      (async () => {
        const result = await fetchEvents();
        if (typeof result === 'function') {
          cleanupFunction = result;
        }
      })();
      
      // Return cleanup function
      return () => {
        if (cleanupFunction) cleanupFunction();
      };
    }
  }, [autoFetch, fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    setEvents,
  };
}

export default useCoachEvents;
