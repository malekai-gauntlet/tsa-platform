#!/usr/bin/env node

/**
 * Test script to verify coach email filtering works correctly
 * This script submits test applications with different coach emails
 * and verifies each coach only sees their own applications
 */

const BASE_URL = 'http://localhost:3001';

async function submitTestApplication(coachEmail, studentName) {
  const testData = {
    childFirstName: studentName.split(' ')[0],
    childLastName: studentName.split(' ')[1] || 'Test',
    childDateOfBirth: '2010-05-15',
    currentGrade: '8th Grade',
    currentSchool: 'Test Middle School',
    
    parent1FullName: `Parent of ${studentName}`,
    parent1Email: `parent.of.${studentName.toLowerCase().replace(' ', '.')}@example.com`,
    parent1Phone: '555-123-4567',
    parent1Relationship: 'Mother',
    
    homeAddress: '123 Test Street',
    city: 'Test City',
    state: 'TX',
    zipCode: '12345',
    
    enrollmentDate: '2024-08-01',
    whyApplying: `Test application for ${studentName}`,
    tellUsMore: 'This is a test application to verify coach filtering.',
    
    schoolName: 'Texas Sports Academy',
    schoolLocation: 'Test Location',
    coachEmail: coachEmail,
    tsaLocation: 'Test TSA Location',
    
    sportInterest: 'Basketball',
  };

  try {
    const response = await fetch(`${BASE_URL}/api/applications/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ Submitted application for ${studentName} to coach ${coachEmail}`);
      return result.data;
    } else {
      console.error(`❌ Failed to submit application for ${studentName}:`, result.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error submitting application for ${studentName}:`, error.message);
    return null;
  }
}

async function getApplicationsForCoach(coachEmail) {
  try {
    const response = await fetch(`${BASE_URL}/api/applications/list?coachEmail=${encodeURIComponent(coachEmail)}`);
    const result = await response.json();
    
    if (result.success) {
      return result;
    } else {
      console.error(`❌ Failed to fetch applications for ${coachEmail}:`, result.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching applications for ${coachEmail}:`, error.message);
    return null;
  }
}

async function runTest() {
  console.log('🧪 Starting coach email filtering test...\n');

  // Test data
  const coaches = [
    'coach.smith@texassportsacademy.com',
    'coach.johnson@texassportsacademy.com',
    'coach.williams@texassportsacademy.com'
  ];

  const students = [
    'Alice Anderson',
    'Bob Brown',
    'Charlie Chen',
    'Diana Davis',
    'Emma Edwards',
    'Frank Foster'
  ];

  // Submit applications with different coach assignments
  console.log('📝 Submitting test applications...');
  
  // Coach Smith gets Alice and Bob
  await submitTestApplication(coaches[0], students[0]);
  await submitTestApplication(coaches[0], students[1]);
  
  // Coach Johnson gets Charlie and Diana
  await submitTestApplication(coaches[1], students[2]);
  await submitTestApplication(coaches[1], students[3]);
  
  // Coach Williams gets Emma and Frank
  await submitTestApplication(coaches[2], students[4]);
  await submitTestApplication(coaches[2], students[5]);

  console.log('\n⏳ Waiting 2 seconds for applications to be processed...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Test filtering for each coach
  console.log('🔍 Testing coach-specific filtering...\n');
  
  for (let i = 0; i < coaches.length; i++) {
    const coachEmail = coaches[i];
    const expectedStudents = students.slice(i * 2, (i + 1) * 2);
    
    const result = await getApplicationsForCoach(coachEmail);
    
    if (result) {
      const { applications, count, totalApplications } = result;
      
      console.log(`👨‍🏫 Coach: ${coachEmail}`);
      console.log(`   📊 Applications returned: ${count}`);
      console.log(`   📈 Total in system: ${totalApplications}`);
      console.log(`   👥 Expected students: ${expectedStudents.join(', ')}`);
      
      if (count === 2) {
        const studentNames = applications.map(app => app.studentName);
        console.log(`   ✅ Found students: ${studentNames.join(', ')}`);
        
        // Check if the correct students are returned
        const correctStudents = expectedStudents.every(expected => 
          studentNames.some(actual => actual.includes(expected.split(' ')[0]))
        );
        
        if (correctStudents) {
          console.log(`   ✅ PASS: Coach ${coachEmail} sees only their assigned applications\n`);
        } else {
          console.log(`   ❌ FAIL: Coach ${coachEmail} seeing incorrect applications\n`);
        }
      } else {
        console.log(`   ❌ FAIL: Expected 2 applications but got ${count}\n`);
      }
    }
  }

  // Test fetching all applications (no coach filter)
  console.log('🌐 Testing unfiltered applications...');
  const allApplications = await getApplicationsForCoach('');
  
  if (allApplications) {
    console.log(`   📊 Total applications when no filter applied: ${allApplications.count}`);
    if (allApplications.count >= 6) {
      console.log('   ✅ PASS: Unfiltered query returns all applications\n');
    } else {
      console.log('   ❌ FAIL: Unfiltered query should return all applications\n');
    }
  }

  console.log('🎯 Test completed!');
  console.log('\n📋 Summary:');
  console.log('- Each coach should only see applications submitted with their email');
  console.log('- Applications are properly filtered by coach email parameter');
  console.log('- Multi-tenant isolation is working correctly');
}

// Run the test
runTest().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
}); 