'use client';

import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/data-display';
import { CalendarIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { Event } from '@/lib/types/coach';
import { formatDate, formatTime, getStatusColor } from '@/lib/utils/coach/formatters';

interface EventHeaderProps {
  event: Event;
}

/**
 * Event header component displaying title, dates, location, and status
 */
export function EventHeader({ event }: EventHeaderProps) {
  const getStatusColor = (status?: string) => {
    if (!status) return 'zinc';

    switch (status.toLowerCase()) {
      case 'scheduled':
      case 'published':
        return 'lime';
      case 'in_progress':
        return 'blue';
      case 'completed':
        return 'zinc';
      case 'cancelled':
      case 'rejected':
        return 'red';
      case 'draft':
        return 'yellow';
      default:
        return 'zinc';
    }
  };

  // Format the full address from the address components
  const getFullAddress = () => {
    if (!event.address) return '';
    const parts = [
      event.address.street,
      event.address.city,
      event.address.state,
      event.address.zipCode,
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Heading className="truncate">{event.title}</Heading>
          <Badge color={getStatusColor(event.status)}>
            {event.status
              ? event.status.charAt(0).toUpperCase() + event.status.slice(1).toLowerCase()
              : 'Draft'}
          </Badge>
          {event.status === 'PUBLISHED' || !event.status ? null : (
            <Badge color="zinc">Private</Badge>
          )}
        </div>

        <div className="space-y-1 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {formatDate(event.startDate)} at {formatTime(event.startDate)}
              {event.endDate !== event.startDate && (
                <>
                  {' '}
                  - {formatDate(event.endDate)} at {formatTime(event.endDate)}
                </>
              )}
            </span>
          </div>

          {(event.venue || getFullAddress()) && (
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>
                {event.venue && (
                  <>
                    {event.venue}
                    <br />
                  </>
                )}
                {getFullAddress()}
              </span>
            </div>
          )}

          {/* Google Calendar Sync Status */}
          {event.googleCalendarEventId && (
            <div className="text-sm">
              <span className="font-medium text-green-600">✅ Synced with Google Calendar</span>
              {event.googleMeetUrl && (
                <div className="mt-1">
                  <a
                    href={event.googleMeetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    📹 Join Google Meet
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventHeader;
