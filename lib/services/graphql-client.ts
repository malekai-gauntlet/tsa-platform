import { generateClient } from 'aws-amplify/data';
import { getCurrentUser } from 'aws-amplify/auth';
import type { Schema } from '@/amplify/data/resource';
import { InvitationData, InvitationValidationResponse, OnboardingProgress } from '@/lib/invitation-api';

// Generate the typed GraphQL client
export const client = generateClient<Schema>();

// User operations
export const userOperations = {
  async getCurrentProfile() {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser?.userId) {
        throw new Error('No authenticated user found');
      }

      const { data: profiles } = await client.models.Profile.list({
        filter: { userId: { eq: currentUser.userId } },
      });

      return profiles?.[0] || null;
    } catch (error) {
      console.error('Error fetching current profile:', error);
      throw error;
    }
  },

  async updateProfile(profileData: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser?.userId) {
        throw new Error('No authenticated user found');
      }

      const { data: updatedProfile } = await client.models.Profile.create({
        userId: currentUser.userId,
        profileType: 'COACH',
        ...profileData,
      });
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

// Event operations
export const eventOperations = {
  async getEvents() {
    try {
      const { data: events } = await client.models.Event.list();
      return events || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async getEventById(id: string) {
    try {
      const { data: event } = await client.models.Event.get({ id });
      return event;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  async createEvent(eventData: {
    title: string;
    description?: string;
    eventType: 'TRAINING' | 'BOOTCAMP' | 'WORKSHOP' | 'COMPETITION' | 'CAMP' | 'TOURNAMENT';
    startDate: string;
    endDate: string;
    location?: any;
    capacity?: number;
    price?: number;
    [key: string]: any;
  }) {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser?.userId) {
        throw new Error('No authenticated user found');
      }

      const { data: newEvent } = await client.models.Event.create({
        title: eventData.title,
        description: eventData.description,
        eventType: eventData.eventType,
        status: 'DRAFT',
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        coachId: currentUser.userId,
        location: eventData.location,
        capacity: eventData.capacity,
        price: eventData.price,
      });
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(id: string, eventData: Record<string, any>) {
    try {
      const { data: updatedEvent } = await client.models.Event.update({
        id,
        ...eventData,
      });
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
};

// Application operations
export const applicationOperations = {
  async getApplications() {
    try {
      const { data: enrollments } = await client.models.Enrollment.list();
      return enrollments || [];
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  async getApplicationById(id: string) {
    try {
      const { data: enrollment } = await client.models.Enrollment.get({ id });
      return enrollment;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  async updateApplicationStatus(
    id: string,
    status: 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED'
  ) {
    try {
      const { data: updatedEnrollment } = await client.models.Enrollment.update({
        id,
        status,
      });
      return updatedEnrollment;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },
};

// Invitation operations
export const invitationOperations = {
  async validateInvitation(token: string): Promise<InvitationValidationResponse> {
    try {
      // Query the Invitation model to validate the token
      const { data: invitations } = await client.models.Invitation.list({
        filter: { token: { eq: token }, status: { eq: 'PENDING' } }
      });
      
      if (!invitations || invitations.length === 0) {
        return { 
          valid: false, 
          error: 'Invalid or expired invitation token' 
        };
      }
      
      const invitation = invitations[0];
      
      // Check if invitation is expired
      const expiresAt = new Date(invitation.expiresAt);
      if (expiresAt < new Date()) {
        return { 
          valid: false, 
          error: 'Invitation has expired', 
          status: 'EXPIRED' 
        };
      }
      
      // Transform Amplify data model to expected InvitationData format
      const invitationData = {
        email: invitation.email,
        role: invitation.invitationType ? invitation.invitationType.toLowerCase() : 'coach',
        firstName: invitation.firstName || '',
        lastName: invitation.lastName || '',
        phone: invitation.phone || '',
        city: invitation.city || '',
        state: invitation.state || '',
        bio: invitation.bio || '',
        message: invitation.message || '',
        fullName: `${invitation.firstName || ''} ${invitation.lastName || ''}`.trim(),
        location: invitation.city ? `${invitation.city}, ${invitation.state || ''}`.trim() : invitation.state || '',
        phoneFormatted: invitation.phone || '',
        schoolName: invitation.schoolName || '',
        schoolType: invitation.schoolType || '',
        sport: invitation.sport || ''
      };
      
      return { 
        valid: true, 
        invitation: invitationData,
        status: 'VALID'
      };
    } catch (error) {
      console.error('Error validating invitation:', error);
      return { 
        valid: false, 
        error: 'Failed to validate invitation'
      };
    }
  }
};

// Onboarding operations
export const onboardingOperations = {
  async getOnboardingProgress(
    email: string,
    invitationToken?: string
  ): Promise<OnboardingProgress | null> {
    try {
      // Query OnboardingProgress model by email
      const { data: progress } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: email } }
      });

      if (!progress || progress.length === 0) {
        // No existing progress, create a new record if we have an invitation token
        if (invitationToken) {
          const result = await invitationOperations.validateInvitation(invitationToken);
      const valid = result.valid;
      const invitation = result.invitation;
          
          if (valid && invitation && result.invitation) {
            // Create a new onboarding progress with invitation data
            const stepData = {
              personalInfo: {
                email: invitation.email,
                firstName: invitation.firstName,
                lastName: invitation.lastName,
                phone: invitation.phone,
                city: invitation.city,
                state: invitation.state
              },
              roleExperience: {
                roleType: invitation.role,
                bio: invitation.bio
              },
              schoolSetup: {
                schoolName: invitation.schoolName,
                schoolType: invitation.schoolType
              },
              schoolFocus: {
                sport: invitation.sport
              }
            };

            // Create new progress record
            const { data: newProgress } = await client.models.OnboardingProgress.create({
              email,
              userId: `temp_${Date.now()}`, // Temporary ID until user is created
              currentStep: 'PERSONAL_INFO',
              completedSteps: [],
              stepData,
              invitationBased: true,
              invitationId: invitationToken,
              lastUpdated: new Date().toISOString()
            });

            // Transform to snake_case format expected by the API
            return {
              user_id: newProgress.userId,
              email: newProgress.email,
              current_step: newProgress.currentStep.toLowerCase().replace('_', '-'),
              completed_steps: newProgress.completedSteps || [],
              step_data: newProgress.stepData,
              last_updated: newProgress.lastUpdated,
              invitation_based: newProgress.invitationBased,
              invitation_id: newProgress.invitationId
            };
          }
        }
        return null;
      }

      // Return the first progress record (should be the only one for this email)
      const existingProgress = progress[0];

      // Transform to snake_case format expected by the API
      return {
        user_id: existingProgress.userId,
        email: existingProgress.email,
        current_step: existingProgress.currentStep.toLowerCase().replace('_', '-'),
        completed_steps: existingProgress.completedSteps || [],
        step_data: existingProgress.stepData,
        last_updated: existingProgress.lastUpdated,
        invitation_based: existingProgress.invitationBased,
        invitation_id: existingProgress.invitationId
      };
    } catch (error) {
      console.error('Error fetching onboarding progress:', error);
      return null;
    }
  },

  async updateOnboardingProgress(
    email: string,
    currentStep: string,
    stepData: Record<string, any>,
    completedSteps: string[] = [],
    invitationToken?: string
  ): Promise<boolean> {
    try {
      // First check if there's an existing progress record
      const { data: progress } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: email } }
      });

      // Convert step name format from kebab-case to SNAKE_CASE
      const formattedCurrentStep = currentStep.toUpperCase().replace('-', '_');
      
      if (!progress || progress.length === 0) {
        // Create new progress record
        const newProgressData = {
          email,
          userId: `temp_${Date.now()}`, // Temporary ID until user is created
          currentStep: formattedCurrentStep,
          completedSteps,
          stepData,
          invitationBased: !!invitationToken,
          invitationId: invitationToken,
          lastUpdated: new Date().toISOString()
        };

        await client.models.OnboardingProgress.create(newProgressData);
      } else {
        // Update existing progress record
        const existingProgress = progress[0];
        const updatedCompletedSteps = [
          ...new Set([...existingProgress.completedSteps || [], ...completedSteps])
        ];

        await client.models.OnboardingProgress.update({
          id: existingProgress.id,
          currentStep: formattedCurrentStep,
          completedSteps: updatedCompletedSteps,
          stepData: {
            ...existingProgress.stepData,
            ...stepData
          },
          lastUpdated: new Date().toISOString()
        });
      }

      return true;
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
      return false;
    }
  },

  async completeOnboarding(data: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    state: string;
    bio?: string;
    role: string;
    schoolName?: string;
    completedSteps: string[];
    invitationId?: string;
  }) {
    try {
      // 1. Check if we have an existing onboarding progress
      const { data: progressRecords } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: data.email } }
      });

      const progressRecord = progressRecords?.[0];
      const invitationBased = !!data.invitationId;
      
      // 2. If invitation-based, validate the invitation
      let invitation = null;
      if (invitationBased && data.invitationId) {
        const validationResult = await invitationOperations.validateInvitation(data.invitationId);
        if (validationResult.valid && validationResult.invitation) {
          invitation = validationResult.invitation;
        }
      }

      // 3. Create User record (this would normally happen in backend Lambda)
      const { data: newUser } = await client.models.User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'COACH',
        status: 'ACTIVE'
      });

      // 4. Create Profile record
      const { data: newProfile } = await client.models.Profile.create({
        userId: newUser.id,
        profileType: 'COACH',
        bio: data.bio || '',
        onboardingComplete: true
      });
      
      // 5. If school name provided, create Education Organization record
      let schoolId = null;
      if (data.schoolName) {
        const { data: school } = await client.models.EducationOrganization.create({
          nameOfInstitution: data.schoolName,
          shortNameOfInstitution: data.schoolName.substring(0, 50),
          operationalStatus: 'Active'
        });
        schoolId = school.id;
      }

      // 6. Mark onboarding as complete by updating the progress record
      if (progressRecord) {
        await client.models.OnboardingProgress.update({
          id: progressRecord.id,
          currentStep: 'COMPLETE',
          completedSteps: [
            ...new Set([...progressRecord.completedSteps || [], ...data.completedSteps, 'COMPLETE'])
          ],
          lastUpdated: new Date().toISOString()
        });
      }

      // 7. If invitation-based, update invitation status to ACCEPTED
      if (invitationBased && data.invitationId) {
        // Get invitation by token
        const { data: invitations } = await client.models.Invitation.list({
          filter: { token: { eq: data.invitationId } }
        });
        
        if (invitations && invitations.length > 0) {
          await client.models.Invitation.update({
            id: invitations[0].id,
            status: 'ACCEPTED',
            acceptedAt: new Date().toISOString()
          });
        }
      }

      // Return success response
      return {
        message: 'Onboarding completed successfully',
        profile_id: newProfile.id,
        status: 'success',
        invitation_based: invitationBased,
        user_id: newUser.id,
        school_id: schoolId
      };
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  }
};
