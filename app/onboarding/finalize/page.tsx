'use client'

import React, { useState } from 'react'
import { Link } from '@/components/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProgressFooter } from '@/components/progress-footer'
import { buildInvitationURL, ONBOARDING_STEPS } from '@/lib/invitation-api'
import { useOnboardingState } from '@/hooks/useOnboardingState'

export default function Finalize() {
  const router = useRouter()
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Use the onboarding state hook for proper data management
  const {
    formData,
    invitationData,
    isLoading: onboardingLoading,
    getProgressPercentage
  } = useOnboardingState({
    currentStep: ONBOARDING_STEPS.FINALIZE,
    requiredFields: []
  })

  const handleConfirm = () => {
    // Get data from both formData and invitationData with proper field mapping
    const onboardingData = {
      // Personal Information - prioritize invitation data, fallback to form data
      email: invitationData?.email || formData.email || '',
      firstName: invitationData?.first_name || formData.first_name || '',
      lastName: invitationData?.last_name || formData.last_name || '',
      phone: invitationData?.phone || formData.phone || '',
      
      // School Information from form data
      school_name: formData.school_name || invitationData?.school_name || '',
      sport: invitationData?.sport || formData.sport || '',
      school_type: formData.school_type || invitationData?.school_type || '',
      role_type: formData.role_type || '',
      
      // Other required fields
      grade_levels_served: formData.grade_levels_served || formData.grade_levels || [],
      platform_agreement: formData.platform_agreement || false
    }

    // Check required fields
    const requiredFields = [
      'school_name',
      'sport', 
      'school_type',
      'role_type',
      'email',
      'firstName',
      'lastName'
    ]

    const missingFields = requiredFields.filter(field => !onboardingData[field as keyof typeof onboardingData])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
      alert(`Please complete the following required fields by going back to previous steps: ${missingFields.join(', ')}`)
      return
    }

    // Check platform agreement
    if (!onboardingData.platform_agreement) {
      alert('Please go back and accept the platform agreement to continue')
      return
    }

    // Check that grade levels are selected
    if (!onboardingData.grade_levels_served || onboardingData.grade_levels_served.length === 0) {
      alert('Please go back and select at least one grade level to serve')
      return
    }

    // All validation passed - proceed to completion
    setIsConfirmed(true)
    router.push(buildInvitationURL('/onboarding/complete'))
  }

  const formatGradeLevels = (grades: string[]) => {
    if (!grades || grades.length === 0) return 'None selected'
    return grades.map(grade => grade === 'K' ? 'Kindergarten' : `Grade ${grade}`).join(', ')
  }

  const formatSchoolType = (type: string) => {
    const types: { [key: string]: string } = {
      'elementary': 'Elementary School',
      'middle': 'Middle School', 
      'high': 'High School'
    }
    return types[type] || type
  }

  const formatRoleType = (role: string) => {
    const roles: { [key: string]: string } = {
      'coach': 'Coach',
      'teacher_coach': 'Teacher & Coach',
      'administrator': 'Administrator',
      'parent_coach': 'Parent Coach'
    }
    return roles[role] || role
  }

  // Prepare display data with proper fallbacks
  const displayData = {
    // Personal Information - prioritize invitation data with proper field mapping
    firstName: invitationData?.first_name || formData.first_name || 'Not provided',
    lastName: invitationData?.last_name || formData.last_name || 'Not provided',
    email: invitationData?.email || formData.email || 'Not provided',
    phone: invitationData?.phone || formData.phone || 'Not provided',
    
    // School Information - handle both field formats
    school_name: formData.school_name || invitationData?.school_name || 'Not provided',
    sport: invitationData?.sport || formData.sport || 'Not provided',
    school_type: formData.school_type || invitationData?.school_type || 'Not provided',
    role_type: formData.role_type || 'Not provided',
    grade_levels_served: formData.grade_levels_served || formData.grade_levels || [],
    football_type: formData.football_type || '',
    academic_year: formData.academic_year || '2024-2025',
    
    // School Address
    school_street: formData.school_street || '',
    school_city: formData.school_city || invitationData?.city || '',
    school_state: formData.school_state || invitationData?.state || '',
    school_zip: formData.school_zip || '',
    school_phone: formData.school_phone || '',
    
    // Location
    has_physical_location: formData.has_physical_location || false,
    
    // Coach Profile
    years_experience: formData.years_experience || 0,
    certification_level: formData.certification_level || '',
    grade_levels_teaching: formData.grade_levels_teaching || [],
    specializations: formData.specializations || [],
    
    // Students
    estimated_student_count: formData.estimated_student_count || 0,
    student_grade_levels: formData.student_grade_levels || [],
    enrollment_capacity: formData.enrollment_capacity || 0,
    has_current_students: formData.has_current_students || false,
    current_student_details: formData.current_student_details || '',
    
    // Agreements
    platform_agreement: formData.platform_agreement || false
  }

  if (onboardingLoading) {
    return (
      <div className="min-h-screen bg-white font-poppins flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-poppins pb-[88px]">
      {/* Header */}
      <header className="px-10 py-5 flex justify-between items-center">
        <Link href="/" aria-label="Homepage">
          <img 
            src="https://d6mzuygjyhq8s.cloudfront.net/images/TSA%20Final%20Logos%20-%20CMYK-01.svg"
            alt="Texas Sports Academy"
            className="h-12 w-auto"
          />
        </Link>
        <Link href={buildInvitationURL('/onboarding/school-name')}>
          <button className="text-sm font-medium rounded-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
            Exit
          </button>
        </Link>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#222222]">
              Confirm Your Information
          </h1>
            <p className="text-xl text-[#717171] max-w-2xl mx-auto">
              Please review all the information below to ensure everything is correct before finalizing your onboarding.
          </p>
          </div>

          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6 border">
              <h3 className="text-xl font-semibold text-[#222222] mb-4">
                👤 Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2">{displayData.firstName} {displayData.lastName}</span>
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
            <div className="bg-gray-50 rounded-xl p-6 border">
              <h3 className="text-xl font-semibold text-[#222222] mb-4">
                🏫 School Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">School Name:</span>
                  <span className="ml-2">{displayData.school_name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">School Type:</span>
                  <span className="ml-2">{formatSchoolType(displayData.school_type)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sport:</span>
                  <span className="ml-2">{displayData.sport}</span>
                </div>
                {displayData.football_type && (
                  <div>
                    <span className="font-medium text-gray-700">Football Type:</span>
                    <span className="ml-2">{displayData.football_type}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Academic Year:</span>
                  <span className="ml-2">{displayData.academic_year}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-700">Grade Levels Served:</span>
                  <span className="ml-2">{formatGradeLevels(displayData.grade_levels_served)}</span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-gray-50 rounded-xl p-6 border">
              <h3 className="text-xl font-semibold text-[#222222] mb-4">
                📍 School Address & Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Physical Location:</span>
                  <span className="ml-2">
                    {displayData.has_physical_location ? 'Yes, has a physical location' : 'No, operates without a fixed location'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Street Address:</span>
                  <span className="ml-2">{displayData.school_street || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">City:</span>
                  <span className="ml-2">{displayData.school_city || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">State:</span>
                  <span className="ml-2">{displayData.school_state || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">ZIP Code:</span>
                  <span className="ml-2">{displayData.school_zip || 'Not provided'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">School Phone:</span>
                  <span className="ml-2">{displayData.school_phone || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Coach Profile */}
            <div className="bg-gray-50 rounded-xl p-6 border">
              <h3 className="text-xl font-semibold text-[#222222] mb-4">
                🎯 Coach Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Role:</span>
                  <span className="ml-2">{formatRoleType(displayData.role_type)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Years Experience:</span>
                  <span className="ml-2">{displayData.years_experience} years</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Certification Level:</span>
                  <span className="ml-2">{displayData.certification_level}</span>
                </div>
                {displayData.grade_levels_teaching.length > 0 && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">Teaching Grade Levels:</span>
                    <span className="ml-2">{formatGradeLevels(displayData.grade_levels_teaching)}</span>
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
            <div className="bg-gray-50 rounded-xl p-6 border">
              <h3 className="text-xl font-semibold text-[#222222] mb-4">
                👨‍🎓 Student Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Has Current Students:</span>
                  <span className="ml-2">{displayData.has_current_students ? 'Yes, currently have students' : 'No, starting fresh'}</span>
                </div>
                {displayData.has_current_students && (
                  <>
                    <div>
                      <span className="font-medium text-gray-700">Estimated Count:</span>
                      <span className="ml-2">{displayData.estimated_student_count}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Enrollment Capacity:</span>
                      <span className="ml-2">{displayData.enrollment_capacity}</span>
                    </div>
                    {displayData.student_grade_levels.length > 0 && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Student Grade Levels:</span>
                        <span className="ml-2">{formatGradeLevels(displayData.student_grade_levels)}</span>
                      </div>
                    )}
                    {displayData.current_student_details && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Student Details:</span>
                        <p className="ml-2 text-gray-600 whitespace-pre-wrap">{displayData.current_student_details}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Agreements */}
            <div className="bg-gray-50 rounded-xl p-6 border">
              <h3 className="text-xl font-semibold text-[#222222] mb-4">
                ✅ Agreements & Compliance
              </h3>
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Platform Agreement:</span>
                  <span className={`ml-2 ${displayData.platform_agreement ? 'text-green-600' : 'text-red-600'}`}>
                    {displayData.platform_agreement ? 'Accepted' : 'Not Accepted'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Notice */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">ℹ️</span>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  Ready to Submit?
                </h4>
                <p className="text-blue-800 text-sm">
                  Please review all information above carefully. Once you confirm, your onboarding will be submitted 
                  and you&apos;ll receive access to the Texas Sports Academy platform. You can always update your 
                  information later in your profile settings.
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
  )
} 