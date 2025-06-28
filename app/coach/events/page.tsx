'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Custom hooks and components
import { useEvents } from '@/lib/hooks/useEvents';
import { EventStats } from '@/components/events/EventStats';
import { EventFilters } from '@/components/events/EventFilters';
import { EventCard } from '@/components/events/EventCard';
import { EventsEmptyState } from '@/components/events/EventsEmptyState';
import { EventsLoadingState } from '@/components/events/EventsLoadingState';

export default function EventsPage() {
  const router = useRouter();
  const {
    events,
    filteredEvents,
    stats,
    loading,
    error,
    filters,
    hasActiveFilters,
    updateSearchTerm,
    updateStatusFilter,
    updateEventTypeFilter,
    clearFilters,
    refetch,
  } = useEvents();

  if (loading) {
    return <EventsLoadingState />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600">Manage your coaching events and track registrations</p>
          </div>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-2 font-semibold text-red-600">Error Loading Events</div>
              <div className="mb-4 text-sm text-red-500">{error}</div>
              <Button onClick={refetch} variant="outline">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="mt-2 text-gray-600">Manage your coaching events and track registrations</p>
        </div>
        <Button
          onClick={() => router.push('/coach/events/create')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create Event
        </Button>
      </div>

      {/* Statistics */}
      <EventStats stats={stats} />

      {/* Search and Filters */}
      <EventFilters
        filters={filters}
        onSearchChange={updateSearchTerm}
        onStatusChange={updateStatusFilter}
        onTypeChange={updateEventTypeFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={!!hasActiveFilters}
        resultCount={filteredEvents.length}
        totalCount={events.length}
      />

      {/* Events Grid or Empty State */}
      {filteredEvents.length === 0 ? (
        <EventsEmptyState
          hasEvents={events.length > 0}
          hasActiveFilters={!!hasActiveFilters}
          onClearFilters={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
