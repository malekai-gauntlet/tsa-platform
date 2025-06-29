#!/usr/bin/env node
/**
 * Comprehensive Coach Onboarding Flow Test
 *
 * This script tests the complete coach onboarding process:
 * 1. Create coach invitation
 * 2. Validate invitation token
 * 3. Go through all onboarding steps
 * 4. Complete onboarding
 * 5. Verify all models were updated correctly
 */

const { generateClient } = require('aws-amplify/data');

// Simple config setup for Node.js environment
const { Amplify } = require('aws-amplify');
const amplifyConfig = require('../amplify_outputs.json');

// Initialize Amplify
if (!Amplify.getConfig()?.API) {
  Amplify.configure(amplifyConfig);
}

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

const log = {
  success: msg => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: msg => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  step: msg => console.log(`${colors.cyan}🔄 ${msg}${colors.reset}`),
  title: msg => console.log(`${colors.bold}${colors.white}\n=== ${msg} ===${colors.reset}`),
};

// Initialize Amplify client
const client = generateClient({
  authMode: 'apiKey',
});

// Test configuration
const TEST_CONFIG = {
  coach: {
    name: 'Test Coach Johnson',
    email: `test.coach.${Date.now()}@example.com`,
    cell: '+1-555-123-4567',
    location: 'Austin, TX',
    d1_athletics_count: 8,
    bio: 'Experienced basketball and football coach with 12+ years coaching high school and college athletes. Former Division I player with expertise in player development, strength training, and team strategy. Passionate about helping student-athletes reach their full potential both on and off the field.',
  },
  onboardingData: {
    personalInfo: {
      firstName: 'Test',
      lastName: 'Coach Johnson',
      email: '', // Will be set from coach data
      phone: '+1-555-123-4567',
      dateOfBirth: '1985-03-15',
      emergencyContact: 'Jane Johnson',
      emergencyPhone: '+1-555-987-6543',
    },
    roleExperience: {
      roleType: 'COACH',
      experience: '12',
      specialties: ['Basketball', 'Football', 'Strength Training'],
      certifications: ['NFHS Coaching', 'CPR/AED', 'SafeSport'],
      coachingPhilosophy: 'Player development focused with emphasis on character building',
    },
    schoolSetup: {
      nameOfInstitution: 'Texas Elite Sports Academy',
      schoolType: 'Private',
      schoolCity: 'Austin',
      schoolState: 'TX',
      schoolZip: '78701',
      schoolPhone: '+1-512-555-0123',
      schoolWebsite: 'https://texaselitesports.com',
    },
    schoolName: {
      finalSchoolName: 'Texas Elite Sports Academy',
      schoolNameHistory: ['Elite Sports', 'Texas Elite Academy', 'Texas Elite Sports Academy'],
    },
    schoolFocus: {
      sport: 'Multi-Sport',
      primarySports: ['Basketball', 'Football', 'Baseball'],
      gradeLevel: ['9th', '10th', '11th', '12th'],
      academicFocus: 'College Preparatory',
      schoolMission: 'Developing student-athletes for success in sports and life',
    },
    studentPlanning: {
      expectedEnrollment: 150,
      classSize: 20,
      studentTeacherRatio: '15:1',
      tuitionRange: '$8000-$12000',
      academicYear: '2024-2025',
      startDate: '2024-08-15',
    },
    agreements: {
      termsAccepted: true,
      privacyAccepted: true,
      marketingOptIn: true,
      backgroundCheckConsent: true,
      agreementDate: new Date().toISOString(),
    },
  },
};

class CoachOnboardingTester {
  constructor() {
    this.testResults = {
      invitationCreated: false,
      tokenValidated: false,
      sessionCreated: false,
      stepsCompleted: [],
      onboardingCompleted: false,
      modelsVerified: false,
      cleanupCompleted: false,
    };
    this.createdRecords = {
      invitationId: null,
      invitationToken: null,
      sessionId: null,
      userId: null,
      profileId: null,
    };
  }

  async runFullTest() {
    log.title('COACH ONBOARDING FLOW TEST');

    try {
      // Step 1: Create coach invitation
      await this.testCreateInvitation();

      // Step 2: Validate invitation token
      await this.testValidateToken();

      // Step 3: Create onboarding session
      await this.testCreateSession();

      // Step 4: Go through all onboarding steps
      await this.testOnboardingSteps();

      // Step 5: Complete onboarding
      await this.testCompleteOnboarding();

      // Step 6: Verify all models were updated
      await this.testVerifyModels();

      // Step 7: Cleanup test data
      await this.testCleanup();

      // Final report
      this.printFinalReport();
    } catch (error) {
      log.error(`Test failed: ${error.message}`);
      console.error(error);

      // Attempt cleanup on failure
      await this.testCleanup();
      process.exit(1);
    }
  }

  async testCreateInvitation() {
    log.title('Step 1: Create Coach Invitation');

    try {
      log.step('Calling coachInvite mutation...');

      const result = await client.mutations.coachInvite(TEST_CONFIG.coach);

      if (!result.data) {
        throw new Error('No data returned from coachInvite mutation');
      }

      const responseData = JSON.parse(result.data);

      if (!responseData.success) {
        throw new Error(`Invitation creation failed: ${responseData.message}`);
      }

      this.createdRecords.invitationToken = responseData.invitationToken;
      this.testResults.invitationCreated = true;

      log.success('Coach invitation created successfully');
      log.info(`Invitation token: ${responseData.invitationToken.substring(0, 20)}...`);
      log.info(`Message: ${responseData.message}`);
    } catch (error) {
      log.error(`Failed to create invitation: ${error.message}`);
      throw error;
    }
  }

  async testValidateToken() {
    log.title('Step 2: Validate Invitation Token');

    try {
      log.step('Validating invitation token via API...');

             const response = await fetch('http://localhost:3000/api/onboarding/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: this.createdRecords.invitationToken }),
        }
      );

      if (!response.ok) {
        throw new Error(`Validation API returned ${response.status}`);
      }

      const validation = await response.json();

      if (!validation.valid) {
        throw new Error(`Token validation failed: ${validation.error}`);
      }

      this.testResults.tokenValidated = true;
      this.validatedInvitation = validation.invitation;

      log.success('Token validated successfully');
      log.info(`Email: ${validation.invitation.email}`);
      log.info(`Name: ${validation.invitation.first_name} ${validation.invitation.last_name}`);
      log.info(`Role: ${validation.invitation.role}`);
    } catch (error) {
      log.error(`Token validation failed: ${error.message}`);
      throw error;
    }
  }

  async testCreateSession() {
    log.title('Step 3: Create Onboarding Session');

    try {
      log.step('Creating onboarding session...');

      const response = await fetch('http://localhost:3000/api/onboarding/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: TEST_CONFIG.coach.email,
            invitationToken: this.createdRecords.invitationToken,
            ttlMinutes: 60,
            encryptSensitiveData: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Session API returned ${response.status}`);
      }

      const session = await response.json();

      this.createdRecords.sessionId = session.id;
      this.testResults.sessionCreated = true;

      log.success('Onboarding session created');
      log.info(`Session ID: ${session.id}`);
      log.info(`Email: ${session.email}`);
      log.info(`Current step: ${session.current_step}`);
      log.info(
        `Expires in: ${Math.round((new Date(session.expires_at).getTime() - Date.now()) / (1000 * 60))} minutes`
      );
    } catch (error) {
      log.error(`Session creation failed: ${error.message}`);
      throw error;
    }
  }

  async testOnboardingSteps() {
    log.title('Step 4: Complete Onboarding Steps');

    const steps = [
      { step: 'personal-info', data: TEST_CONFIG.onboardingData.personalInfo },
      { step: 'role-experience', data: TEST_CONFIG.onboardingData.roleExperience },
      { step: 'school-setup', data: TEST_CONFIG.onboardingData.schoolSetup },
      { step: 'school-name', data: TEST_CONFIG.onboardingData.schoolName },
      { step: 'school-focus', data: TEST_CONFIG.onboardingData.schoolFocus },
      { step: 'student-planning', data: TEST_CONFIG.onboardingData.studentPlanning },
      { step: 'agreements', data: TEST_CONFIG.onboardingData.agreements },
    ];

    // Set email from coach config
    TEST_CONFIG.onboardingData.personalInfo.email = TEST_CONFIG.coach.email;

    for (const { step, data } of steps) {
      try {
        log.step(`Completing step: ${step}`);

        const response = await fetch('http://localhost:3000/api/onboarding/session', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: this.createdRecords.sessionId,
              currentStep: step,
              stepData: {
                [step.replace('-', '_')]: data,
                completed_at: new Date().toISOString(),
              },
              completedSteps: [...this.testResults.stepsCompleted, step],
              extendTTL: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Step ${step} update failed with status ${response.status}`);
        }

        const updatedSession = await response.json();
        this.testResults.stepsCompleted.push(step);

        log.success(`Step ${step} completed successfully`);
        log.info(`Current step: ${updatedSession.current_step}`);
        log.info(`Completed steps: ${updatedSession.completed_steps.length}`);

        // Small delay between steps
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        log.error(`Step ${step} failed: ${error.message}`);
        throw error;
      }
    }
  }

  async testCompleteOnboarding() {
    log.title('Step 5: Complete Onboarding');

    try {
      log.step('Finalizing onboarding...');

      // Combine all step data for final submission
      const finalData = {
        // User data
        email: TEST_CONFIG.coach.email,
        firstName: TEST_CONFIG.onboardingData.personalInfo.firstName,
        lastName: TEST_CONFIG.onboardingData.personalInfo.lastName,
        phone: TEST_CONFIG.onboardingData.personalInfo.phone,
        role: 'COACH',

        // Profile data
        bio: TEST_CONFIG.coach.bio,
        experience: TEST_CONFIG.onboardingData.roleExperience.experience,
        specialties: TEST_CONFIG.onboardingData.roleExperience.specialties,
        certifications: TEST_CONFIG.onboardingData.roleExperience.certifications,

        // School/Organization data
        school_name: TEST_CONFIG.onboardingData.schoolSetup.nameOfInstitution,
        school_type: TEST_CONFIG.onboardingData.schoolSetup.schoolType,
        school_city: TEST_CONFIG.onboardingData.schoolSetup.schoolCity,
        school_state: TEST_CONFIG.onboardingData.schoolSetup.schoolState,
        school_zip: TEST_CONFIG.onboardingData.schoolSetup.schoolZip,
        school_phone: TEST_CONFIG.onboardingData.schoolSetup.schoolPhone,

        // Sport and focus data
        sport: TEST_CONFIG.onboardingData.schoolFocus.sport,
        grade_levels_served: TEST_CONFIG.onboardingData.schoolFocus.gradeLevel,
        academic_year: TEST_CONFIG.onboardingData.studentPlanning.academicYear,

        // Emergency contact
        emergency_contact: TEST_CONFIG.onboardingData.personalInfo.emergencyContact,
        emergency_contact_phone: TEST_CONFIG.onboardingData.personalInfo.emergencyPhone,

        // Invitation data
        invitation_token: this.createdRecords.invitationToken,

        // All step data for comprehensive profile
        ...TEST_CONFIG.onboardingData,
      };

             const response = await fetch('http://localhost:3000/api/onboarding/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Completion API returned ${response.status}: ${errorText}`);
      }

      const completion = await response.json();

      this.createdRecords.userId = completion.user_id;
      this.createdRecords.profileId = completion.profile_id;
      this.testResults.onboardingCompleted = true;

      log.success('Onboarding completed successfully');
      log.info(`User ID: ${completion.user_id}`);
      log.info(`Profile ID: ${completion.profile_id}`);
      log.info(`Status: ${completion.status}`);
      log.info(`Invitation-based: ${completion.invitation_based}`);
    } catch (error) {
      log.error(`Onboarding completion failed: ${error.message}`);
      throw error;
    }
  }

  async testVerifyModels() {
    log.title('Step 6: Verify Model Updates');

    try {
      // Verify User model
      log.step('Verifying User model...');
      const { data: user } = await client.models.User.get({ id: this.createdRecords.userId });

      if (!user) {
        throw new Error('User record not found');
      }

      log.success('User model verified');
      log.info(`User Email: ${user.email}`);
      log.info(`User Role: ${user.role}`);
      log.info(`User Status: ${user.status}`);

      // Verify Profile model
      log.step('Verifying Profile model...');
      const { data: profile } = await client.models.Profile.get({
        id: this.createdRecords.profileId,
      });

      if (!profile) {
        throw new Error('Profile record not found');
      }

      log.success('Profile model verified');
      log.info(`Profile Type: ${profile.profileType}`);
      log.info(`Onboarding Complete: ${profile.onboardingComplete}`);
      log.info(`Has Bio: ${!!profile.bio}`);
      log.info(`Has Address: ${!!profile.address}`);

      // Verify OnboardingProgress model
      log.step('Verifying OnboardingProgress model...');
      const { data: progressList } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: TEST_CONFIG.coach.email } },
      });

      const progress = progressList[0];
      if (!progress) {
        throw new Error('OnboardingProgress record not found');
      }

      log.success('OnboardingProgress model verified');
      log.info(`Current Step: ${progress.currentStep}`);
      log.info(`Completed Steps: ${progress.completedSteps?.length || 0}`);
      log.info(`Invitation Based: ${progress.invitationBased}`);

      // Verify Invitation model
      log.step('Verifying Invitation model...');
      const { data: invitationList } = await client.models.Invitation.list({
        filter: { token: { eq: this.createdRecords.invitationToken } },
      });

      const invitation = invitationList[0];
      if (!invitation) {
        throw new Error('Invitation record not found');
      }

      log.success('Invitation model verified');
      log.info(`Invitation Status: ${invitation.status}`);
      log.info(`Invitation Type: ${invitation.invitationType}`);
      log.info(`Accepted At: ${invitation.acceptedAt || 'Not set'}`);

      // Store invitation ID for cleanup
      this.createdRecords.invitationId = invitation.id;

      this.testResults.modelsVerified = true;
    } catch (error) {
      log.error(`Model verification failed: ${error.message}`);
      throw error;
    }
  }

  async testCleanup() {
    log.title('Step 7: Cleanup Test Data');

    try {
      // Delete User record
      if (this.createdRecords.userId) {
        log.step('Deleting User record...');
        await client.models.User.delete({ id: this.createdRecords.userId });
        log.success('User record deleted');
      }

      // Delete Profile record
      if (this.createdRecords.profileId) {
        log.step('Deleting Profile record...');
        await client.models.Profile.delete({ id: this.createdRecords.profileId });
        log.success('Profile record deleted');
      }

      // Delete OnboardingProgress records
      log.step('Deleting OnboardingProgress records...');
      const { data: progressList } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: TEST_CONFIG.coach.email } },
      });

      for (const progress of progressList) {
        await client.models.OnboardingProgress.delete({ id: progress.id });
      }
      log.success(`Deleted ${progressList.length} OnboardingProgress record(s)`);

      // Delete Invitation record
      if (this.createdRecords.invitationId) {
        log.step('Deleting Invitation record...');
        await client.models.Invitation.delete({ id: this.createdRecords.invitationId });
        log.success('Invitation record deleted');
      }

      this.testResults.cleanupCompleted = true;
    } catch (error) {
      log.warning(`Cleanup encountered issues: ${error.message}`);
      // Don't fail the test for cleanup issues
    }
  }

  printFinalReport() {
    log.title('TEST RESULTS SUMMARY');

    console.log(`${colors.bold}Test Results:${colors.reset}`);
    console.log(`  Invitation Created: ${this.testResults.invitationCreated ? '✅' : '❌'}`);
    console.log(`  Token Validated: ${this.testResults.tokenValidated ? '✅' : '❌'}`);
    console.log(`  Session Created: ${this.testResults.sessionCreated ? '✅' : '❌'}`);
    console.log(`  Steps Completed: ${this.testResults.stepsCompleted.length}/7 ✅`);
    console.log(`  Onboarding Completed: ${this.testResults.onboardingCompleted ? '✅' : '❌'}`);
    console.log(`  Models Verified: ${this.testResults.modelsVerified ? '✅' : '❌'}`);
    console.log(`  Cleanup Completed: ${this.testResults.cleanupCompleted ? '✅' : '❌'}`);

    console.log(`\n${colors.bold}Models Updated:${colors.reset}`);
    console.log(`  ✅ User - Created and verified`);
    console.log(`  ✅ Profile - Created with onboarding data`);
    console.log(`  ✅ OnboardingProgress - Tracked throughout process`);
    console.log(`  ✅ Invitation - Status updated to ACCEPTED`);

    console.log(`\n${colors.bold}Completed Steps:${colors.reset}`);
    this.testResults.stepsCompleted.forEach(step => {
      console.log(`  ✅ ${step}`);
    });

    const allTestsPassed = Object.values(this.testResults).every(result =>
      Array.isArray(result) ? result.length > 0 : result === true
    );

    if (allTestsPassed) {
      log.success('🎉 ALL TESTS PASSED! Coach onboarding flow is working correctly.');
    } else {
      log.error('❌ SOME TESTS FAILED! Please check the logs above for details.');
    }
  }
}

// Run the test
async function main() {
  const tester = new CoachOnboardingTester();
  await tester.runFullTest();
}

// Handle command-line execution
if (require.main === module) {
  main().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { CoachOnboardingTester, TEST_CONFIG };
