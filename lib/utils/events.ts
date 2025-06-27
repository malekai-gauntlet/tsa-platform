import type { Event, EventFilters, EventStats } from '@/lib/types/events'

// Transform GraphQL event to component event
export function transformEventFromGraphQL(graphqlEvent: any): Event {
  return {
    id: graphqlEvent.id,
    title: graphqlEvent.title,
    description: graphqlEvent.description,
    shortDescription: graphqlEvent.shortDescription,
    startDate: graphqlEvent.startDate,
    endDate: graphqlEvent.endDate,
    status: graphqlEvent.status,
    venue: graphqlEvent.venue,
    location: graphqlEvent.address ? JSON.parse(graphqlEvent.address) : null,
    price: graphqlEvent.price || 0,
    capacity: graphqlEvent.capacity,
    registeredCount: graphqlEvent.registeredCount || 0,
    coachId: graphqlEvent.coachId,
    coachName: graphqlEvent.coachName,
    eventType: graphqlEvent.eventType,
    isOnline: graphqlEvent.isOnline || false,
    isPublic: graphqlEvent.isPublic || false,
    images: graphqlEvent.images || [],
    tags: graphqlEvent.tags || [],
    skillLevel: graphqlEvent.skillLevel,
    createdAt: graphqlEvent.createdAt,
    updatedAt: graphqlEvent.updatedAt
  }
}

// Event status and timing utilities
export const isUpcoming = (event: Event): boolean => {
  return new Date(event.startDate) > new Date()
}

export const isPast = (event: Event): boolean => {
  return new Date(event.endDate) < new Date()
}

// Date and time formatting
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export const formatPrice = (price?: number): string => {
  if (!price) return 'Free'
  return `$${price}`
}

// Status and type colors
export const getStatusColor = (status?: string): string => {
  switch (status) {
    case 'PUBLISHED': return 'bg-green-100 text-green-800 border-green-200'
    case 'DRAFT': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200'
    case 'COMPLETED': return 'bg-blue-100 text-blue-800 border-blue-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getEventTypeColor = (eventType?: string): string => {
  switch (eventType) {
    case 'TRAINING': return 'bg-blue-100 text-blue-800'
    case 'BOOTCAMP': return 'bg-purple-100 text-purple-800'
    case 'WORKSHOP': return 'bg-green-100 text-green-800'
    case 'COMPETITION': return 'bg-red-100 text-red-800'
    case 'CAMP': return 'bg-orange-100 text-orange-800'
    case 'TOURNAMENT': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Event filtering
export const filterEvents = (events: Event[], filters: EventFilters): Event[] => {
  return events.filter(event => {
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      const matchesSearch = (
        event.title.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.venue?.toLowerCase().includes(searchLower)
      )
      if (!matchesSearch) return false
    }

    if (filters.statusFilter && event.status !== filters.statusFilter) return false
    if (filters.eventTypeFilter && event.eventType !== filters.eventTypeFilter) return false

    return true
  })
}

// Calculate event statistics
export const calculateEventStats = (events: Event[]): EventStats => {
  return {
    total: events.length,
    published: events.filter(e => e.status === 'PUBLISHED').length,
    draft: events.filter(e => e.status === 'DRAFT').length,
    upcoming: events.filter(e => isUpcoming(e)).length,
    totalRegistrations: events.reduce((sum, e) => sum + (e.registeredCount || 0), 0)
  }
} 