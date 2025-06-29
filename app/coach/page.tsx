'use client';

import React, { useState, useEffect } from 'react';
import { Heading, Subheading } from '@/components/heading';
import { ArrowRightIcon, AcademicCapIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { Link } from '@/components/link';
import { useSearchParams } from 'next/navigation';

// Custom hooks and components
import { useCoachData } from '@/lib/hooks/useCoachData';
import { useApplications } from '@/lib/hooks/useApplications';
import { LockedNotification } from '@/components/coach/LockedNotification';
import { ApplicationStats } from '@/components/coach/ApplicationStats';
import { RecentApplications } from '@/components/coach/RecentApplications';

// Utils
import { createSchoolApplicationURL } from '@/lib/utils';

export default function CoachDashboard() {
  const searchParams = useSearchParams();
  const [showLockedNotification, setShowLockedNotification] = useState(false);
  const [lockedRoute, setLockedRoute] = useState('');

  // Custom hooks for data fetching
  const { coachData, loading: coachLoading } = useCoachData();
  const {
    stats: applicationStats,
    recentApplications,
    loading: applicationsLoading,
  } = useApplications({
    coachEmail: coachData.currentUser?.signInDetails?.loginId || coachData.currentUser?.userId,
    currentUserId: coachData.currentUser?.userId,
    coachLocation: coachData.coachLocation,
  });

  // Handle locked route notifications
  useEffect(() => {
    const locked = searchParams.get('locked');
    const route = searchParams.get('route');

    if (locked === 'true' && route) {
      setShowLockedNotification(true);
      setLockedRoute(route);

      const timer = setTimeout(() => {
        setShowLockedNotification(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleCopyApplicationLink = () => {
    const applicationUrl = createSchoolApplicationURL(coachData.coachLocation);
    navigator.clipboard.writeText(applicationUrl);
    alert('Application link copied to clipboard!');
  };

  return (
    <>
      {/* Locked Route Notification */}
      <LockedNotification
        show={showLockedNotification}
        route={lockedRoute}
        onDismiss={() => setShowLockedNotification(false)}
      />

      {/* Dynamic Greeting */}
      <div className="mb-8">
        <Heading className="text-2xl text-gray-900 sm:text-3xl">
          {coachLoading ? 'Loading...' : coachData.greeting}
        </Heading>
        <p className="mt-2 text-gray-600">
          {coachData.coachLocation
            ? `Manage your Texas Sports Academy location. Track applications, invite families, and grow your school.`
            : 'Welcome to your dashboard. Here you can find all the information you need to manage your school.'}
        </p>
      </div>

      {/* Application Management Section */}
      <div className="mb-8" data-tour="applications-section">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#004aad]/10 p-3">
                  <AcademicCapIcon className="h-6 w-6 text-[#004aad]" />
                </div>
                <div>
                  <Subheading className="text-xl font-semibold text-gray-900">
                    Student Applications
                  </Subheading>
                  <p className="text-sm text-gray-600">Review and manage incoming applications</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {coachData.coachLocation && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    📍 {coachData.coachLocation} Location
                  </span>
                )}
                <button
                  className="text-xs font-medium text-[#004aad] transition-colors hover:text-[#003888]"
                  onClick={handleCopyApplicationLink}
                  title="Click to copy this application link"
                >
                  Copy Application Link
                </button>
                <Link
                  href="/coach/applications"
                  className="flex items-center gap-1 text-sm font-medium text-[#004aad] transition-colors hover:text-[#003888]"
                >
                  Manage All
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Stats Cards */}
            <ApplicationStats stats={applicationStats} loading={applicationsLoading} />

            {/* Recent Applications */}
            <RecentApplications
              applications={recentApplications}
              coachLocation={coachData.coachLocation}
              loading={applicationsLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
