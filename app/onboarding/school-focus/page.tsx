'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/components/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { ErrorMessage } from '@/components/error-message';
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';
import type { OnboardingFormData } from '@/lib/types/onboarding';
import { validateSchoolFocus } from '@/lib/utils/onboarding-data';

export default function SchoolFocus() {
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
    currentStep: ONBOARDING_STEPS.SCHOOL_FOCUS,
    requiredFields: ['sport'],
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtherSport, setIsOtherSport] = useState(false);

  // Initialize form data with invitation pre-fills and auto-set school categories
  useEffect(() => {
    if (!onboardingLoading) {
      // Pre-fill with invitation data if available
      const updates: any = {};

      if (invitationData?.sport && !formData.sport) {
        updates.sport = invitationData.sport;
      }

      // Always ensure both school categories are selected
      if (!formData.schoolCategories || formData.schoolCategories.length === 0) {
        updates.schoolCategories = ['academic_focus', 'athletic_focus'];
      }

      if (Object.keys(updates).length > 0) {
        updateMultipleFields(updates);
      }

      // Check if current sport is a custom one (not in predefined list)
      const predefinedSports = ['basketball', 'football', 'soccer', 'baseball', 'tennis', 'track'];
      if (formData.sport && !predefinedSports.includes(formData.sport)) {
        setIsOtherSport(true);
      }
    }
  }, [
    invitationData,
    onboardingLoading,
    formData.sport,
    formData.schoolCategories,
    updateMultipleFields,
  ]);

  const handleInputChange = (field: string, value: string | string[]) => {
    updateField(field, value);
    setShowError(false);
    setErrorMessage('');
  };

  const handleSportChange = (sportId: string) => {
    if (sportId === 'other') {
      // Switch to other sport mode - clear sport field for custom input
      setIsOtherSport(true);
      updateMultipleFields({
        sport: '',
        footballType: '',
      });
    } else {
      // Switch to predefined sport
      setIsOtherSport(false);
      updateMultipleFields({
        sport: sportId,
        footballType: sportId !== 'football' ? '' : formData.footballType,
      });
    }
    setShowError(false);
    setErrorMessage('');
  };

  const handleFocusToggle = (focus: string) => {
    const updated = (formData.programFocus || []).includes(focus)
      ? (formData.programFocus || []).filter((f: string) => f !== focus)
      : [...(formData.programFocus || []), focus];

    handleInputChange('programFocus', updated);
  };

  const handleContinue = async () => {
    // Use standardized validation
    const validationResult = validateSchoolFocus(formData as Partial<OnboardingFormData>);

    if (!validationResult.isValid) {
      setShowError(true);
      setErrorMessage(validationResult.errors.join(', '));
      return;
    }

    // Mark step as complete and save progress (hybrid: local + server)
    const success = await markStepComplete();

    if (success) {
      router.push(buildInvitationURL('/onboarding/student-planning'));
    } else {
      setErrorMessage('Failed to save progress. Please try again.');
      setShowError(true);
    }
  };

  const sports = [
    { id: 'basketball', name: 'Basketball', icon: '🏀', bgColor: 'bg-orange-100' },
    { id: 'football', name: 'Football', icon: '🏈', bgColor: 'bg-blue-100' },
    { id: 'soccer', name: 'Soccer', icon: '⚽', bgColor: 'bg-green-100' },
    { id: 'baseball', name: 'Baseball', icon: '⚾', bgColor: 'bg-red-100' },
    { id: 'tennis', name: 'Tennis', icon: '🎾', bgColor: 'bg-yellow-100' },
    { id: 'track', name: 'Track & Field', icon: '🏃', bgColor: 'bg-purple-100' },
    { id: 'other', name: 'Other Sport', icon: '🏆', bgColor: 'bg-gray-100' },
  ];

  const footballTypes = [
    { id: '6-man', name: '6-man' },
    { id: '7-man', name: '7-man' },
    { id: '8-man', name: '8-man' },
    { id: '11-man', name: '11-man' },
  ];

  const programFoci = [
    'Character Development',
    'Leadership Training',
    'Academic Tutoring',
    'College Recruiting',
    'Professional Athletics Path',
    'Life Skills Training',
    'Community Service',
    'Entrepreneurship',
  ];

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
          className="w-full max-w-6xl"
        >
          <h1 className="mb-8 text-center text-4xl font-bold text-[#222222] md:text-5xl">
            School Focus & Programs
          </h1>

          <p className="mb-12 text-center text-xl text-[#717171]">
            Help us understand your school&apos;s primary focus and program offerings.
          </p>

          <div className="space-y-12">
            {/* Primary Sport Selection */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#222222]">Primary Sport</h2>
              {invitationData?.sport && (
                <p className="mb-4 text-sm text-blue-600">
                  Pre-filled from invitation: {invitationData.sport}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                {sports.map(sport => (
                  <motion.button
                    key={sport.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSportChange(sport.id)}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all ${
                      (sport.id === 'other' && isOtherSport) || formData.sport === sport.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={isFieldPreFilled('sport') && invitationData?.sport === sport.id}
                  >
                    <div className={`mb-2 text-3xl ${sport.bgColor} rounded-full p-2`}>
                      {sport.icon}
                    </div>
                    <span className="text-center text-sm font-medium text-[#222222]">
                      {sport.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Other Sport Name Input */}
            {isOtherSport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="mb-6 text-2xl font-semibold text-[#222222]">Sport Name</h2>
                <div className="max-w-md">
                  <input
                    type="text"
                    value={formData.sport}
                    onChange={e => handleInputChange('sport', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left text-base transition-colors focus:border-[#174fa2] focus:ring-2 focus:ring-[#174fa2]"
                    placeholder="Enter sport name (e.g., Rugby, Gymnastics, etc.)"
                  />
                </div>
              </motion.div>
            )}

            {/* Football Type Selection */}
            {formData.sport === 'football' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="mb-6 text-2xl font-semibold text-[#222222]">Football Type</h2>
                <div className="flex flex-wrap justify-start gap-4">
                  {footballTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('footballType', type.id)}
                      className={`rounded-lg border-2 px-6 py-3 font-medium transition-all ${
                        formData.footballType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Program Focus */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#222222]">
                Additional Program Focus <span className="text-lg text-gray-500">(Optional)</span>
              </h2>
              <p className="mb-4 text-gray-600">
                Select any additional areas your program will emphasize.
              </p>
              <div className="flex flex-wrap gap-3">
                {programFoci.map(focus => (
                  <button
                    key={focus}
                    onClick={() => handleFocusToggle(focus)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                      (formData.programFocus || []).includes(focus)
                        ? 'border-[#174fa2] bg-blue-50 text-[#174fa2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {focus}
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
        nextButtonText="Continue"
        buttonAction={handleContinue}
        showBackButton={true}
        backButtonHref={buildInvitationURL('/onboarding/school-setup')}
        nextButtonClassName="bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] hover:from-[#2563EB] hover:to-[#0EA5E9] text-white"
      />
    </div>
  );
}
