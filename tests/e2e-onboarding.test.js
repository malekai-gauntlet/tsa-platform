/**
 * End-to-End Onboarding Flow Test
 * Tests the complete onboarding flow using bypass mode with standardized data structures
 */

const { test, expect } = require('@playwright/test');

// Test data matching our standardized OnboardingFormData interface
const testData = {
  // Personal Information
  firstName: 'John',
  lastName: 'Coach',
  middleName: 'Michael',
  email: 'john.coach@test.com',
  phone: '555-123-4567',
  birthDate: '1985-06-15',
  birthCity: 'Dallas',
  birthStateAbbreviation: 'TX',
  sex: 'Male',

  // Role & Experience
  roleType: 'COACH',
  yearsOfPriorProfessionalExperience: '5-10',
  certificationLevel: 'Level 2',
  specialties: ['Leadership', 'Strategy'],
  bio: 'Experienced coach with passion for student development.',

  // School Setup
  nameOfInstitution: 'Test Sports Academy',
  schoolType: 'private',
  gradeLevels: ['9', '10', '11', '12'],
  hasPhysicalLocation: true,
  schoolStreet: '123 Academy St',
  schoolCity: 'Austin',
  schoolState: 'TX',
  schoolZip: '78701',
  schoolPhone: '512-555-0123',

  // School Focus
  sport: 'basketball',
  programFocus: ['Character Development', 'Leadership Training'],
  schoolCategories: ['academic_focus', 'athletic_focus'],

  // Student Planning
  estimatedStudentCount: '16-30',
  currentStudentDetails: 'Mix of beginners and intermediate players',

  // Agreements
  platformAgreement: true,
};

test.describe('Onboarding Flow E2E Test', () => {
  test.beforeEach(async ({ page }) => {
    // Enable bypass mode to skip invitation requirements and go to personal-info step
    await page.goto('/onboarding/personal-info?bypass=true');
  });

  test('Complete onboarding flow with all steps', async ({ page }) => {
    console.log('🚀 Starting complete onboarding flow test...');

    // =================================================================
    // STEP 1: Personal Information
    // =================================================================
    await test.step('Personal Information Step', async () => {
      console.log('📝 Testing Personal Information step...');

      // Wait for page to load and debug what we see
      await page.waitForLoadState('networkidle');

      // Debug current state
      const h1Text = await page.locator('h1').first().textContent();
      const currentUrl = page.url();
      const bodyText = await page.locator('body').textContent();
      const debugInfo = await page
        .locator('[class*="yellow"]')
        .textContent()
        .catch(() => 'No debug info found');

      console.log('Current h1 text:', h1Text);
      console.log('Current URL:', currentUrl);
      console.log('Debug info:', debugInfo);
      console.log('Page contains bypass:', bodyText.includes('bypass'));

      // Take a screenshot for debugging
      await page.screenshot({ path: 'debug-personal-info.png', fullPage: true });

      await expect(page.locator('h1')).toContainText('Personal Information');

      // Fill form fields by label or placeholder (since there are no name attributes)
      await page.getByLabel('First Name *').fill(testData.firstName);
      await page.getByLabel('Last Name *').fill(testData.lastName);
      await page.getByLabel('Middle Name').fill(testData.middleName);
      await page.getByLabel('Email Address *').fill(testData.email);
      await page.getByLabel('Phone Number *').fill(testData.phone);
      await page.getByLabel('Birth Date *').fill(testData.birthDate);
      await page.getByLabel('Birth City').fill(testData.birthCity);
      await page.getByLabel('Birth State').selectOption(testData.birthStateAbbreviation);
      await page.getByLabel('Gender *').selectOption(testData.sex);

      // Verify data persistence
      expect(await page.getByLabel('First Name *').inputValue()).toBe(testData.firstName);
      expect(await page.getByLabel('Last Name *').inputValue()).toBe(testData.lastName);

      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/role-experience');

      console.log('✅ Personal Information step completed');
    });

    // =================================================================
    // STEP 2: Role & Experience
    // =================================================================
    await test.step('Role & Experience Step', async () => {
      console.log('💼 Testing Role & Experience step...');

      await expect(page.locator('h1')).toContainText('Role & Experience');

      // Role should be auto-set to COACH
      await expect(page.locator('[data-testid="role-coach"]')).toBeChecked();

      // Select experience
      await page.click(`button:has-text("${testData.yearsOfPriorProfessionalExperience}")`);

      // Select specialties
      for (const specialty of testData.specialties) {
        await page.click(`button:has-text("${specialty}")`);
      }

      // Fill bio
      await page.fill('textarea[name="bio"]', testData.bio);

      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/school-setup');

      console.log('✅ Role & Experience step completed');
    });

    // =================================================================
    // STEP 3: School Setup
    // =================================================================
    await test.step('School Setup Step', async () => {
      console.log('🏫 Testing School Setup step...');

      await expect(page.locator('h1')).toContainText('School Setup');

      // Fill school information using standardized field names
      await page.fill('input[name="nameOfInstitution"]', testData.nameOfInstitution);
      await page.selectOption('select[name="schoolType"]', testData.schoolType);

      // Select grade levels
      for (const grade of testData.gradeLevels) {
        await page.click(`input[value="${grade}"]`);
      }

      // Physical location
      await page.check('input[name="hasPhysicalLocation"]');

      // Address fields
      await page.fill('input[name="schoolStreet"]', testData.schoolStreet);
      await page.fill('input[name="schoolCity"]', testData.schoolCity);
      await page.selectOption('select[name="schoolState"]', testData.schoolState);
      await page.fill('input[name="schoolZip"]', testData.schoolZip);
      await page.fill('input[name="schoolPhone"]', testData.schoolPhone);

      // Verify critical data
      expect(await page.inputValue('input[name="nameOfInstitution"]')).toBe(
        testData.nameOfInstitution
      );

      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/school-focus');

      console.log('✅ School Setup step completed');
    });

    // =================================================================
    // STEP 4: School Focus
    // =================================================================
    await test.step('School Focus Step', async () => {
      console.log('🎯 Testing School Focus step...');

      await expect(page.locator('h1')).toContainText('School Focus');

      // Select sport
      await page.click(`button[data-sport="${testData.sport}"]`);

      // Select program focus areas
      for (const focus of testData.programFocus) {
        await page.click(`button:has-text("${focus}")`);
      }

      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/student-planning');

      console.log('✅ School Focus step completed');
    });

    // =================================================================
    // STEP 5: Student Planning
    // =================================================================
    await test.step('Student Planning Step', async () => {
      console.log('👥 Testing Student Planning step...');

      await expect(page.locator('h1')).toContainText('Student Planning');

      // Select student count
      await page.click(`button:has-text("${testData.estimatedStudentCount}")`);

      // Optional details
      await page.fill('textarea[name="currentStudentDetails"]', testData.currentStudentDetails);

      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/agreements');

      console.log('✅ Student Planning step completed');
    });

    // =================================================================
    // STEP 6: Agreements
    // =================================================================
    await test.step('Agreements Step', async () => {
      console.log('📋 Testing Agreements step...');

      await expect(page.locator('h1')).toContainText('Platform Agreement');

      // Accept platform agreement
      await page.check('input[name="platformAgreement"]');

      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/complete');

      console.log('✅ Agreements step completed');
    });

    // =================================================================
    // STEP 7: Complete & Submission
    // =================================================================
    await test.step('Complete & Submission', async () => {
      console.log('🎉 Testing completion and submission...');

      // Should show loading state initially
      await expect(page.locator('text=Finalizing Your Profile')).toBeVisible({ timeout: 2000 });

      // Wait for either success or missing fields form
      await page.waitForSelector('text=WELCOME', { timeout: 30000 }).catch(async () => {
        // If missing fields form appears, handle it
        const missingFieldsVisible = await page
          .locator('text=Complete Your Information')
          .isVisible();
        if (missingFieldsVisible) {
          console.log('📝 Handling missing fields form...');

          // Fill any missing required fields that appear
          const missingFields = await page.locator('input, select, textarea').all();
          for (const field of missingFields) {
            const fieldName = await field.getAttribute('name');
            const fieldType = await field.getAttribute('type');

            if (fieldName && testData[fieldName]) {
              if (fieldType === 'checkbox') {
                await field.check();
              } else {
                await field.fill(testData[fieldName].toString());
              }
            }
          }

          await page.click('button:has-text("Complete Onboarding")');
          await expect(page.locator('text=WELCOME')).toBeVisible({ timeout: 15000 });
        }
      });

      // Verify success state
      await expect(page.locator('text=WELCOME')).toBeVisible();
      await expect(page.locator('text=GET STARTED')).toBeVisible();

      // Verify profile data is displayed
      const profileSection = page.locator('text=Your Profile Summary').locator('..');
      await expect(profileSection).toContainText(testData.firstName);
      await expect(profileSection).toContainText(testData.lastName);
      await expect(profileSection).toContainText(testData.email);
      await expect(profileSection).toContainText(testData.nameOfInstitution);

      console.log('✅ Onboarding completion verified');
    });

    console.log('🎊 Complete onboarding flow test PASSED!');
  });

  // =================================================================
  // DATA PERSISTENCE TEST
  // =================================================================
  test('Data persistence across browser refresh', async ({ page }) => {
    await test.step('Fill partial data and refresh', async () => {
      console.log('💾 Testing data persistence...');

      // Fill personal info
      await page.fill('input[name="firstName"]', testData.firstName);
      await page.fill('input[name="lastName"]', testData.lastName);
      await page.fill('input[name="email"]', testData.email);

      // Refresh page
      await page.reload();

      // Verify data persisted
      expect(await page.inputValue('input[name="firstName"]')).toBe(testData.firstName);
      expect(await page.inputValue('input[name="lastName"]')).toBe(testData.lastName);
      expect(await page.inputValue('input[name="email"]')).toBe(testData.email);

      console.log('✅ Data persistence verified');
    });
  });

  // =================================================================
  // VALIDATION TEST
  // =================================================================
  test('Form validation works correctly', async ({ page }) => {
    await test.step('Test required field validation', async () => {
      console.log('🔍 Testing form validation...');

      // Try to continue without filling required fields
      await page.click('button:has-text("Continue")');

      // Should stay on same page and show validation
      expect(page.url()).toContain('/onboarding/personal-info');

      // Fill minimum required fields
      await page.fill('input[name="firstName"]', testData.firstName);
      await page.fill('input[name="lastName"]', testData.lastName);
      await page.fill('input[name="email"]', testData.email);
      await page.fill('input[name="phone"]', testData.phone);
      await page.fill('input[name="birthDate"]', testData.birthDate);
      await page.selectOption('select[name="sex"]', testData.sex);

      // Now continue should work
      await page.click('button:has-text("Continue")');
      await expect(page.url()).toContain('/onboarding/role-experience');

      console.log('✅ Form validation verified');
    });
  });

  // =================================================================
  // NAVIGATION TEST
  // =================================================================
  test('Back navigation works correctly', async ({ page }) => {
    await test.step('Test back button navigation', async () => {
      console.log('⬅️ Testing navigation...');

      // Fill personal info and continue
      await page.fill('input[name="firstName"]', testData.firstName);
      await page.fill('input[name="lastName"]', testData.lastName);
      await page.fill('input[name="email"]', testData.email);
      await page.fill('input[name="phone"]', testData.phone);
      await page.fill('input[name="birthDate"]', testData.birthDate);
      await page.selectOption('select[name="sex"]', testData.sex);
      await page.click('button:has-text("Continue")');

      // Should be on role-experience
      await expect(page.url()).toContain('/onboarding/role-experience');

      // Click back button
      await page.click('button:has-text("Back")');

      // Should return to personal-info with data intact
      await expect(page.url()).toContain('/onboarding/personal-info');
      expect(await page.inputValue('input[name="firstName"]')).toBe(testData.firstName);

      console.log('✅ Navigation verified');
    });
  });
});

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

/**
 * Helper to wait for API calls to complete
 */
async function waitForApiCalls(page, timeout = 5000) {
  await page.waitForTimeout(1000); // Give APIs time to start

  return page.waitForFunction(
    () => {
      return window.fetch === undefined || document.readyState === 'complete';
    },
    { timeout }
  );
}

/**
 * Helper to verify local storage data
 */
async function verifyLocalStorageData(page, expectedData) {
  const storageData = await page.evaluate(() => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('onboarding_')) {
        data[key.replace('onboarding_', '')] = localStorage.getItem(key);
      }
    }
    return data;
  });

  for (const [key, value] of Object.entries(expectedData)) {
    expect(storageData[key]).toBe(value.toString());
  }
}
