export interface Event {
  id: string
  title: string
  description?: string
  shortDescription?: string
  eventType?: 'TRAINING' | 'BOOTCAMP' | 'WORKSHOP' | 'COMPETITION' | 'CAMP' | 'TOURNAMENT'
  status?: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED'
  startDate: string
  endDate: string
  venue?: string
  location?: any
  address?: any
  isOnline?: boolean
  capacity?: number
  registeredCount?: number
  price?: number
  currency?: string
  coachId?: string
  coachName?: string
  tags?: string[]
  images?: string[]
  skillLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS'
  isPublic?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface EventFilters {
  searchTerm: string
  statusFilter: string
  eventTypeFilter: string
}

export interface EventStats {
  total: number
  published: number
  draft: number
  upcoming: number
  totalRegistrations: number
}

export type EventType = Event['eventType']
export type EventStatus = Event['status']
export type SkillLevel = Event['skillLevel']

// Re-export Event type from data layer if needed
export type { Event as DataEvent } from '@/data' 