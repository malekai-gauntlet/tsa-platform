'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/data-display';
import {
  EnvelopeIcon,
  UserIcon,
  CheckCircleIcon as CheckIcon,
  XCircleIcon as XIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  TableCellsIcon,
} from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

// Import our custom hooks and types
import { useCoachApplications } from '@/lib/hooks/coach';
import { Application } from '@/lib/types/coach';
import { useCoachProfile } from '@/lib/hooks/coach/useCoachProfile';

// Import our component extractions
// Create StatusBadge component
interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusBadgeVariant = (
    status: 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED'
  ) => {
    const variants = {
      PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
      WAITLIST: 'bg-blue-100 text-blue-800 border-blue-200',
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      REJECTED: 'bg-red-100 text-red-800 border-red-200',
    };
    return variants[status] || variants.PENDING;
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeVariant(
        status as 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED'
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </div>
  );
};

// Create these extracted components if they don't exist
interface ApplicationCardProps {
  application: Application;
  onView: (id: string) => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onView,
  onAccept,
  onReject,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004aad]/10">
              <UserIcon className="h-5 w-5 text-[#004aad]" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">{application.studentName}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {application.studentGrade && <span>Grade {application.studentGrade}</span>}
                {application.studentAge && <span>• Age {application.studentAge}</span>}
              </div>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <div className="font-medium text-gray-900">Submitted</div>
            <div>{new Date(application.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="font-medium text-gray-900">Type</div>
            <div>{application.enrollmentType || 'Standard'}</div>
          </div>
          {application.sportInterest && (
            <div>
              <div className="font-medium text-gray-900">Interest</div>
              <div>{application.sportInterest}</div>
            </div>
          )}
          {application.startDate && (
            <div>
              <div className="font-medium text-gray-900">Start Date</div>
              <div>{new Date(application.startDate).toLocaleDateString()}</div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <Button onClick={() => onView(application.id)} variant="outline" size="sm">
            View Details
          </Button>

          {application.status === 'PENDING' && (
            <>
              <Button onClick={() => onAccept(application.id)} size="sm" variant="primary">
                Accept
              </Button>
              <Button onClick={() => onReject(application.id)} size="sm" variant="danger">
                Reject
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ApplicationsEmptyState: React.FC = () => (
  <div className="w-full">
    <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <TableCellsIcon className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">No applications yet</h3>
      <p className="mx-auto max-w-sm text-sm text-gray-500">
        Student applications will appear here when parents submit them through the public enrollment
        form.
      </p>
    </div>
  </div>
);

// Import utility functions
import { handleApiError } from '@/lib/utils/coach/errorHandler';

/**
 * Improved Student Applications Content component using our new hooks and utilities
 */
export function StudentApplicationsContent() {
  const router = useRouter();

  // Use our custom hooks
  const { profile } = useCoachProfile();
  const coachEmail = profile?.email || '';

  // Application state management using our custom hook
  const { applications, loading, error, stats, fetchApplications, updateApplicationStatus } =
    useCoachApplications({
      autoFetch: true,
      coachEmail,
      coachLocation: profile?.preferences?.location,
    });

  // Local UI state
  const [actionProcessing, setActionProcessing] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  /**
   * Handles acceptance of an application
   */
  const handleAcceptApplication = useCallback(
    async (applicationId: string) => {
      const application = applications.find(app => app.id === applicationId);
      if (!application) return;

      const studentName = application.studentName;
      if (
        !confirm(
          `Accept application for ${studentName}? This will enroll the student and send confirmation emails.`
        )
      )
        return;

      try {
        setActionProcessing(applicationId);
        await updateApplicationStatus(applicationId, 'APPROVED');

        setStatusMessage({
          message: `Application for ${studentName} has been accepted!`,
          type: 'success',
        });

        // Clear message after timeout
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      } catch (error) {
        handleApiError(error, message => {
          setStatusMessage({
            message: `Error accepting application: ${message}`,
            type: 'error',
          });
        });
      } finally {
        setActionProcessing(null);
      }
    },
    [applications, updateApplicationStatus]
  );

  /**
   * Handles rejection of an application
   */
  const handleRejectApplication = useCallback(
    async (applicationId: string) => {
      const application = applications.find(app => app.id === applicationId);
      if (!application) return;

      const studentName = application.studentName;
      if (!confirm(`Reject application for ${studentName}? This action cannot be undone.`)) return;

      try {
        setActionProcessing(applicationId);
        await updateApplicationStatus(applicationId, 'REJECTED');

        setStatusMessage({
          message: `Application for ${studentName} has been rejected.`,
          type: 'info',
        });

        // Clear message after timeout
        setTimeout(() => {
          setStatusMessage(null);
        }, 5000);
      } catch (error) {
        handleApiError(error, message => {
          setStatusMessage({
            message: `Error rejecting application: ${message}`,
            type: 'error',
          });
        });
      } finally {
        setActionProcessing(null);
      }
    },
    [applications, updateApplicationStatus]
  );

  /**
   * Handles viewing a single application
   */
  const handleViewApplication = useCallback(
    (applicationId: string) => {
      router.push(`/coach/applications/${applicationId}`);
    },
    [router]
  );

  /**
   * Renders status message if present
   */
  const renderStatusMessage = () => {
    if (!statusMessage) return null;

    const { message, type } = statusMessage;
    const colors = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    return (
      <div className={`mb-4 rounded-lg border p-4 ${colors[type]}`}>
        <div className="flex">
          {type === 'success' && <CheckIcon className="mr-2 h-5 w-5 text-green-500" />}
          {type === 'error' && <XIcon className="mr-2 h-5 w-5 text-red-500" />}
          {type === 'info' && <InformationCircleIcon className="mr-2 h-5 w-5 text-blue-500" />}
          <p>{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Heading>Student Applications</Heading>
            <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1">
              <EnvelopeIcon className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">Coach Email Mode</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {coachEmail
              ? `Managing applications for coach: ${coachEmail}`
              : 'Loading coach information...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => fetchApplications()} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Status Message */}
      {renderStatusMessage()}

      {/* Application Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="font-medium text-gray-500">Total</div>
          <div className="mt-1 text-3xl font-semibold">{stats.total}</div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="font-medium text-gray-500">Pending</div>
          <div className="mt-1 text-3xl font-semibold text-amber-600">{stats.pending}</div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="font-medium text-gray-500">Approved</div>
          <div className="mt-1 text-3xl font-semibold text-green-600">{stats.accepted}</div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="font-medium text-gray-500">New This Week</div>
          <div className="mt-1 text-3xl font-semibold text-blue-600">{stats.thisWeek}</div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#004aad]"></div>
          <span className="ml-3 text-gray-500">Loading applications...</span>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading applications</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => fetchApplications()}
                  className="bg-red-50 text-red-800 hover:bg-red-100"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : applications.length === 0 ? (
        <ApplicationsEmptyState />
      ) : (
        <div className="space-y-4">
          {applications.map((application: Application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={handleViewApplication}
              onAccept={handleAcceptApplication}
              onReject={handleRejectApplication}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Icons are now properly imported from heroicons above

export default StudentApplicationsContent;
