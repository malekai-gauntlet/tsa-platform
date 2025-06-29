'use client';

import React, { useState, useCallback, useRef, Suspense } from 'react';
import { Link } from '@/components/link';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useOnboardingState } from '@/lib/hooks/onboarding';
import { validateStandardizedOnboardingData } from '@/lib/utils/onboarding-validation';
import { transformOnboardingData } from '@/lib/utils/onboarding-data';
import type { OnboardingFormData } from '@/lib/types/onboarding';
import {
  isInvitationOnboarding,
  getCachedInvitationToken,
  clearInvitationData,
} from '@/lib/api/invitation-api';

function CompleteContent() {
  const searchParams = useSearchParams();
  const bypassFlag = searchParams.get('bypass') === 'true';
  const isDev =
    process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' && window.location.hostname === 'localhost');
  const allowBypass = isDev || bypassFlag;

  // Use the standardized onboarding state hook
  const {
    formData,
    invitationData,
    isLoading: onboardingLoading,
  } = useOnboardingState({
    currentStep: 'complete',
    requiredFields: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [isInvitationFlow, setIsInvitationFlow] = useState(false);
  const [showMissingFieldsForm, setShowMissingFieldsForm] = useState(false);
  const [missingFieldsData, setMissingFieldsData] = useState<any>({});
  const [missingFieldsList, setMissingFieldsList] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Use ref to prevent infinite loops
  const hasSubmittedRef = useRef(false);

  /**
   * Collect clean, standardized onboarding data
   * This replaces the complex 400+ line collectOnboardingData function
   */
  const collectStandardizedData = useCallback((): OnboardingFormData => {
    console.log('📊 Collecting standardized onboarding data...');
    console.log('FormData keys:', Object.keys(formData));
    console.log(
      'FormData with values:',
      Object.fromEntries(
        Object.entries(formData).filter(([k, v]) => v !== '' && v !== undefined && v !== null)
      )
    );

    // The beauty of standardized architecture: we can use the data directly!
    const standardizedData: OnboardingFormData = {
      // Personal Information (standardized field names)
      email: formData.email || invitationData?.email || '',
      firstName: formData.firstName || invitationData?.firstName || '',
      lastName: formData.lastName || invitationData?.lastName || '',
      middleName: formData.middleName || '',
      phone: formData.phone || invitationData?.phone || '',
      birthDate: formData.birthDate || '',
      birthCity: formData.birthCity || '',
      birthStateAbbreviation: formData.birthStateAbbreviation || '',
      sex: formData.sex || '',
      hispanicLatinoEthnicity: formData.hispanicLatinoEthnicity || false,
      races: formData.races || [],
      generationCodeSuffix: formData.generationCodeSuffix || '',

      // Role and Experience (Ed-Fi compliant)
      roleType: (formData.roleType as 'COACH' | 'PARENT' | 'STUDENT') || 'COACH',
      experience: formData.experience || '0',
      certificationLevel: formData.certificationLevel || '',
      specialties: formData.specialties || [],
      bio: formData.bio || '',
      certifications: formData.certifications || [],
      yearsOfPriorProfessionalExperience: formData.yearsOfPriorProfessionalExperience || 0,

      // School Information (direct EducationOrganization mapping)
      nameOfInstitution: formData.nameOfInstitution || invitationData?.schoolName || '',
      shortNameOfInstitution: formData.shortNameOfInstitution || '',
      schoolType: formData.schoolType || invitationData?.schoolType || '',
      gradeLevels: formData.gradeLevels || [],
      hasPhysicalLocation: formData.hasPhysicalLocation || false,
      website: formData.website || '',
      academicYear: formData.academicYear || '2024-2025',

      // Address (flattened for JSON storage)
      schoolStreet: formData.schoolStreet || '',
      schoolCity: formData.schoolCity || invitationData?.city || '',
      schoolState: formData.schoolState || invitationData?.state || '',
      schoolZip: formData.schoolZip || '',
      schoolPhone: formData.schoolPhone || '',

      // School Focus
      sport: formData.sport || invitationData?.sport || '',
      footballType: formData.footballType || '',
      schoolCategories: formData.schoolCategories || [],
      programFocus: formData.programFocus || [],

      // Student Planning
      estimatedStudentCount: formData.estimatedStudentCount || 0,
      enrollmentCapacity: formData.enrollmentCapacity || 100,
      hasCurrentStudents: formData.hasCurrentStudents || false,
      currentStudentDetails: formData.currentStudentDetails || '',
      studentGradeLevels: formData.studentGradeLevels || [],

      // Agreements
      platformAgreement: formData.platformAgreement || false,

      // System fields
      invitationBased: isInvitationOnboarding(),
      invitationToken: getCachedInvitationToken() || '',
      currentStep: 'complete',
      completedSteps: [
        'PERSONAL_INFO',
        'ROLE_EXPERIENCE',
        'SCHOOL_SETUP',
        'SCHOOL_FOCUS',
        'STUDENT_PLANNING',
        'AGREEMENTS',
      ],
    };

    console.log('✅ Standardized data collected:', {
      email: standardizedData.email,
      firstName: standardizedData.firstName,
      lastName: standardizedData.lastName,
      nameOfInstitution: standardizedData.nameOfInstitution,
      sport: standardizedData.sport,
      roleType: standardizedData.roleType,
    });

    return standardizedData;
  }, [formData, invitationData]);

  /**
   * Submit onboarding data using our clean transformation utilities
   * This replaces the complex 500+ line submitOnboardingData function
   */
  const submitOnboardingData = useCallback(async () => {
    // Prevent duplicate submissions
    if (hasSubmittedRef.current) {
      console.log('🚫 Already processed onboarding completion');
      return;
    }

    console.log('🚀 Starting simplified onboarding submission...');
    setError('');
    setIsSubmitting(true);
    hasSubmittedRef.current = true;

    try {
      const isInvitation = isInvitationOnboarding();
      setIsInvitationFlow(isInvitation);

      // Collect clean, standardized data
      const standardizedData = collectStandardizedData();

      // Validate using our standardized validation
      const validationResult = validateStandardizedOnboardingData(standardizedData);

      if (!validationResult.isValid) {
        // Handle missing fields gracefully
        const missingFields = validationResult.errors.map(error => error.field);
        console.log('❌ Validation failed, missing fields:', missingFields);

        setMissingFieldsList(missingFields);
        setMissingFieldsData({ ...standardizedData });
        setShowMissingFieldsForm(true);
        hasSubmittedRef.current = false; // Allow retry
        return;
      }

      console.log('✅ Validation passed, transforming data...');

      // Transform to Amplify models using our utility
      const amplifyData = transformOnboardingData(standardizedData);

      console.log('🚀 Submitting to Amplify:', {
        user: {
          email: amplifyData.user.email,
          firstName: amplifyData.user.firstName,
          lastName: amplifyData.user.lastName,
          role: amplifyData.user.role,
        },
        profile: {
          profileType: amplifyData.profile.profileType,
          onboardingComplete: amplifyData.profile.onboardingComplete,
        },
        school: amplifyData.educationOrganization
          ? {
              name: amplifyData.educationOrganization.nameOfInstitution,
              type: amplifyData.school?.schoolType,
            }
          : null,
      });

      // Submit using our API route
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(amplifyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Onboarding completed successfully:', result);

      // Store profile data for success display
      setProfileData({
        ...result,
        user: amplifyData.user,
        profile: amplifyData.profile,
        educationOrganization: amplifyData.educationOrganization,
        school: amplifyData.school,
        staff: amplifyData.staff,
      });

      setIsSuccess(true);

      // Clear data after successful completion
      setTimeout(() => {
        clearInvitationData();
      }, 100);
    } catch (error) {
      console.error('❌ Error submitting onboarding data:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      hasSubmittedRef.current = false; // Reset on error to allow retry
    } finally {
      setIsSubmitting(false);
    }
  }, [collectStandardizedData]);

  /**
   * Handle missing fields form submission
   */
  const completeMissingFieldsAndSubmit = async () => {
    const stillMissing = missingFieldsList.filter(
      field => !missingFieldsData[field] || missingFieldsData[field].toString().trim() === ''
    );

    if (stillMissing.length > 0) {
      setError(`Please fill in all required fields: ${stillMissing.join(', ')}`);
      return;
    }

    // Update localStorage with the new values (converted to correct field names)
    missingFieldsList.forEach(field => {
      const value = missingFieldsData[field];
      if (value) {
        localStorage.setItem(`onboarding_${field}`, value);
      }
    });

    // Hide the form and retry submission
    setShowMissingFieldsForm(false);
    setMissingFieldsList([]);
    setError('');

    // Reset submission flag and retry
    hasSubmittedRef.current = false;
    setTimeout(submitOnboardingData, 100);
  };

  const handleMissingFieldChange = (field: string, value: string) => {
    setMissingFieldsData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      birthDate: 'Birth Date',
      birthCity: 'Birth City',
      birthStateAbbreviation: 'Birth State',
      sex: 'Gender',
      nameOfInstitution: 'School Name',
      sport: 'Primary Sport',
      schoolType: 'School Type',
      platformAgreement: 'Platform Agreement',
    };
    return labels[field] || field;
  };

  // Initialize submission when data is ready
  const initializeSubmission = () => {
    const isInvitation = isInvitationOnboarding();
    const hasRequiredData = isInvitation ? invitationData !== null : true;

    if (
      !onboardingLoading &&
      !showMissingFieldsForm &&
      !hasSubmittedRef.current &&
      hasRequiredData &&
      !hasInitialized
    ) {
      console.log('🚀 Ready to submit - data loaded:', {
        onboardingLoading,
        showMissingFieldsForm,
        hasSubmitted: hasSubmittedRef.current,
        isInvitation,
        hasInvitationData: !!invitationData,
        hasRequiredData,
        hasInitialized,
      });
      setHasInitialized(true);
      submitOnboardingData();
    }
  };

  // Call initialization check
  if (!hasInitialized) {
    initializeSubmission();
  }

  // Loading state
  if (onboardingLoading || isSubmitting) {
    return (
      <div className="font-poppins flex min-h-screen items-center justify-center bg-gradient-to-br from-[#004aad] to-[#003a8c]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl px-8 text-center text-white"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="h-12 w-12 rounded-full border-4 border-white border-t-transparent"
            />
          </div>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            {isSubmitting ? 'Finalizing Your Profile...' : 'Loading Your Information...'}
          </h1>

          <p className="text-xl opacity-90">
            {isSubmitting
              ? 'Creating your coach profile and setting up your academy access.'
              : 'Please wait while we load your onboarding data.'}
          </p>
        </motion.div>
      </div>
    );
  }

  // Missing fields form
  if (showMissingFieldsForm && missingFieldsList.length > 0) {
    return (
      <div className="font-poppins min-h-screen bg-white">
        {/* Bypass Indicator */}
        {!isInvitationFlow && allowBypass && (
          <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-2">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 text-sm">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                  🚧 {bypassFlag ? 'BYPASS MODE' : 'DEV MODE'}
                </span>
                <span className="text-yellow-700">
                  Missing information collection - completing onboarding
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5">
          <Link href="/" aria-label="Homepage">
            <img
              src={process.env.NEXT_PUBLIC_TSA_LOGO_URL || '/logo.svg'}
              alt="Texas Sports Academy"
              className="h-12 w-auto"
            />
          </Link>
        </header>

        {/* Missing fields form */}
        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h1 className="mb-4 text-3xl font-bold text-[#222222] md:text-4xl">
                Complete Your Information
              </h1>
              <p className="mb-6 text-lg text-[#717171]">
                We need just a few more details to complete your onboarding.
              </p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-6">
              <h3 className="mb-6 text-xl font-semibold text-[#222222]">
                Missing Required Information
              </h3>

              <div className="space-y-4">
                {missingFieldsList.map(field => (
                  <div key={field}>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {getFieldLabel(field)} *
                    </label>
                    {field === 'sex' ? (
                      <select
                        value={missingFieldsData[field] || ''}
                        onChange={e => handleMissingFieldChange(field, e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : field === 'birthDate' ? (
                      <input
                        type="date"
                        value={missingFieldsData[field] || ''}
                        onChange={e => handleMissingFieldChange(field, e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        max={
                          new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                            .toISOString()
                            .split('T')[0]
                        }
                      />
                    ) : field === 'platformAgreement' ? (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={missingFieldsData[field] || false}
                          onChange={e =>
                            handleMissingFieldChange(field, e.target.checked.toString())
                          }
                          className="mr-2"
                        />
                        I agree to the platform terms
                      </label>
                    ) : (
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        value={missingFieldsData[field] || ''}
                        onChange={e => handleMissingFieldChange(field, e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Error message */}
              {error && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <button
                  onClick={completeMissingFieldsAndSubmit}
                  className="w-full rounded-lg bg-gradient-to-r from-[#004aad] to-[#0066ff] px-6 py-3 font-semibold text-white transition-all hover:from-[#003a8c] hover:to-[#0052cc]"
                >
                  Complete Onboarding
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="w-full rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="font-poppins min-h-screen bg-gradient-to-br from-red-600 to-red-800">
        <header className="flex items-center justify-between px-10 py-5">
          <Link href="/" aria-label="Homepage">
            <img
              src={process.env.NEXT_PUBLIC_TSA_LOGO_URL || '/logo.svg'}
              alt="Texas Sports Academy"
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
        </header>

        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white">
                <span className="text-6xl">⚠️</span>
              </div>
            </motion.div>

            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Oops! Something went wrong</h1>

            <div className="mb-8 rounded-lg bg-white/10 p-6">
              <p className="mb-4 text-lg">{error}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="mr-4 transform rounded-lg bg-white px-10 py-4 text-lg font-bold tracking-wide text-red-600 uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Try Again
              </button>

              <Link href="/onboarding">
                <button className="rounded-lg border-2 border-white bg-transparent px-10 py-4 text-lg font-bold tracking-wide text-white uppercase transition-all duration-300 hover:bg-white hover:text-red-600">
                  Go Back to Onboarding
                </button>
              </Link>
            </div>

            <p className="mt-6 text-sm opacity-80">
              If this problem persists, please contact us at{' '}
              <a href="mailto:team@texassportsacademy.com" className="underline">
                team@texassportsacademy.com
              </a>
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="font-poppins min-h-screen bg-gradient-to-br from-[#004aad] to-[#003a8c]">
        <header className="flex items-center justify-between px-10 py-5">
          <Link href="/" aria-label="Homepage">
            <img
              src={process.env.NEXT_PUBLIC_TSA_LOGO_URL || '/logo.svg'}
              alt="Texas Sports Academy"
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
        </header>

        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white">
                <span className="text-6xl">🎉</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-integral mb-6 text-5xl leading-[0.9] tracking-tight md:text-6xl"
            >
              {isInvitationFlow ? 'WELCOME TO THE TEAM!' : 'WELCOME!'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed opacity-90 md:text-2xl"
            >
              {isInvitationFlow
                ? "Thank you for accepting your invitation and completing your application. We're excited to have you join the team!"
                : "Thank you for completing your onboarding. We're excited to have you join the Texas Sports Academy family!"}
            </motion.p>

            {profileData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-8 rounded-lg bg-white/10 p-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-white">Your Profile Summary</h3>
                <div className="grid grid-cols-1 gap-4 text-left text-sm md:grid-cols-2">
                  <div>
                    <span className="font-medium text-blue-200">Name:</span>
                    <span className="ml-2 text-white">
                      {profileData.user?.firstName && profileData.user?.lastName
                        ? `${profileData.user.firstName} ${profileData.user.lastName}`
                        : 'Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-200">Email:</span>
                    <span className="ml-2 text-white">
                      {profileData.user?.email || 'Not provided'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-200">Role:</span>
                    <span className="ml-2 text-white">{profileData.user?.role || 'COACH'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-200">School:</span>
                    <span className="ml-2 text-white">
                      {profileData.educationOrganization?.nameOfInstitution || 'Not provided'}
                    </span>
                  </div>
                  {profileData.profile_id && (
                    <div>
                      <span className="font-medium text-blue-200">Profile ID:</span>
                      <span className="ml-2 font-mono text-xs text-white">
                        {profileData.profile_id}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed opacity-90"
            >
              Our team will review your information and be in touch within 24-48 hours with next
              steps. In the meantime, you can start exploring the platform and preparing for your
              students.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.0, duration: 0.5 }}
              className="space-y-4"
            >
              <Link href="/">
                <button className="transform rounded-lg bg-white px-10 py-4 text-lg font-bold tracking-wide text-[#004aad] uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  GET STARTED
                </button>
              </Link>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="mt-6 text-sm opacity-80"
                style={{ marginBottom: '88px' }}
              >
                Questions? Email us at{' '}
                <a href="mailto:team@texassportsacademy.com" className="underline">
                  team@texassportsacademy.com
                </a>
              </motion.p>
            </motion.div>
          </motion.div>
        </main>
      </div>
    );
  }

  return null;
}

export default function Complete() {
  return (
    <Suspense
      fallback={
        <div className="font-poppins flex min-h-screen items-center justify-center bg-gradient-to-br from-[#004aad] to-[#003a8c]">
          <div className="mx-auto max-w-2xl px-8 text-center text-white">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Loading...</h1>
            <p className="text-xl opacity-90">Please wait while we load your onboarding data.</p>
          </div>
        </div>
      }
    >
      <CompleteContent />
    </Suspense>
  );
}
