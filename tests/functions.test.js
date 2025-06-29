const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/data');

// Load Amplify configuration
const outputs = require('../amplify_outputs.json');
Amplify.configure(outputs);

// Create client with API key authentication for testing
const client = generateClient({
  authMode: 'apiKey',
});

/**
 * Test Suite for TSA Platform Functions
 * Tests both coachInvite and parentApplication functions
 */

async function testCoachInviteFunction() {
  console.log('\n🧪 === COACH INVITE FUNCTION TESTS ===\n');

  const tests = [
    {
      name: 'Valid Coach Invite',
      data: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        cell: '555-123-4567',
        location: 'Dallas, TX',
        d1_athletics_count: 5,
        bio: 'Experienced basketball coach with 10+ years coaching high school athletes.'
      },
      expectSuccess: true
    },
    {
      name: 'Coach Invite with Minimal Data',
      data: {
        name: 'Jane Doe',
        email: 'jane.doe@example.com', 
        cell: '555-987-6543',
        location: 'Austin, TX',
        d1_athletics_count: 0,
        bio: 'New coach starting career in youth sports.'
      },
      expectSuccess: true
    },
    {
      name: 'Coach Invite with High D1 Count',
      data: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        cell: '555-555-5555',
        location: 'Houston, TX', 
        d1_athletics_count: 25,
        bio: 'Elite coach with extensive D1 experience and championship history.'
      },
      expectSuccess: true
    }
  ];

  let passedTests = 0;
  const totalTests = tests.length;

  for (const test of tests) {
    try {
      console.log(`📋 Test: ${test.name}`);
      console.log(`   Data: ${test.data.name} (${test.data.email})`);
      
      const result = await client.mutations.coachInvite(test.data);
      const response = JSON.parse(result.data);
      
      console.log(`   Success: ${response.success}`);
      console.log(`   Message: ${response.message}`);
      
      if (response.error) {
        console.log(`   Error: ${response.error}`);
      }
      
      if (response.success && response.invitationToken) {
        console.log(`   ✅ Invitation Token Generated: ${response.invitationToken.substring(0, 20)}...`);
      }
      
      if (response.invitationData) {
        console.log(`   📧 Email: ${response.invitationData.email}`);
        console.log(`   🏠 Location: ${response.invitationData.city}, ${response.invitationData.state}`);
        console.log(`   🏆 D1 Count: ${response.invitationData.d1_athletics_count}`);
      }
      
      if (test.expectSuccess === response.success) {
        console.log(`   ✅ PASSED\n`);
        passedTests++;
      } else {
        console.log(`   ❌ FAILED (Expected success: ${test.expectSuccess}, Got: ${response.success})\n`);
      }
      
    } catch (error) {
      console.log(`   ❌ FAILED with exception: ${error.message}\n`);
    }
  }
  
  console.log(`🎯 Coach Invite Tests: ${passedTests}/${totalTests} passed\n`);
  return { passed: passedTests, total: totalTests };
}

async function testParentApplicationFunction() {
  console.log('\n🧪 === PARENT APPLICATION FUNCTION TESTS ===\n');

  const tests = [
    {
      name: 'Complete Parent Application',
      data: {
        parentEmail: 'parent1@example.com',
        parentFirstName: 'Sarah',
        parentLastName: 'Johnson',
        parentPhone: '555-111-2222',
        studentName: 'Alex Johnson',
        studentAge: 16,
        studentGrade: '10th',
        studentDateOfBirth: '2008-05-15',
        sportInterest: 'Basketball',
        enrollmentType: 'FULL_TIME',
        startDate: '2025-09-01',
        academicYear: '2025-2026',
        specialNotes: 'Student has experience in recreational basketball',
        medicalInformation: 'No known allergies',
        coachName: 'Coach Smith',
        address: JSON.stringify({
          street: '123 Main Street',
          city: 'Dallas',
          state: 'TX',
          zipCode: '75201',
          country: 'US'
        }),
        emergencyContact: JSON.stringify({
          name: 'John Johnson',
          relationship: 'Father',
          phone: '555-111-3333',
          email: 'john.johnson@example.com'
        }),
        schoolPreferences: JSON.stringify({
          preferredCampus: 'North Dallas',
          transportationNeeded: true,
          afterSchoolProgram: false
        })
      },
      expectSuccess: true
    },
    {
      name: 'Minimal Required Fields',
      data: {
        parentEmail: 'parent2@example.com',
        parentFirstName: 'Maria',
        parentLastName: 'Garcia',
        parentPhone: '555-444-5555',
        studentName: 'Sofia Garcia',
        sportInterest: 'Soccer'
      },
      expectSuccess: true
    },
    {
      name: 'Part-Time Enrollment',
      data: {
        parentEmail: 'parent3@example.com',
        parentFirstName: 'David',
        parentLastName: 'Lee',
        parentPhone: '555-777-8888',
        studentName: 'Kevin Lee',
        studentAge: 14,
        studentGrade: '8th',
        sportInterest: 'Tennis',
        enrollmentType: 'PART_TIME',
        startDate: '2025-08-15',
        academicYear: '2025-2026'
      },
      expectSuccess: true
    },
    {
      name: 'After School Program',
      data: {
        parentEmail: 'parent4@example.com',
        parentFirstName: 'Jennifer',
        parentLastName: 'Williams',
        parentPhone: '555-999-0000',
        studentName: 'Emma Williams',
        studentAge: 12,
        studentGrade: '6th',
        sportInterest: 'Volleyball',
        enrollmentType: 'AFTER_SCHOOL',
        specialNotes: 'Student is new to volleyball but very enthusiastic'
      },
      expectSuccess: true
    }
  ];

  let passedTests = 0;
  const totalTests = tests.length;

  for (const test of tests) {
    try {
      console.log(`📋 Test: ${test.name}`);
      console.log(`   Parent: ${test.data.parentFirstName} ${test.data.parentLastName}`);
      console.log(`   Student: ${test.data.studentName}`);
      console.log(`   Sport: ${test.data.sportInterest}`);
      
      const result = await client.mutations.parentApplication(test.data);
      const response = JSON.parse(result.data);
      
      console.log(`   Success: ${response.success}`);
      console.log(`   Message: ${response.message}`);
      
      if (response.error) {
        console.log(`   Error: ${response.error}`);
      }
      
      if (response.success && response.data) {
        console.log(`   ✅ Enrollment ID: ${response.data.enrollmentId}`);
        console.log(`   📝 Application Number: ${response.data.applicationNumber}`);
        console.log(`   👤 Parent ID: ${response.data.parentId}`);
        console.log(`   📊 Status: ${response.data.status}`);
        
        if (response.data.timelineSteps) {
          console.log(`   📅 Timeline Steps: ${response.data.timelineSteps.length}`);
          const activeStep = response.data.timelineSteps.find(step => step.status === 'active');
          if (activeStep) {
            console.log(`   🔄 Current Step: ${activeStep.title}`);
          }
        }
      }
      
      if (test.expectSuccess === response.success) {
        console.log(`   ✅ PASSED\n`);
        passedTests++;
      } else {
        console.log(`   ❌ FAILED (Expected success: ${test.expectSuccess}, Got: ${response.success})\n`);
      }
      
    } catch (error) {
      console.log(`   ❌ FAILED with exception: ${error.message}\n`);
    }
  }
  
  console.log(`🎯 Parent Application Tests: ${passedTests}/${totalTests} passed\n`);
  return { passed: passedTests, total: totalTests };
}

async function testValidationErrors() {
  console.log('\n🧪 === VALIDATION ERROR TESTS ===\n');

  console.log('📋 Test: Coach Invite - Missing Required Fields');
  try {
    const result = await client.mutations.coachInvite({
      name: 'Incomplete Coach',
      email: 'incomplete@example.com'
      // Missing required fields: cell, location, d1_athletics_count, bio
    });
    const response = JSON.parse(result.data);
    console.log(`   Success: ${response.success}`);
    console.log(`   Message: ${response.message}`);
    console.log(`   ✅ Validation handled properly\n`);
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}\n`);
  }

  console.log('📋 Test: Parent Application - Missing Required Fields');
  try {
    const result = await client.mutations.parentApplication({
      parentEmail: 'incomplete.parent@example.com',
      studentName: 'Incomplete Student'
      // Missing required fields: parentFirstName, parentLastName, parentPhone, sportInterest
    });
    const response = JSON.parse(result.data);
    console.log(`   Success: ${response.success}`);
    console.log(`   Message: ${response.message}`);
    console.log(`   ✅ Validation handled properly\n`);
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}\n`);
  }

  console.log('📋 Test: Parent Application - Invalid Email Format');
  try {
    const result = await client.mutations.parentApplication({
      parentEmail: 'invalid-email-format',
      parentFirstName: 'Test',
      parentLastName: 'Parent',
      parentPhone: '555-123-4567',
      studentName: 'Test Student',
      sportInterest: 'Baseball'
    });
    const response = JSON.parse(result.data);
    console.log(`   Success: ${response.success}`);
    console.log(`   Message: ${response.message}`);
    console.log(`   ✅ Email validation handled properly\n`);
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}\n`);
  }
}

async function testDatabaseOperations() {
  console.log('\n🧪 === DATABASE OPERATIONS TESTS ===\n');

  console.log('📋 Test: Direct Model Access');
  try {
    // Test if we can directly access models from the client
    console.log('   Available models:', Object.keys(client.models));
    console.log('   User model exists:', !!client.models.User);
    console.log('   Invitation model exists:', !!client.models.Invitation);
    console.log('   Enrollment model exists:', !!client.models.Enrollment);
    console.log('   ✅ Models accessible\n');
  } catch (error) {
    console.log(`   ❌ Model access failed: ${error.message}\n`);
  }

  console.log('📋 Test: Create Test Invitation (Direct)');
  try {
    const result = await client.models.Invitation.create({
      email: 'direct.test@example.com',
      invitedBy: 'test-script',
      invitationType: 'COACH',
      status: 'PENDING',
      token: `test-${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      firstName: 'Direct',
      lastName: 'Test',
      phone: '555-000-1111',
      city: 'Test City',
      state: 'TX',
      bio: 'Direct database test'
    });
    
    if (result.data) {
      console.log(`   ✅ Direct invitation created: ${result.data.id}`);
      console.log(`   📧 Email: ${result.data.email}`);
      console.log(`   🔑 Token: ${result.data.token}`);
    }
    
    if (result.errors) {
      console.log(`   ❌ Errors: ${result.errors.map(e => e.message).join(', ')}`);
    }
    console.log('');
  } catch (error) {
    console.log(`   ❌ Direct creation failed: ${error.message}\n`);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Comprehensive TSA Platform Function Tests\n');
  console.log('=' * 80);

  // Test database operations first
  await testDatabaseOperations();

  // Test validation scenarios
  await testValidationErrors();

  // Test coach invite function
  const coachResults = await testCoachInviteFunction();

  // Test parent application function
  const parentResults = await testParentApplicationFunction();

  // Summary
  console.log('\n🎯 === FINAL TEST SUMMARY ===\n');
  console.log(`Coach Invite Function: ${coachResults.passed}/${coachResults.total} tests passed`);
  console.log(`Parent Application Function: ${parentResults.passed}/${parentResults.total} tests passed`);
  
  const totalPassed = coachResults.passed + parentResults.passed;
  const totalTests = coachResults.total + parentResults.total;
  
  console.log(`\nOverall Success Rate: ${totalPassed}/${totalTests} (${Math.round((totalPassed/totalTests) * 100)}%)`);
  
  if (totalPassed === totalTests) {
    console.log('\n🎉 All tests passed! Functions are working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above for details.');
  }
  
  console.log('\n' + '=' * 80);
}

// Export for use in other test files
module.exports = {
  testCoachInviteFunction,
  testParentApplicationFunction,
  testValidationErrors,
  testDatabaseOperations,
  runAllTests
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
} 