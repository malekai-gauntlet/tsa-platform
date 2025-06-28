import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../data/resource';

// Gen2 automatically configures Amplify with environment variables
Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT!,
        region: process.env.AWS_REGION!,
        defaultAuthMode: 'identityPool',
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            sessionToken: process.env.AWS_SESSION_TOKEN!,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
);

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

    // Validate required fields
    if (!parentEmail || !studentName || !sportInterest) {
      throw new Error(
        'Missing required fields: parentEmail, studentName, and sportInterest are required'
      );
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
          phone: parentPhone,
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
      console.error('Error managing parent user:', error);
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
      console.error('Error creating parent profile:', error);
      // Don't throw here as enrollment was successful, just log the error
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
      console.error('Error creating analytics event:', error);
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
    console.error('Parent application error:', error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while processing your application',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
