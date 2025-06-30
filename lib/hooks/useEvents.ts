import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { filterEvents, calculateEventStats } from '@/lib/utils/events';
import type { Event, EventFilters } from '@/lib/types/events';

// Mock data for development
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Youth Basketball Training Camp',
    description: 'Intensive 3-day basketball skills development camp for ages 8-12',
    eventType: 'CAMP',
    startDate: '2024-01-15T09:00:00.000Z',
    endDate: '2024-01-17T16:00:00.000Z',
    venue: 'TSA Main Facility',
    capacity: 24,
    registeredCount: 18,
    price: 199.99,
    status: 'PUBLISHED',
    coachId: 'coach1',
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Soccer Skills Workshop',
    description: 'Learn fundamental soccer techniques and tactics',
    eventType: 'WORKSHOP',
    startDate: '2024-01-20T10:00:00.000Z',
    endDate: '2024-01-20T14:00:00.000Z',
    venue: 'TSA Soccer Field',
    capacity: 16,
    registeredCount: 12,
    price: 79.99,
    status: 'PUBLISHED',
    coachId: 'coach1',
    createdAt: '2024-01-01T11:00:00.000Z',
    updatedAt: '2024-01-01T11:00:00.000Z',
  },
  {
    id: '3',
    title: 'Tennis Tournament',
    description: 'Competitive tennis tournament for intermediate players',
    eventType: 'TOURNAMENT',
    startDate: '2024-02-01T08:00:00.000Z',
    endDate: '2024-02-02T18:00:00.000Z',
    venue: 'TSA Tennis Courts',
    capacity: 32,
    registeredCount: 28,
    price: 149.99,
    status: 'PUBLISHED',
    coachId: 'coach1',
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:00:00.000Z',
  },
];

export function useEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState<EventFilters>({
    searchTerm: '',
    statusFilter: '',
    eventTypeFilter: '',
  });

  // Memoized filtered events
  const filteredEvents = useMemo(() => filterEvents(events, filters), [events, filters]);

  // Memoized statistics
  const stats = useMemo(() => calculateEventStats(events), [events]);

  // Load events effect
  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!isMounted) return;

        // Use mock data for development
        setEvents(mockEvents);
      } catch (err) {
        console.error('Error loading events:', err);
        if (isMounted) {
          setError('Failed to load events. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (session) {
      loadEvents();
    }

    return () => {
      isMounted = false;
    };
  }, [session]);

  // Filter update functions
  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const updateStatusFilter = (statusFilter: string) => {
    setFilters(prev => ({ ...prev, statusFilter }));
  };

  const updateEventTypeFilter = (eventTypeFilter: string) => {
    setFilters(prev => ({ ...prev, eventTypeFilter }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      statusFilter: '',
      eventTypeFilter: '',
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.statusFilter || filters.eventTypeFilter;

  const refetch = () => {
    // Trigger a re-load of events
    setEvents([]);
    setLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  };

  return {
    events,
    filteredEvents,
    stats,
    loading,
    error,
    currentUser: session?.user,
    filters,
    hasActiveFilters,
    updateSearchTerm,
    updateStatusFilter,
    updateEventTypeFilter,
    clearFilters,
    refetch,
  };
}
