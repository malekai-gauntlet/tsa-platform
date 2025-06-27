import React from 'react'
import Link from 'next/link'
import { 
  CalendarDaysIcon,
  EyeIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatTime, formatPrice, getStatusColor, getEventTypeColor, isUpcoming, isPast } from '@/lib/utils/events'
import type { Event } from '@/lib/types/events'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const isEventUpcoming = isUpcoming(event)
  const isEventPast = isPast(event)
  
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-grow">
            {event.title}
          </h3>
          <div className="flex gap-1 flex-shrink-0">
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </div>
        </div>
        
        {event.eventType && (
          <Badge variant="outline" className={getEventTypeColor(event.eventType)}>
            {event.eventType}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        <div className="space-y-3 flex-grow">
          {event.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {event.shortDescription}
            </p>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>{formatDate(event.startDate)} at {formatTime(event.startDate)}</span>
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
                <span>{event.registeredCount || 0} / {event.capacity} registered</span>
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

        <div className="flex gap-2 mt-4">
          <Link href={`/coach/events/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full inline-flex items-center justify-center">
              <EyeIcon className="h-4 w-4 mr-1" />
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
  )
} 