'use client';

import React, { useState } from 'react';
import { Link } from '@/components/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';

export default function Finalize() {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Use the onboarding state hook for data management
  const {
    formData,
    invitationData,
    isLoading: onboardingLoading,
    getProgressPercentage,
  } = useOnboardingState({
    currentStep: ONBOARDING_STEPS.FINALIZE,
    requiredFields: [],
  });

  const handleConfirm = () => {
    // Get data from both formData and invitationData with field mapping
    const onboardingData = {
      // Personal Information - prioritize invitation data, fallback to form data
      email: invitationData?.email || formData.email || '',
      firstName: invitationData?.firstName || formData.firstName || '',
      lastName: invitationData?.lastName || formData.lastName || '',
      phone: invitationData?.phone || formData.phone || '',

      // School Information from form data
      schoolName: formData.schoolName || invitationData?.schoolName || '',
      sport: invitationData?.sport || formData.sport || '',
      schoolType: formData.schoolType || invitationData?.schoolType || '',
      roleType: formData.roleType || '',

      // Other required fields
      gradeLevelsServed: formData.gradeLevelsServed || formData.gradeLevels || [],
      platformAgreement: formData.platformAgreement || false,
    };

    // Check required fields
    const requiredFields = [
      'schoolName',
      'sport',
      'schoolType',
      'roleType',
      'email',
      'firstName',
      'lastName',
    ];

    const missingFields = requiredFields.filter(
      field => !onboardingData[field as keyof typeof onboardingData]
    );

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      alert(
        `Please complete the following required fields by going back to previous steps: ${missingFields.join(', ')}`
      );
      return;
    }

    // Check platform agreement
    if (!onboardingData.platformAgreement) {
      alert('Please go back and accept the platform agreement to continue');
      return;
    }

    // Check that grade levels are selected
    if (!onboardingData.gradeLevelsServed || onboardingData.gradeLevelsServed.length === 0) {
      alert('Please go back and select at least one grade level to serve');
      return;
    }

    // All validation passed - proceed to completion
    setIsConfirmed(true);
    router.push(buildInvitationURL('/onboarding/complete'));
  };

  const formatGradeLevels = (grades: string[]) => {
    if (!grades || grades.length === 0) return 'None selected';
    return grades.map(grade => (grade === 'K' ? 'Kindergarten' : `Grade ${grade}`)).join(', ');
  };

  const formatSchoolType = (type: string) => {
    const types: { [key: string]: string } = {
      elementary: 'Elementary School',
      middle: 'Middle School',
      high: 'High School',
    };
    return types[type] || type;
  };

  const formatRoleType = (role: string) => {
    const roles: { [key: string]: string } = {
      coach: 'Coach',
      teacher_coach: 'Teacher & Coach',
      administrator: 'Administrator',
      parent_coach: 'Parent Coach',
    };
    return roles[role] || role;
  };

  // Prepare display data with fallbacks
  const displayData = {
    // Personal Information - prioritize invitation data with field mapping
    firstName: invitationData?.firstName || formData.firstName || 'Not provided',
    lastName: invitationData?.lastName || formData.lastName || 'Not provided',
    email: invitationData?.email || formData.email || 'Not provided',
    phone: invitationData?.phone || formData.phone || 'Not provided',

    // School Information - handle both field formats
    schoolName: formData.schoolName || invitationData?.schoolName || 'Not provided',
    sport: invitationData?.sport || formData.sport || 'Not provided',
    schoolType: formData.schoolType || invitationData?.schoolType || 'Not provided',
    roleType: formData.roleType || 'Not provided',
    gradeLevelsServed: formData.gradeLevelsServed || formData.gradeLevels || [],
    footballType: formData.footballType || '',
    academicYear: formData.academicYear || '2024-2025',

    // School Address
    schoolStreet: formData.schoolStreet || '',
    schoolCity: formData.schoolCity || invitationData?.city || '',
    schoolState: formData.schoolState || invitationData?.state || '',
    schoolZip: formData.schoolZip || '',
    schoolPhone: formData.schoolPhone || '',

    // Location
    hasPhysicalLocation: formData.hasPhysicalLocation || false,

    // Coach Profile
    yearsExperience: formData.yearsExperience || 0,
    certificationLevel: formData.certificationLevel || '',
    gradeLevelsTeaching: formData.gradeLevelsTeaching || [],
    specializations: formData.specializations || [],

    // Students
    estimatedStudentCount: formData.estimatedStudentCount || 0,
    studentGradeLevels: formData.studentGradeLevels || [],
    enrollmentCapacity: formData.enrollmentCapacity || 0,
    hasCurrentStudents: formData.hasCurrentStudents || false,
    currentStudentDetails: formData.currentStudentDetails || '',

    // Agreements
    platformAgreement: formData.platformAgreement || false,
  };

  if (onboardingLoading) {
    return (
      <div className="font-poppins flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins min-h-screen bg-white pb-[88px]">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-5">
        <Link href="/" aria-label="Homepage">
          <img
            src="https://d6mzuygjyhq8s.cloudfront.net/images/TSA%20Final%20Logos%20-%20CMYK-01.svg"
            alt="Texas Sports Academy"
            className="h-12 w-auto"
          />
        </Link>
        <Link href={buildInvitationURL('/onboarding')}>
          <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
            Exit
          </button>
        </Link>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-bold text-[#222222] md:text-5xl">
              Confirm Your Information
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-[#717171]">
              Please review all the information below to ensure everything is correct before
              finalizing your onboarding.
            </p>
          </div>

          <div className="space-y-8">
            {/* Personal Information */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">👤 Personal Information</h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2">
                    {displayData.firstName} {displayData.lastName}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2">{displayData.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="ml-2">{displayData.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* School Information */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">🏫 School Information</h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span className="font-medium text-gray-700">School Name:</span>
                  <span className="ml-2">{displayData.schoolName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">School Type:</span>
                  <span className="ml-2">{formatSchoolType(displayData.schoolType)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sport:</span>
                  <span className="ml-2">{displayData.sport}</span>
                </div>
                {displayData.footballType && (
                  <div>
                    <span className="font-medium text-gray-700">Football Type:</span>
                    <span className="ml-2">{displayData.footballType}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Academic Year:</span>
                  <span className="ml-2">{displayData.academicYear}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Grade Levels Served:</span>
                  <span className="ml-2">{formatGradeLevels(displayData.gradeLevelsServed)}</span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">
                📍 School Address & Location
              </h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span className="font-medium text-gray-700">Physical Location:</span>
                  <span className="ml-2">
                    {displayData.hasPhysicalLocation
                      ? 'Yes, has a physical location'
                      : 'No, operates without a fixed location'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Street Address:</span>
                  <span className="ml-2">{displayData.schoolStreet || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">City:</span>
                  <span className="ml-2">{displayData.schoolCity || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">State:</span>
                  <span className="ml-2">{displayData.schoolState || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ZIP Code:</span>
                  <span className="ml-2">{displayData.schoolZip || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">School Phone:</span>
                  <span className="ml-2">{displayData.schoolPhone || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Coach Profile */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">🎯 Coach Profile</h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span className="font-medium text-gray-700">Role:</span>
                  <span className="ml-2">{formatRoleType(displayData.roleType)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Years Experience:</span>
                  <span className="ml-2">{displayData.yearsExperience} years</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Certification Level:</span>
                  <span className="ml-2">{displayData.certificationLevel}</span>
                </div>
                {displayData.gradeLevelsTeaching.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">Teaching Grade Levels:</span>
                    <span className="ml-2">
                      {formatGradeLevels(displayData.gradeLevelsTeaching)}
                    </span>
                  </div>
                )}
                {displayData.specializations.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">Specializations:</span>
                    <span className="ml-2">{displayData.specializations.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Student Information */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">👨‍🎓 Student Information</h3>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span className="font-medium text-gray-700">Has Current Students:</span>
                  <span className="ml-2">
                    {displayData.hasCurrentStudents
                      ? 'Yes, currently have students'
                      : 'No, starting fresh'}
                  </span>
                </div>
                {displayData.hasCurrentStudents && (
                  <>
                    <div>
                      <span className="font-medium text-gray-700">Estimated Count:</span>
                      <span className="ml-2">{displayData.estimatedStudentCount}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Enrollment Capacity:</span>
                      <span className="ml-2">{displayData.enrollmentCapacity}</span>
                    </div>
                    {displayData.studentGradeLevels.length > 0 && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Student Grade Levels:</span>
                        <span className="ml-2">
                          {formatGradeLevels(displayData.studentGradeLevels)}
                        </span>
                      </div>
                    )}
                    {displayData.currentStudentDetails && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Student Details:</span>
                        <p className="ml-2 whitespace-pre-wrap text-gray-600">
                          {displayData.currentStudentDetails}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Agreements */}
            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">
                ✅ Agreements & Compliance
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Platform Agreement:</span>
                  <span
                    className={`ml-2 ${displayData.platformAgreement ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {displayData.platformAgreement ? 'Accepted' : 'Not Accepted'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Notice */}
          <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-lg text-blue-600">ℹ️</span>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="mb-2 text-lg font-semibold text-blue-900">Ready to Submit?</h4>
                <p className="text-sm text-blue-800">
                  Please review all information above carefully. Once you confirm, your onboarding
                  will be submitted and you&apos;ll receive access to the Texas Sports Academy
                  platform. You can always update your information later in your profile settings.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Progress Footer */}
      <ProgressFooter
        progressPercent={getProgressPercentage()}
        showBackButton={true}
        backButtonHref={buildInvitationURL('/onboarding/agreements')}
        nextButtonText="Complete Onboarding"
        buttonAction={handleConfirm}
        nextButtonClassName="bg-gradient-to-r from-[#004aad] to-[#0066ff] hover:from-[#003a8c] hover:to-[#0052cc] text-white"
      />
    </div>
  );
}
