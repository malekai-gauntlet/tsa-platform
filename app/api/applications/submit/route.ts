import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Transform Zapier form data to a simple format
    const applicationData = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
      
      // Student Info
      studentName: `${body.childFirstName || ''} ${body.childLastName || ''}`.trim(),
      studentAge: body.childDateOfBirth ? calculateAge(body.childDateOfBirth) : null,
      studentGrade: body.currentGrade,
      studentDateOfBirth: body.childDateOfBirth,
      currentSchool: body.currentSchool,
      
      // Parent Info
      parent1Name: body.parent1FullName,
      parent1Email: body.parent1Email,
      parent1Phone: body.parent1Phone,
      parent1Relationship: body.parent1Relationship,
      
      parent2Name: body.parent2FullName,
      parent2Email: body.parent2Email,
      parent2Phone: body.parent2Phone,
      parent2Relationship: body.parent2Relationship,
      
      // Address
      address: body.homeAddress,
      city: body.city,
      state: body.state,
      zipCode: body.zipCode,
      
      // Application Details
      enrollmentDate: body.enrollmentDate,
      whyApplying: body.whyApplying,
      tellUsMore: body.tellUsMore,
      specialAccommodations: body.specialAccommodations,
      
      // School/Coach Info
      schoolName: body.schoolName,
      schoolLocation: body.schoolLocation,
      coachEmail: body.coachEmail,
      tsaLocation: body.tsaLocation,
      
      // Baseball Fields (if Bennett School)
      ...(body.tsaLocation?.includes('bennett') && {
        primaryPosition: body.primaryPosition,
        secondaryPosition: body.secondaryPosition,
        batsThrows: body.batsThrows,
        height: body.height,
        weight: body.weight,
        throwingVelocity: body.throwingVelocity,
        sixtyYardDash: body.sixtyYardDash,
        playerVideo: body.playerVideo,
        graduationYear: body.graduationYear,
        referredBy: body.referredBy,
        referredByPhone: body.referredByPhone,
      }),
      
      // Metadata
      status: 'PENDING',
      sportInterest: body.tsaLocation?.includes('bennett') ? 'Baseball' : 'Sports Training',
    };
    
    // Save to JSON file
    await saveApplication(applicationData);
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId: applicationData.id,
        studentName: applicationData.studentName,
        status: applicationData.status,
        submittedAt: applicationData.submittedAt,
      },
    });
    
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Save application to JSON file
async function saveApplication(applicationData: any) {
  const dataDir = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'applications.json');
  
  // Ensure data directory exists
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
  
  // Read existing applications or create empty array
  let applications = [];
  if (existsSync(filePath)) {
    try {
      const fileContent = await readFile(filePath, 'utf-8');
      applications = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading applications file:', error);
      applications = [];
    }
  }
  
  // Add new application
  applications.push(applicationData);
  
  // Write back to file
  await writeFile(filePath, JSON.stringify(applications, null, 2));
  
  console.log(`✅ Application saved: ${applicationData.id}`);
}

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Allow OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 