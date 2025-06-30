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
      <div className="mb-6">
        <Heading className="text-xl text-gray-900 sm:text-2xl">
          {coachLoading ? 'Loading...' : coachData.greeting}
        </Heading>
        <p className="mt-1 text-sm text-gray-600">
          {coachData.coachLocation
            ? `Manage your Texas Sports Academy location. Track applications, invite families, and grow your school.`
            : 'Welcome to your dashboard. Here you can find all the information you need to manage your school.'}
        </p>
      </div>

      {/* Application Management Section */}
      <div className="mb-6" data-tour="applications-section">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* Header */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-[#004aad]/10 p-1.5">
                  <AcademicCapIcon className="h-4 w-4 text-[#004aad]" />
                </div>
                <div>
                  <Subheading className="text-base font-medium text-gray-900">
                    Student Applications
                  </Subheading>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {coachData.coachLocation && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                    📍 {coachData.coachLocation}
                  </span>
                )}
                <button
                  className="text-xs text-[#004aad] hover:text-[#003888]"
                  onClick={handleCopyApplicationLink}
                  title="Click to copy this application link"
                >
                  Copy Link
                </button>
                <Link
                  href="/coach/applications"
                  className="flex items-center gap-1 text-xs text-[#004aad] hover:text-[#003888]"
                >
                  View All
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            {/* Stats Cards */}
            <ApplicationStats stats={applicationStats} loading={applicationsLoading} />
          </div>
        </div>
      </div>
    </>
  );
}
