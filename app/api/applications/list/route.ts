import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'applications.json');
    
    // Check if applications file exists
    if (!existsSync(filePath)) {
      return NextResponse.json({
        success: true,
        applications: [],
        count: 0,
      });
    }
    
    // Read applications from file
    const fileContent = await readFile(filePath, 'utf-8');
    const applications = JSON.parse(fileContent);
    
    // Sort by most recent first
    applications.sort((a: any, b: any) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    return NextResponse.json({
      success: true,
      applications,
      count: applications.length,
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