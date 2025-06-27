import { Metadata } from 'next'
import { StudentApplicationsContent } from '@/app/coach/applications/components'

export const metadata: Metadata = {
  title: 'Student Applications',
  description: 'Review and manage student applications'
}

// Main page component (server component)
export default function StudentApplicationsPage() {
  return <StudentApplicationsContent />
} 