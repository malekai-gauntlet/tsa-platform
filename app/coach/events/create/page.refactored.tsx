'use client';

import { Suspense } from 'react';
import { Button } from '@/components/button';
import { Heading } from '@/components/data-display';
import { Input } from '@/components/form';
import { Textarea } from '@/components/form';
import { Select } from '@/components/form';
import { AddressAutocomplete } from '@/components/form';
import { GoogleCalendarConnection } from '@/components/integration';
import { CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Import the event form hook
import { useEventForm } from '@/lib/hooks/coach';

/**
 * Refactored Create Event page using custom hooks
 */
function CreateEventContent() {
  const {
    formData,
    loading,
    error,
    imagePreview,
    bannerImagePreview,
    createdEvent,
    currentUser,
    showGoogleCalendarCTA,
    syncToGoogleCalendar,
    googleCalendarSyncing,
    handleInputChange,
    handleImageChange,
    handleBannerImageChange,
    handleAddressSelect,
    handleSubmit,
    handleGoogleCalendarSync,
    handleFinishCreation,
    handleViewEventDetails,
    setSyncToGoogleCalendar,
    setImagePreview,
    setBannerImagePreview,
  } = useEventForm();

  // Show Google Calendar CTA after successful event creation
  if (showGoogleCalendarCTA && createdEvent) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-6">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-600" />
          </div>
          <Heading className="text-green-600">Event Created Successfully! 🎉</Heading>
          <p className="mt-2 text-gray-600">
            Your event "<strong>{createdEvent.title}</strong>" has been created.
          </p>
        </div>

        {/* Google Calendar CTA */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Add to Google Calendar?</h3>
            <p className="text-gray-600">
              Automatically sync this event to your Google Calendar and create a Google Meet link
              for virtual sessions.
            </p>
          </div>

          {/* Google Calendar Connection Component */}
          <div className="mb-6">
            <GoogleCalendarConnection
              userId={currentUser?.signInDetails?.loginId || currentUser?.userId}
            />
          </div>

          {/* Sync Actions */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleGoogleCalendarSync}
              disabled={googleCalendarSyncing}
              className="flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700"
            >
              {googleCalendarSyncing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Syncing to Google Calendar...
                </>
              ) : (
                <>
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
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
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center">
                <CheckCircleIcon className="mr-2 h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Google Meet link created!</span>
              </div>
              <p className="mt-1 text-sm text-green-700">
                Virtual meeting link:{' '}
                <a
                  href={createdEvent.googleMeetUrl}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {createdEvent.googleMeetUrl}
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Final Actions */}
        <div className="text-center">
          <Button onClick={handleViewEventDetails} className="mr-4 bg-[#004aad] hover:bg-[#003888]">
            View Event Details
          </Button>
          <Button onClick={handleFinishCreation} outline>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Heading>Create New Event</Heading>
        <p className="mt-2 text-gray-600">Fill in the details below to create a new event.</p>
        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-red-700">
            <p className="text-sm font-medium">Error: {error}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Event Banner */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Banner</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Banner Image (Optional)
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-50 file:px-6 file:py-3 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">
                  Upload a banner image for your event (max 10MB). Recommended size: 1200x400px.
                  Supported formats: JPG, PNG, GIF, WebP.
                </p>
                {bannerImagePreview && (
                  <div className="relative">
                    <img
                      src={bannerImagePreview}
                      alt="Banner preview"
                      className="h-48 w-full rounded-lg border border-gray-200 object-cover shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerImagePreview(null);
                        handleInputChange('bannerImage', null);
                      }}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm text-white shadow-lg transition-colors hover:bg-red-600"
                      title="Remove banner image"
                    >
                      ×
                    </button>
                  </div>
                )}
                {!bannerImagePreview && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                    <svg
                      className="mx-auto mb-4 h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-500">Click to upload a banner image</p>
                    <p className="mt-1 text-xs text-gray-400">or drag and drop</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Information</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Event Title *</label>
              <Input
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Description *</label>
              <Textarea
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="Describe your event..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Event Image</label>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">
                  Upload an image for your event (max 5MB). Supported formats: JPG, PNG, GIF, WebP.
                </p>
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="h-48 w-full max-w-md rounded-lg border border-gray-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        handleInputChange('image', null);
                      }}
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
              <Select
                value={formData.category}
                onChange={e => handleInputChange('category', e.target.value)}
              >
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
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Date & Time</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Start Date *</label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={e => handleInputChange('start_date', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Start Time *</label>
              <Input
                type="time"
                value={formData.start_time}
                onChange={e => handleInputChange('start_time', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">End Date</label>
              <Input
                type="date"
                value={formData.end_date}
                onChange={e => handleInputChange('end_date', e.target.value)}
                placeholder="Same as start date if empty"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">End Time</label>
              <Input
                type="time"
                value={formData.end_time}
                onChange={e => handleInputChange('end_time', e.target.value)}
                placeholder="Same as start time if empty"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Registration Deadline
              </label>
              <Input
                type="date"
                value={formData.registration_deadline}
                onChange={e => handleInputChange('registration_deadline', e.target.value)}
                placeholder="Defaults to event start date"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Location</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Venue Name</label>
              <Input
                value={formData.venue_name}
                onChange={e => handleInputChange('venue_name', e.target.value)}
                placeholder="e.g., Sports Complex, Gym Name"
              />
            </div>

            <div>
              <AddressAutocomplete
                value={formData.address_line_1}
                onChange={value => handleInputChange('address_line_1', value)}
                onAddressSelect={handleAddressSelect}
                placeholder="Start typing address..."
                label="Address Line 1"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address Line 2 (Optional)
              </label>
              <Input
                value={formData.address_line_2}
                onChange={e => handleInputChange('address_line_2', e.target.value)}
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                <Input
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">State</label>
                <Input
                  value={formData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  placeholder="State"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">ZIP Code</label>
                <Input
                  value={formData.postal_code}
                  onChange={e => handleInputChange('postal_code', e.target.value)}
                  placeholder="ZIP"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Settings */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Settings</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Capacity</label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={e => handleInputChange('capacity', e.target.value)}
                placeholder="Leave empty for unlimited"
                min="1"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Visibility</label>
              <Select
                value={formData.visibility}
                onChange={e =>
                  handleInputChange('visibility', e.target.value as 'public' | 'private')
                }
              >
                <option value="public">Public (visible to all)</option>
                <option value="private">Private (invite only)</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Ticket Types */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Registration Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Registration Type
                </label>
                <Input
                  value={formData.ticket_types[0]?.name || ''}
                  onChange={e => {
                    const newTicketTypes = [...formData.ticket_types];
                    newTicketTypes[0] = { ...newTicketTypes[0], name: e.target.value };
                    handleInputChange('ticket_types', newTicketTypes);
                  }}
                  placeholder="General Admission"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Cost ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.ticket_types[0]?.cost || 0}
                  onChange={e => {
                    const newTicketTypes = [...formData.ticket_types];
                    newTicketTypes[0] = {
                      ...newTicketTypes[0],
                      cost: parseFloat(e.target.value) || 0,
                    };
                    handleInputChange('ticket_types', newTicketTypes);
                  }}
                  placeholder="0.00"
                  min="0"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Available Spots (Optional)
                </label>
                <Input
                  type="number"
                  value={formData.ticket_types[0]?.quantity_total || ''}
                  onChange={e => {
                    const newTicketTypes = [...formData.ticket_types];
                    newTicketTypes[0] = {
                      ...newTicketTypes[0],
                      quantity_total: e.target.value ? parseInt(e.target.value) : undefined,
                    };
                    handleInputChange('ticket_types', newTicketTypes);
                  }}
                  placeholder="Unlimited"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Registration Description (Optional)
              </label>
              <Input
                value={formData.ticket_types[0]?.description || ''}
                onChange={e => {
                  const newTicketTypes = [...formData.ticket_types];
                  newTicketTypes[0] = { ...newTicketTypes[0], description: e.target.value };
                  handleInputChange('ticket_types', newTicketTypes);
                }}
                placeholder="Additional information about registration"
              />
            </div>
          </div>
        </div>

        {/* Google Calendar Option */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="sync-google-calendar"
              checked={syncToGoogleCalendar}
              onChange={e => setSyncToGoogleCalendar(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <label
                htmlFor="sync-google-calendar"
                className="cursor-pointer text-sm font-medium text-blue-900"
              >
                Add to Google Calendar after creation
              </label>
              <p className="mt-1 text-sm text-blue-700">
                Automatically sync this event to your Google Calendar and create a Google Meet link
                for virtual sessions.
              </p>
            </div>
            <CalendarDaysIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row">
          <Button type="button" outline onClick={handleFinishCreation} className="sm:order-1">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#004aad] hover:bg-[#003888] sm:order-2 sm:ml-auto"
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </div>
  );
}

/**
 * Create Event Page with loading fallback
 */
export default function CreateEvent() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="mb-2 h-8 w-1/3 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="space-y-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="mb-4 h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
                <div className="space-y-4">
                  <div className="h-10 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-20 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <CreateEventContent />
    </Suspense>
  );
}
