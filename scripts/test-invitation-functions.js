#!/usr/bin/env node
/**
 * Test script for invitation functions
 * 
 * This script tests the data access and validation functions for invitations
 */

// Import the functions to test
const { validateInvitationData, formatPhoneNumber, generateInvitationToken } = require('../lib/validation/invitation');
const { createInvitation, getInvitationByToken, getInvitationsByEmail, updateInvitation } = require('../lib/data-access/invitation');

// Setup colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Run tests and output results
 */
async function runTests() {
  console.log(`${colors.bright}${colors.cyan}=== TSA Platform Invitation Functions Test ====${colors.reset}\n`);
  
  // Array to track test results
  const results = [];
  
  // Test validation functions
  console.log(`${colors.bright}🧪 Testing validation functions...${colors.reset}`);
  
  // Test phone number formatting
  try {
    const testCases = [
      { input: '1234567890', expected: '+11234567890' },
      { input: '(123) 456-7890', expected: '+11234567890' },
      { input: '+1 (123) 456-7890', expected: '+11234567890' },
    ];
    
    testCases.forEach(({ input, expected }) => {
      const result = formatPhoneNumber(input);
      const passed = result === expected;
      
      results.push({ name: `Phone format: ${input}`, passed });
      
      console.log(
        `  ${passed ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` +
        `Format phone: "${input}" => ${result} ${passed ? '' : `(expected ${expected})`}`
      );
    });
  } catch (error) {
    console.error(`${colors.red}Error testing phone formatting: ${error.message}${colors.reset}`);
  }
  
  // Test invitation token generation
  try {
    const token1 = generateInvitationToken();
    const token2 = generateInvitationToken();
    
    const passed = token1 && token2 && token1 !== token2;
    results.push({ name: 'Generate unique tokens', passed });
    
    console.log(
      `  ${passed ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` +
      `Generate unique invitation tokens`
    );
    
    if (passed) {
      console.log(`    Token 1: ${token1}`);
      console.log(`    Token 2: ${token2}`);
    }
  } catch (error) {
    console.error(`${colors.red}Error testing token generation: ${error.message}${colors.reset}`);
  }
  
  // Test validation function
  try {
    // Valid data case
    const validData = {
      name: 'Test Coach',
      email: 'coach@example.com',
      cell: '1234567890',
      location: 'Austin, TX',
      d1_athletics_count: 5,
      bio: 'Experienced coach with multiple championships.'
    };
    
    const validResult = validateInvitationData(validData);
    results.push({ name: 'Validate valid data', passed: validResult.isValid });
    
    console.log(
      `  ${validResult.isValid ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` +
      `Validate valid coach data`
    );
    
    // Invalid data cases
    const invalidData = {
      name: '',
      email: 'invalid-email',
      cell: '123',
      location: '',
      d1_athletics_count: -1,
      bio: 'Short'
    };
    
    const invalidResult = validateInvitationData(invalidData);
    const expectedErrors = 6; // One for each field
    const passed = !invalidResult.isValid && invalidResult.errors.length === expectedErrors;
    
    results.push({ name: 'Validate invalid data', passed });
    
    console.log(
      `  ${passed ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` +
      `Validate invalid coach data (${invalidResult.errors.length} errors found)`
    );
    
    if (passed) {
      invalidResult.errors.forEach(error => {
        console.log(`    - ${error.field}: ${error.message}`);
      });
    }
  } catch (error) {
    console.error(`${colors.red}Error testing validation: ${error.message}${colors.reset}`);
  }
  
  // Test data access functions (requires sandbox environment)
  console.log(`\n${colors.bright}🧪 Testing data access functions...${colors.reset}`);
  
  try {
    // Check if Amplify is initialized (sandbox must be running)
    const { getDataClient } = require('../lib/data-access/client');
    let client;
    
    try {
      client = getDataClient();
      console.log(`  ${colors.green}✓${colors.reset} Connected to Amplify data client`);
      
      // Only proceed with data tests if client initialization worked
      if (client) {
        await testDataFunctions();
      } else {
        console.log(`  ${colors.yellow}⚠️${colors.reset} Data client not initialized, skipping data tests`);
      }
    } catch (error) {
      console.log(`  ${colors.red}✗${colors.reset} Failed to initialize data client: ${error.message}`);
      console.log(`  ${colors.yellow}⚠️${colors.reset} Make sure amplify sandbox is running`);
    }
  } catch (error) {
    console.error(`${colors.red}Error setting up data tests: ${error.message}${colors.reset}`);
  }
  
  // Summary
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  
  console.log(`\n${colors.bright}📋 Test Summary: ${colors.reset}`);
  console.log(`  ${passedTests} of ${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log(`\n${colors.green}${colors.bright}✅ All tests passed!${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}${colors.bright}⚠️ Some tests failed${colors.reset}`);
  }
}

/**
 * Test the data access functions (only run if client is initialized)
 */
async function testDataFunctions() {
  try {
    // Create a test invitation
    const testInvitation = {
      email: `test-${Date.now()}@example.com`,
      invitedBy: 'test-script',
      invitationType: 'COACH',
      status: 'PENDING',
      token: `test-token-${Date.now()}`,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      firstName: 'Test',
      lastName: 'Coach',
      phone: '+11234567890',
      city: 'Test City',
      state: 'TX',
      bio: 'Test bio for automation testing',
      message: 'Test invitation message',
      sport: 'Test Sport',
      lastSentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(`  Creating test invitation for ${testInvitation.email}...`);
    const createResult = await createInvitation(testInvitation);
    
    if (createResult.error) {
      console.log(`  ${colors.red}✗${colors.reset} Failed to create test invitation: ${createResult.error}`);
      return;
    }
    
    console.log(`  ${colors.green}✓${colors.reset} Created test invitation`);
    const invitationId = createResult.data?.id;
    
    if (!invitationId) {
      console.log(`  ${colors.red}✗${colors.reset} Created invitation is missing ID`);
      return;
    }
    
    // Get invitation by email
    console.log(`  Getting invitation by email (${testInvitation.email})...`);
    const emailResult = await getInvitationsByEmail(testInvitation.email);
    
    if (emailResult.error) {
      console.log(`  ${colors.red}✗${colors.reset} Failed to get invitation by email: ${emailResult.error}`);
    } else if (!emailResult.data || emailResult.data.length === 0) {
      console.log(`  ${colors.red}✗${colors.reset} No invitations found for email: ${testInvitation.email}`);
    } else {
      const found = emailResult.data.some(inv => inv.id === invitationId);
      console.log(`  ${found ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` + 
                 `Found ${emailResult.data.length} invitation(s) by email`);
    }
    
    // Get invitation by token
    console.log(`  Getting invitation by token (${testInvitation.token})...`);
    const tokenResult = await getInvitationByToken(testInvitation.token);
    
    if (tokenResult.error) {
      console.log(`  ${colors.red}✗${colors.reset} Failed to get invitation by token: ${tokenResult.error}`);
    } else if (!tokenResult.data) {
      console.log(`  ${colors.red}✗${colors.reset} No invitation found for token: ${testInvitation.token}`);
    } else {
      const found = tokenResult.data.id === invitationId;
      console.log(`  ${found ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` +
                 `Found invitation by token`);
    }
    
    // Update invitation
    console.log(`  Updating invitation status...`);
    const updateData = {
      status: 'ACCEPTED',
      lastSentAt: new Date().toISOString()
    };
    
    const updateResult = await updateInvitation(invitationId, updateData);
    
    if (updateResult.error) {
      console.log(`  ${colors.red}✗${colors.reset} Failed to update invitation: ${updateResult.error}`);
    } else {
      console.log(`  ${colors.green}✓${colors.reset} Updated invitation status to ACCEPTED`);
      
      // Verify update worked
      const verifyResult = await getInvitationByToken(testInvitation.token);
      const statusUpdated = verifyResult.data?.status === 'ACCEPTED';
      
      console.log(`  ${statusUpdated ? colors.green + '✓' : colors.red + '✗'} ${colors.reset}` +
                 `Verified status was updated`);
    }
  } catch (error) {
    console.error(`  ${colors.red}Error in data tests: ${error.message}${colors.reset}`);
  }
}

// Run the tests
runTests().catch(error => {
  console.error(`${colors.red}Unhandled error: ${error.message}${colors.reset}`);
  process.exit(1);
});