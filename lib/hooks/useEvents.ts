import { useState, useEffect, useMemo } from 'react'
import { getCurrentUser } from 'aws-amplify/auth'
import { client } from '@/data'
import { transformEventFromGraphQL, filterEvents, calculateEventStats } from '@/lib/utils/events'
import type { Event, EventFilters } from '@/lib/types/events'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  // Filter states
  const [filters, setFilters] = useState<EventFilters>({
    searchTerm: '',
    statusFilter: '',
    eventTypeFilter: ''
  })

  // Memoized filtered events
  const filteredEvents = useMemo(() => 
    filterEvents(events, filters), 
    [events, filters]
  )

  // Memoized statistics
  const stats = useMemo(() => 
    calculateEventStats(events), 
    [events]
  )

  // Load events effect
  useEffect(() => {
    let isMounted = true

    const loadEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Get current user
        const user = await getCurrentUser()
        if (!isMounted) return
        
        setCurrentUser(user)

        // Load events for the current coach
        const coachId = user.signInDetails?.loginId || user.userId
        const { data: coachEvents, errors } = await client.models.Event.list({
          filter: {
            coachId: { eq: coachId }
          }
        })

        if (errors) {
          console.error('GraphQL errors:', errors)
          throw new Error('Failed to load events')
        }
        
        if (!isMounted) return
        
        const transformedEvents = coachEvents?.map(transformEventFromGraphQL) || []
        setEvents(transformedEvents)
      } catch (err) {
        console.error('Error loading events:', err)
        if (isMounted) {
          setError('Failed to load events. Please try again.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      isMounted = false
    }
  }, [])

  // Filter update functions
  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }))
  }

  const updateStatusFilter = (statusFilter: string) => {
    setFilters(prev => ({ ...prev, statusFilter }))
  }

  const updateEventTypeFilter = (eventTypeFilter: string) => {
    setFilters(prev => ({ ...prev, eventTypeFilter }))
  }

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      statusFilter: '',
      eventTypeFilter: ''
    })
  }

  const hasActiveFilters = filters.searchTerm || filters.statusFilter || filters.eventTypeFilter

  return {
    events,
    filteredEvents,
    stats,
    loading,
    error,
    currentUser,
    filters,
    hasActiveFilters,
    updateSearchTerm,
    updateStatusFilter,
    updateEventTypeFilter,
    clearFilters,
    refetch: () => window.location.reload()
  }
} 