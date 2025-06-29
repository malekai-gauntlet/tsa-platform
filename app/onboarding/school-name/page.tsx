'use client';

import React, { Suspense } from 'react';
import { Link } from '@/components/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { ErrorMessage } from '@/components/error-message';
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';

function SchoolNameContent() {
  const router = useRouter();

  const {
    formData,
    invitationData,
    isLoading,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    errors,
    hasErrors,
    updateField,
    validateStep,
    markStepComplete,
    isFieldPreFilled,
    getProgressPercentage,
  } = useOnboardingState({
    currentStep: ONBOARDING_STEPS.SCHOOL_SETUP,
    requiredFields: ['nameOfInstitution'], // Just require school name fields
  });

  const handleContinue = async () => {
    if (validateStep()) {
      const success = await markStepComplete();
      if (success) {
        router.push(buildInvitationURL('/onboarding/role-experience'));
      }
    }
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Never saved';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffSeconds < 30) return 'Just now';
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return date.toLocaleTimeString();
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  const raceOptions = [
    { value: 'american-indian-alaska-native', label: 'American Indian or Alaska Native' },
    { value: 'asian', label: 'Asian' },
    { value: 'black-african-american', label: 'Black or African American' },
    {
      value: 'native-hawaiian-pacific-islander',
      label: 'Native Hawaiian or Other Pacific Islander',
    },
    { value: 'white', label: 'White' },
    { value: 'two-or-more-races', label: 'Two or More Races' },
  ];

  if (isLoading) {
    return (
      <div className="font-poppins flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#174fa2]"></div>
          <p className="text-[#717171]">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins min-h-screen bg-white pb-[132px]">
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
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-[#222222] md:text-5xl">School Name</h1>
            <p className="text-lg text-[#717171]">
              {invitationData?.schoolName
                ? "We've pre-filled your school name from your invitation. Please verify it."
                : 'Enter the name of your school or academy.'}
            </p>
            {invitationData && (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  <strong>Welcome, {invitationData.firstName}!</strong> Some fields have been
                  pre-filled from your invitation.
                </p>
              </div>
            )}

            {/* Save Status Indicator */}
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
              {isSaving && (
                <div className="flex items-center text-blue-600">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  <span>Saving...</span>
                </div>
              )}

              {!isSaving && hasUnsavedChanges && (
                <div className="flex items-center text-amber-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Unsaved changes</span>
                </div>
              )}

              {!isSaving && !hasUnsavedChanges && lastSaved && (
                <div className="flex items-center text-green-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Saved {formatLastSaved(lastSaved)}</span>
                </div>
              )}

              {!lastSaved && !isSaving && (
                <div className="flex items-center text-gray-500">
                  <div className="mr-2 h-2 w-2 rounded-full bg-gray-400"></div>
                  <span>Auto-save enabled</span>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto max-w-2xl space-y-6">
            {/* School Name */}
            <div>
              <label htmlFor="schoolName" className="mb-2 block text-lg font-medium text-gray-700">
                School Name *
                {isFieldPreFilled('nameOfInstitution') && (
                  <span className="ml-2 rounded bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    Pre-filled
                  </span>
                )}
              </label>
              <input
                type="text"
                id="schoolName"
                value={formData.nameOfInstitution || ''}
                onChange={e => updateField('nameOfInstitution', e.target.value)}
                disabled={isFieldPreFilled('nameOfInstitution')}
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-[#004aad] focus:ring-2 focus:ring-[#004aad] ${
                  isFieldPreFilled('nameOfInstitution') ? 'bg-gray-50 text-gray-600' : ''
                }`}
                placeholder="Enter your school name"
              />
              {errors.nameOfInstitution && (
                <ErrorMessage message={errors.nameOfInstitution} show={true} />
              )}
            </div>

            {/* School Short Name (Optional) */}
            <div>
              <label htmlFor="shortName" className="mb-2 block text-lg font-medium text-gray-700">
                School Short Name <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="text"
                id="shortName"
                value={formData.shortNameOfInstitution || ''}
                onChange={e => updateField('shortNameOfInstitution', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-[#004aad] focus:ring-2 focus:ring-[#004aad]"
                placeholder="Abbreviated or short version of your school name"
              />
              <p className="mt-1 text-xs text-gray-500">Used for displays where space is limited</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Progress Footer */}
      <ProgressFooter
        progressPercent={getProgressPercentage()}
        nextButtonText={isSaving ? 'Saving...' : 'Continue'}
        buttonAction={handleContinue}
        showBackButton={true}
        backButtonHref={buildInvitationURL('/onboarding/personal-info')}
        nextButtonClassName="bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] hover:from-[#2563EB] hover:to-[#0EA5E9] text-white disabled:opacity-50"
        disabled={isSaving || hasErrors}
      />
    </div>
  );
}

export default function SchoolNamePage() {
  return (
    <Suspense
      fallback={
        <div className="font-poppins flex min-h-screen items-center justify-center bg-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#174fa2]"></div>
            <p className="text-[#717171]">Loading...</p>
          </div>
        </div>
      }
    >
      <SchoolNameContent />
    </Suspense>
  );
}
