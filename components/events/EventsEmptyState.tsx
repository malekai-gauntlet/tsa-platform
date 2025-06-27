import React from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EventsEmptyStateProps {
  hasEvents: boolean
  hasActiveFilters: boolean
  onClearFilters?: () => void
}

export function EventsEmptyState({ hasEvents, hasActiveFilters, onClearFilters }: EventsEmptyStateProps) {
  const router = useRouter()

  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <CalendarDaysIcon className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {!hasEvents ? 'No events yet' : 'No events match your filters'}
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          {!hasEvents 
            ? 'Create your first event to organize training sessions, bootcamps, or competitions.'
            : 'Try adjusting your search criteria or filters to find events.'
          }
        </p>
        {!hasEvents ? (
          <Button 
            onClick={() => router.push('/coach/events/create')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Your First Event
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={onClearFilters}
            className="inline-flex items-center"
          >
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 