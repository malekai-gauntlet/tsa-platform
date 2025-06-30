import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// File-based storage path
const STORAGE_FILE = path.join(process.cwd(), 'data', 'applications.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(STORAGE_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read applications from file
function readApplicationsFromFile(): any[] {
  try {
    ensureDataDirectory();
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading applications file:', error);
    return [];
  }
}

// Write applications to file
function writeApplicationsToFile(applications: any[]) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(applications, null, 2));
  } catch (error) {
    console.error('Error writing applications file:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🎯 Raw webhook data received:', JSON.stringify(body, null, 2));
    
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
    
    // Read existing applications
    const applications = readApplicationsFromFile();
    
    // Add new application to the beginning
    applications.unshift(applicationData);
    
    // Write back to file
    writeApplicationsToFile(applications);
    
    console.log('📝 Processed Application Data:', JSON.stringify(applicationData, null, 2));
    console.log(`📊 Total Applications in File: ${applications.length}`);
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId: applicationData.id,
        studentName: applicationData.studentName,
        status: applicationData.status,
        submittedAt: applicationData.submittedAt,
        coachEmail: applicationData.coachEmail,
      },
    });
    
  } catch (error) {
    console.error('❌ Error processing application:', error);
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

// Export function to get applications (for the list endpoint)
export function getStoredApplications() {
  return readApplicationsFromFile();
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