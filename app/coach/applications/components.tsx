'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Heading } from '@/components/data-display';
import {
  CheckCircleIcon,
  ClockIcon,
  CheckIcon,
  XCircleIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PhoneIcon,
  AcademicCapIcon,
  UserIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  CogIcon,
} from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

// Import shared GraphQL utilities
import {
  fetchStudentApplications,
  acceptStudentApplication,
  rejectStudentApplication,
  type StudentApplication,
} from '@/lib/api/student-applications';

// Debug info type definition
interface DebugInfo {
  error?: string;
  details?: string;
  timestamp?: string;
  fetchSuccess?: boolean;
  applicationCount?: number;
  fetchError?: string;
  coachEmail?: string;
  coachMode?: boolean;
}

interface UserInfo {
  email: string | null;
  userId: string | null;
  name?: string | null;
}

interface ApplicationTableProps {
  applications: StudentApplication[];
  onAccept: (applicationId: string) => void;
  onReject: (applicationId: string) => void;
  loading: boolean;
}

interface StatusBadgeProps {
  status: string;
}

// Helper function to get current user info
async function getCurrentUserInfo(): Promise<UserInfo> {
  try {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken;

    if (!user || !idToken) {
      return { email: null, userId: null };
    }

    const email = user.signInDetails?.loginId || '';
    const firstName = String(idToken.payload?.['custom:firstName'] || '');
    const lastName = String(idToken.payload?.['custom:lastName'] || '');
    const name = `${firstName} ${lastName}`.trim() || email;

    return {
      email,
      userId: user.userId,
      name,
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    return { email: null, userId: null, name: null };
  }
}

// Extract reusable utility functions (following .cursor rules)
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getStatusBadgeVariant = (status: string): string => {
  const variants = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    WAITLIST: 'bg-blue-100 text-blue-800 border-blue-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
  };
  return variants[status as keyof typeof variants] || variants.PENDING;
};

// StatusBadge component with React.memo for performance
const StatusBadge = React.memo<StatusBadgeProps>(({ status }) => {
  const variant = useMemo(() => getStatusBadgeVariant(status), [status]);

  return (
    <Badge className={cn('border text-xs font-medium', variant)}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Badge>
  );
});
StatusBadge.displayName = 'StatusBadge';

// Loading skeleton component (extracted for reusability)
const ApplicationTableSkeleton = React.memo(() => (
  <div className="w-full">
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b bg-gray-50 p-6">
          <div className="mb-2 h-6 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        </div>
        <div className="space-y-4 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded bg-gray-100"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
));
ApplicationTableSkeleton.displayName = 'ApplicationTableSkeleton';

// Empty state component (extracted for reusability)
const EmptyApplicationsState = React.memo(() => (
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
));
EmptyApplicationsState.displayName = 'EmptyApplicationsState';

// Application Management Table Component with React.memo
const ApplicationManagementTable = React.memo<ApplicationTableProps>(
  ({ applications, onAccept, onReject, loading }) => {
    // Memoized stats calculation for performance
    const stats = useMemo(
      () => ({
        pending: applications.filter(app => app.status === 'PENDING' || app.status === 'WAITLIST')
          .length,
        approved: applications.filter(app => app.status === 'APPROVED').length,
        rejected: applications.filter(app => app.status === 'REJECTED').length,
        thisWeek: applications.filter(
          app => new Date(app.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
      }),
      [applications]
    );

    // Memoized navigation handler to avoid inline functions
    const handleViewApplication = useCallback((applicationId: string) => {
      window.location.href = `/coach/applications/${applicationId}`;
    }, []);

    if (loading) {
      return <ApplicationTableSkeleton />;
    }

    if (applications.length === 0) {
      return <EmptyApplicationsState />;
    }

    return (
      <div className="w-full space-y-6">
        {/* Header Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004aad]/10">
                <AcademicCapIcon className="h-5 w-5 text-[#004aad]" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">Student Applications</h2>
                  <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1">
                    <EnvelopeIcon className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-800">Coach Mode</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Review and manage student enrollment applications
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Pending', count: stats.pending, color: 'text-amber-600' },
              { label: 'Approved', count: stats.approved, color: 'text-green-600' },
              { label: 'Rejected', count: stats.rejected, color: 'text-red-600' },
              { label: 'This Week', count: stats.thisWeek, color: 'text-blue-600' },
            ].map((stat, index) => (
              <div key={stat.label} className="rounded-lg bg-gray-50 p-3 text-center">
                <div className={cn('text-lg font-semibold', stat.color)}>{stat.count}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Student Information</TableHead>
                <TableHead className="w-[200px]">Parent Contact</TableHead>
                <TableHead className="w-[180px]">Application Details</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map(application => (
                <TableRow key={application.id} className="group">
                  {/* Student Information */}
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#004aad]/10">
                          <UserIcon className="h-4 w-4 text-[#004aad]" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-gray-900">
                            {application.studentName}
                          </div>
                          {application.studentGrade && (
                            <div className="text-xs text-gray-500">
                              Grade {application.studentGrade}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Student Details */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {application.studentAge && (
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="h-3 w-3" />
                            Age {application.studentAge}
                          </div>
                        )}
                        {application.enrollmentType && (
                          <div className="flex items-center gap-1">
                            <AcademicCapIcon className="h-3 w-3" />
                            {application.enrollmentType.replace('_', ' ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Parent Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">
                        Parent ({application.parentId})
                      </div>
                      {application.coachName && (
                        <div className="text-xs text-gray-500">Coach: {application.coachName}</div>
                      )}
                    </div>
                  </TableCell>

                  {/* Application Details */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900">
                        {formatDate(application.createdAt)}
                      </div>
                      {application.enrollmentType && (
                        <div className="text-xs text-gray-500">
                          Type: {application.enrollmentType}
                        </div>
                      )}
                      {application.sportInterest && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          <Badge className="border-blue-200 bg-blue-50 text-xs text-blue-700">
                            {application.sportInterest}
                          </Badge>
                          {application.studentGrade && (
                            <Badge className="border-green-200 bg-green-50 text-xs text-green-700">
                              Grade {application.studentGrade}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusBadge status={application.status} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs text-gray-600 hover:text-gray-900"
                        onClick={() => handleViewApplication(application.id)}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
);
ApplicationManagementTable.displayName = 'ApplicationManagementTable';

    // Main content component with useEffect and cleanup
export function StudentApplicationsContent() {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [currentCoachEmail, setCurrentCoachEmail] = useState<string | null>(null);

  // Memoized functions following React best practices
  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);

      // Get current coach email from authentication
      const userInfo = await getCurrentUserInfo();
      const coachEmail = userInfo.email || userInfo.userId;

      if (!coachEmail) {
        throw new Error('No authenticated coach found');
      }

      setCurrentCoachEmail(coachEmail);
      console.log(`📧 Fetching applications for coach: ${coachEmail}`);

      // Build the API URL with coach email parameter for filtering
      const params = new URLSearchParams();
      params.append('coachEmail', coachEmail);
      
      const url = `/api/applications/list?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch applications');
      }

      // Transform Zapier application data to StudentApplication format
      const transformedApplications: StudentApplication[] = (data.applications || []).map((app: any) => ({
        id: app.id,
        parentId: app.parent1Email || 'unknown',
        studentName: app.studentName || 'Unknown Student',
        studentAge: app.studentAge || undefined,
        studentGrade: app.studentGrade || '',
        enrollmentType: 'FULL_TIME' as const,
        status: (app.status || 'PENDING') as 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED',
        applicationData: {
          parentName: app.parent1Name,
          parentEmail: app.parent1Email,
          parentPhone: app.parent1Phone,
          address: app.address,
          city: app.city,
          state: app.state,
          zipCode: app.zipCode,
          currentSchool: app.currentSchool,
          whyApplying: app.whyApplying,
          tellUsMore: app.tellUsMore,
          specialAccommodations: app.specialAccommodations,
        },
        documents: undefined,
        tuitionPlan: undefined,
        startDate: app.enrollmentDate,
        academicYear: new Date().getFullYear().toString(),
        schoolPreferences: undefined,
        coachName: app.coachEmail,
        sportInterest: app.sportInterest || 'General',
        currentStep: 1,
        totalSteps: 5,
        timelineSteps: undefined,
        timelineStatus: 'ACTIVE' as const,
        createdAt: app.submittedAt || new Date().toISOString(),
        updatedAt: app.submittedAt || new Date().toISOString(),
      }));

      setApplications(transformedApplications);
      setDebugInfo({
        fetchSuccess: true,
        applicationCount: transformedApplications.length,
        timestamp: new Date().toISOString(),
        coachEmail,
        coachMode: true,
      });

      console.log(
        `✅ Successfully fetched ${transformedApplications.length} applications for coach: ${coachEmail}`
      );
      console.log(`📊 Total applications in system: ${data.totalApplications || 0}`);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
      setDebugInfo({
        fetchError: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        coachEmail: currentCoachEmail || 'unknown',
        coachMode: true,
      });
    } finally {
      setLoading(false);
    }
  }, [currentCoachEmail]);

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
        await acceptStudentApplication(applicationId);

        // Update local state
        setApplications(prev =>
          prev.map(app => (app.id === applicationId ? { ...app, status: 'APPROVED' } : app))
        );

        alert(`✅ Application for ${studentName} has been accepted!`);
      } catch (error) {
        console.error('Error accepting application:', error);
        alert('Failed to accept application. Please try again.');
      }
    },
    [applications]
  );

  const handleRejectApplication = useCallback(
    async (applicationId: string) => {
      const application = applications.find(app => app.id === applicationId);
      if (!application) return;

      const studentName = application.studentName;
      if (!confirm(`Reject application for ${studentName}? This action cannot be undone.`)) return;

      try {
        await rejectStudentApplication(applicationId);

        // Update local state
        setApplications(prev =>
          prev.map(app => (app.id === applicationId ? { ...app, status: 'REJECTED' } : app))
        );

        alert(`❌ Application for ${studentName} has been rejected.`);
      } catch (error) {
        console.error('Error rejecting application:', error);
        alert('Failed to reject application. Please try again.');
      }
    },
    [applications]
  );

      // useEffect with cleanup following .cursor rules
  useEffect(() => {
    let isMounted = true;

    const initializeApplications = async () => {
      if (isMounted) {
        await loadApplications();
      }
    };

    initializeApplications();

    return () => {
      isMounted = false;
    };
  }, [loadApplications]);

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
            {currentCoachEmail
              ? `Managing applications for coach: ${currentCoachEmail}`
              : 'Loading coach information...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadApplications} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Debug Information */}
      {debugInfo && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-start gap-2">
            <EnvelopeIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <div className="flex-1">
              <h4 className="mb-2 text-sm font-medium text-green-800">Coach Information</h4>
              <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
                <div>
                  <span className="font-medium text-green-800">Mode:</span>
                  <span className="ml-1 text-green-700">Coach Email Attribution</span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Coach Email:</span>
                  <span className="ml-1 text-green-700">{debugInfo.coachEmail}</span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Applications:</span>
                  <span className="ml-1 text-green-700">{debugInfo.applicationCount || 0}</span>
                </div>
              </div>
              {debugInfo.fetchError && (
                <div className="mt-2 rounded border border-red-200 bg-red-50 p-2">
                  <span className="text-xs text-red-700">{debugInfo.fetchError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ApplicationManagementTable
        applications={applications}
        onAccept={handleAcceptApplication}
        onReject={handleRejectApplication}
        loading={loading}
      />
    </div>
  );
}
