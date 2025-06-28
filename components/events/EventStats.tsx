import React from 'react';
import { CalendarDaysIcon, EyeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '@/components/ui/card';
import type { EventStats as EventStatsType } from '@/lib/types/events';

interface EventStatsProps {
  stats: EventStatsType;
  loading?: boolean;
}

export function EventStats({ stats, loading = false }: EventStatsProps) {
  const statsData = [
    {
      label: 'Total Events',
      value: stats.total,
      icon: CalendarDaysIcon,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: EyeIcon,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Registrations',
      value: stats.totalRegistrations,
      icon: UsersIcon,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="mb-2 h-6 w-24 rounded bg-gray-200"></div>
                <div className="h-8 w-16 rounded bg-gray-200"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statsData.map(stat => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                  <IconComponent className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
