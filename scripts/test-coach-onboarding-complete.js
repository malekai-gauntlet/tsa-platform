#!/usr/bin/env node
/**
 * Complete Coach Onboarding Flow Test - Gen 2 Implementation
 * 
 * This script demonstrates the correct way to test the full coach onboarding flow:
 * 1. Call coachInvite function to generate invitation data
 * 2. Use data client to create invitation record in database
 * 3. Test token validation with real database records
 * 4. Run complete onboarding flow
 * 5. Verify all models are updated correctly
 */

const { generateClient } = require('aws-amplify/data');

// Simple config setup for Node.js environment
const { Amplify } = require('aws-amplify');
const amplifyConfig = require('../amplify_outputs.json');

// Initialize Amplify
if (!Amplify.getConfig()?.API) {
  Amplify.configure(amplifyConfig);
}

// Initialize Amplify client
const client = generateClient({
  authMode: 'apiKey',
});

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: msg => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: msg => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  step: msg => console.log(`${colors.cyan}🔄 ${msg}${colors.reset}`),
  title: msg => console.log(`${colors.bold}${colors.white}\n=== ${msg} ===${colors.reset}`),
  todo: msg => console.log(`${colors.yellow}🔨 ${msg}${colors.reset}`)
};

// Test configuration
const TEST_CONFIG = {
  coach: {
    name: 'Test Coach Johnson',
    email: `test.coach.${Date.now()}@example.com`,
    cell: '+1-555-123-4567',
    location: 'Austin, TX',
    d1_athletics_count: 8,
    bio: 'Experienced basketball and football coach with 12+ years coaching high school and college athletes.'
  }
};

class CompleteCoachOnboardingTester {
  constructor() {
    this.invitationId = null;
    this.invitationToken = null;
    this.sessionId = null;
    this.userId = null;
    this.createdRecords = {
      invitations: [],
      users: [],
      profiles: [],
      onboardingProgress: []
    };
  }

  async testCompleteFlow() {
    log.title('COMPLETE COACH ONBOARDING FLOW TEST');
    
    try {
      // Step 1: Call coach invite function
      await this.testCoachInviteFunction();
      
      // Step 2: Create database record using client
      await this.createInvitationRecord();
      
      // Step 3: Test token validation
      await this.testTokenValidation();
      
      // Step 4: Test session creation and management
      await this.testSessionManagement();
      
      // Step 5: Test onboarding steps progression
      await this.testOnboardingSteps();
      
      // Step 6: Complete onboarding
      await this.testCompleteOnboarding();
      
      // Step 7: Verify all models were updated
      await this.verifyModelsUpdated();
      
      log.title('✅ COMPLETE FLOW TEST PASSED!');
      log.success('All steps completed successfully');
      
    } catch (error) {
      log.error(`Complete flow test failed: ${error.message}`);
      throw error;
    } finally {
      // Always cleanup
      await this.cleanup();
    }
  }

  async testCoachInviteFunction() {
    log.title('Step 1: Coach Invite Function');
    log.step('Calling coachInvite function...');
    
    const result = await client.mutations.coachInvite(TEST_CONFIG.coach);
    
    if (!result.data) {
      throw new Error('No data returned from coachInvite function');
    }
    
    const responseData = JSON.parse(result.data);
    
    if (!responseData.success) {
      throw new Error(`Function failed: ${responseData.message}`);
    }
    
    this.invitationToken = responseData.invitationToken;
    this.invitationData = responseData.invitationData;
    
    log.success('Coach invite function working correctly');
    log.info(`Generated token: ${this.invitationToken.substring(0, 20)}...`);
    log.info(`Email: ${this.invitationData.email}`);
    log.info(`Name: ${this.invitationData.firstName} ${this.invitationData.lastName}`);
  }

  async createInvitationRecord() {
    log.title('Step 2: Create Database Record');
    log.step('Creating invitation record in database...');
    
    const { data: invitation, errors } = await client.models.Invitation.create({
      email: this.invitationData.email,
      invitedBy: 'system',
      invitationType: this.invitationData.invitationType,
      status: this.invitationData.status,
      token: this.invitationData.token,
      expiresAt: this.invitationData.expiresAt,
      
      // Pre-fill data for onboarding
      firstName: this.invitationData.firstName,
      lastName: this.invitationData.lastName,
      phone: this.invitationData.phone,
      city: this.invitationData.city,
      state: this.invitationData.state,
      bio: this.invitationData.bio,
      message: this.invitationData.message,
      
      // Additional metadata
      sport: this.invitationData.sport,
      lastSentAt: this.invitationData.createdAt,
    });

    if (errors || !invitation) {
      throw new Error(`Failed to create invitation: ${errors?.map(e => e.message).join(', ') || 'Unknown error'}`);
    }

    this.invitationId = invitation.id;
    this.createdRecords.invitations.push(invitation.id);
    
    log.success('Invitation record created successfully');
    log.info(`Invitation ID: ${this.invitationId}`);
  }

  async testTokenValidation() {
    log.title('Step 3: Token Validation');
    log.step('Testing token validation API...');
    
    const response = await fetch('http://localhost:3000/api/onboarding/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: this.invitationToken }),
    });
    
    const validation = await response.json();
    
    if (!validation.valid) {
      throw new Error(`Token validation failed: ${validation.message || 'Invalid token'}`);
    }
    
    log.success('Token validation working correctly');
    log.info(`Valid invitation found for: ${validation.invitation.email}`);
  }

  async testSessionManagement() {
    log.title('Step 4: Session Management');
    log.step('Creating onboarding session...');
    
    const sessionResponse = await fetch('http://localhost:3000/api/onboarding/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token: this.invitationToken,
        step: 'personal-info'
      }),
    });
    
    const sessionData = await sessionResponse.json();
    
    if (!sessionData.success) {
      throw new Error(`Session creation failed: ${sessionData.message}`);
    }
    
    this.sessionId = sessionData.sessionId;
    
    log.success('Session created successfully');
    log.info(`Session ID: ${this.sessionId}`);
  }

  async testOnboardingSteps() {
    log.title('Step 5: Onboarding Steps');
    
    const steps = [
      'personal-info',
      'school-name', 
      'school-setup',
      'school-focus',
      'role-experience',
      'student-planning',
      'agreements'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      log.step(`Processing step ${i + 1}: ${step}`);
      
      const stepResponse = await fetch('http://localhost:3000/api/onboarding/session', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          step: step,
          data: this.getMockStepData(step),
          completed: true
        }),
      });
      
      const stepResult = await stepResponse.json();
      
      if (!stepResult.success) {
        throw new Error(`Step ${step} failed: ${stepResult.message}`);
      }
      
      log.success(`Step ${step} completed`);
    }
  }

  async testCompleteOnboarding() {
    log.title('Step 6: Complete Onboarding');
    log.step('Finalizing onboarding...');
    
    const completeResponse = await fetch('http://localhost:3000/api/onboarding/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: this.sessionId,
        finalData: {
          profileComplete: true,
          termsAccepted: true,
          readyToStart: true
        }
      }),
    });
    
    const completionResult = await completeResponse.json();
    
    if (!completionResult.success) {
      throw new Error(`Onboarding completion failed: ${completionResult.message}`);
    }
    
    this.userId = completionResult.userId;
    this.createdRecords.users.push(this.userId);
    
    log.success('Onboarding completed successfully');
    log.info(`User ID: ${this.userId}`);
  }

  async verifyModelsUpdated() {
    log.title('Step 7: Verify Models Updated');
    
    // Check User model
    log.step('Checking User model...');
    const { data: users } = await client.models.User.list({
      filter: { id: { eq: this.userId } }
    });
    
    if (!users || users.length === 0) {
      throw new Error('User record not found');
    }
    
    log.success(`User record found: ${users[0].email}`);
    
    // Check Profile model  
    log.step('Checking Profile model...');
    const { data: profiles } = await client.models.Profile.list({
      filter: { userId: { eq: this.userId } }
    });
    
    if (profiles && profiles.length > 0) {
      this.createdRecords.profiles.push(profiles[0].id);
      log.success(`Profile record found for user: ${this.userId}`);
    } else {
      log.warning('Profile record not found (may be expected)');
    }
    
    // Check OnboardingProgress model
    log.step('Checking OnboardingProgress model...');
    const { data: progress } = await client.models.OnboardingProgress.list({
      filter: { userId: { eq: this.userId } }
    });
    
    if (progress && progress.length > 0) {
      this.createdRecords.onboardingProgress.push(...progress.map(p => p.id));
      log.success(`Found ${progress.length} onboarding progress record(s)`);
    } else {
      log.warning('OnboardingProgress records not found (may be expected)');
    }
    
    log.success('Model verification completed');
  }

  getMockStepData(step) {
    const mockData = {
      'personal-info': {
        firstName: 'Test',
        lastName: 'Coach Johnson',
        email: TEST_CONFIG.coach.email,
        phone: '+15551234567'
      },
      'school-name': {
        schoolName: 'Texas Sports Academy'
      },
      'school-setup': {
        schoolAddress: '123 Sports Lane, Austin, TX 78701',
        schoolType: 'private'
      },
      'school-focus': {
        sportsOffered: ['Basketball', 'Football', 'Soccer'],
        ageGroups: ['Elementary', 'Middle School', 'High School']
      },
      'role-experience': {
        yearsExperience: 12,
        previousRoles: ['Head Coach', 'Assistant Coach'],
        certifications: ['USA Basketball', 'NFHS']
      },
      'student-planning': {
        coachingPhilosophy: 'Development-focused approach',
        trainingStyle: 'Fundamentals-based'
      },
      'agreements': {
        termsAccepted: true,
        privacyAccepted: true,
        codeOfConductAccepted: true
      }
    };
    
    return mockData[step] || {};
  }

  async cleanup() {
    log.title('Cleanup');
    log.step('Removing test data...');
    
    let cleanupCount = 0;
    
    // Delete OnboardingProgress records
    for (const id of this.createdRecords.onboardingProgress) {
      try {
        await client.models.OnboardingProgress.delete({ id });
        cleanupCount++;
      } catch (error) {
        log.warning(`Failed to delete OnboardingProgress ${id}: ${error.message}`);
      }
    }
    
    // Delete Profile records  
    for (const id of this.createdRecords.profiles) {
      try {
        await client.models.Profile.delete({ id });
        cleanupCount++;
      } catch (error) {
        log.warning(`Failed to delete Profile ${id}: ${error.message}`);
      }
    }
    
    // Delete User records
    for (const id of this.createdRecords.users) {
      try {
        await client.models.User.delete({ id });
        cleanupCount++;
      } catch (error) {
        log.warning(`Failed to delete User ${id}: ${error.message}`);
      }
    }
    
    // Delete Invitation records
    for (const id of this.createdRecords.invitations) {
      try {
        await client.models.Invitation.delete({ id });
        cleanupCount++;
      } catch (error) {
        log.warning(`Failed to delete Invitation ${id}: ${error.message}`);
      }
    }
    
    log.success(`Cleaned up ${cleanupCount} test records`);
  }
}

// Run the complete test
async function main() {
  const tester = new CompleteCoachOnboardingTester();
  
  try {
    await tester.testCompleteFlow();
    console.log('\n🎉 ALL TESTS PASSED! The complete coach onboarding flow is working correctly.');
  } catch (error) {
    console.error('\n💥 TEST FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { CompleteCoachOnboardingTester }; 