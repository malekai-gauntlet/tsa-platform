import { eventOperations, client } from '@/lib/services/graphql-client'

// Re-export the GraphQL client for direct model access
export { client }

// Re-export event operations for backward compatibility
export const getEvents = eventOperations.getEvents
export const getEventById = eventOperations.getEventById
export const createEvent = eventOperations.createEvent
export const updateEvent = eventOperations.updateEvent

// Country data for address forms
export async function getCountries() {
  // Return a list of countries - this could be enhanced to come from a database or API
  return [
    { id: 'US', name: 'United States', code: 'US' },
    { id: 'CA', name: 'Canada', code: 'CA' },
    { id: 'MX', name: 'Mexico', code: 'MX' },
    { id: 'GB', name: 'United Kingdom', code: 'GB' },
    { id: 'DE', name: 'Germany', code: 'DE' },
    { id: 'FR', name: 'France', code: 'FR' },
    { id: 'AU', name: 'Australia', code: 'AU' },
    { id: 'JP', name: 'Japan', code: 'JP' },
    { id: 'KR', name: 'South Korea', code: 'KR' },
    { id: 'CN', name: 'China', code: 'CN' },
    { id: 'IN', name: 'India', code: 'IN' },
    { id: 'BR', name: 'Brazil', code: 'BR' },
  ]
}

// Event type definitions for TypeScript
export type Event = {
  id: string
  title: string
  description?: string
  eventType: 'TRAINING' | 'BOOTCAMP' | 'WORKSHOP' | 'COMPETITION' | 'CAMP' | 'TOURNAMENT'
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED'
  startDate: string
  endDate: string
  location?: any
  capacity?: number
  price?: number
  coachId: string
}

export type Country = {
  id: string
  name: string
  code: string
} 