import type { Schema } from '../../data/resource';
import { generateClient } from 'aws-amplify/data';

// In Amplify Gen 2, functions used as GraphQL resolvers are automatically configured
const dataClient = generateClient<Schema>();

export const handler: Schema['parentApplication']['functionHandler'] = async event => {
  try {
    const {
      // Parent Information
      parentEmail,
      parentFirstName,
      parentLastName,
      parentPhone,

      // Student Information
      studentName,
      studentAge,
      studentGrade,
      studentDateOfBirth,

      // Application Details
      sportInterest,
      enrollmentType,
      schoolPreferences,
      startDate,
      academicYear,

      // Additional Information
      specialNotes,
      emergencyContact,
      medicalInformation,

      // Coach Selection (optional)
      preferredCoachId,
      coachName,

      // Address Information
      address,
    } = event.arguments;

    // Define required fields for comprehensive validation
    const requiredFields = [
      'parentEmail',
      'parentFirstName', 
      'parentLastName',
      'parentPhone',
      'studentName',
      'sportInterest'
    ];
    
    // Validate required fields
    const { valid, missingFields } = validateRequiredFields(
      event.arguments,
      requiredFields
    );
    
    if (!valid) {
      throw new Error(
        `Missing required fields: ${missingFields.join(', ')}`
      );
    }

    // Validate email format
    if (!validateEmail(parentEmail)) {
      throw new Error('Invalid email format');
    }

    // Validate phone number
    if (!validatePhone(parentPhone || undefined)) {
      throw new Error('Invalid phone number format');
    }

    // Format the phone number for consistency
    const formattedParentPhone = formatPhoneNumber(parentPhone || '');

    // Validate date of birth (must be in the past)
    if (studentDateOfBirth && !validatePastDate(studentDateOfBirth)) {
      throw new Error('Invalid date of birth - must be a valid date in the past');
    }

    // Validate start date (must be in the future or today)
    if (startDate && !validateFutureDate(startDate)) {
      throw new Error('Invalid start date - must be today or a future date');
    }

    // Create or find the parent user
    let parentUser;
    try {
      // First try to find existing user
      const existingUsers = await dataClient.models.User.list({
        filter: {
          email: { eq: parentEmail },
          role: { eq: 'PARENT' },
        },
      });

      if (existingUsers.data && existingUsers.data.length > 0) {
        parentUser = existingUsers.data[0];
      } else {
        // Create new parent user
        const createUserResult = await dataClient.models.User.create({
          email: parentEmail,
          firstName: parentFirstName,
          lastName: parentLastName,
          phone: formattedParentPhone,
          role: 'PARENT',
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        if (createUserResult.errors) {
          throw new Error(
            `Failed to create parent user: ${createUserResult.errors.map(e => e.message).join(', ')}`
          );
        }

        parentUser = createUserResult.data;
      }
    } catch (error: any) {
      throw new Error('Failed to create or find parent user');
    }

    if (!parentUser || !parentUser.id) {
      throw new Error('Failed to create or retrieve parent user');
    }

    // Prepare application data
    const applicationData = {
      parentInfo: {
        email: parentEmail,
        firstName: parentFirstName,
        lastName: parentLastName,
        phone: parentPhone,
        address: address,
      },
      studentInfo: {
        name: studentName,
        age: studentAge,
        grade: studentGrade,
        dateOfBirth: studentDateOfBirth,
        medicalInformation: medicalInformation,
      },
      applicationDetails: {
        sportInterest,
        enrollmentType: enrollmentType || 'FULL_TIME',
        schoolPreferences,
        startDate,
        academicYear: academicYear || new Date().getFullYear().toString(),
        specialNotes,
        emergencyContact,
        preferredCoachId,
        submittedAt: new Date().toISOString(),
      },
    };

    // Initialize timeline steps for the enrollment process
    const timelineSteps = [
      {
        id: 1,
        title: 'Application Submitted',
        description: 'Your application has been received',
        status: 'completed',
        completedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Application Review',
        description: 'Our team is reviewing your application',
        status: 'active',
        completedAt: null,
      },
      {
        id: 3,
        title: 'Coach Assignment',
        description: 'We will assign the best coach for your student',
        status: 'pending',
        completedAt: null,
      },
      {
        id: 4,
        title: 'Initial Assessment',
        description: 'Schedule initial assessment with assigned coach',
        status: 'pending',
        completedAt: null,
      },
      {
        id: 5,
        title: 'Enrollment Confirmation',
        description: 'Confirm enrollment and complete registration',
        status: 'pending',
        completedAt: null,
      },
      {
        id: 6,
        title: 'Payment Setup',
        description: 'Set up tuition and payment plan',
        status: 'pending',
        completedAt: null,
      },
      {
        id: 7,
        title: 'Welcome Package',
        description: 'Receive welcome materials and schedule',
        status: 'pending',
        completedAt: null,
      },
      {
        id: 8,
        title: 'Program Start',
        description: 'Begin training program',
        status: 'pending',
        completedAt: null,
      },
    ];

    // Create enrollment record
    const enrollmentResult = await dataClient.models.Enrollment.create({
      parentId: parentUser.id,
      studentName,
      studentAge,
      studentGrade,
      enrollmentType: enrollmentType || 'FULL_TIME',
      status: 'PENDING',
      applicationData,
      startDate,
      academicYear: academicYear || new Date().getFullYear().toString(),
      schoolPreferences,
      coachName: coachName || null,
      sportInterest,
      currentStep: 1,
      totalSteps: 8,
      timelineSteps,
      timelineStatus: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (enrollmentResult.errors) {
      throw new Error(
        `Failed to create enrollment: ${enrollmentResult.errors.map(e => e.message).join(', ')}`
      );
    }

    // Create a profile for the parent if it doesn't exist
    try {
      const existingProfiles = await dataClient.models.Profile.list({
        filter: {
          userId: { eq: parentUser.id },
        },
      });

      if (!existingProfiles.data || existingProfiles.data.length === 0) {
        await dataClient.models.Profile.create({
          userId: parentUser.id,
          profileType: 'PARENT',
          address: address ? JSON.stringify(address) : null,
          emergencyContact: emergencyContact ? JSON.stringify(emergencyContact) : null,
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error: any) {
      // Don't throw here as enrollment was successful
    }

    // Create analytics event for tracking
    try {
      await dataClient.models.AnalyticsEvent.create({
        eventName: 'parent_application_submitted',
        userId: parentUser.id,
        properties: {
          sportInterest,
          enrollmentType: enrollmentType || 'FULL_TIME',
          studentAge,
          studentGrade,
          hasPreferredCoach: !!preferredCoachId,
          applicationMethod: 'api',
        },
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    } catch (error: any) {
      // Don't throw here as enrollment was successful
    }

    // Return success response with enrollment details
    return {
      success: true,
      message: 'Parent application submitted successfully',
      data: {
        enrollmentId: enrollmentResult.data?.id,
        parentId: parentUser.id,
        studentName,
        status: 'PENDING',
        applicationNumber: `TSA-${new Date().getFullYear()}-${enrollmentResult.data?.id?.slice(-6).toUpperCase()}`,
        timelineSteps,
        nextSteps: [
          'You will receive a confirmation email within 24 hours',
          'Our team will review your application within 2-3 business days',
          'We will contact you to schedule an initial assessment',
        ],
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred while processing your application',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Helper functions for validation
function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): { valid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(field => !data[field]);
  return {
    valid: missingFields.length === 0,
    missingFields
  };
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

function validatePhone(phone?: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  return phone;
}

function validateDateFormat(date?: string): boolean {
  if (!date) return false;
  
  // Check for ISO format (YYYY-MM-DD)
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (isoRegex.test(date)) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }
  
  return false;
}

function validateFutureDate(date?: string): boolean {
  if (!validateDateFormat(date)) return false;
  
  const parsedDate = new Date(date!);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours to compare dates only
  
  return parsedDate >= today;
}

function validatePastDate(date?: string): boolean {
  if (!validateDateFormat(date)) return false;
  
  const parsedDate = new Date(date!);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours to compare dates only
  
  return parsedDate <= today;
} 