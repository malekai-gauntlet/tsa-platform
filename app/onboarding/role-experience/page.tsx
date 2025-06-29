'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';
import { Link } from '@/components/link';
import type { OnboardingFormData } from '@/lib/types/onboarding';
import { validateRoleExperience } from '@/lib/utils/onboarding-data';

export default function RoleExperience() {
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
    currentStep: ONBOARDING_STEPS.ROLE_EXPERIENCE,
    requiredFields: ['roleType', 'yearsOfPriorProfessionalExperience'],
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize form data and ensure defaults
  useEffect(() => {
    if (!onboardingLoading) {
      const updates: any = {};

      // Always ensure roleType is 'COACH' (using Ed-Fi standard)
      if (!formData.roleType) {
        updates.roleType = 'COACH';
      }

      // Always ensure Technology Education is included
      const specializations = formData.specialties || [];
      if (!specializations.includes('Technology Education')) {
        updates.specialties = [...specializations, 'Technology Education'];
      }

      // Auto-deduce certification level from yearsOfPriorProfessionalExperience
      if (
        formData.yearsOfPriorProfessionalExperience !== undefined &&
        String(formData.yearsOfPriorProfessionalExperience) !== formData.certificationLevel
      ) {
        updates.certificationLevel = autoDeduceCertificationLevel(
          String(formData.yearsOfPriorProfessionalExperience)
        );
      }

      if (Object.keys(updates).length > 0) {
        updateMultipleFields(updates);
      }
    }
  }, [
    formData.roleType,
    formData.yearsOfPriorProfessionalExperience,
    formData.specialties,
    formData.certificationLevel,
    onboardingLoading,
    updateMultipleFields,
  ]);

  const autoDeduceCertificationLevel = (yearsExperience: string): string => {
    const years = parseInt(yearsExperience) || 0;
    if (years === 0) return 'Beginner';
    if (years <= 2) return 'Novice';
    if (years <= 5) return 'Intermediate';
    if (years <= 10) return 'Advanced';
    return 'Expert';
  };

  const sportSpecializations = [
    'Basketball',
    'Football',
    'Soccer',
    'Baseball',
    'Track & Field',
    'Tennis',
    'Volleyball',
    'Swimming',
    'Wrestling',
    'Cross Country',
    'Golf',
    'Softball',
    'Lacrosse',
    'Hockey',
    'Martial Arts',
  ];

  const handleSpecializationToggle = (specialization: string) => {
    const current = formData.specialties || [];

    // Don't allow removing Technology Education
    if (specialization === 'Technology Education' && current.includes(specialization)) {
      return;
    }

    const updated = current.includes(specialization)
      ? current.filter((s: string) => s !== specialization)
      : [...current, specialization];

    updateField('specialties', updated);
  };

  const handleYearsExperienceChange = (value: string) => {
    // Convert string to number for Ed-Fi compliance
    const numericValue =
      value === '0'
        ? 0
        : value === '1'
          ? 1
          : value === '2'
            ? 2
            : value === '3'
              ? 3
              : value === '4'
                ? 4
                : value === '5'
                  ? 5
                  : value === '6-10'
                    ? 8 // Use middle value
                    : value === '11-15'
                      ? 13
                      : value === '16-20'
                        ? 18
                        : value === '20+'
                          ? 25
                          : 0;

    updateMultipleFields({
      yearsOfPriorProfessionalExperience: numericValue,
      certificationLevel: autoDeduceCertificationLevel(value),
    });
    setShowError(false);
    setErrorMessage('');
  };

  const handleContinue = async () => {
    // Use standardized validation
    const validationResult = validateRoleExperience(formData as Partial<OnboardingFormData>);

    if (!validationResult.isValid) {
      setShowError(true);
      setErrorMessage(validationResult.errors.join(', '));
      return;
    }

    // Mark step as complete and save progress (hybrid: local + server)
    const success = await markStepComplete();

    if (success) {
      router.push(buildInvitationURL('/onboarding/school-setup'));
    } else {
      setErrorMessage('Failed to save progress. Please try again.');
      setShowError(true);
    }
  };

  return (
    <div className="font-poppins flex min-h-screen flex-col bg-white pb-[88px]">
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
            Your Coaching Experience
          </h1>

          <p className="mb-12 text-center text-xl text-[#717171]">
            Help us understand your coaching background so we can customize your experience.
          </p>

          <div className="space-y-8">
            {/* Years of Experience */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">
                Years of Coaching Experience
              </h3>
              <div className="max-w-md">
                <select
                  value={formData.yearsOfPriorProfessionalExperience || ''}
                  onChange={e => handleYearsExperienceChange(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select your coaching experience</option>
                  <option value="0">New to coaching</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="16-20">16-20 years</option>
                  <option value="20+">20+ years</option>
                </select>
              </div>
              {formData.certificationLevel && (
                <p className="mt-2 text-sm text-blue-600">
                  Certification level:{' '}
                  <span className="font-medium capitalize">{formData.certificationLevel}</span>
                </p>
              )}
            </div>

            {/* Sports Specializations */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">
                Sports Expertise <span className="text-lg text-gray-500">(Optional)</span>
              </h3>
              <p className="mb-6 text-lg text-[#717171]">
                Select any sports you have experience coaching
              </p>

              <div className="flex flex-wrap gap-2">
                {sportSpecializations.map(sport => (
                  <button
                    key={sport}
                    onClick={() => handleSpecializationToggle(sport)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                      (formData.specialties || []).includes(sport)
                        ? 'border-[#174fa2] bg-blue-50 text-[#174fa2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
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
        backButtonHref={buildInvitationURL('/onboarding/personal-info')}
        nextButtonText="Continue"
        buttonAction={handleContinue}
        nextButtonClassName="bg-gradient-to-r from-[#004aad] to-[#0066ff] hover:from-[#003a8c] hover:to-[#0052cc] text-white"
      />
    </div>
  );
}
