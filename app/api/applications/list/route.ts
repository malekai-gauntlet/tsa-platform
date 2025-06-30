import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Import the shared applications array from the submit endpoint
import { getStoredApplications } from '../submit/route';

export async function GET(request: NextRequest) {
  try {
    // Get coach email from query parameters
    const url = new URL(request.url);
    const coachEmail = url.searchParams.get('coachEmail');
    
    // Get applications from the shared storage
    const allApplications = getStoredApplications();
    
    // Filter applications by coach email if provided
    let filteredApplications = allApplications;
    if (coachEmail) {
      filteredApplications = allApplications.filter((app: any) => 
        app.coachEmail && app.coachEmail.toLowerCase() === coachEmail.toLowerCase()
      );
      console.log(`📧 Filtering applications for coach: ${coachEmail}`);
      console.log(`📊 Found ${filteredApplications.length} applications for ${coachEmail} out of ${allApplications.length} total`);
    } else {
      console.log(`⚠️ No coach email provided, returning all ${allApplications.length} applications`);
    }
    
    // Sort by most recent first
    const sortedApplications = [...filteredApplications].sort((a: any, b: any) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    console.log(`📋 Applications returned: ${sortedApplications.length} for coach: ${coachEmail || 'all'}`);
    
    return NextResponse.json({
      success: true,
      applications: sortedApplications,
      count: sortedApplications.length,
      coachEmail: coachEmail,
      totalApplications: allApplications.length,
    });
    
  } catch (error) {
    console.error('Error reading applications:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read applications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 