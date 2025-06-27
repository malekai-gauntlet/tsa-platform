'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Heading } from '@/components/heading'
import { 
  CheckCircleIcon,
  ClockIcon,
  CheckIcon,
  XCircleIcon,
  TableCellsIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PhoneIcon,
  AcademicCapIcon,
  UserIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  CogIcon
} from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'

// Import shared GraphQL utilities
import {
  fetchStudentApplications,
  acceptStudentApplication,
  rejectStudentApplication,
  type StudentApplication
} from '@/lib/services/student-applications'

// Debug info type definition
interface DebugInfo {
  error?: string
  details?: string
  timestamp?: string
  fetchSuccess?: boolean
  applicationCount?: number
  fetchError?: string
  coachEmail?: string
  coachMode?: boolean
}

interface UserInfo {
  email: string | null
  userId: string | null
  name?: string | null
}

interface ApplicationTableProps {
  applications: StudentApplication[]
  onAccept: (applicationId: string) => void
  onReject: (applicationId: string) => void
  loading: boolean
}

interface StatusBadgeProps {
  status: string
}

// Helper function to get current user info
async function getCurrentUserInfo(): Promise<UserInfo> {
  try {
    const user = await getCurrentUser()
    const session = await fetchAuthSession()
    const idToken = session.tokens?.idToken

    if (!user || !idToken) {
      return { email: null, userId: null }
    }

    const email = user.signInDetails?.loginId || ''
    const firstName = String(idToken.payload?.['custom:firstName'] || '')
    const lastName = String(idToken.payload?.['custom:lastName'] || '')
    const name = `${firstName} ${lastName}`.trim() || email

    return { 
      email, 
      userId: user.userId,
      name 
    }
  } catch (error) {
    console.error('Error getting user info:', error)
    return { email: null, userId: null, name: null }
  }
}

// Extract reusable utility functions (following .cursor rules)
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
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
const ApplicationTableSkeleton = React.memo(() => (
  <div className="w-full">
    <div className="animate-pulse">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 p-6 border-b">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
))
ApplicationTableSkeleton.displayName = 'ApplicationTableSkeleton'

// Empty state component (extracted for reusability)
const EmptyApplicationsState = React.memo(() => (
  <div className="w-full">
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <TableCellsIcon className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Student applications will appear here when parents submit them through the public enrollment form.
      </p>
    </div>
  </div>
))
EmptyApplicationsState.displayName = 'EmptyApplicationsState'

// Application Management Table Component with React.memo
const ApplicationManagementTable = React.memo<ApplicationTableProps>(({ 
  applications, 
  onAccept, 
  onReject, 
  loading 
}) => {
  // Memoized stats calculation for performance
  const stats = useMemo(() => ({
    pending: applications.filter(app => app.status === 'PENDING' || app.status === 'WAITLIST').length,
    approved: applications.filter(app => app.status === 'APPROVED').length,
    rejected: applications.filter(app => app.status === 'REJECTED').length,
    thisWeek: applications.filter(app => 
      new Date(app.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  }), [applications])

  // Memoized navigation handler to avoid inline functions
  const handleViewApplication = useCallback((applicationId: string) => {
    window.location.href = `/coach/applications/${applicationId}`
  }, [])

  if (loading) {
    return <ApplicationTableSkeleton />
  }

  if (applications.length === 0) {
    return <EmptyApplicationsState />
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#004aad]/10 rounded-full flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-[#004aad]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">Student Applications</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
                  <EnvelopeIcon className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-800">Coach Mode</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Review and manage student enrollment applications</p>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: 'Pending', count: stats.pending, color: 'text-amber-600' },
            { label: 'Approved', count: stats.approved, color: 'text-green-600' },
            { label: 'Rejected', count: stats.rejected, color: 'text-red-600' },
            { label: 'This Week', count: stats.thisWeek, color: 'text-blue-600' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={cn("text-lg font-semibold", stat.color)}>{stat.count}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Student Information</TableHead>
              <TableHead className="w-[200px]">Parent Contact</TableHead>
              <TableHead className="w-[180px]">Application Details</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} className="group">
                {/* Student Information */}
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#004aad]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-4 h-4 text-[#004aad]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {application.studentName}
                        </div>
                        {application.studentGrade && (
                          <div className="text-xs text-gray-500">Grade {application.studentGrade}</div>
                        )}
                      </div>
                    </div>
                    
                    {/* Student Details */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {application.studentAge && (
                        <div className="flex items-center gap-1">
                          <CalendarDaysIcon className="w-3 h-3" />
                          Age {application.studentAge}
                        </div>
                      )}
                      {application.enrollmentType && (
                        <div className="flex items-center gap-1">
                          <AcademicCapIcon className="w-3 h-3" />
                          {application.enrollmentType.replace('_', ' ')}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Parent Contact */}
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-sm text-gray-900">
                      Parent ({application.parentId})
                    </div>
                    {application.coachName && (
                      <div className="text-xs text-gray-500">
                        Coach: {application.coachName}
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Application Details */}
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">{formatDate(application.createdAt)}</div>
                    {application.enrollmentType && (
                      <div className="text-xs text-gray-500">
                        Type: {application.enrollmentType}
                      </div>
                    )}
                    {application.sportInterest && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {application.sportInterest}
                        </Badge>
                        {application.studentGrade && (
                          <Badge className="text-xs bg-green-50 text-green-700 border-green-200">
                            Grade {application.studentGrade}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={application.status} />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost" 
                      className="h-7 px-2 text-xs text-gray-600 hover:text-gray-900"
                      onClick={() => handleViewApplication(application.id)}
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})
ApplicationManagementTable.displayName = 'ApplicationManagementTable'

// Main content component with proper useEffect and cleanup
export function StudentApplicationsContent() {
  const [applications, setApplications] = useState<StudentApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [currentCoachEmail, setCurrentCoachEmail] = useState<string | null>(null)

  // Memoized functions following React best practices
  const loadApplications = useCallback(async () => {
    try {
      setLoading(true)
      
      // Get current coach email from authentication
      const userInfo = await getCurrentUserInfo()
      const coachEmail = userInfo.email || userInfo.userId
      
      if (!coachEmail) {
        throw new Error('No authenticated coach found')
      }
      
      setCurrentCoachEmail(coachEmail)
      console.log(`📧 Fetching applications for coach: ${coachEmail}`)
      
      // Fetch applications 
      const fetchedApplications = await fetchStudentApplications({
        limit: 50
      })
      
      setApplications(fetchedApplications)
      setDebugInfo({
        fetchSuccess: true,
        applicationCount: fetchedApplications.length,
        timestamp: new Date().toISOString(),
        coachEmail,
        coachMode: true
      })
      
      console.log(`✅ Successfully fetched ${fetchedApplications.length} applications for ${coachEmail}`)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setApplications([])
      setDebugInfo({
        fetchError: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        coachEmail: currentCoachEmail || 'unknown',
        coachMode: true
      })
    } finally {
      setLoading(false)
    }
  }, [currentCoachEmail])

  const handleAcceptApplication = useCallback(async (applicationId: string) => {
    const application = applications.find(app => app.id === applicationId)
    if (!application) return

    const studentName = application.studentName
    if (!confirm(`Accept application for ${studentName}? This will enroll the student and send confirmation emails.`)) return

    try {
      await acceptStudentApplication(applicationId)
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'APPROVED' }
            : app
        )
      )
      
      alert(`✅ Application for ${studentName} has been accepted!`)
    } catch (error) {
      console.error('Error accepting application:', error)
      alert('Failed to accept application. Please try again.')
    }
  }, [applications])

  const handleRejectApplication = useCallback(async (applicationId: string) => {
    const application = applications.find(app => app.id === applicationId)
    if (!application) return

    const studentName = application.studentName
    if (!confirm(`Reject application for ${studentName}? This action cannot be undone.`)) return

    try {
      await rejectStudentApplication(applicationId)
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId 
            ? { ...app, status: 'REJECTED' }
            : app
        )
      )
      
      alert(`❌ Application for ${studentName} has been rejected.`)
    } catch (error) {
      console.error('Error rejecting application:', error)
      alert('Failed to reject application. Please try again.')
    }
  }, [applications])

  // Proper useEffect with cleanup following .cursor rules
  useEffect(() => {
    let isMounted = true

    const initializeApplications = async () => {
      if (isMounted) {
        await loadApplications()
      }
    }

    initializeApplications()

    return () => {
      isMounted = false
    }
  }, [loadApplications])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Heading>Student Applications</Heading>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
              <EnvelopeIcon className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">Coach Email Mode</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {currentCoachEmail ? `Managing applications for coach: ${currentCoachEmail}` : 'Loading coach information...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadApplications} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Debug Information */}
      {debugInfo && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <EnvelopeIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-800 mb-2">Coach Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-medium text-green-800">Mode:</span>
                  <span className="text-green-700 ml-1">Coach Email Attribution</span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Coach Email:</span>
                  <span className="text-green-700 ml-1">{debugInfo.coachEmail}</span>
                </div>
                <div>
                  <span className="font-medium text-green-800">Applications:</span>
                  <span className="text-green-700 ml-1">{debugInfo.applicationCount || 0}</span>
                </div>
              </div>
              {debugInfo.fetchError && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                  <span className="text-xs text-red-700">{debugInfo.fetchError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ApplicationManagementTable 
        applications={applications}
        onAccept={handleAcceptApplication}
        onReject={handleRejectApplication}
        loading={loading}
      />
    </div>
  )
} 