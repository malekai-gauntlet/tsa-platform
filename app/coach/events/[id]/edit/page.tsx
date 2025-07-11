'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/button';
import { Input } from '@/components/form';
import { Textarea } from '@/components/form';
import { Select } from '@/components/form';
import { Heading } from '@/components/data-display';
import { Link } from '@/components/navigation';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { getCurrentUser } from 'aws-amplify/auth';

interface EventFormData {
  title: string;
  description: string;
  location: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  category: string;
  subcategory: string;
  max_participants: string;
  cost: string;
  registration_deadline: string;
  is_public: boolean;
  tags: string[];
  requirements: string[];
  shortDescription: string;
  eventType: string;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    location: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    category: '',
    subcategory: '',
    max_participants: '',
    cost: '0',
    registration_deadline: '',
    is_public: true,
    tags: [],
    requirements: [],
    shortDescription: '',
    eventType: 'TRAINING',
  });

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      // Use Amplify GraphQL to fetch event
      const { eventOperations } = await import('@/lib/api/graphql-client');
      const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
      const event = await eventOperations.getEventById(eventId);

      if (!event) {
        setError('Event not found');
        return;
      }

      // Parse dates and times
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const regDeadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

      // Parse location data
      const locationData =
        event.location && typeof event.location === 'object' ? (event.location as any) : {};
      const capacity = typeof event.capacity === 'number' ? event.capacity.toString() : '';
      const street = locationData.street || '';
      const city = locationData.city || '';
      const state = locationData.state || '';
      const zip = locationData.zip || '';

      // Populate form data
      setFormData({
        title: event.title || '',
        description: event.description || '',
        shortDescription: event.shortDescription || '',
        eventType: event.eventType || 'TRAINING',
        location: typeof event.location === 'string' ? event.location : '',
        street: street,
        city: city,
        state: state,
        zip: zip,
        startDate: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().slice(0, 5),
        endDate: endDate.toISOString().split('T')[0],
        endTime: endDate.toTimeString().slice(0, 5),
        category: event.eventType || '',
        subcategory: '',
        max_participants: capacity,
        cost: event.price ? event.price.toString() : '0',
        registration_deadline: regDeadline ? regDeadline.toISOString().split('T')[0] : '',
        is_public: event.isPublic !== false,
        tags: (event.tags?.filter(Boolean) as string[]) || [],
        requirements: (event.requirements?.filter(Boolean) as string[]) || [],
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchEvent();
  }, [params.id, fetchEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Use Amplify GraphQL to update event
      const { eventOperations } = await import('@/lib/api/graphql-client');

      // Convert form data to GraphQL format
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
      const updatedEvent = await eventOperations.updateEvent(eventId, {
        title: formData.title,
        description: formData.description,
        eventType: formData.eventType.toUpperCase(),
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        location: JSON.stringify({
          address: formData.location,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        }),
        capacity: parseInt(formData.max_participants) || undefined,
        price: parseFloat(formData.cost) || 0,
        tags: formData.tags,
        requirements: formData.requirements,
      });

      if (!updatedEvent) {
        throw new Error('Failed to update event');
      }

      router.push(`/coach/events/${eventId}`);
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof EventFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{error}</h3>
        <Link href="/coach/events" className="text-blue-600 hover:text-blue-800">
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 max-lg:hidden">
        <Link
          href={`/coach/events/${Array.isArray(params.id) ? params.id[0] : params.id}`}
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400" />
          Back to Event
        </Link>
      </div>

      <div className="mb-8">
        <Heading className="text-3xl font-bold text-gray-900">Edit Event</Heading>
        <p className="mt-2 text-gray-600">Update your event details</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h3>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Event Title *</label>
              <Input
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder="Describe your event"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                <Select
                  value={formData.category}
                  onChange={e => handleInputChange('category', e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="training">Training</option>
                  <option value="tournament">Tournament</option>
                  <option value="meeting">Meeting</option>
                  <option value="camp">Camp</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Cost ($)</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.cost}
                  onChange={e => handleInputChange('cost', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Date & Time</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Start Date *</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={e => handleInputChange('startDate', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Start Time *</label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={e => handleInputChange('startTime', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">End Date *</label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={e => handleInputChange('endDate', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">End Time *</label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={e => handleInputChange('endTime', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Location</h3>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Venue Name</label>
              <Input
                value={formData.location}
                onChange={e => handleInputChange('location', e.target.value)}
                placeholder="e.g., Main Gym, Conference Room A"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Street Address</label>
              <Input
                value={formData.street}
                onChange={e => handleInputChange('street', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">City</label>
                <Input
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  placeholder="Austin"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">State</label>
                <Input
                  value={formData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  placeholder="TX"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">ZIP Code</label>
                <Input
                  value={formData.zip}
                  onChange={e => handleInputChange('zip', e.target.value)}
                  placeholder="78704"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Settings</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Max Participants
              </label>
              <Input
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={e => handleInputChange('max_participants', e.target.value)}
                placeholder="Leave empty for unlimited"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Deadline
              </label>
              <Input
                type="date"
                value={formData.registration_deadline}
                onChange={e => handleInputChange('registration_deadline', e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_public}
                onChange={e => handleInputChange('is_public', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Make this event public (visible to all parents)
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            outline
            onClick={() =>
              router.push(`/coach/events/${Array.isArray(params.id) ? params.id[0] : params.id}`)
            }
          >
            Cancel
          </Button>
          <Button type="submit" color="blue" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
