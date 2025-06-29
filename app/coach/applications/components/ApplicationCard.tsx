'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils/coach';
import { Application } from '@/lib/types/coach';
import StatusBadge from './StatusBadge';
import { UserIcon, CalendarDaysIcon, AcademicCapIcon } from '@heroicons/react/20/solid';

interface ApplicationCardProps {
  application: Application;
  onView: (id: string) => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  compact?: boolean;
}

/**
 * Application card component for displaying student application information
 */
export const ApplicationCard = React.memo<ApplicationCardProps>(
  ({ application, onView, onAccept, onReject, compact = false }) => {
    const studentAge = application.studentAge || 'N/A';
    const studentGrade = application.studentGrade || 'N/A';
    const sportInterest = application.sportInterest || 'General';

    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              {/* Student Information */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#004aad]/10">
                  <UserIcon className="h-5 w-5 text-[#004aad]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{application.studentName}</h3>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <AcademicCapIcon className="h-3.5 w-3.5" />
                      Grade {studentGrade}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="h-3.5 w-3.5" />
                      {studentAge === 'N/A' ? 'Age not provided' : `Age ${studentAge}`}
                    </div>
                  </div>
                </div>
              </div>

              {!compact && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Parent & Application Details */}
                  <div>
                    {application.parentId && (
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Parent ID:</span>{' '}
                        <span className="text-gray-600">{application.parentId}</span>
                      </div>
                    )}

                    {sportInterest && (
                      <div className="mt-1 text-sm">
                        <span className="font-medium text-gray-700">Sport Focus:</span>{' '}
                        <span className="text-gray-600">{sportInterest}</span>
                      </div>
                    )}

                    <div className="mt-1 text-sm">
                      <span className="font-medium text-gray-700">Enrollment Type:</span>{' '}
                      <span className="text-gray-600">
                        {application.enrollmentType?.replace('_', ' ') || 'Not specified'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Application Date:</span>{' '}
                      <span className="text-gray-600">{formatDate(application.createdAt)}</span>
                    </div>

                    <div className="mt-1 text-sm">
                      <span className="font-medium text-gray-700">Last Updated:</span>{' '}
                      <span className="text-gray-600">{formatDate(application.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Status & Actions */}
            <div className="ml-4 flex flex-col items-end gap-3">
              <StatusBadge status={application.status} />

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs"
                  onClick={() => onView(application.id)}
                >
                  View Details
                </Button>

                {!compact && onAccept && application.status === 'PENDING' && (
                  <Button
                    size="sm"
                    variant="primary"
                    className="h-8 bg-green-600 px-3 text-xs hover:bg-green-700"
                    onClick={() => onAccept(application.id)}
                  >
                    Accept
                  </Button>
                )}

                {!compact && onReject && application.status === 'PENDING' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-red-200 px-3 text-xs text-red-700 hover:bg-red-50"
                    onClick={() => onReject(application.id)}
                  >
                    Reject
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ApplicationCard.displayName = 'ApplicationCard';

export default ApplicationCard;
