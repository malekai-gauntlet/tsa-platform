import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// In-memory storage for applications (shared with submit endpoint)
let applications: any[] = [];

export async function GET(request: NextRequest) {
  try {
    // Sort by most recent first
    const sortedApplications = [...applications].sort((a: any, b: any) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    console.log(`📋 Applications requested: ${sortedApplications.length} found`);
    
    return NextResponse.json({
      success: true,
      applications: sortedApplications,
      count: sortedApplications.length,
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