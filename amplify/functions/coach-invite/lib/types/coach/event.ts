/**
 * Event Type Definitions
 *
 * Types for events based on the Amplify Schema.
 */

import { Schema } from '@/amplify/data/resource';

// Extract Event type from Amplify Schema
export type EventType = NonNullable<Schema['models']['Event']['record']>;

/**
 * Form data for creating events
 */
export interface EventFormData {
  title: string;
  description: string;
  venue_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  timezone: string;
  category: string;
  capacity: string;
  registration_deadline: string;
  visibility: 'public' | 'private';
  ticket_types: TicketType[];
  image: File | null;
  bannerImage: File | null;
}

export interface TicketType {
  name: string;
  description: string;
  cost: number;
  currency: string;
  quantity_total?: number;
  include_fee: boolean;
}

/**
 * Maps EventFormData to EventType for the Amplify Schema
 * @param formData Event form data
 * @param userId User creating the event
 * @returns Object suitable for creating an Event
 */
export function mapFormDataToEventInput(
  formData: EventFormData,
  userId: string
): Partial<EventType> {
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

  // Format dates with timezone
  const formatDateTime = (date: string, time: string) => {
    if (!date || !time) return '';
    const datetime = new Date(`${date}T${time}`);
    return datetime.toISOString();
  };

  const start_date = formatDateTime(formData.start_date, formData.start_time);
  const end_date = formatDateTime(
    formData.end_date || formData.start_date,
    formData.end_time || formData.start_time
  );

  // Prepare address object
  const addressObj = {
    street: formData.address_line_1,
    street2: formData.address_line_2 || '',
    city: formData.city,
    state: formData.state,
    zipCode: formData.postal_code,
    country: formData.country,
  };

  return {
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
    coachId: userId,
    coachName: userId, // Will be enriched by coach profile
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
  };
}
