'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';
import { client } from '@/lib/api/graphql-client';
import { handleApiError } from '@/lib/utils/coach/errorHandler';
import { EventFormData } from '@/lib/types/coach';
import type { Schema } from '@/amplify/data/resource';

interface AddressData {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface UseEventFormOptions {
  onEventCreated?: (event: any) => void;
}

/**
 * Custom hook for managing event creation form
 * @param options Hook options
 * @returns Form state, handlers, and submission functions
 */
export function useEventForm(options: UseEventFormOptions = {}) {
  const { onEventCreated } = options;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdEvent, setCreatedEvent] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);

  // Google Calendar integration states
  const [showGoogleCalendarCTA, setShowGoogleCalendarCTA] = useState(false);
  const [syncToGoogleCalendar, setSyncToGoogleCalendar] = useState(true);
  const [googleCalendarSyncing, setGoogleCalendarSyncing] = useState(false);

  // Initialize form data with default values
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
    ticket_types: [
      {
        name: 'General Admission',
        description: '',
        cost: 0,
        currency: 'USD',
        include_fee: true,
      },
    ],
    image: null,
    bannerImage: null,
  });

  // Pre-fill date from URL parameters if provided
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setFormData(prev => ({
        ...prev,
        start_date: dateParam,
      }));
    }
  }, [searchParams]);

  // Handle input changes
  const handleInputChange = useCallback(
    (
      field: keyof EventFormData,
      value: string | boolean | string[] | EventFormData['ticket_types'] | File | null
    ) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Handle image uploads
  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle banner image uploads
  const handleBannerImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 10MB for banner images)
      if (file.size > 10 * 1024 * 1024) {
        setError('Banner image file size must be less than 10MB');
        return;
      }

      setFormData(prev => ({ ...prev, bannerImage: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setBannerImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle address selection from autocomplete
  const handleAddressSelect = useCallback((address: AddressData) => {
    setFormData(prev => ({
      ...prev,
      address_line_1: address.street,
      city: address.city,
      state: address.state,
      postal_code: address.zip,
    }));
  }, []);

  // Format datetime strings for API
  const formatDateTime = useCallback((date: string, time: string) => {
    if (!date || !time) return '';
    const datetime = new Date(`${date}T${time}`);
    return datetime.toISOString();
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        // Validate required fields
        if (
          !formData.title ||
          !formData.description ||
          !formData.start_date ||
          !formData.start_time
        ) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }

        // Format dates with timezone
        const start_date = formatDateTime(formData.start_date, formData.start_time);
        const end_date = formatDateTime(
          formData.end_date || formData.start_date,
          formData.end_time || formData.start_time
        );

        if (!start_date || !end_date) {
          setError('Please provide valid dates and times');
          setLoading(false);
          return;
        }

        // Get authenticated user
        const user = await getCurrentUser();
        if (!user) {
          setError('You must be logged in to create events');
          setLoading(false);
          return;
        }

        // Map form category to schema eventType
        const eventTypeMap: { [key: string]: any } = {
          training: 'TRAINING',
          competition: 'COMPETITION',
          camp: 'CAMP',
          clinic: 'WORKSHOP',
          tournament: 'TOURNAMENT',
          social: 'WORKSHOP',
          fundraiser: 'WORKSHOP',
        };

        // Prepare address object
        const addressObj = {
          street: formData.address_line_1,
          street2: formData.address_line_2 || '',
          city: formData.city,
          state: formData.state,
          zipCode: formData.postal_code,
          country: formData.country,
        };

        // Create event using Amplify client
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
          skillLevel: 'ALL_LEVELS',
        });

        if (errors) {
          console.error('GraphQL errors:', errors);
          throw new Error('Failed to create event');
        }

        if (!event) {
          throw new Error('No event returned from creation');
        }

        console.log('Event created successfully:', event);
        setCreatedEvent(event);
        setCurrentUser(user);

        // If user opted to sync to Google Calendar, attempt automatic sync
        if (syncToGoogleCalendar) {
          setShowGoogleCalendarCTA(true);
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
                  enableMeet: true,
                }),
              });

              const result = await response.json();
              if (result.success) {
                setCreatedEvent(result.event);
              }
            } catch (error) {
              console.log('Background Google Calendar sync failed, user can retry manually');
            }
          }, 1000);
        } else {
          setShowGoogleCalendarCTA(true);
        }

        // Call onEventCreated callback if provided
        if (onEventCreated) {
          onEventCreated(event);
        }
      } catch (error) {
        console.error('Error creating event:', error);
        handleApiError(error, setError);
      } finally {
        setLoading(false);
      }
    },
    // syncToGoogleCalendar is intentionally omitted as it would cause a circular dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, formatDateTime, onEventCreated]
  );

  // Handle Google Calendar sync
  const handleGoogleCalendarSync = useCallback(async () => {
    if (!createdEvent || !currentUser) return;

    setGoogleCalendarSyncing(true);
    try {
      const response = await fetch('/api/events/google-calendar-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: createdEvent.id,
          enableMeet: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setError(null);
        // Refresh the created event with Google Calendar details
        setCreatedEvent(result.event);
      } else {
        throw new Error(result.error || 'Failed to sync to Google Calendar');
      }
    } catch (error) {
      console.error('Error syncing to Google Calendar:', error);
      handleApiError(error, setError);
    } finally {
      setGoogleCalendarSyncing(false);
    }
  }, [createdEvent, currentUser]);

  // Finish event creation process
  const handleFinishCreation = useCallback(() => {
    router.push('/coach/events');
  }, [router]);

  // View event details
  const handleViewEventDetails = useCallback(() => {
    if (createdEvent) {
      router.push(`/coach/events/${createdEvent.id}`);
    }
  }, [router, createdEvent]);

  return {
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
  };
}

export default useEventForm;
