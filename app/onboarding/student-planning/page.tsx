'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';
import { getNextAcademicYear } from '@/lib/utils/academic-year';
import { Link } from '@/components/link';
import type { OnboardingFormData } from '@/lib/types/onboarding';
import { validateStudentPlanning } from '@/lib/utils/onboarding-data';

export default function StudentPlanning() {
  const router = useRouter();

  // Use the onboarding state hook for hybrid local+server persistence
  const {
    formData,
    invitationData,
    isLoading: onboardingLoading,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    errors,
    updateField,
    updateMultipleFields,
    validateStep,
    markStepComplete,
    isFieldPreFilled,
    getProgressPercentage,
  } = useOnboardingState({
    currentStep: ONBOARDING_STEPS.STUDENT_PLANNING,
    requiredFields: ['estimatedStudentCount'],
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize form data with defaults
  useEffect(() => {
    if (!onboardingLoading) {
      const updates: any = {};

      // Always default enrollment capacity to 100
      if (!formData.enrollmentCapacity) {
        updates.enrollmentCapacity = 100;
      }

      // Set the academic year to the next academic year
      if (!formData.academicYear) {
        updates.academicYear = getNextAcademicYear();
      }

      if (Object.keys(updates).length > 0) {
        updateMultipleFields(updates);
      }
    }
  }, [formData.enrollmentCapacity, formData.academicYear, onboardingLoading, updateMultipleFields]);

  const studentCountRanges = [
    { id: '0', name: '0 students', description: 'Starting fresh' },
    { id: '1-5', name: '1-5 students', description: 'Small group' },
    { id: '6-15', name: '6-15 students', description: 'Medium group' },
    { id: '16-30', name: '16-30 students', description: 'Large group' },
    { id: '31-50', name: '31-50 students', description: 'Very large group' },
    { id: '50+', name: '50+ students', description: 'Multiple classes' },
  ];

  const handleInputChange = (field: string, value: string | boolean | number) => {
    updateField(field, value);
    setShowError(false);
    setErrorMessage('');
  };

  const handleContinue = async () => {
    // Use standardized validation
    const validationResult = validateStudentPlanning(formData as Partial<OnboardingFormData>);

    if (!validationResult.isValid) {
      setShowError(true);
      setErrorMessage(validationResult.errors.join(', '));
      return;
    }

    // Mark step as complete and save progress (hybrid: local + server)
    const success = await markStepComplete();

    if (success) {
      router.push(buildInvitationURL('/onboarding/agreements'));
    } else {
      setErrorMessage('Failed to save progress. Please try again.');
      setShowError(true);
    }
  };

  return (
    <div className="font-poppins flex min-h-screen flex-col bg-white pb-[132px]">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between px-10 py-5">
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
      <main className="flex flex-grow items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <h1 className="mb-8 text-center text-4xl font-bold text-[#222222] md:text-5xl">
            Student Planning
          </h1>

          <p className="mb-12 text-center text-xl text-[#717171]">
            How many students do you expect to have for the fall semester of{' '}
            {formData.academicYear || getNextAcademicYear()}?
          </p>

          <div className="space-y-8">
            {/* Student Count Selection */}
            <div>
              <h3 className="mb-6 text-center text-2xl font-semibold text-[#222222]">
                Expected Student Count
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {studentCountRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => handleInputChange('estimatedStudentCount', range.id)}
                    className={`rounded-xl border-2 p-6 text-left transition-all ${
                      formData.estimatedStudentCount === range.id
                        ? 'border-[#174fa2] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="text-lg font-semibold text-[#222222]">{range.name}</h4>
                    <p className="mt-1 text-sm text-[#717171]">{range.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">
                Additional Details <span className="text-lg text-gray-500">(Optional)</span>
              </h3>
              <textarea
                value={formData.currentStudentDetails || ''}
                onChange={e => handleInputChange('currentStudentDetails', e.target.value)}
                className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Tell us about your students, their interests, grade levels, or any special considerations..."
              />
            </div>
          </div>

          {/* Error message */}
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4"
            >
              <p className="text-sm text-red-600">{errorMessage}</p>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Progress Footer */}
      <ProgressFooter
        progressPercent={getProgressPercentage()}
        showBackButton={true}
        backButtonHref={buildInvitationURL('/onboarding/school-focus')}
        nextButtonText="Continue"
        buttonAction={handleContinue}
        nextButtonClassName="bg-gradient-to-r from-[#004aad] to-[#0066ff] hover:from-[#003a8c] hover:to-[#0052cc] text-white"
      />
    </div>
  );
}
