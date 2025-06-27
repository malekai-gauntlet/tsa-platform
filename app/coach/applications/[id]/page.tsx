'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeftIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  XCircleIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  AcademicCapIcon
} from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'

import {
  fetchStudentApplications,
  acceptStudentApplication,
  rejectStudentApplication,
  type StudentApplication
} from '@/lib/services/student-applications'

// TypeScript interfaces following .cursor rules
interface StatusBadgeProps {
  status: string
}

interface ApplicationDetailPageProps {
  // Future props can be added here
}

// Extract utility functions (following .cursor rules)
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  })
}

const getStatusBadgeVariant = (status: string): string => {
  const variants = {
    'PENDING': 'bg-amber-100 text-amber-800 border-amber-200',
    'WAITLIST': 'bg-blue-100 text-blue-800 border-blue-200',
    'APPROVED': 'bg-green-100 text-green-800 border-green-200',
    'REJECTED': 'bg-red-100 text-red-800 border-red-200',
  }
  return variants[status as keyof typeof variants] || variants.PENDING
}

// StatusBadge component with React.memo for performance
const StatusBadge = React.memo<StatusBadgeProps>(({ status }) => {
  const variant = useMemo(() => getStatusBadgeVariant(status), [status])
  
  return (
    <Badge className={cn('border text-xs font-medium', variant)}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Badge>
  )
})
StatusBadge.displayName = 'StatusBadge'

// Loading skeleton component (extracted for reusability)
const ApplicationDetailSkeleton = React.memo(() => (
  <div className="space-y-6">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
))
ApplicationDetailSkeleton.displayName = 'ApplicationDetailSkeleton'

// NotFound component (extracted for reusability)
const ApplicationNotFound = React.memo<{ onBack: () => void }>(({ onBack }) => (
  <div className="text-center py-12">
    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <XCircleIcon className="w-6 h-6 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Application not found</h3>
    <p className="text-sm text-gray-500 mb-4">
      The application you're looking for doesn't exist or may have been removed.
    </p>
    <Button onClick={onBack}>
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      Back to Applications
    </Button>
  </div>
))
ApplicationNotFound.displayName = 'ApplicationNotFound'

export default function StudentApplicationDetailPage(): JSX.Element {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.id as string
  
  const [application, setApplication] = useState<StudentApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  // Memoized navigation handlers (following .cursor rules)
  const handleBack = useCallback(() => {
    router.push('/coach/applications')
  }, [router])

  const handleAccept = useCallback(async () => {
    if (!application) return
    
    const studentName = application.studentName
    if (!confirm(`Accept application for ${studentName}? This will enroll the student and send confirmation emails.`)) return

    try {
      setProcessing(true)
      await acceptStudentApplication(application.id)
      setApplication({ ...application, status: 'APPROVED' })
      alert(`✅ Application for ${studentName} has been accepted!`)
    } catch (error) {
      console.error('Error accepting application:', error)
      alert('Failed to accept application. Please try again.')
    } finally {
      setProcessing(false)
    }
  }, [application])

  const handleReject = useCallback(async () => {
    if (!application) return
    
    const studentName = application.studentName
    if (!confirm(`Reject application for ${studentName}? This action cannot be undone.`)) return

    try {
      setProcessing(true)
      await rejectStudentApplication(application.id)
      setApplication({ ...application, status: 'REJECTED' })
      alert(`❌ Application for ${studentName} has been rejected.`)
    } catch (error) {
      console.error('Error rejecting application:', error)
      alert('Failed to reject application. Please try again.')
    } finally {
      setProcessing(false)
    }
  }, [application])

  // Memoized fetch function for better performance
  const fetchApplication = useCallback(async () => {
    if (!applicationId) return

    try {
      setLoading(true)
      // Fetch all applications and find the specific one
      const applications = await fetchStudentApplications({ limit: 100 })
      const foundApplication = applications.find(app => app.id === applicationId)
      setApplication(foundApplication || null)
    } catch (error) {
      console.error('Error fetching application:', error)
      setApplication(null)
    } finally {
      setLoading(false)
    }
  }, [applicationId])

  // Proper useEffect with cleanup following .cursor rules
  useEffect(() => {
    let isMounted = true

    const loadApplication = async () => {
      if (isMounted) {
        await fetchApplication()
      }
    }

    if (applicationId) {
      loadApplication()
    }

    return () => {
      isMounted = false
    }
  }, [applicationId, fetchApplication])

  // Memoized conditional rendering for better performance
  const renderContent = useMemo(() => {
    if (loading) {
      return <ApplicationDetailSkeleton />
    }

    if (!application) {
      return <ApplicationNotFound onBack={handleBack} />
    }

    const showActionButtons = application.status === 'PENDING' || application.status === 'WAITLIST'

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Applications</span>
            </button>
            <div>
              <Heading>Student Application</Heading>
              <p className="mt-1 text-gray-500">
                Submitted on {formatDate(application.createdAt)}
              </p>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {/* Student Overview Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#004aad]/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-[#004aad]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {application.studentName}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                {application.studentGrade && (
                  <span className="flex items-center gap-1">
                    <AcademicCapIcon className="w-4 h-4" />
                    Grade {application.studentGrade}
                  </span>
                )}
                {application.studentAge && (
                  <span className="flex items-center gap-1">
                    <CalendarDaysIcon className="w-4 h-4" />
                    Age {application.studentAge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {showActionButtons && (
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={handleAccept}
                disabled={processing}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button
                onClick={handleReject}
                disabled={processing}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <XCircleIcon className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Enrollment Type:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {application.enrollmentType?.replace('_', ' ') || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Sport Interest:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {application.sportInterest || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Academic Year:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {application.academicYear || 'Not specified'}
                </span>
              </div>
              {application.startDate && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Start Date:</span>
                  <span className="text-sm text-gray-900 ml-2">
                    {formatDate(application.startDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Parent ID:</span>
                <span className="text-sm text-gray-900 ml-2">{application.parentId}</span>
              </div>
              {application.coachName && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Assigned Coach:</span>
                  <span className="text-sm text-gray-900 ml-2">{application.coachName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Information */}
        {application.timelineSteps && application.timelineSteps.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">Current Step:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {application.currentStep || 0} of {application.totalSteps || 0}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {application.timelineStatus || 'Active'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }, [loading, application, handleBack, handleAccept, handleReject, processing])

  return renderContent
} 