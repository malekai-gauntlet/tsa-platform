'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProgressFooter } from '@/components/progress-footer'
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/invitation-api'
import { useOnboardingState } from '@/hooks/useOnboardingState'
import { Link } from '@/components/link'

export default function PersonalInfoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
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
    getProgressPercentage
  } = useOnboardingState({
    currentStep: ONBOARDING_STEPS.PERSONAL_INFO,
    requiredFields: ['first_name', 'last_name', 'email', 'birth_date', 'gender']
  })

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Debug logging with detailed validation info
  useEffect(() => {
    const requiredFields = ['first_name', 'last_name', 'email', 'birth_date', 'gender']
    const fieldValidation = requiredFields.map(field => ({
      field,
      value: formData[field as keyof typeof formData],
      hasValue: !!formData[field as keyof typeof formData],
      hasError: !!errors[field],
      errorMessage: errors[field]
    }))
    
    const validationSummary = {
      totalRequired: requiredFields.length,
      filled: fieldValidation.filter(f => f.hasValue).length,
      withErrors: fieldValidation.filter(f => f.hasError).length,
      canContinue: fieldValidation.every(f => f.hasValue) && Object.keys(errors).length === 0
    }
    
    console.log('🔍 Personal Info Validation Debug:', {
      hasInvitationData: !!invitationData,
      invitationEmail: invitationData?.email,
      validationSummary,
      fieldValidation,
      allErrors: errors,
      isInBypassMode: searchParams.get('bypass') === 'true',
      onboardingLoading,
      isSaving,
      formData: {
        first_name: formData.first_name || 'EMPTY',
        last_name: formData.last_name || 'EMPTY',
        email: formData.email || 'EMPTY',
        birth_date: formData.birth_date || 'EMPTY',
        gender: formData.gender || 'EMPTY'
      }
    })
  }, [formData, invitationData, errors, searchParams, onboardingLoading, isSaving])

  const handleContinue = async () => {
    console.log('🔄 Continue button clicked - running validation...')
    
    const isValid = validateStep()
    console.log('✅ Validation result:', {
      isValid,
      errors: errors,
      formData: {
        first_name: formData.first_name || 'EMPTY',
        last_name: formData.last_name || 'EMPTY', 
        email: formData.email || 'EMPTY',
        birth_date: formData.birth_date || 'EMPTY',
        gender: formData.gender || 'EMPTY'
      }
    })
    
    if (!isValid) {
      console.log('❌ Validation failed, showing error message')
      setShowError(true)
      setErrorMessage('Please fill in all required fields')
      return
    }
    
    console.log('✅ Validation passed, marking step complete...')
    // Mark step as complete and save progress (hybrid: local + server)
    const success = await markStepComplete()
    
    if (success) {
      console.log('✅ Step completed successfully, navigating to school-setup')
      router.push(buildInvitationURL('/onboarding/school-setup'))
    } else {
      console.log('❌ Failed to save progress')
      setErrorMessage('Failed to save progress. Please try again.')
      setShowError(true)
    }
  }

  // Show loading state
  if (onboardingLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-poppins">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#174fa2] mx-auto mb-4"></div>
            <h1 className="text-2xl font-semibold text-[#222222] mb-2">Loading...</h1>
            <p className="text-[#717171]">Preparing your onboarding experience.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-poppins pb-[88px]">
      {/* Header */}
      <header className="px-10 py-5 flex justify-between items-center flex-shrink-0">
        <Link href="/" aria-label="Homepage">
          <img 
            src="https://d6mzuygjyhq8s.cloudfront.net/images/TSA%20Final%20Logos%20-%20CMYK-01.svg"
            alt="Texas Sports Academy"
            className="h-12 w-auto"
          />
        </Link>
        <Link href={buildInvitationURL('/onboarding')}>
          <button className="text-sm font-medium rounded-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
            Exit
          </button>
        </Link>
      </header>

      {/* Debug Info (only in bypass mode) */}
      {searchParams.get('bypass') === 'true' && (
        <div className="mx-10 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">🛠️ Debug Info (Bypass Mode)</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Has Invitation Data:</strong> {invitationData ? 'Yes' : 'No'}</p>
            {invitationData && (
              <p><strong>Email:</strong> {invitationData.email}</p>
            )}
            <p><strong>Form Data:</strong> {JSON.stringify(formData, null, 2)}</p>
            <p><strong>Errors:</strong> {JSON.stringify(errors, null, 2)}</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#222222]">
            Personal Information
          </h1>
          
          <p className="text-xl text-center text-[#717171] mb-12">
            Let's start with some basic information about you.
          </p>

          <div className="space-y-6 max-w-2xl mx-auto">
            {/* First Name */}
            <div>
              <label className="block text-lg font-medium text-[#222222] mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.first_name || ''}
                onChange={(e) => updateField('first_name', e.target.value)}
                disabled={isFieldPreFilled('first_name')}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  isFieldPreFilled('first_name') 
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed' 
                    : 'border-gray-300'
                } ${errors.first_name ? 'border-red-500' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-lg font-medium text-[#222222] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.last_name || ''}
                onChange={(e) => updateField('last_name', e.target.value)}
                disabled={isFieldPreFilled('last_name')}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  isFieldPreFilled('last_name') 
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed' 
                    : 'border-gray-300'
                } ${errors.last_name ? 'border-red-500' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-[#222222] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                disabled={isFieldPreFilled('email')}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  isFieldPreFilled('email') 
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed' 
                    : 'border-gray-300'
                } ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-lg font-medium text-[#222222] mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.birth_date || ''}
                onChange={(e) => updateField('birth_date', e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  errors.birth_date ? 'border-red-500' : ''
                }`}
              />
              {errors.birth_date && (
                <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-lg font-medium text-[#222222] mb-2">
                Gender *
              </label>
              <select
                value={formData.gender || ''}
                onChange={(e) => updateField('gender', e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                  errors.gender ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Error Message */}
            {showError && errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
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
        backButtonHref={buildInvitationURL('/onboarding')}
        buttonAction={handleContinue}
        disabled={isSaving || Object.keys(errors).length > 0}
        nextButtonClassName="bg-[#174fa2] hover:bg-blue-700 text-white"
      />
    </div>
  )
} 