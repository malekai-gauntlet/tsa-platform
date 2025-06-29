#!/usr/bin/env tsx

/**
 * TSA Token Verification Test
 *
 * This script tests the complete token verification flow:
 * 1. Send an invitation email to get a token
 * 2. Validate the token using the onboarding API
 * 3. Verify the returned invitation data
 */

import { invitationAPI } from '../lib/invitation-api';

interface TestResult {
  success: boolean;
  step: string;
  details?: any;
  error?: string;
}

async function testTokenVerification(): Promise<void> {
  console.log('🧪 Starting TSA Token Verification Test\n');

  const results: TestResult[] = [];

  try {
    // Step 1: Use the token from our previous email test
    const testToken = 'tsa-invite-49f407751d134ba1033a4e7a2b4866de'; // From our earlier test
    console.log(`🔑 Testing token: ${testToken}`);

    // Step 2: Test token validation using the invitation API
    console.log('\n📋 Step 1: Testing token validation...');

    try {
      const validationResult = await invitationAPI.validateInvitation(testToken);

      if (validationResult.valid && validationResult.invitation) {
        console.log('✅ Token validation PASSED');
        console.log('📧 Email:', validationResult.invitation.email);
        console.log('👤 Name:', validationResult.invitation.fullName);
        console.log('📍 Location:', validationResult.invitation.location);
        console.log('📱 Phone:', validationResult.invitation.phoneFormatted);

        results.push({
          success: true,
          step: 'Token Validation',
          details: {
            email: validationResult.invitation.email,
            name: validationResult.invitation.fullName,
            role: validationResult.invitation.role,
          },
        });
      } else {
        console.log('❌ Token validation FAILED');
        console.log('Error:', validationResult.error);

        results.push({
          success: false,
          step: 'Token Validation',
          error: validationResult.error,
        });
      }
    } catch (error: any) {
      console.log('❌ Token validation ERROR');
      console.log('Error details:', error.message);

      results.push({
        success: false,
        step: 'Token Validation',
        error: error.message,
      });
    }

    // Step 3: Test the API endpoint directly (if it exists)
    console.log('\n📋 Step 2: Testing API endpoint validation...');

    try {
      const apiResponse = await fetch('http://localhost:3000/api/onboarding/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: testToken }),
      });

      if (apiResponse.ok) {
        const apiResult = await apiResponse.json();

        if (apiResult.valid && apiResult.invitation) {
          console.log('✅ API endpoint validation PASSED');
          console.log(
            '📧 API Email:',
            apiResult.invitation.email || apiResult.invitation.first_name
          );

          results.push({
            success: true,
            step: 'API Endpoint Validation',
            details: apiResult.invitation,
          });
        } else {
          console.log('❌ API endpoint validation FAILED');
          console.log('API Error:', apiResult.error);

          results.push({
            success: false,
            step: 'API Endpoint Validation',
            error: apiResult.error,
          });
        }
      } else {
        console.log('❌ API endpoint ERROR');
        console.log('Status:', apiResponse.status);
        const errorText = await apiResponse.text();
        console.log('Response:', errorText);

        results.push({
          success: false,
          step: 'API Endpoint Validation',
          error: `HTTP ${apiResponse.status}: ${errorText}`,
        });
      }
    } catch (error: any) {
      console.log('⚠️  API endpoint test SKIPPED (server not running)');
      console.log('Note: Start the dev server with `npm run dev` to test API endpoints');

      results.push({
        success: false,
        step: 'API Endpoint Validation',
        error: 'Server not running - test skipped',
      });
    }

    // Step 4: Test with an invalid token
    console.log('\n📋 Step 3: Testing invalid token handling...');

    const invalidToken = 'tsa-invite-invalid-token-123';
    try {
      const invalidResult = await invitationAPI.validateInvitation(invalidToken);

      if (!invalidResult.valid) {
        console.log('✅ Invalid token handling PASSED');
        console.log('Expected error:', invalidResult.error);

        results.push({
          success: true,
          step: 'Invalid Token Handling',
          details: { expectedError: invalidResult.error },
        });
      } else {
        console.log('❌ Invalid token handling FAILED');
        console.log('Error: Invalid token was accepted as valid');

        results.push({
          success: false,
          step: 'Invalid Token Handling',
          error: 'Invalid token was incorrectly accepted as valid',
        });
      }
    } catch (error: any) {
      console.log('✅ Invalid token handling PASSED (threw error as expected)');
      console.log('Error:', error.message);

      results.push({
        success: true,
        step: 'Invalid Token Handling',
        details: { threwError: error.message },
      });
    }
  } catch (globalError: any) {
    console.error('💥 Global test error:', globalError);
    results.push({
      success: false,
      step: 'Global Test',
      error: globalError.message,
    });
  }

  // Print summary
  console.log('\n📊 TEST SUMMARY');
  console.log('='.repeat(50));

  let passedCount = 0;
  let totalCount = results.length;

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.step}: ${result.success ? 'PASSED' : 'FAILED'}`);

    if (result.success) {
      passedCount++;
      if (result.details) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
      }
    } else {
      console.log(`   Error: ${result.error}`);
    }
  });

  console.log('\n🎯 Overall Result:');
  console.log(`   ${passedCount}/${totalCount} tests passed`);

  if (passedCount === totalCount) {
    console.log('🎉 All tests PASSED! Token verification is working correctly.');
  } else if (passedCount > 0) {
    console.log('⚠️  Some tests FAILED, but core functionality may still work.');
  } else {
    console.log('❌ All tests FAILED. There may be a configuration issue.');
  }

  console.log('\n💡 Next Steps:');
  console.log('   1. If token validation passed, you can test the full onboarding flow');
  console.log(
    '   2. Visit: http://localhost:3000/onboarding?invite=tsa-invite-49f407751d134ba1033a4e7a2b4866de'
  );
  console.log('   3. Start dev server: npm run dev');
  console.log('   4. Test the complete invitation flow');
}

// Run the test
if (require.main === module) {
  testTokenVerification().catch(console.error);
}

export { testTokenVerification };
