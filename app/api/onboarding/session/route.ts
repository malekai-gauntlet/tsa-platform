import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@amplify/data/resource';
import { ensureAmplifyBackendConfig } from '@/lib/amplify-backend-config';
import CryptoJS from 'crypto-js';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Ensure Amplify is configured for backend operations
ensureAmplifyBackendConfig();

const client = generateClient<Schema>({
  authMode: 'apiKey',
});

// Session configuration
const SESSION_CONFIG = {
  DEFAULT_TTL_MINUTES: 180, // 3 hours
  MAX_TTL_MINUTES: 1440, // 24 hours
  CLEANUP_INTERVAL_MINUTES: 60, // Clean up expired sessions every hour
  getEncryptionKey: () => {
    return process.env.SESSION_ENCRYPTION_KEY ||
      (() => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('SESSION_ENCRYPTION_KEY environment variable is required in production');
        }
        return 'dev-key-for-local-testing-only';
      })();
  },
};

interface SessionData {
  id: string;
  email: string;
  step_data: Record<string, any>;
  current_step: string;
  completed_steps: string[];
  expires_at: string;
  created_at: string;
  updated_at: string;
  encrypted: boolean;
  invitation_based: boolean;
  invitation_id?: string;
}

// Utility functions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function isSessionExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

function calculateExpirationTime(ttlMinutes: number = SESSION_CONFIG.DEFAULT_TTL_MINUTES): string {
  const ttl = Math.min(ttlMinutes, SESSION_CONFIG.MAX_TTL_MINUTES);
  return new Date(Date.now() + ttl * 60 * 1000).toISOString();
}

function encryptData(data: any): string {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SESSION_CONFIG.getEncryptionKey()).toString();
  } catch (error) {
    console.error('Error encrypting data:', error);
    return JSON.stringify(data); // Fallback to plain text
  }
}

function decryptData(data: any, isEncrypted: boolean = true): any {
  // Handle different data types from the database
  let dataString: string;

  if (typeof data === 'string') {
    dataString = data;
  } else if (typeof data === 'object' && data !== null) {
    // If it's already an object, it might be already parsed
    if (data.encrypted !== undefined) {
      isEncrypted = data.encrypted;
    }
    dataString = JSON.stringify(data);
  } else {
    dataString = String(data);
  }

  if (!isEncrypted) {
    try {
      return JSON.parse(dataString);
    } catch {
      return {};
    }
  }

  try {
    const bytes = CryptoJS.AES.decrypt(dataString, SESSION_CONFIG.getEncryptionKey());
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting data:', error);
    try {
      return JSON.parse(dataString); // Fallback to plain text parsing
    } catch {
      return {};
    }
  }
}

// GET: Retrieve session data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const sessionId = searchParams.get('sessionId');

    if (!email && !sessionId) {
      return NextResponse.json({ error: 'Email or sessionId is required' }, { status: 400 });
    }

    console.log('🔍 Getting session data for:', { email, sessionId });

    // Clean up expired sessions first
    await cleanupExpiredSessions();

    // Find session by email or ID
    let progressList: any[] = [];

    if (sessionId) {
      const { data } = await client.models.OnboardingProgress.list({
        filter: { userId: { eq: sessionId } },
      });
      progressList = data;
    } else if (email) {
      const { data } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: email } },
      });
      progressList = data;
    }

    if (progressList.length === 0) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Get the most recent session
    const progress = progressList.sort(
      (a, b) => new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime()
    )[0];

    // Decrypt step data if needed
    const stepData = progress.stepData ? decryptData(progress.stepData) : {};

    // Check if session is expired
    const expiresAt = stepData.expires_at || calculateExpirationTime();
    if (isSessionExpired(expiresAt)) {
      console.log('🕐 Session expired, cleaning up:', progress.id);
      await client.models.OnboardingProgress.delete({ id: progress.id });
      return NextResponse.json({ error: 'Session expired' }, { status: 410 });
    }

    const sessionData: SessionData = {
      id: progress.userId,
      email: progress.email,
      step_data: stepData,
      current_step: progress.currentStep?.toLowerCase().replace('_', '-') || 'personal-info',
      completed_steps: progress.completedSteps || [],
      expires_at: expiresAt,
      created_at: progress.createdAt || new Date().toISOString(),
      updated_at: progress.updatedAt || new Date().toISOString(),
      encrypted: progress.stepData?.encrypted || false,
      invitation_based: progress.invitationBased || false,
      invitation_id: progress.invitationId,
    };

    console.log('✅ Session data retrieved:', {
      id: sessionData.id,
      email: sessionData.email,
      current_step: sessionData.current_step,
      completed_steps: sessionData.completed_steps.length,
      expires_in_minutes: Math.round(
        (new Date(sessionData.expires_at).getTime() - Date.now()) / (1000 * 60)
      ),
    });

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('❌ Error getting session data:', error);
    return NextResponse.json({ error: 'Failed to get session data' }, { status: 500 });
  }
}

// POST: Create new session
export async function POST(request: NextRequest) {
  try {
    const {
      email,
      invitationToken,
      ttlMinutes,
      encryptSensitiveData = true,
    } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log('🆕 Creating new session for:', email);

    // Clean up any existing sessions for this email
    const { data: existingSessions } = await client.models.OnboardingProgress.list({
      filter: { email: { eq: email } },
    });

    for (const session of existingSessions) {
      await client.models.OnboardingProgress.delete({ id: session.id });
    }

    const sessionId = generateSessionId();
    const expiresAt = calculateExpirationTime(ttlMinutes);

    const initialStepData = {
      expires_at: expiresAt,
      encrypted: encryptSensitiveData,
      session_id: sessionId,
      created_at: new Date().toISOString(),
    };

    const dataToStore = encryptSensitiveData
      ? encryptData(initialStepData)
      : JSON.stringify(initialStepData);

    const { data: newSession } = await client.models.OnboardingProgress.create({
      userId: sessionId,
      email,
      currentStep: 'PERSONAL_INFO',
      completedSteps: [],
      stepData: dataToStore,
      invitationBased: !!invitationToken,
      invitationId: invitationToken || undefined,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (!newSession) {
      throw new Error('Failed to create session');
    }

    const sessionData: SessionData = {
      id: sessionId,
      email,
      step_data: initialStepData,
      current_step: 'personal-info',
      completed_steps: [],
      expires_at: expiresAt,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      encrypted: encryptSensitiveData,
      invitation_based: !!invitationToken,
      invitation_id: invitationToken,
    };

    console.log('✅ New session created:', {
      id: sessionId,
      email,
      expires_in_minutes: Math.round((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60)),
    });

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('❌ Error creating session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

// PUT: Update session data
export async function PUT(request: NextRequest) {
  try {
    const {
      sessionId,
      email,
      currentStep,
      stepData,
      completedSteps,
      extendTTL = true,
      ttlMinutes,
    } = await request.json();

    if (!sessionId && !email) {
      return NextResponse.json({ error: 'SessionId or email is required' }, { status: 400 });
    }

    console.log('💾 Updating session:', { sessionId, email, currentStep });

    // Find session
    let progressList: any[] = [];

    if (sessionId) {
      const { data } = await client.models.OnboardingProgress.list({
        filter: { userId: { eq: sessionId } },
      });
      progressList = data;
    } else if (email) {
      const { data } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: email } },
      });
      progressList = data;
    }

    if (progressList.length === 0) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const progress = progressList[0];

    // Check if session is expired
    const currentStepData = progress.stepData ? decryptData(progress.stepData) : {};
    const currentExpiresAt = currentStepData.expires_at || calculateExpirationTime();

    if (isSessionExpired(currentExpiresAt)) {
      console.log('🕐 Session expired during update:', progress.id);
      await client.models.OnboardingProgress.delete({ id: progress.id });
      return NextResponse.json({ error: 'Session expired' }, { status: 410 });
    }

    // Update step data
    const updatedStepData = {
      ...currentStepData,
      ...stepData,
      updated_at: new Date().toISOString(),
      expires_at: extendTTL ? calculateExpirationTime(ttlMinutes) : currentExpiresAt,
    };

    const isEncrypted = currentStepData.encrypted || false;
    const dataToStore = isEncrypted
      ? encryptData(updatedStepData)
      : JSON.stringify(updatedStepData);

    const stepEnum = currentStep?.toUpperCase().replace('-', '_') as any;

    const { data: updatedSession } = await client.models.OnboardingProgress.update({
      id: progress.id,
      currentStep: stepEnum || progress.currentStep,
      completedSteps: completedSteps || progress.completedSteps || [],
      stepData: dataToStore,
      lastUpdated: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const sessionData: SessionData = {
      id: progress.userId,
      email: progress.email,
      step_data: updatedStepData,
      current_step:
        currentStep || progress.currentStep?.toLowerCase().replace('_', '-') || 'personal-info',
      completed_steps: completedSteps || progress.completedSteps || [],
      expires_at: updatedStepData.expires_at,
      created_at: progress.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      encrypted: isEncrypted,
      invitation_based: progress.invitationBased || false,
      invitation_id: progress.invitationId,
    };

    console.log('✅ Session updated successfully:', {
      id: sessionData.id,
      current_step: sessionData.current_step,
      expires_in_minutes: Math.round(
        (new Date(sessionData.expires_at).getTime() - Date.now()) / (1000 * 60)
      ),
    });

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('❌ Error updating session:', error);
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

// DELETE: Clean up session
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const email = searchParams.get('email');

    if (!sessionId && !email) {
      return NextResponse.json({ error: 'SessionId or email is required' }, { status: 400 });
    }

    console.log('🗑️ Deleting session:', { sessionId, email });

    // Find and delete session
    let progressList: any[] = [];

    if (sessionId) {
      const { data } = await client.models.OnboardingProgress.list({
        filter: { userId: { eq: sessionId } },
      });
      progressList = data;
    } else if (email) {
      const { data } = await client.models.OnboardingProgress.list({
        filter: { email: { eq: email } },
      });
      progressList = data;
    }

    for (const progress of progressList) {
      await client.models.OnboardingProgress.delete({ id: progress.id });
    }

    console.log('✅ Session(s) deleted:', progressList.length);

    return NextResponse.json({
      message: 'Session deleted successfully',
      deleted_count: progressList.length,
    });
  } catch (error) {
    console.error('❌ Error deleting session:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}

// Cleanup expired sessions
async function cleanupExpiredSessions(): Promise<void> {
  try {
    const { data: allSessions } = await client.models.OnboardingProgress.list();

    let cleanedCount = 0;

    for (const session of allSessions) {
      if (session.stepData) {
        const stepData = decryptData(session.stepData);
        const expiresAt = stepData.expires_at;

        if (expiresAt && isSessionExpired(expiresAt)) {
          await client.models.OnboardingProgress.delete({ id: session.id });
          cleanedCount++;
        }
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired sessions`);
    }
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
}
