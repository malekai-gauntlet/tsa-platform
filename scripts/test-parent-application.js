const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/data');

// Load Amplify configuration
const outputs = require('../amplify_outputs.json');
Amplify.configure(outputs);

// Create client with API key authentication for testing
const client = generateClient({
  authMode: 'apiKey',
});

async function testParentApplication() {
  console.log('🧪 Testing Parent Application API...\n');

  const testData = {
    // Required fields
    parentEmail: 'test.parent@example.com',
    studentName: 'John Test Student',
    sportInterest: 'Basketball',

    // Optional fields
    parentFirstName: 'Jane',
    parentLastName: 'Test',
    parentPhone: '+1-555-123-4567',
    studentAge: 16,
    studentGrade: '10th',
    studentDateOfBirth: '2008-03-15',
    enrollmentType: 'FULL_TIME',
    startDate: '2025-09-01',
    academicYear: '2025-2026',
    specialNotes: 'Test student with basketball experience',
    medicalInformation: 'No known allergies',
    coachName: 'Coach Test',
    address: JSON.stringify({
      street: '123 Test Street',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      country: 'US',
    }),
    emergencyContact: JSON.stringify({
      name: 'John Test Sr.',
      relationship: 'Father',
      phone: '+1-555-987-6543',
      email: 'john.test.sr@example.com',
    }),
    schoolPreferences: JSON.stringify({
      preferredCampus: 'North Dallas',
      transportationNeeded: true,
      afterSchoolProgram: false,
    }),
  };

  try {
    console.log('📤 Submitting parent application with data:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n⏳ Processing...\n');

    const result = await client.mutations.parentApplication(testData);

    console.log('✅ SUCCESS! Parent application submitted');
    console.log('📋 Response:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data) {
      // Parse the JSON response
      const responseData = JSON.parse(result.data);
      const { success, message, data } = responseData;

      console.log('\n📊 Summary:');
      console.log(`Status: ${success ? '✅ Success' : '❌ Failed'}`);
      console.log(`Message: ${message}`);

      if (data) {
        console.log(`Application Number: ${data.applicationNumber}`);
        console.log(`Enrollment ID: ${data.enrollmentId}`);
        console.log(`Parent ID: ${data.parentId}`);
        console.log(`Student Name: ${data.studentName}`);
        console.log(`Status: ${data.status}`);

        if (data.timelineSteps && data.timelineSteps.length > 0) {
          console.log('\n📅 Timeline Steps:');
          data.timelineSteps.forEach(step => {
            console.log(`  ${step.id}. ${step.title} - ${step.status}`);
            console.log(`     ${step.description}`);
          });
        }

        if (data.nextSteps && data.nextSteps.length > 0) {
          console.log('\n➡️  Next Steps:');
          data.nextSteps.forEach((step, index) => {
            console.log(`  ${index + 1}. ${step}`);
          });
        }
      }
    }
  } catch (error) {
    console.error('❌ ERROR testing parent application:');
    console.error(error);

    if (error.errors) {
      console.error('\nGraphQL Errors:');
      error.errors.forEach((err, index) => {
        console.error(`  ${index + 1}. ${err.message}`);
        if (err.extensions) {
          console.error(`     Code: ${err.extensions.code}`);
        }
      });
    }
  }
}

async function testCoachInvite() {
  console.log('\n🧪 Testing Coach Invite API...\n');

  const testData = {
    name: 'Coach Test Smith',
    email: 'coach.test@example.com',
    cell: '555-123-4567',
    location: 'Dallas, TX',
    d1_athletics_count: 5,
    bio: 'Experienced basketball coach with 10+ years coaching high school and college level athletes. Former college player with expertise in player development and team strategy.',
  };

  try {
    console.log('📤 Submitting coach invite with data:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n⏳ Processing...\n');

    const result = await client.mutations.coachInvite(testData);

    console.log('✅ SUCCESS! Coach invite processed');
    console.log('📋 Response:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data) {
      // Parse the JSON response
      const responseData = JSON.parse(result.data);
      const { success, message, invitationToken, invitationData } = responseData;

      console.log('\n📊 Summary:');
      console.log(`Status: ${success ? '✅ Success' : '❌ Failed'}`);
      console.log(`Message: ${message}`);

      if (invitationToken) {
        console.log(`Invitation Token: ${invitationToken}`);
      }

      if (invitationData) {
        console.log('\n👤 Invitation Data:');
        console.log(`Name: ${invitationData.firstName} ${invitationData.lastName}`);
        console.log(`Email: ${invitationData.email}`);
        console.log(`Phone: ${invitationData.phone}`);
        console.log(`Location: ${invitationData.city}, ${invitationData.state}`);
        console.log(`D1 Athletes: ${invitationData.d1_athletics_count}`);
        console.log(`Message: ${invitationData.message}`);
      }
    }
  } catch (error) {
    console.error('❌ ERROR testing coach invite:');
    console.error(error);

    if (error.errors) {
      console.error('\nGraphQL Errors:');
      error.errors.forEach((err, index) => {
        console.error(`  ${index + 1}. ${err.message}`);
        if (err.extensions) {
          console.error(`     Code: ${err.extensions.code}`);
        }
      });
    }
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests for TSA Platform\n');
  console.log('=' * 50);

  // Test Parent Application API
  await testParentApplication();

  console.log('\n' + '=' * 50);

  // Test Coach Invite API
  await testCoachInvite();

  console.log('\n' + '=' * 50);
  console.log('🎯 All tests completed!');
}

// Run the tests
runTests().catch(console.error);
