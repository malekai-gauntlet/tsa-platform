import React from 'react';
import Link from 'next/link';
import {
  CalendarDaysIcon,
  EyeIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  formatDate,
  formatTime,
  formatPrice,
  getStatusColor,
  getEventTypeColor,
  isUpcoming,
  isPast,
} from '@/lib/utils/events';
import type { Event } from '@/lib/types/events';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const isEventUpcoming = isUpcoming(event);
  const isEventPast = isPast(event);

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 flex-grow font-semibold text-gray-900">{event.title}</h3>
          <div className="flex flex-shrink-0 gap-1">
            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
          </div>
        </div>

        {event.eventType && (
          <Badge variant="outline" className={getEventTypeColor(event.eventType)}>
            {event.eventType}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-grow flex-col">
        <div className="flex-grow space-y-3">
          {event.shortDescription && (
            <p className="line-clamp-2 text-sm text-gray-600">{event.shortDescription}</p>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>
                {formatDate(event.startDate)} at {formatTime(event.startDate)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {event.isOnline ? (
                <>
                  <GlobeAltIcon className="h-4 w-4" />
                  <span>Online Event</span>
                </>
              ) : (
                <>
                  <MapPinIcon className="h-4 w-4" />
                  <span className="truncate">{event.venue || 'Location TBD'}</span>
                </>
              )}
            </div>

            {event.capacity && (
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                <span>
                  {event.registeredCount || 0} / {event.capacity} registered
                </span>
              </div>
            )}

            {event.price !== undefined && (
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span className="font-medium">{formatPrice(event.price)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/coach/events/${event.id}`} className="flex-1">
            <Button variant="outline" className="inline-flex w-full items-center justify-center">
              <EyeIcon className="mr-1 h-4 w-4" />
              View
            </Button>
          </Link>
          <Link href={`/coach/events/${event.id}/edit`}>
            <Button variant="outline" className="inline-flex items-center">
              Edit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
