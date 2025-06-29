import { useState, useEffect, useMemo } from 'react';
import { fetchStudentApplications } from '@/lib/api/student-applications';
import { calculateApplicationStats } from '@/lib/utils/coach';
import type { Application, ApplicationStats } from '@/lib/types/coach';

interface UseApplicationsProps {
  coachEmail?: string;
  currentUserId?: string;
  coachLocation?: string;
}

export function useApplications({
  coachEmail,
  currentUserId,
  coachLocation,
}: UseApplicationsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoized stats calculation
  const stats = useMemo(() => calculateApplicationStats(applications), [applications]);

  // Memoized recent applications
  const recentApplications = useMemo(
    () =>
      applications
        .sort((a, b) => new Date(b.submittedAt || b.createdAt).getTime() - new Date(a.submittedAt || a.createdAt).getTime())
        .slice(0, 2),
    [applications]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      if (!coachEmail || !currentUserId) return;

      try {
        setLoading(true);
        console.log(`📧 Fetching applications for coach: ${coachEmail}`);

        const studentApplications = await fetchStudentApplications({
          limit: 10,
        });

        if (!isMounted) return;

        // Transform StudentApplication[] to Application[] format
        const transformedApplications: Application[] = studentApplications.map(
          (studentApp: any) => ({
            id: studentApp.invitation_id,
            parentId: studentApp.parent_id || 'unknown',
            studentName: `${studentApp.student_first_name || ''} ${studentApp.student_last_name || ''}`.trim() || 'Unknown Student',
            studentAge: studentApp.student_age ? Number(studentApp.student_age) : undefined,
            studentGrade: studentApp.grade_level || 'TBD',
            enrollmentType: 'FULL_TIME' as const,
            status: (studentApp.status === 'applied' ? 'PENDING' : studentApp.status?.toUpperCase() || 'PENDING') as 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED',
            applicationData: {
              sportInterest: studentApp.sport_interest,
              specialRequirements: studentApp.special_accommodations,
            },
            startDate: studentApp.enrollment_date,
            academicYear: studentApp.enrollment_date ? '2024-2025' : '2025-2026',
            coachName: studentApp.coach_name,
            sportInterest: studentApp.sport_interest,
            currentStep: 1,
            totalSteps: 5,
            createdAt: studentApp.created_at,
            updatedAt: studentApp.updated_at || studentApp.created_at,
            
            // Additional fields used in the frontend but not in the core model
            coachId: currentUserId,
            studentFirstName: studentApp.student_first_name,
            studentLastName: studentApp.student_last_name,
            studentDateOfBirth: studentApp.student_dob || '2010-01-01',
            currentSchool: studentApp.current_school || 'Previous School',
            parentName: studentApp.parent1_name || 'Parent Name',
            parentRelationship: studentApp.parent1_relationship || 'Parent',
            parentEmail: studentApp.parent_email,
            parentPhone: studentApp.parent1_phone || '',
            parent2Name: studentApp.parent2_name || '',
            parent2Email: studentApp.parent2_email || '',
            parent2Relationship: studentApp.parent2_relationship || '',
            parent2Phone: studentApp.parent2_phone || '',
            location: coachLocation?.toLowerCase().replace(' ', '-') || '',
            address: studentApp.home_address || '',
            whyApplying: studentApp.why_applying || '',
            tellUsMore: studentApp.about_child || '',
            specialAccommodations: studentApp.special_accommodations || '',
            tellUsAboutYou: studentApp.parent_background || '',
            type: 'application' as const,
            submittedAt: studentApp.created_at,
            lastUpdated: studentApp.created_at,
            notes: `Coach: ${coachEmail}`,
          })
        );

        setApplications(transformedApplications);
        console.log(
          `✅ Successfully loaded ${transformedApplications.length} applications for coach: ${coachEmail}`
        );
      } catch (error) {
        console.error('Error fetching applications:', error);
        if (isMounted) {
          setApplications([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [coachEmail, currentUserId, coachLocation]);

  return {
    applications,
    stats,
    recentApplications,
    loading,
  };
}
