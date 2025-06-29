'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/api/invitation-api';
import { useOnboardingState } from '@/lib/hooks/onboarding';
import { Link } from '@/components/link';
import type { OnboardingFormData } from '@/lib/types/onboarding';
import { validatePersonalInfo } from '@/lib/utils/onboarding-data';

interface PersonalInfoClientProps {
  invite?: string;
  bypass?: string;
}

export function PersonalInfoClient({ invite, bypass }: PersonalInfoClientProps) {
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
    currentStep: ONBOARDING_STEPS.PERSONAL_INFO,
    requiredFields: [
      'firstName',
      'lastName',
      'email',
      'birthDate',
      'sex',
      'birthCity',
      'birthStateAbbreviation',
      'address',
    ],
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleContinue = async () => {
    // Use standardized validation instead of hook validation
    const validationResult = validatePersonalInfo(formData as Partial<OnboardingFormData>);
    const isValid = validationResult.isValid;

    if (!isValid) {
      setShowError(true);
      setErrorMessage(validationResult.errors.join(', '));
      return;
    }

    // Mark step as complete and save progress (hybrid: local + server)
    const success = await markStepComplete();

    if (success) {
      // Build next URL with proper params
      let nextUrl = '/onboarding/role-experience';
      const params = new URLSearchParams();

      if (invite) {
        params.set('invite', invite);
      }
      if (bypass) {
        params.set('bypass', bypass);
      }

      if (params.toString()) {
        nextUrl += `?${params.toString()}`;
      }

      router.push(nextUrl);
    } else {
      setErrorMessage('Failed to save progress. Please try again.');
      setShowError(true);
    }
  };

  // Show loading state
  if (onboardingLoading) {
    return (
      <div className="font-poppins flex min-h-screen flex-col bg-white">
        <main className="flex flex-grow items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#174fa2]"></div>
            <h1 className="mb-2 text-2xl font-semibold text-[#222222]">Loading...</h1>
            <p className="text-[#717171]">Preparing your onboarding experience.</p>
          </div>
        </main>
      </div>
    );
  }

  const buildBackUrl = () => {
    let backUrl = '/onboarding';
    const params = new URLSearchParams();

    if (invite) {
      params.set('invite', invite);
    }
    if (bypass) {
      params.set('bypass', bypass);
    }

    if (params.toString()) {
      backUrl += `?${params.toString()}`;
    }

    return backUrl;
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
        <Link href={buildBackUrl()}>
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
            Personal Information
          </h1>

          <p className="mb-12 text-center text-xl text-[#717171]">
            Let's start with some basic information about you.
          </p>

          <div className="mx-auto max-w-2xl space-y-6">
            {/* First Name */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">First Name *</label>
              <input
                type="text"
                value={formData.firstName || ''}
                onChange={e => updateField('firstName', e.target.value)}
                disabled={isFieldPreFilled('firstName')}
                className={`w-full rounded-md border px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isFieldPreFilled('firstName')
                    ? 'cursor-not-allowed bg-gray-50 text-gray-600'
                    : 'border-gray-300'
                } ${errors.firstName ? 'border-red-500' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">Last Name *</label>
              <input
                type="text"
                value={formData.lastName || ''}
                onChange={e => updateField('lastName', e.target.value)}
                disabled={isFieldPreFilled('lastName')}
                className={`w-full rounded-md border px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isFieldPreFilled('lastName')
                    ? 'cursor-not-allowed bg-gray-50 text-gray-600'
                    : 'border-gray-300'
                } ${errors.lastName ? 'border-red-500' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={e => updateField('email', e.target.value)}
                disabled={isFieldPreFilled('email')}
                className={`w-full rounded-md border px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isFieldPreFilled('email')
                    ? 'cursor-not-allowed bg-gray-50 text-gray-600'
                    : 'border-gray-300'
                } ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Birth Date */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.birthDate || ''}
                onChange={e => updateField('birthDate', e.target.value)}
                className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.birthDate ? 'border-red-500' : ''
                }`}
              />
              {errors.birthDate && <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">Gender *</label>
              <select
                value={formData.sex || ''}
                onChange={e => updateField('sex', e.target.value)}
                className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.sex ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.sex && <p className="mt-1 text-sm text-red-500">{errors.sex}</p>}
            </div>

            {/* Birth City */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">Birth City *</label>
              <input
                type="text"
                value={formData.birthCity || ''}
                onChange={e => updateField('birthCity', e.target.value)}
                className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.birthCity ? 'border-red-500' : ''
                }`}
                placeholder="City where you were born"
              />
              {errors.birthCity && <p className="mt-1 text-sm text-red-500">{errors.birthCity}</p>}
              <p className="mt-1 text-xs text-gray-500">Required for Ed-Fi compliance records</p>
            </div>

            {/* Birth State */}
            <div>
              <label className="mb-2 block text-lg font-medium text-[#222222]">Birth State *</label>
              <select
                value={formData.birthStateAbbreviation || ''}
                onChange={e => updateField('birthStateAbbreviation', e.target.value)}
                className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.birthStateAbbreviation ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select birth state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              {errors.birthStateAbbreviation && (
                <p className="mt-1 text-sm text-red-500">{errors.birthStateAbbreviation}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Required for Ed-Fi compliance records</p>
            </div>

            {/* Personal Address Section */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="mb-4 text-xl font-semibold text-[#222222]">Home Address *</h3>
              <p className="mb-4 text-sm text-gray-600">
                This is your personal home address, not your school address.
              </p>

              {/* Street Address */}
              <div>
                <label className="mb-2 block text-lg font-medium text-[#222222]">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={e => updateField('address', e.target.value)}
                  className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.address ? 'border-red-500' : ''
                  }`}
                  placeholder="123 Main St, Apt 4B"
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </div>

              {/* City */}
              <div className="mt-4">
                <label className="mb-2 block text-lg font-medium text-[#222222]">City *</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={e => updateField('city', e.target.value)}
                  className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.city ? 'border-red-500' : ''
                  }`}
                  placeholder="Austin"
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>

              {/* State */}
              <div className="mt-4">
                <label className="mb-2 block text-lg font-medium text-[#222222]">State *</label>
                <select
                  value={formData.state || ''}
                  onChange={e => updateField('state', e.target.value)}
                  className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.state ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>

              {/* ZIP Code */}
              <div className="mt-4">
                <label className="mb-2 block text-lg font-medium text-[#222222]">ZIP Code *</label>
                <input
                  type="text"
                  value={formData.zipCode || ''}
                  onChange={e => updateField('zipCode', e.target.value)}
                  className={`w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.zipCode ? 'border-red-500' : ''
                  }`}
                  placeholder="78701"
                  maxLength={5}
                />
                {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
              </div>
            </div>

            {/* Error Message */}
            {showError && errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-red-700">{errorMessage}</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Progress Footer */}
      <ProgressFooter
        progressPercent={getProgressPercentage()}
        nextButtonText={isSaving ? 'Saving...' : 'Continue'}
        showBackButton={true}
        backButtonHref={buildBackUrl()}
        buttonAction={handleContinue}
        disabled={isSaving || Object.keys(errors).length > 0}
        nextButtonClassName="bg-[#174fa2] hover:bg-blue-700 text-white"
      />
    </div>
  );
}
