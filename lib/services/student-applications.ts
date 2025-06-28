import { applicationOperations } from '@/lib/services/graphql-client';

// StudentApplication type aligned with Enrollment schema
export type StudentApplication = {
  id: string;
  parentId: string;
  studentName: string;
  studentAge?: number;
  studentGrade?: string;
  enrollmentType: 'FULL_TIME' | 'PART_TIME' | 'AFTER_SCHOOL';
  status: 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED';
  applicationData?: Record<string, any>;
  documents?: Record<string, any>;
  tuitionPlan?: Record<string, any>;
  startDate?: string;
  academicYear?: string;
  schoolPreferences?: Record<string, any>;
  coachName?: string;
  sportInterest?: string;
  currentStep?: number;
  totalSteps?: number;
  timelineSteps?: Array<any>;
  timelineStatus?: 'ACTIVE' | 'COMPLETED' | 'PAUSED' | 'CANCELLED';
  createdAt: string;
  updatedAt?: string;
};

// Transform Enrollment to StudentApplication with proper field mapping
function transformEnrollmentToApplication(enrollment: any): StudentApplication {
  return {
    id: enrollment.id,
    parentId: enrollment.parentId,
    studentName: enrollment.studentName,
    studentAge: enrollment.studentAge,
    studentGrade: enrollment.studentGrade,
    enrollmentType: enrollment.enrollmentType,
    status: enrollment.status,
    applicationData: enrollment.applicationData,
    documents: enrollment.documents,
    tuitionPlan: enrollment.tuitionPlan,
    startDate: enrollment.startDate,
    academicYear: enrollment.academicYear,
    schoolPreferences: enrollment.schoolPreferences,
    coachName: enrollment.coachName,
    sportInterest: enrollment.sportInterest,
    currentStep: enrollment.currentStep,
    totalSteps: enrollment.totalSteps,
    timelineSteps: enrollment.timelineSteps,
    timelineStatus: enrollment.timelineStatus,
    createdAt: enrollment.createdAt,
    updatedAt: enrollment.updatedAt,
  };
}

export const fetchStudentApplications = async (options?: {
  limit?: number;
}): Promise<StudentApplication[]> => {
  try {
    const enrollments = await applicationOperations.getApplications();
    return enrollments.map(transformEnrollmentToApplication);
  } catch (error) {
    console.error('Error fetching student applications:', error);
    throw error;
  }
};

export const acceptStudentApplication = async (
  applicationId: string
): Promise<StudentApplication | null> => {
  try {
    const updatedEnrollment = await applicationOperations.updateApplicationStatus(
      applicationId,
      'APPROVED'
    );
    if (!updatedEnrollment) return null;

    return transformEnrollmentToApplication(updatedEnrollment);
  } catch (error) {
    console.error('Error accepting student application:', error);
    throw error;
  }
};

export const rejectStudentApplication = async (
  applicationId: string
): Promise<StudentApplication | null> => {
  try {
    const updatedEnrollment = await applicationOperations.updateApplicationStatus(
      applicationId,
      'REJECTED'
    );
    if (!updatedEnrollment) return null;

    return transformEnrollmentToApplication(updatedEnrollment);
  } catch (error) {
    console.error('Error rejecting student application:', error);
    throw error;
  }
};

// Backward compatibility export
export const studentApplications = {
  getApplications: fetchStudentApplications,
  getApplicationById: async (id: string): Promise<StudentApplication | null> => {
    try {
      const enrollment = await applicationOperations.getApplicationById(id);
      if (!enrollment) return null;

      return transformEnrollmentToApplication(enrollment);
    } catch (error) {
      console.error('Error fetching application by ID:', error);
      throw error;
    }
  },
};
