// Test script to verify Zapier integration
const testApplication = {
  tsaLocation: "dallas",
  childFirstName: "John",
  childLastName: "Doe",
  childDateOfBirth: "2010-05-15",
  enrollmentDate: "Fall 2025",
  currentSchool: "Dallas Elementary",
  currentGrade: "5",
  parent1FullName: "Jane Doe",
  parent1Relationship: "Mother",
  parent1Email: "jane.doe@example.com",
  parent1Phone: "(555) 123-4567",
  parent2FullName: "John Doe Sr.",
  parent2Relationship: "Father",
  parent2Email: "john.doe@example.com",
  parent2Phone: "(555) 987-6543",
  homeAddress: "123 Main St",
  city: "Dallas",
  state: "TX",
  zipCode: "75201",
  whyApplying: "I want my child to excel in sports and academics",
  tellUsMore: "Johnny has been playing baseball since age 6",
  coachEmail: "coach@example.com",
  schoolName: "TSA Dallas",
  schoolLocation: "Dallas, TX"
};

async function testZapierIntegration() {
  try {
    console.log('Testing Zapier integration...');
    
    const response = await fetch('http://localhost:3000/api/applications/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testApplication),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Success! Application submitted:', result);
    } else {
      console.error('❌ Failed:', result);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testZapierIntegration(); 