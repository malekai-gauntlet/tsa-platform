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
      <div className="space-y-4">
        {[1, 2, 3].map((i: number) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 rounded-lg bg-gray-100"></div>
          </div>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 py-8 text-center">
        <AcademicCapIcon className="mx-auto mb-3 h-12 w-12 text-gray-400" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900">No applications yet</h3>
        <p className="mb-4 text-sm text-gray-600">
          Applications will appear here when families apply to your school
        </p>
        <button
          className="inline-flex items-center rounded-md border border-transparent bg-[#004aad] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#003888]"
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
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
        <a
          href="/coach/applications"
          className="flex items-center gap-1 text-sm font-medium text-[#004aad] transition-colors hover:text-[#003888]"
        >
          View All ({applications.length})
          <ChevronRightIcon className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-4">
        {applications.map((app: Application) => {
          const IconComponent = app.type === 'application' ? AcademicCapIcon : AcademicCapIcon;
          return (
            <div
              key={app.id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-5 transition-all hover:shadow-md"
              onClick={() => (window.location.href = `/coach/applications/${app.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-1 items-start gap-4">
                  <div
                    className={`rounded-lg p-3 ${
                      getApplicationColor(app.type) === 'green'
                        ? 'bg-green-100'
                        : getApplicationColor(app.type) === 'blue'
                          ? 'bg-blue-100'
                          : 'bg-gray-100'
                    }`}
                  >
                    <IconComponent
                      className={`h-5 w-5 ${
                        getApplicationColor(app.type) === 'green'
                          ? 'text-green-600'
                          : getApplicationColor(app.type) === 'blue'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {/* Student Information */}
                    <div className="mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {app.studentFirstName} {app.studentLastName}
                      </h4>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                        <span>Grade {app.studentGrade}</span>
                        <span>•</span>
                        <span>{app.startTerm}</span>
                        {app.currentSchool && (
                          <>
                            <span>•</span>
                            <span>{app.currentSchool}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Parent/Guardian Information */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Parent/Guardian:</span> {app.parentName}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <EnvelopeIcon className="h-3 w-3" />
                          {app.parentEmail}
                        </span>
                        {app.parentPhone && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <PhoneIcon className="h-3 w-3" />
                              {app.parentPhone}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Location & Additional Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {app.address && (
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {app.address}
                        </span>
                      )}
                      <span>Applied {formatDate(app.submittedAt)}</span>
                    </div>

                    {/* Notes if available */}
                    {app.notes && (
                      <div className="mt-3 rounded-lg bg-blue-50 p-3">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Note:</span> {app.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge & Actions */}
                <div className="ml-4 flex flex-col items-end gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
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

                  <div className="flex gap-2">
                    <button
                      className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900"
                      onClick={e => {
                        e.stopPropagation();
                        window.location.href = `/coach/applications/${app.id}`;
                      }}
                    >
                      Review
                    </button>
                    <button
                      className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-700"
                      onClick={e => {
                        e.stopPropagation();
                        window.location.href = `mailto:${app.parentEmail}`;
                      }}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
