'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Select } from '@/components/select'
import { AddressAutocomplete } from '@/components/address-autocomplete'
import { GoogleCalendarConnection } from '@/components/GoogleCalendarConnection'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '@/amplify/data/resource'
import { CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

// Generate AppSync client similar to student applications
const client = generateClient<Schema>()

// IMPORTANT: Always use getCoachApiUrl() from SSM config - DO NOT hardcode API endpoints!
// This ensures centralized configuration management and prevents broken URLs during infrastructure changes

interface AddressData {
  street: string
  city: string
  state: string
  zip: string
}

interface TicketType {
  name: string
  description: string
  cost: number
  currency: string
  quantity_total?: number
  include_fee: boolean
}

interface EventFormData {
  title: string
  description: string
  venue_name: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  postal_code: string
  country: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  timezone: string
  category: string
  capacity: string
  registration_deadline: string
  visibility: 'public' | 'private'
  ticket_types: TicketType[]
  image: File | null
  bannerImage: File | null
}

function CreateEventContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  // Google Calendar integration states
  const [showGoogleCalendarCTA, setShowGoogleCalendarCTA] = useState(false)
  const [createdEvent, setCreatedEvent] = useState<any>(null)
  const [syncToGoogleCalendar, setSyncToGoogleCalendar] = useState(true)
  const [googleCalendarSyncing, setGoogleCalendarSyncing] = useState(false)
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    venue_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    timezone: 'America/Chicago',
    category: 'training',
    capacity: '',
    registration_deadline: '',
    visibility: 'public',
    ticket_types: [{
      name: 'General Admission',
      description: '',
      cost: 0,
      currency: 'USD',
      include_fee: true
    }],
    image: null,
    bannerImage: null
  })

  // Pre-fill date from URL parameters if provided
  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      setFormData(prev => ({
        ...prev,
        start_date: dateParam
      }))
    }
  }, [searchParams])

  const handleInputChange = (field: keyof EventFormData, value: string | boolean | string[] | TicketType[] | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be less than 5MB')
        return
      }
      
      setFormData(prev => ({ ...prev, image: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 10MB for banner images)
      if (file.size > 10 * 1024 * 1024) {
        alert('Banner image file size must be less than 10MB')
        return
      }
      
      setFormData(prev => ({ ...prev, bannerImage: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setBannerImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddressSelect = (address: AddressData) => {
    setFormData(prev => ({
      ...prev,
      address_line_1: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.zip
    }))
  }

  const formatDateTime = (date: string, time: string) => {
    if (!date || !time) return ''
    const datetime = new Date(`${date}T${time}`)
    return datetime.toISOString()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.start_date || !formData.start_time) {
        alert('Please fill in all required fields')
        return
      }

      // Format dates with timezone
      const start_date = formatDateTime(formData.start_date, formData.start_time)
      const end_date = formatDateTime(
        formData.end_date || formData.start_date, 
        formData.end_time || formData.start_time
      )

      if (!start_date || !end_date) {
        alert('Please provide valid dates and times')
        return
      }

      // Get authenticated user
      const user = await getCurrentUser()
      if (!user) {
        alert('You must be logged in to create events')
        return
      }

      // Map form category to schema eventType
      const eventTypeMap: { [key: string]: any } = {
        'training': 'TRAINING',
        'competition': 'COMPETITION',
        'camp': 'CAMP',
        'clinic': 'WORKSHOP',
        'tournament': 'TOURNAMENT',
        'social': 'WORKSHOP',
        'fundraiser': 'WORKSHOP'
      }

      // Prepare address object
      const addressObj = {
        street: formData.address_line_1,
        street2: formData.address_line_2 || '',
        city: formData.city,
        state: formData.state,
        zipCode: formData.postal_code,
        country: formData.country
      }

      // Create event using AppSync client
      const { data: event, errors } = await client.models.Event.create({
        title: formData.title,
        description: formData.description,
        shortDescription: formData.description.substring(0, 200),
        eventType: eventTypeMap[formData.category] || 'TRAINING',
        status: 'DRAFT',
        startDate: start_date,
        endDate: end_date,
        timezone: formData.timezone,
        venue: formData.venue_name,
        address: JSON.stringify(addressObj),
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        registeredCount: 0,
        price: formData.ticket_types[0]?.cost || 0,
        currency: formData.ticket_types[0]?.currency || 'USD',
        coachId: user.signInDetails?.loginId || user.userId,
        coachName: `${user.signInDetails?.loginId || user.userId}`, // Will be enriched by coach profile
        requirements: [],
        equipment: [],
        tags: [formData.category],
        images: [], // TODO: Handle image upload separately if needed
        isPublic: formData.visibility === 'public',
        isOnline: false,
        registrationDeadline: formData.registration_deadline 
          ? formatDateTime(formData.registration_deadline, '23:59') 
          : start_date,
        ageGroups: [],
        skillLevel: 'ALL_LEVELS'
      })

      if (errors) {
        console.error('GraphQL errors:', errors)
        throw new Error('Failed to create event')
      }

      if (!event) {
        throw new Error('No event returned from creation')
      }

      console.log('Event created successfully:', event)
      setCreatedEvent(event)
      setCurrentUser(user)
      
      // If user opted to sync to Google Calendar, attempt automatic sync
      if (syncToGoogleCalendar) {
        setShowGoogleCalendarCTA(true)
        // Attempt automatic sync in the background
        setTimeout(async () => {
          try {
            const response = await fetch('/api/events/google-calendar-sync', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                eventId: event.id,
                enableMeet: true
              })
            })

            const result = await response.json()
            if (result.success) {
              setCreatedEvent(result.event)
            }
          } catch (error) {
            console.log('Background Google Calendar sync failed, user can retry manually')
          }
        }, 1000)
      } else {
        setShowGoogleCalendarCTA(true)
      }
      
    } catch (error) {
      console.error('Error creating event:', error)
      alert(error instanceof Error ? error.message : 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleCalendarSync = async () => {
    if (!createdEvent || !currentUser) return

    setGoogleCalendarSyncing(true)
    try {
      const response = await fetch('/api/events/google-calendar-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: createdEvent.id,
          enableMeet: true
        })
      })

      const result = await response.json()

      if (result.success) {
        alert('✅ Event synced to Google Calendar successfully!')
        // Refresh the created event with Google Calendar details
        setCreatedEvent(result.event)
      } else {
        throw new Error(result.error || 'Failed to sync to Google Calendar')
      }
    } catch (error) {
      console.error('Error syncing to Google Calendar:', error)
      alert(`Failed to sync to Google Calendar: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setGoogleCalendarSyncing(false)
    }
  }

  const handleFinishCreation = () => {
    router.push('/coach/events')
  }

  // Show Google Calendar CTA after successful event creation
  if (showGoogleCalendarCTA && createdEvent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="mb-6">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-600" />
          </div>
          <Heading className="text-green-600">Event Created Successfully! 🎉</Heading>
          <p className="mt-2 text-gray-600">Your event "<strong>{createdEvent.title}</strong>" has been created.</p>
        </div>

        {/* Google Calendar CTA */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Add to Google Calendar?
            </h3>
            <p className="text-gray-600">
              Automatically sync this event to your Google Calendar and create a Google Meet link for virtual sessions.
            </p>
          </div>

          {/* Google Calendar Connection Component */}
          <div className="mb-6">
            <GoogleCalendarConnection userId={currentUser?.signInDetails?.loginId || currentUser?.userId} />
          </div>

          {/* Sync Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoogleCalendarSync}
              disabled={googleCalendarSyncing}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
            >
              {googleCalendarSyncing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Syncing to Google Calendar...
                </>
              ) : (
                <>
                  <CalendarDaysIcon className="h-4 w-4 mr-2" />
                  📅 Add to Google Calendar
                </>
              )}
            </Button>
            
            <Button
              onClick={handleFinishCreation}
              outline
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Skip for Now
            </Button>
          </div>

          {/* Google Meet Info */}
          {createdEvent.googleMeetUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Google Meet link created!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Virtual meeting link: <a href={createdEvent.googleMeetUrl} className="underline" target="_blank" rel="noopener noreferrer">
                  {createdEvent.googleMeetUrl}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Final Actions */}
        <div className="text-center">
          <Button
            onClick={() => router.push(`/coach/events/${createdEvent.id}`)}
            className="bg-[#004aad] hover:bg-[#003888] mr-4"
          >
            View Event Details
          </Button>
          <Button
            onClick={handleFinishCreation}
            outline
          >
            Back to Events
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Heading>Create New Event</Heading>
        <p className="mt-2 text-gray-600">Fill in the details below to create a new event.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Banner */}
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Banner</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Banner Image (Optional)
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  Upload a banner image for your event (max 10MB). Recommended size: 1200x400px. Supported formats: JPG, PNG, GIF, WebP.
                </p>
                {bannerImagePreview && (
                  <div className="relative">
                    <img
                      src={bannerImagePreview}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerImagePreview(null)
                        setFormData(prev => ({ ...prev, bannerImage: null }))
                      }}
                      className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 shadow-lg transition-colors"
                      title="Remove banner image"
                    >
                      ×
                    </button>
                  </div>
                )}
                {!bannerImagePreview && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-500">Click to upload a banner image</p>
                    <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your event..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Image
              </label>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">
                  Upload an image for your event (max 5MB). Supported formats: JPG, PNG, GIF, WebP.
                </p>
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData(prev => ({ ...prev, image: null }))
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="">Select category</option>
                <option value="training">Training</option>
                <option value="competition">Competition</option>
                <option value="camp">Camp</option>
                <option value="clinic">Clinic</option>
                <option value="tournament">Tournament</option>
                <option value="social">Social Event</option>
                <option value="fundraiser">Fundraiser</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time *
              </label>
              <Input
                type="time"
                value={formData.start_time}
                onChange={(e) => handleInputChange('start_time', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={formData.end_date}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
                placeholder="Same as start date if empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <Input
                type="time"
                value={formData.end_time}
                onChange={(e) => handleInputChange('end_time', e.target.value)}
                placeholder="Same as start time if empty"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Deadline
              </label>
              <Input
                type="date"
                value={formData.registration_deadline}
                onChange={(e) => handleInputChange('registration_deadline', e.target.value)}
                placeholder="Defaults to event start date"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue Name
              </label>
              <Input
                value={formData.venue_name}
                onChange={(e) => handleInputChange('venue_name', e.target.value)}
                placeholder="e.g., Sports Complex, Gym Name"
              />
            </div>

            <div>
              <AddressAutocomplete
                value={formData.address_line_1}
                onChange={(value) => handleInputChange('address_line_1', value)}
                onAddressSelect={handleAddressSelect}
                placeholder="Start typing address..."
                label="Address Line 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 (Optional)
              </label>
              <Input
                value={formData.address_line_2}
                onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <Input
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <Input
                  value={formData.postal_code}
                  onChange={(e) => handleInputChange('postal_code', e.target.value)}
                  placeholder="ZIP"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Settings */}
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                placeholder="Leave empty for unlimited"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <Select
                value={formData.visibility}
                onChange={(e) => handleInputChange('visibility', e.target.value as 'public' | 'private')}
              >
                <option value="public">Public (visible to all)</option>
                <option value="private">Private (invite only)</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Ticket Types */}
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Type
                </label>
                <Input
                  value={formData.ticket_types[0]?.name || ''}
                  onChange={(e) => {
                    const newTicketTypes = [...formData.ticket_types]
                    newTicketTypes[0] = { ...newTicketTypes[0], name: e.target.value }
                    handleInputChange('ticket_types', newTicketTypes)
                  }}
                  placeholder="General Admission"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.ticket_types[0]?.cost || 0}
                  onChange={(e) => {
                    const newTicketTypes = [...formData.ticket_types]
                    newTicketTypes[0] = { ...newTicketTypes[0], cost: parseFloat(e.target.value) || 0 }
                    handleInputChange('ticket_types', newTicketTypes)
                  }}
                  placeholder="0.00"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Spots (Optional)
                </label>
                <Input
                  type="number"
                  value={formData.ticket_types[0]?.quantity_total || ''}
                  onChange={(e) => {
                    const newTicketTypes = [...formData.ticket_types]
                    newTicketTypes[0] = { 
                      ...newTicketTypes[0], 
                      quantity_total: e.target.value ? parseInt(e.target.value) : undefined 
                    }
                    handleInputChange('ticket_types', newTicketTypes)
                  }}
                  placeholder="Unlimited"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Description (Optional)
              </label>
              <Input
                value={formData.ticket_types[0]?.description || ''}
                onChange={(e) => {
                  const newTicketTypes = [...formData.ticket_types]
                  newTicketTypes[0] = { ...newTicketTypes[0], description: e.target.value }
                  handleInputChange('ticket_types', newTicketTypes)
                }}
                placeholder="Additional information about registration"
              />
            </div>
          </div>
        </div>

        {/* Google Calendar Option */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="sync-google-calendar"
              checked={syncToGoogleCalendar}
              onChange={(e) => setSyncToGoogleCalendar(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <div className="flex-1">
              <label htmlFor="sync-google-calendar" className="text-sm font-medium text-blue-900 cursor-pointer">
                Add to Google Calendar after creation
              </label>
              <p className="text-sm text-blue-700 mt-1">
                Automatically sync this event to your Google Calendar and create a Google Meet link for virtual sessions.
              </p>
            </div>
            <CalendarDaysIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            outline
            onClick={() => router.back()}
            className="sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="sm:order-2 bg-[#004aad] hover:bg-[#003888] sm:ml-auto"
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function CreateEvent() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="space-y-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <CreateEventContent />
    </Suspense>
  )
} 