import { useState, useEffect, useMemo } from 'react';
import { fetchStudentApplications } from '@/lib/api/student-applications';
import { calculateApplicationStats } from '@/lib/utils/coach';
import type { Application, ApplicationStats } from '@/lib/types/coach';

interface UseApplicationsProps {
  coachEmail?: string;
  currentUserId?: string;
  coachLocation?: string;
}

export function useApplications({ coachEmail, currentUserId, coachLocation }: UseApplicationsProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!coachEmail) {
        console.log('⚠️ No coach email provided for application filtering');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log(`📧 Fetching applications for coach: ${coachEmail}`);

        // Build the API URL with coach email parameter
        const params = new URLSearchParams();
        params.append('coachEmail', coachEmail);
        
        const url = `/api/applications/list?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch applications');
        }

        // Transform Zapier data to Application format
        const transformedApplications: Application[] = (data.applications || []).map((app: any) => ({
          id: app.id,
          parentId: app.parent1Email || 'unknown',
          parentName: app.parent1Name || 'Unknown Parent',
          parentEmail: app.parent1Email || '',
          parentPhone: app.parent1Phone || '',
          studentName: app.studentName || 'Unknown Student',
          studentAge: app.studentAge || null,
          studentGrade: app.studentGrade || '',
          sportInterest: app.sportInterest || 'General',
          coachId: app.coachEmail || coachEmail,
          status: app.status || 'PENDING',
          createdAt: app.submittedAt || new Date().toISOString(),
          updatedAt: app.submittedAt || new Date().toISOString(),
          enrollmentType: 'FULL_TIME',
          startDate: app.enrollmentDate,
          currentSchool: app.currentSchool,
          schoolName: app.schoolName || coachLocation,
          whyApplying: app.whyApplying,
          coachEmail: app.coachEmail,
        }));

        setApplications(transformedApplications);
        console.log(`✅ Successfully fetched ${transformedApplications.length} applications for coach: ${coachEmail}`);
        console.log(`📊 Total applications in system: ${data.totalApplications || 0}`);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
        setError(errorMessage);
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [coachEmail, currentUserId, coachLocation]);

  const stats: ApplicationStats = useMemo(() => {
    return calculateApplicationStats(applications);
  }, [applications]);

  return {
    applications,
    loading,
    error,
    stats,
  };
}
