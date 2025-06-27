import { generateClient } from 'aws-amplify/data'
import { getCurrentUser } from 'aws-amplify/auth'
import type { Schema } from '@/amplify/data/resource'

// Generate the typed GraphQL client
export const client = generateClient<Schema>()

// User operations
export const userOperations = {
  async getCurrentProfile() {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser?.userId) {
        throw new Error('No authenticated user found')
      }

      const { data: profiles } = await client.models.Profile.list({
        filter: { userId: { eq: currentUser.userId } }
      })
      
      return profiles?.[0] || null
    } catch (error) {
      console.error('Error fetching current profile:', error)
      throw error
    }
  },

  async updateProfile(profileData: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser?.userId) {
        throw new Error('No authenticated user found')
      }

      const { data: updatedProfile } = await client.models.Profile.create({
        userId: currentUser.userId,
        profileType: 'COACH',
        ...profileData
      })
      return updatedProfile
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }
}

// Event operations
export const eventOperations = {
  async getEvents() {
    try {
      const { data: events } = await client.models.Event.list()
      return events || []
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  },

  async getEventById(id: string) {
    try {
      const { data: event } = await client.models.Event.get({ id })
      return event
    } catch (error) {
      console.error('Error fetching event:', error)
      throw error
    }
  },

  async createEvent(eventData: {
    title: string
    description?: string
    eventType: 'TRAINING' | 'BOOTCAMP' | 'WORKSHOP' | 'COMPETITION' | 'CAMP' | 'TOURNAMENT'
    startDate: string
    endDate: string
    location?: any
    capacity?: number
    price?: number
    [key: string]: any
  }) {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser?.userId) {
        throw new Error('No authenticated user found')
      }

      const { data: newEvent } = await client.models.Event.create({
        title: eventData.title,
        description: eventData.description,
        eventType: eventData.eventType,
        status: 'DRAFT',
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        coachId: currentUser.userId,
        location: eventData.location,
        capacity: eventData.capacity,
        price: eventData.price
      })
      return newEvent
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  },

  async updateEvent(id: string, eventData: Record<string, any>) {
    try {
      const { data: updatedEvent } = await client.models.Event.update({
        id,
        ...eventData
      })
      return updatedEvent
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  }
}

// Application operations
export const applicationOperations = {
  async getApplications() {
    try {
      const { data: enrollments } = await client.models.Enrollment.list()
      return enrollments || []
    } catch (error) {
      console.error('Error fetching applications:', error)
      throw error
    }
  },

  async getApplicationById(id: string) {
    try {
      const { data: enrollment } = await client.models.Enrollment.get({ id })
      return enrollment
    } catch (error) {
      console.error('Error fetching application:', error)
      throw error
    }
  },

  async updateApplicationStatus(id: string, status: 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED') {
    try {
      const { data: updatedEnrollment } = await client.models.Enrollment.update({
        id,
        status
      })
      return updatedEnrollment
    } catch (error) {
      console.error('Error updating application status:', error)
      throw error
    }
  }
} 