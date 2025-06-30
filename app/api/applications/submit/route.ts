import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@amplify/data/resource';
import { ensureAmplifyBackendConfig } from '@/lib/amplify-backend-config';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

ensureAmplifyBackendConfig();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Transform Zapier form data to match parentApplication mutation schema
    const applicationData = {
      // Required fields
      parentEmail: body.parent1Email,
      studentName: `${body.childFirstName} ${body.childLastName}`,
      sportInterest: body.tsaLocation?.includes('bennett') ? 'Baseball' : 'Sports Training',
      
      // Parent information
      parentFirstName: body.parent1FullName?.split(' ')[0] || body.childFirstName,
      parentLastName: body.parent1FullName?.split(' ').slice(1).join(' ') || body.childLastName,
      parentPhone: body.parent1Phone,
      
      // Student information
      studentAge: body.childDateOfBirth ? calculateAge(body.childDateOfBirth) : undefined,
      studentGrade: body.currentGrade,
      studentDateOfBirth: body.childDateOfBirth,
      
      // Application details
      enrollmentType: 'FULL_TIME',
      startDate: body.enrollmentDate,
      academicYear: new Date().getFullYear().toString(),
      
      // Additional information
      specialNotes: [
        body.whyApplying && `Why applying: ${body.whyApplying}`,
        body.tellUsMore && `Additional info: ${body.tellUsMore}`,
        body.tellUsAboutYou && `Financial info: ${body.tellUsAboutYou}`,
        body.specialAccommodations && `Special accommodations: ${body.specialAccommodations}`,
        body.currentSchool && `Current school: ${body.currentSchool}`,
      ].filter(Boolean).join('\n\n'),
      
      // Coach information
      coachName: body.coachEmail?.split('@')[0] || body.schoolName,
      
      // Emergency contact (use parent 2 info if available)
      emergencyContact: body.parent2FullName ? {
        name: body.parent2FullName,
        relationship: body.parent2Relationship || 'Parent',
        phone: body.parent2Phone,
        email: body.parent2Email,
      } : undefined,
      
      // Address information
      address: {
        street: body.homeAddress,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: 'US',
      },
      
      // School preferences
      schoolPreferences: {
        preferredCampus: body.schoolName,
        tsaLocation: body.tsaLocation,
        schoolLocation: body.schoolLocation,
        coachEmail: body.coachEmail,
        coachEmail2: body.coachEmail2,
        coachEmail3: body.coachEmail3,
      },
      
      // Baseball-specific data for Bennett Schools
      ...(body.tsaLocation?.includes('bennett') && {
        medicalInformation: [
          body.primaryPosition && `Primary Position: ${body.primaryPosition}`,
          body.secondaryPosition && `Secondary Position: ${body.secondaryPosition}`,
          body.batsThrows && `Bats/Throws: ${body.batsThrows}`,
          body.height && `Height: ${body.height}`,
          body.weight && `Weight: ${body.weight}`,
          body.throwingVelocity && `Throwing Velocity: ${body.throwingVelocity} mph`,
          body.sixtyYardDash && `60 Yard Dash: ${body.sixtyYardDash} seconds`,
          body.playerVideo && `Player Video: ${body.playerVideo}`,
          body.graduationYear && `Graduation Year: ${body.graduationYear}`,
          body.referredBy && `Referred By: ${body.referredBy}`,
          body.referredByPhone && `Referral Contact: ${body.referredByPhone}`,
        ].filter(Boolean).join('\n'),
      }),
    };
    
    // Create client and call the parentApplication mutation
    const client = generateClient<Schema>();
    
    const result = await client.mutations.parentApplication({
      ...applicationData,
    });
    
    if (result.errors) {
      console.error('Error submitting application:', result.errors);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to submit application',
          details: result.errors.map(e => e.message).join(', ')
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: result.data,
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