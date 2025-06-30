import React from 'react';
import {
  AcademicCapIcon,
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { Link } from '@/components/link';
import { Badge } from '@/components/ui/badge';
import { formatDate, getApplicationColor, getStatusBadgeColor } from '@/lib/utils/coach';
import { createSchoolApplicationURL } from '@/lib/utils';
import type { Application } from '@/lib/types/coach';

interface RecentApplicationsProps {
  applications: Application[];
  coachLocation: string;
  loading: boolean;
}

export function RecentApplications({
  applications,
  coachLocation,
  loading,
}: RecentApplicationsProps) {
  const handleShareLink = () => {
    const applicationUrl = createSchoolApplicationURL(coachLocation);
    navigator.clipboard.writeText(applicationUrl);
    alert('Application link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2].map((i: number) => (
          <div key={i} className="animate-pulse">
            <div className="h-12 rounded bg-gray-100"></div>
          </div>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="rounded border border-gray-200 bg-gray-50 py-4 px-4 text-center">
        <AcademicCapIcon className="mx-auto mb-2 h-6 w-6 text-gray-400" />
        <h3 className="mb-1 text-sm font-medium text-gray-900">No applications yet</h3>
        <p className="mb-3 text-xs text-gray-600">
          Applications will appear here when families apply to your school
        </p>
        <button
          className="inline-flex items-center rounded border border-transparent bg-[#004aad] px-3 py-1 text-xs font-medium text-white hover:bg-[#003888]"
          onClick={handleShareLink}
          title="Click to copy this application link"
        >
          Share Application Link
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Recent Applications</h3>
        <Link
          href="/coach/applications"
          className="flex items-center gap-1 text-xs text-[#004aad] hover:text-[#003888]"
        >
          View All ({applications.length})
          <ChevronRightIcon className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-2">
        {applications.map((app: Application) => {
          return (
            <div
              key={app.id}
              className="cursor-pointer rounded border border-gray-200 bg-white p-3 transition-all hover:shadow-sm"
              onClick={() => (window.location.href = `/coach/applications/${app.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-blue-100 p-1.5">
                    <AcademicCapIcon className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {app.studentName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Grade {app.studentGrade}</span>
                      <span>•</span>
                      <span>{formatDate(app.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      getStatusBadgeColor(app.status) === 'green'
                        ? 'bg-green-100 text-green-800'
                        : getStatusBadgeColor(app.status) === 'amber'
                          ? 'bg-amber-100 text-amber-800'
                          : getStatusBadgeColor(app.status) === 'blue'
                            ? 'bg-blue-100 text-blue-800'
                            : getStatusBadgeColor(app.status) === 'red'
                              ? 'bg-red-100 text-red-800'
                              : getStatusBadgeColor(app.status) === 'orange'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {app.status.replace('-', ' ')}
                  </span>
                  <button
                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
                    onClick={e => {
                      e.stopPropagation();
                      window.location.href = `/coach/applications/${app.id}`;
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
