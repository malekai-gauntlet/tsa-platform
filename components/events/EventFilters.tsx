import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EventFilters as EventFiltersType } from '@/lib/types/events';

interface EventFiltersProps {
  filters: EventFiltersType;
  onSearchChange: (searchTerm: string) => void;
  onStatusChange: (status: string) => void;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
  totalCount: number;
}

export function EventFilters({
  filters,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClearFilters,
  hasActiveFilters,
  resultCount,
  totalCount,
}: EventFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search events by title, description, or venue..."
              value={filters.searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={filters.statusFilter}
                onChange={e => onStatusChange(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Type:</label>
              <select
                value={filters.eventTypeFilter}
                onChange={e => onTypeChange(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="TRAINING">Training</option>
                <option value="BOOTCAMP">Bootcamp</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="COMPETITION">Competition</option>
                <option value="CAMP">Camp</option>
                <option value="TOURNAMENT">Tournament</option>
              </select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="inline-flex items-center"
              >
                <XMarkIcon className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Results Count */}
          {hasActiveFilters && (
            <div className="text-sm text-gray-600">
              Showing {resultCount} of {totalCount} events
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
