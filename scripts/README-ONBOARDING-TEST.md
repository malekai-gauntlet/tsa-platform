# Coach Onboarding Flow Test Documentation

## Overview

The `test-coach-onboarding-flow.js` script provides comprehensive testing of the complete coach onboarding process from invitation creation to final completion.

## What It Tests

### 🎯 Full Flow Coverage

1. **Coach Invitation Creation** - Creates invitation via `coachInvite` mutation
2. **Token Validation** - Validates invitation token via `/api/onboarding/validate`
3. **Session Management** - Creates and manages onboarding session via `/api/onboarding/session`
4. **Step Progression** - Goes through all 7 onboarding steps
5. **Final Completion** - Completes onboarding via `/api/onboarding/complete`
6. **Model Verification** - Verifies all database models were updated correctly
7. **Cleanup** - Removes all test data

### 📊 Models Tested

- ✅ **User** - Main user record creation
- ✅ **Profile** - Complete profile with onboarding data
- ✅ **OnboardingProgress** - Step tracking throughout process
- ✅ **Invitation** - Status updates (PENDING → ACCEPTED)

### 🚀 Onboarding Steps Tested

1. `personal-info` - Basic personal information
2. `role-experience` - Coach role and experience details
3. `school-setup` - School/organization setup
4. `school-name` - School name finalization
5. `school-focus` - Sports focus and academic details
6. `student-planning` - Student enrollment planning
7. `agreements` - Terms and agreements acceptance

## Usage

### Basic Test Run

```bash
# From project root
node scripts/test-coach-onboarding-flow.js
```

### Environment Setup

Make sure you have:

- Development server running (for API calls)
- Environment variables set
- Amplify backend configured

### Test Configuration

The test uses realistic data for a comprehensive coach profile:

```javascript
const TEST_CONFIG = {
  coach: {
    name: 'Test Coach Johnson',
    email: 'test.coach.{timestamp}@example.com',
    cell: '+1-555-123-4567',
    location: 'Austin, TX',
    d1_athletics_count: 8,
    bio: 'Experienced basketball and football coach...',
  },
  // ... comprehensive onboarding data
};
```

## Expected Output

### ✅ Successful Test Run

```
=== COACH ONBOARDING FLOW TEST ===

=== Step 1: Create Coach Invitation ===
🔄 Calling coachInvite mutation...
✅ Coach invitation created successfully
ℹ️  Invitation token: tsa-invite-abc123...
ℹ️  Message: Application received for Test Coach Johnson

=== Step 2: Validate Invitation Token ===
🔄 Validating invitation token via API...
✅ Token validated successfully
ℹ️  Email: test.coach.123@example.com
ℹ️  Name: Test Coach Johnson
ℹ️  Role: COACH

=== Step 3: Create Onboarding Session ===
🔄 Creating onboarding session...
✅ Onboarding session created
ℹ️  Session ID: session_123_abc
ℹ️  Current step: personal-info
ℹ️  Expires in: 60 minutes

=== Step 4: Complete Onboarding Steps ===
🔄 Completing step: personal-info
✅ Step personal-info completed successfully
🔄 Completing step: role-experience
✅ Step role-experience completed successfully
... (continues for all 7 steps)

=== Step 5: Complete Onboarding ===
🔄 Finalizing onboarding...
✅ Onboarding completed successfully
ℹ️  User ID: user_123_abc
ℹ️  Profile ID: profile_123_def
ℹ️  Status: completed
ℹ️  Invitation-based: true

=== Step 6: Verify Model Updates ===
🔄 Verifying User model...
✅ User model verified
ℹ️  User Email: test.coach.123@example.com
ℹ️  User Role: COACH
ℹ️  User Status: ACTIVE

🔄 Verifying Profile model...
✅ Profile model verified
ℹ️  Profile Type: COACH
ℹ️  Onboarding Complete: true

🔄 Verifying OnboardingProgress model...
✅ OnboardingProgress model verified
ℹ️  Current Step: COMPLETE
ℹ️  Completed Steps: 9

🔄 Verifying Invitation model...
✅ Invitation model verified
ℹ️  Invitation Status: ACCEPTED
ℹ️  Invitation Type: COACH

=== Step 7: Cleanup Test Data ===
🔄 Deleting User record...
✅ User record deleted
🔄 Deleting Profile record...
✅ Profile record deleted
🔄 Deleting OnboardingProgress records...
✅ Deleted 1 OnboardingProgress record(s)
🔄 Deleting Invitation record...
✅ Invitation record deleted

=== TEST RESULTS SUMMARY ===
Test Results:
  Invitation Created: ✅
  Token Validated: ✅
  Session Created: ✅
  Steps Completed: 7/7 ✅
  Onboarding Completed: ✅
  Models Verified: ✅
  Cleanup Completed: ✅

Models Updated:
  ✅ User - Created and verified
  ✅ Profile - Created with onboarding data
  ✅ OnboardingProgress - Tracked throughout process
  ✅ Invitation - Status updated to ACCEPTED

Completed Steps:
  ✅ personal-info
  ✅ role-experience
  ✅ school-setup
  ✅ school-name
  ✅ school-focus
  ✅ student-planning
  ✅ agreements

✅ 🎉 ALL TESTS PASSED! Coach onboarding flow is working correctly.
```

## Troubleshooting

### Common Issues

#### 1. API Connection Errors

```
❌ Validation API returned 500
```

**Solution**: Make sure development server is running on localhost:3000

#### 2. Amplify Configuration Errors

```
❌ Failed to create invitation: GraphQL errors
```

**Solution**: Ensure Amplify backend is configured and deployed

#### 3. Session Timeout

```
❌ Session expired during update
```

**Solution**: Test runs quickly, but if modified, ensure session TTL is sufficient

#### 4. Model Creation Failures

```
❌ User record not found
```

**Solution**: Check database permissions and schema deployment

### Debug Mode

For more detailed logging, you can modify the script to log request/response data:

```javascript
// Add after each API call
console.log('Request:', JSON.stringify(requestData, null, 2));
console.log('Response:', JSON.stringify(responseData, null, 2));
```

## Integration with CI/CD

This test can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Test Coach Onboarding Flow
  run: |
    npm start &
    sleep 10  # Wait for server to start
    node scripts/test-coach-onboarding-flow.js
    kill %1   # Stop server
```

## Extending the Test

### Adding New Steps

To test additional onboarding steps:

1. Add step data to `TEST_CONFIG.onboardingData`
2. Add step to the `steps` array in `testOnboardingSteps()`
3. Update expected step count in validation

### Custom Test Data

You can modify `TEST_CONFIG` to test with different coach profiles:

```javascript
const customConfig = {
  coach: {
    name: 'Custom Coach Name',
    email: 'custom@example.com',
    // ... other fields
  },
};
```

## Contributing

When modifying the onboarding flow:

1. Update this test script accordingly
2. Run the test to verify changes work end-to-end
3. Update expected outputs in this documentation
4. Consider adding additional validation checks

---

**Note**: This test creates and deletes real database records. Only run in development/testing environments.
