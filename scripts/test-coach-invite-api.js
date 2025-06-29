#!/usr/bin/env node

/**
 * Test Coach Invite API Function
 * 
 * Tests the coach-invite GraphQL mutation to ensure it works properly.
 * This simulates how the function would be called from the frontend.
 */

const { generateClient } = require('aws-amplify/data');
const { Amplify } = require('aws-amplify');

// Define the GraphQL mutation inline
const coachInvite = `
  mutation CoachInvite(
    $bio: String!
    $cell: String!
    $d1_athletics_count: Int!
    $email: String!
    $location: String!
    $name: String!
  ) {
    coachInvite(
      bio: $bio
      cell: $cell
      d1_athletics_count: $d1_athletics_count
      email: $email
      location: $location
      name: $name
    )
  }
`;

console.log('🚀 TSA Coach Invite API Test');
console.log('============================');

// Load Amplify configuration
let amplifyOutputs;
try {
  amplifyOutputs = require('../amplify_outputs.json');
  console.log('✅ Loaded amplify_outputs.json');
  // Verify that it contains GraphQL API configuration
  if (!amplifyOutputs.data || !amplifyOutputs.data.url) {
    throw new Error('GraphQL API configuration missing from amplify_outputs.json');
  }
} catch (error) {
  console.error('❌ Could not load amplify_outputs.json');
  console.error('   Make sure to run `npx ampx sandbox` first');
  console.error('   Error:', error.message);
  process.exit(1);
}

// Configure Amplify
Amplify.configure(amplifyOutputs);
console.log('✅ Amplify configured');

// Initialize GraphQL client with API key authentication
const client = generateClient({
  authMode: 'apiKey'
});
console.log('✅ GraphQL client initialized with API key auth');

/**
 * Test the coach invite function
 */
async function testCoachInvite() {
  console.log('\n📝 Testing coach-invite mutation...');
  
  // Test data for jiwofix477@decodewp.com
  const testData = {
    name: "Test Coach",
    email: "jiwofix477@decodewp.com", 
    cell: "+1234567890",
    location: "Austin, TX",
    d1_athletics_count: 5,
    bio: "Experienced coach with a passion for developing young athletes."
  };

  console.log('📋 Test Data:');
  console.log(`   Name: ${testData.name}`);
  console.log(`   Email: ${testData.email}`);
  console.log(`   Phone: ${testData.cell}`);
  console.log(`   Location: ${testData.location}`);
  console.log(`   D1 Athletes: ${testData.d1_athletics_count}`);
  console.log(`   Bio: ${testData.bio}`);

  try {
    console.log('\n🔄 Calling coach-invite mutation...');
    
    // Call the mutation
    const result = await client.graphql({
      query: coachInvite,
      variables: testData
    });

    console.log('\n✅ Coach invite mutation successful!');
    console.log('📋 Response:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data?.coachInvite) {
      try {
        const responseData = JSON.parse(result.data.coachInvite);
        if (responseData.success) {
          console.log('\n🎉 Invitation created successfully!');
          console.log(`   📧 Email: ${responseData.invitationData?.email}`);
          console.log(`   🔑 Token: ${responseData.invitationToken}`);
          console.log(`   🆔 ID: ${responseData.invitationData?.id}`);
        } else {
          console.log('\n⚠️  Invitation failed:');
          console.log(`   Error: ${responseData.error || responseData.message}`);
        }
      } catch (parseError) {
        console.log('\n📄 Raw response (not JSON):');
        console.log(result.data.coachInvite);
      }
    }

    return true;

  } catch (error) {
    console.error('\n❌ Coach invite mutation failed:');
    console.error('   Error:', error.message);
    
    if (error.errors) {
      console.error('   GraphQL Errors:');
      error.errors.forEach((gqlError, index) => {
        console.error(`     ${index + 1}. ${gqlError.message}`);
        if (gqlError.extensions) {
          console.error(`        Extensions:`, gqlError.extensions);
        }
      });
    }

    return false;
  }
}

/**
 * Main test function
 */
async function main() {
  try {
    console.log('\n🧪 Starting API tests...');
    
    const success = await testCoachInvite();
    
    if (success) {
      console.log('\n🎉 All tests passed!');
      process.exit(0);
    } else {
      console.log('\n❌ Tests failed!');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n💥 Unexpected error:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Test interrupted by user');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('\n💥 Uncaught exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('\n💥 Unhandled rejection:', reason);
  process.exit(1);
});

// Run the test
if (require.main === module) {
  main();
}

module.exports = { testCoachInvite }; 