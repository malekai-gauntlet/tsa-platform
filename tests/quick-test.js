const { Amplify } = require('aws-amplify');
const { generateClient } = require('aws-amplify/data');

// Load Amplify configuration
const outputs = require('../amplify_outputs.json');
Amplify.configure(outputs);

// Create client with API key authentication
const client = generateClient({
  authMode: 'apiKey',
});

async function quickTest() {
  console.log('🚀 Quick Function Status Check\n');

  // Test 1: Check if models are accessible
  console.log('📋 Test 1: Model Access');
  try {
    console.log('   Available models:', Object.keys(client.models));
    console.log('   User model:', !!client.models.User);
    console.log('   Invitation model:', !!client.models.Invitation);
    console.log('   Enrollment model:', !!client.models.Enrollment);
    console.log('   ✅ Models accessible\n');
  } catch (error) {
    console.log('   ❌ Model access failed:', error.message, '\n');
  }

  // Test 2: Coach Invite Function
  console.log('📋 Test 2: Coach Invite Function');
  try {
    const result = await client.mutations.coachInvite({
      name: 'Quick Test Coach',
      email: 'quicktest.coach@example.com',
      cell: '555-000-1111',
      location: 'Test City, TX',
      d1_athletics_count: 1,
      bio: 'Quick test coach'
    });
    
    const response = JSON.parse(result.data);
    console.log('   Success:', response.success);
    console.log('   Message:', response.message);
    if (response.error) console.log('   Error:', response.error.substring(0, 100));
    if (response.invitationToken) console.log('   ✅ Token generated');
    console.log('');
  } catch (error) {
    console.log('   ❌ Function call failed:', error.message, '\n');
  }

  // Test 3: Parent Application Function
  console.log('📋 Test 3: Parent Application Function');
  try {
    const result = await client.mutations.parentApplication({
      parentEmail: 'quicktest.parent@example.com',
      parentFirstName: 'Quick',
      parentLastName: 'Test',
      parentPhone: '555-000-2222',
      studentName: 'Quick Test Student',
      sportInterest: 'Soccer'
    });
    
    const response = JSON.parse(result.data);
    console.log('   Success:', response.success);
    console.log('   Message:', response.message);
    if (response.error) console.log('   Error:', response.error.substring(0, 100));
    if (response.data && response.data.enrollmentId) console.log('   ✅ Enrollment created');
    console.log('');
  } catch (error) {
    console.log('   ❌ Function call failed:', error.message, '\n');
  }

  // Test 4: Direct Database Operation
  console.log('📋 Test 4: Direct Database Test');
  try {
    const result = await client.models.Invitation.create({
      email: 'direct.quicktest@example.com',
      invitedBy: 'quick-test',
      invitationType: 'COACH',
      status: 'PENDING',
      token: `quick-${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      firstName: 'Quick',
      lastName: 'Direct'
    });
    
    if (result.data) {
      console.log('   ✅ Direct database operation successful');
      console.log('   Created invitation ID:', result.data.id);
    }
    if (result.errors) {
      console.log('   ❌ Database errors:', result.errors.map(e => e.message).join(', '));
    }
  } catch (error) {
    console.log('   ❌ Direct database failed:', error.message);
  }

  console.log('\n🎯 Quick test completed!');
}

// Run quick test
if (require.main === module) {
  quickTest().catch(console.error);
}

module.exports = { quickTest }; 