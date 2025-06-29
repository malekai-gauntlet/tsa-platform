'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { AddressAutocomplete } from '@/components/address-autocomplete';
import {
  getStoredInvitationData,
  isInvitationOnboarding,
  buildInvitationURL,
  ONBOARDING_STEPS,
} from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';
import { Link } from '@/components/link';
import type { OnboardingFormData } from '@/lib/types/onboarding';
import { validateSchoolSetup } from '@/lib/utils/onboarding-data';

export default function SchoolSetup() {
  const router = useRouter();

  // Use the onboarding state hook for consistent data management
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
    currentStep: ONBOARDING_STEPS.SCHOOL_SETUP,
    requiredFields: ['nameOfInstitution', 'schoolType', 'gradeLevels'],
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize form data with invitation pre-fills
  useEffect(() => {
    if (invitationData && !onboardingLoading) {
      // Pre-fill with invitation data if available
      const updates: any = {};

      // Always ensure roleType is set to 'COACH' (Ed-Fi standard)
      if (!formData.roleType) {
        updates.roleType = 'COACH';
      }

      if (invitationData.schoolName && !formData.nameOfInstitution) {
        updates.nameOfInstitution = invitationData.schoolName;
      }

      if (invitationData.schoolType && !formData.schoolType) {
        updates.schoolType = invitationData.schoolType;
      }

      if (Object.keys(updates).length > 0) {
        updateMultipleFields(updates);
      }
    }
  }, [
    invitationData,
    onboardingLoading,
    formData.nameOfInstitution,
    formData.schoolType,
    formData.roleType,
    updateMultipleFields,
  ]);

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    updateField(field, value);
    setShowError(false);
    setErrorMessage('');
  };

  const handleAddressSelect = (addressData: any) => {
    updateMultipleFields({
      schoolStreet: addressData.street || '',
      schoolCity: addressData.city || '',
      schoolState: addressData.state || '',
      schoolZip: addressData.zip || '',
    });
  };

  const handleContinue = async () => {
    // Use standardized validation
    const validationResult = validateSchoolSetup(formData as Partial<OnboardingFormData>);

    if (!validationResult.isValid) {
      setErrorMessage(validationResult.errors.join(', '));
      setShowError(true);
      return;
    }

    // Mark step as complete and save progress
    const success = await markStepComplete();

    if (success) {
      router.push(buildInvitationURL('/onboarding/school-focus'));
    } else {
      setErrorMessage('Failed to save progress. Please try again.');
      setShowError(true);
    }
  };

  const schoolTypes = [
    {
      id: 'elementary',
      name: 'Elementary School',
      description: 'Grades K-5',
      grades: ['K', '1', '2', '3', '4', '5'],
    },
    { id: 'middle', name: 'Middle School', description: 'Grades 6-8', grades: ['6', '7', '8'] },
    {
      id: 'high',
      name: 'High School',
      description: 'Grades 9-12',
      grades: ['9', '10', '11', '12'],
    },
    {
      id: 'combined',
      name: 'Combined/Multi-level',
      description: 'Multiple grade ranges',
      grades: [],
    },
  ];

  const allGradeLevels = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const handleSchoolTypeChange = (schoolTypeId: string) => {
    const schoolType = schoolTypes.find(st => st.id === schoolTypeId);

    // For combined/multi-level, always clear existing grade levels to avoid conflicts
    const newGradeLevels =
      schoolTypeId === 'combined' ? [] : schoolType?.grades || formData.gradeLevels;

    updateMultipleFields({
      schoolType: schoolTypeId,
      gradeLevels: newGradeLevels,
    });
    setShowError(false);
  };

  const handleGradeLevelToggle = (grade: string) => {
    const currentGrades = formData.gradeLevels || [];
    const updatedGrades = currentGrades.includes(grade)
      ? currentGrades.filter((g: string) => g !== grade)
      : [...currentGrades, grade].sort((a, b) => {
          if (a === 'K') return -1;
          if (b === 'K') return 1;
          return parseInt(a) - parseInt(b);
        });

    updateMultipleFields({
      gradeLevels: updatedGrades,
    });
  };

  const formatPhoneInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
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
            School Information
          </h1>

          <p className="mb-12 text-center text-xl text-[#717171]">
            Tell us about the school you're planning to create. Don&apos;t worry - you can update
            this information later.
          </p>

          <div className="space-y-8">
            {/* Role Type - Locked Field */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">Role</h3>
              <div className="flex items-center space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-blue-900">Coach</p>
                  <p className="text-sm text-blue-600">Your role is set based on your invitation</p>
                </div>
              </div>
            </div>

            {/* School Name */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">School Name</h3>
              <input
                type="text"
                value={formData.nameOfInstitution}
                onChange={e => handleInputChange('nameOfInstitution', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-[#004aad] focus:ring-2 focus:ring-[#004aad]"
                placeholder="Enter your school name"
                readOnly={isFieldPreFilled('nameOfInstitution')}
              />
              {isFieldPreFilled('nameOfInstitution') && (
                <p className="mt-1 text-sm text-blue-600">Pre-filled from invitation</p>
              )}
            </div>

            {/* School Type Selection */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">School Type</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {schoolTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleSchoolTypeChange(type.id)}
                    className={`rounded-xl border-2 p-6 text-left transition-all ${
                      formData.schoolType === type.id
                        ? 'border-[#174fa2] bg-blue-50'
                        : 'cursor-pointer border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="text-lg font-semibold text-[#222222]">{type.name}</h4>
                    <p className="mt-1 text-sm text-[#717171]">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Levels */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">Grade Levels Served</h3>
              <div className="flex flex-wrap gap-3">
                {allGradeLevels.map(grade => (
                  <button
                    key={grade}
                    onClick={() => handleGradeLevelToggle(grade)}
                    className={`rounded-lg border-2 px-4 py-2 transition-all ${
                      (formData.gradeLevels || []).includes(grade)
                        ? 'border-[#174fa2] bg-blue-50 text-[#174fa2]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {grade === 'K' ? 'Kindergarten' : `Grade ${grade}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Physical Location Option */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">School Location</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="has-location"
                    name="location-type"
                    checked={formData.hasPhysicalLocation}
                    onChange={e => handleInputChange('hasPhysicalLocation', e.target.checked)}
                    className="h-4 w-4 border-gray-300 text-[#174fa2] focus:ring-[#174fa2]"
                  />
                  <label htmlFor="has-location" className="text-base font-medium text-gray-700">
                    I have a physical school location
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="no-location"
                    name="location-type"
                    checked={!formData.hasPhysicalLocation}
                    onChange={e => handleInputChange('hasPhysicalLocation', !e.target.checked)}
                    className="h-4 w-4 border-gray-300 text-[#174fa2] focus:ring-[#174fa2]"
                  />
                  <label htmlFor="no-location" className="text-base font-medium text-gray-700">
                    I don&apos;t have a physical location yet
                  </label>
                </div>
              </div>
            </div>

            {/* School Address - Optional */}
            {formData.hasPhysicalLocation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-4 text-2xl font-semibold text-[#222222]">
                  School Address <span className="text-lg text-gray-500">(Optional)</span>
                </h3>
                <p className="mb-4 text-gray-600">
                  You can add this information later if you haven&apos;t finalized your location.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <AddressAutocomplete
                      label="Street Address"
                      value={formData.schoolStreet}
                      onChange={value => handleInputChange('schoolStreet', value)}
                      onAddressSelect={handleAddressSelect}
                      placeholder="Start typing your school address..."
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={formData.schoolCity}
                      onChange={e => handleInputChange('schoolCity', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Dallas"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">State</label>
                    <select
                      value={formData.schoolState}
                      onChange={e => handleInputChange('schoolState', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.schoolZip}
                      onChange={e => handleInputChange('schoolZip', e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="75201"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      School Phone <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.schoolPhone}
                      onChange={e =>
                        handleInputChange('schoolPhone', formatPhoneInput(e.target.value))
                      }
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="(555) 123-4567"
                      maxLength={14}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Website */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">
                Website <span className="text-lg text-gray-500">(Optional)</span>
              </h3>
              <input
                type="url"
                value={formData.website}
                onChange={e => handleInputChange('website', e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-[#004aad] focus:ring-2 focus:ring-[#004aad]"
                placeholder="https://yourschool.com"
              />
            </div>

            {/* Academic Year */}
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#222222]">Academic Year</h3>
              <div className="max-w-md">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Current Academic Year
                </label>
                <select
                  value={formData.academicYear}
                  onChange={e => handleInputChange('academicYear', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
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
