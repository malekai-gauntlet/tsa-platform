#!/usr/bin/env tsx

/**
 * TSA Coach Invitation Script (TypeScript)
 *
 * This script provides a comprehensive coach invitation system that:
 * - Creates Cognito users with temporary passwords using Amplify's AdminCreateUser
 * - Sends beautiful invitation emails using existing TSA email templates
 * - Creates invitation records via GraphQL mutations
 * - Integrates seamlessly with existing auth and email infrastructure
 *
 * Usage:
 *   npm run invite-coach -- --name "John Smith" --email "john@example.com" --cell "+1234567890" \
 *                           --city "Austin" --state "TX" --d1-athletics "5" \
 *                           --bio "Experienced basketball coach with 10 years of youth development."
 *
 * Features:
 * - Input validation and sanitization
 * - Amplify Cognito integration for user creation
 * - TSA email template system integration
 * - GraphQL database operations
 * - Comprehensive error handling and logging
 * - Dry run and test modes
 */

import { randomBytes } from 'crypto';
import {
  AdminCreateUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import { UnifiedEmailService } from '../lib/email/email-service';
import { TSAEmailTemplates } from '../lib/email/email-templates';
import type { Schema } from '../amplify/data/resource';

// Import amplify outputs for configuration
let amplifyOutputs: any;
try {
  amplifyOutputs = require('../amplify_outputs.json');
} catch (error) {
  console.error(
    '❌ Could not load amplify_outputs.json. Make sure to run `npx ampx sandbox` first.'
  );
  process.exit(1);
}

// Configure Amplify
Amplify.configure(amplifyOutputs);

// Initialize GraphQL client
const client = generateClient<Schema>();

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: amplifyOutputs.auth.aws_region || 'us-east-1',
});

// Types
interface CoachInvitationData {
  name: string;
  email: string;
  cell: string;
  city: string;
  state: string;
  d1Athletics: number;
  bio: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface InvitationResult {
  success: boolean;
  userId?: string;
  invitationId?: string;
  temporaryPassword?: string;
  error?: string;
}

/**
 * TSA Coach Invitation Service
 */
class TSACoachInvitationService {
  private emailService: UnifiedEmailService;
  private userPoolId: string;

  constructor() {
    this.emailService = UnifiedEmailService.getInstance();
    this.userPoolId = amplifyOutputs.auth.user_pool_id;

    if (!this.userPoolId) {
      throw new Error('User Pool ID not found in amplify_outputs.json');
    }
  }

  /**
   * Validate coach invitation data
   */
  validateInvitationData(data: CoachInvitationData): ValidationResult {
    const errors: string[] = [];

    // Required fields
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!data.cell?.trim()) errors.push('Cell phone is required');
    if (!data.city?.trim()) errors.push('City is required');
    if (!data.state?.trim()) errors.push('State is required');
    if (!data.bio?.trim()) errors.push('Bio is required');

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }

    // Phone validation (supports multiple formats)
    const phoneRegex = /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
    if (data.cell && !phoneRegex.test(data.cell)) {
      errors.push('Invalid phone format (expected: +1234567890, (123) 456-7890, etc.)');
    }

    // D1 athletics validation
    if (data.d1Athletics < 0) {
      errors.push('D1 athletics count must be non-negative');
    }

    // State validation (basic US state check)
    const validStates = [
      'AL',
      'AK',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'FL',
      'GA',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY',
      'DC',
    ];
    if (data.state && !validStates.includes(data.state.toUpperCase())) {
      errors.push('Invalid state abbreviation (use 2-letter US state codes)');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Parse full name into first and last name
   */
  parseFullName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return {
        firstName: parts[0],
        lastName: parts.slice(1).join(' '),
      };
    }
    return {
      firstName: parts[0] || '',
      lastName: '',
    };
  }

  /**
   * Format phone number to consistent format
   */
  formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    // Add country code if missing
    const fullDigits = digits.length === 10 ? '1' + digits : digits;

    // Format as +1 (XXX) XXX-XXXX
    if (fullDigits.length === 11 && fullDigits.startsWith('1')) {
      return `+${fullDigits[0]} (${fullDigits.slice(1, 4)}) ${fullDigits.slice(4, 7)}-${fullDigits.slice(7)}`;
    }

    return phone; // Return original if we can't format it
  }

  /**
   * Generate secure temporary password
   */
  generateTemporaryPassword(): string {
    // Generate a secure password that meets Cognito requirements:
    // - At least 8 characters
    // - Contains uppercase, lowercase, numbers, and symbols
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*';
    const specialChars = '!@#$%&*';
    const numbers = '23456789';
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowercase = 'abcdefghjkmnpqrstuvwxyz';

    let password = '';

    // Ensure we have at least one of each required character type
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest randomly
    for (let i = 4; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle the password
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  /**
   * Generate unique invitation token
   */
  generateInvitationToken(): string {
    return `tsa-invite-${randomBytes(16).toString('hex')}`;
  }

  /**
   * Create Cognito user with temporary password
   */
  async createCognitoUser(
    data: CoachInvitationData,
    temporaryPassword: string
  ): Promise<{ success: boolean; userId?: string; error?: string }> {
    try {
      const { firstName, lastName } = this.parseFullName(data.name);
      const formattedPhone = this.formatPhoneNumber(data.cell);

      const command = new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: data.email,
        UserAttributes: [
          { Name: 'email', Value: data.email },
          { Name: 'email_verified', Value: 'true' },
          { Name: 'custom:firstName', Value: firstName },
          { Name: 'custom:lastName', Value: lastName },
          { Name: 'custom:phoneNumber', Value: formattedPhone },
        ],
        TemporaryPassword: temporaryPassword,
        MessageAction: 'SUPPRESS', // We'll send our own custom email
        DesiredDeliveryMediums: ['EMAIL'],
      });

      const response = await cognitoClient.send(command);

      return {
        success: true,
        userId: response.User?.Username,
      };
    } catch (error: any) {
      console.error('❌ Error creating Cognito user:', error);

      if (error.name === 'UsernameExistsException') {
        return {
          success: false,
          error: 'A user with this email already exists',
        };
      }

      return {
        success: false,
        error: error.message || 'Failed to create user',
      };
    }
  }

  /**
   * Create invitation record in database
   */
  async createInvitationRecord(
    data: CoachInvitationData,
    token: string,
    userId: string
  ): Promise<{ success: boolean; invitationId?: string; error?: string }> {
    try {
      const { firstName, lastName } = this.parseFullName(data.name);
      const formattedPhone = this.formatPhoneNumber(data.cell);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

      const response = await client.models.Invitation.create({
        email: data.email,
        invitedBy: 'admin-script', // Could be made configurable
        invitationType: 'COACH',
        status: 'PENDING',
        token,
        expiresAt: expiresAt.toISOString(),

        // Pre-fill data for onboarding
        firstName,
        lastName,
        phone: formattedPhone,
        city: data.city,
        state: data.state.toUpperCase(),
        bio: data.bio,
        message: `Welcome to Texas Sports Academy! We're excited to have a coach with ${data.d1Athletics} D1/pro athletes join our team.`,

        // Additional metadata
        sport: 'Multi-Sport', // Default value
        schoolName: '', // Will be filled during onboarding
        schoolType: '', // Will be filled during onboarding

        lastSentAt: new Date().toISOString(),
      });

      if (response.errors) {
        throw new Error(`GraphQL errors: ${response.errors.map(e => e.message).join(', ')}`);
      }

      return {
        success: true,
        invitationId: response.data?.id,
      };
    } catch (error: any) {
      console.error('❌ Error creating invitation record:', error);
      return {
        success: false,
        error: error.message || 'Failed to create invitation record',
      };
    }
  }

  /**
   * Send invitation email using TSA template system
   */
  async sendInvitationEmail(
    data: CoachInvitationData,
    token: string,
    temporaryPassword: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const { firstName, lastName } = this.parseFullName(data.name);
      const invitationUrl = `${amplifyOutputs.custom?.frontend_url || 'https://main.d198fzips1kae2.amplifyapp.com'}/onboarding?invite=${token}`;

      // Use the existing TSA email template system
      const result = await this.emailService.sendInvitationEmail({
        email: data.email,
        firstName,
        lastName,
        message: `We're excited to invite you to join Texas Sports Academy as a coach! Based on your impressive background with ${data.d1Athletics} Division I/professional athletes, we believe you'd be a perfect fit for our innovative sports education platform.`,
        invitationToken: token,
        role: 'Coach',
        sport: 'Multi-Sport',
      });

      if (result.success) {
        console.log('✅ Invitation email sent successfully!');
        console.log(`   📧 To: ${data.email}`);
        console.log(`   🔗 Invitation URL: ${invitationUrl}`);
        if (result.messageId) {
          console.log(`   🆔 Message ID: ${result.messageId}`);
        }
      }

      return result;
    } catch (error: any) {
      console.error('❌ Error sending invitation email:', error);
      return {
        success: false,
        error: error.message || 'Failed to send invitation email',
      };
    }
  }

  /**
   * Main invitation process
   */
  async inviteCoach(
    data: CoachInvitationData,
    options: { dryRun?: boolean; testEmailOnly?: boolean } = {}
  ): Promise<InvitationResult> {
    console.log('\n🚀 Starting coach invitation process...');
    console.log(`   👤 Name: ${data.name}`);
    console.log(`   📧 Email: ${data.email}`);
    console.log(`   📱 Phone: ${data.cell}`);
    console.log(`   🏠 Location: ${data.city}, ${data.state}`);
    console.log(`   🏆 D1/Pro Athletes: ${data.d1Athletics}`);

    // Validate input
    const validation = this.validateInvitationData(data);
    if (!validation.isValid) {
      console.error('\n❌ Validation failed:');
      validation.errors.forEach(error => console.error(`   • ${error}`));
      return { success: false, error: 'Validation failed' };
    }

    console.log('✅ Input validation passed');

    if (options.dryRun) {
      console.log('\n🧪 DRY RUN MODE - No actual changes would be made');
      console.log('✅ All validations passed - invitation would succeed');
      return { success: true };
    }

    try {
      // Generate temporary password and invitation token
      const temporaryPassword = this.generateTemporaryPassword();
      const token = this.generateInvitationToken();

      if (options.testEmailOnly) {
        console.log(
          '\n📧 TEST EMAIL MODE - Sending email only (no user creation or database operations)'
        );

        // Send test email only
        const emailResult = await this.sendInvitationEmail(data, token, temporaryPassword);

        if (emailResult.success) {
          console.log('\n🎉 Test email sent successfully!');
          console.log(`   📧 Email delivered to: ${data.email}`);
          console.log(`   🔑 Test token used: ${token}`);
          console.log(`   🔐 Test password: ${temporaryPassword}`);
          console.log(
            `   💡 Note: This was a test email only - no user or database record was created`
          );
          return { success: true };
        } else {
          console.log('\n❌ Test email failed to send');
          return { success: false, error: emailResult.error };
        }
      }

      // Step 1: Create Cognito user
      console.log('\n👤 Creating Cognito user...');
      const userResult = await this.createCognitoUser(data, temporaryPassword);
      if (!userResult.success) {
        return { success: false, error: userResult.error };
      }
      console.log(`✅ Cognito user created: ${userResult.userId}`);

      // Step 2: Create invitation record
      console.log('\n📝 Creating invitation record...');
      const invitationResult = await this.createInvitationRecord(data, token, userResult.userId!);
      if (!invitationResult.success) {
        // TODO: Consider rolling back user creation in a real-world scenario
        return { success: false, error: invitationResult.error };
      }
      console.log(`✅ Invitation record created: ${invitationResult.invitationId}`);

      // Step 3: Send invitation email
      console.log('\n📧 Sending invitation email...');
      const emailResult = await this.sendInvitationEmail(data, token, temporaryPassword);

      if (emailResult.success) {
        console.log('\n🎉 Coach invitation completed successfully!');
        console.log(`   ✅ Cognito user created`);
        console.log(`   ✅ Database record created`);
        console.log(`   ✅ Email sent`);
        console.log(`   🔑 Invitation token: ${token}`);

        return {
          success: true,
          userId: userResult.userId,
          invitationId: invitationResult.invitationId,
          temporaryPassword,
        };
      } else {
        console.log('\n⚠️  User and invitation record created but email failed to send');
        console.log(`   ✅ Cognito user created`);
        console.log(`   ✅ Database record created`);
        console.log(`   ❌ Email sending failed: ${emailResult.error}`);
        console.log(`   🔑 Invitation token: ${token}`);
        console.log(`   💡 You can manually resend the email using the token above`);

        return {
          success: false,
          userId: userResult.userId,
          invitationId: invitationResult.invitationId,
          temporaryPassword,
          error: `Email sending failed: ${emailResult.error}`,
        };
      }
    } catch (error: any) {
      console.error('\n❌ Coach invitation failed:', error);
      return { success: false, error: error.message || 'Unknown error occurred' };
    }
  }
}

/**
 * CLI Interface
 */
async function main() {
  const args = process.argv.slice(2);

  // Help command
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
🏆 TSA Coach Invitation Script

Usage:
  npm run invite-coach -- --name "John Smith" --email "john@example.com" --cell "+1234567890" \\
                          --city "Austin" --state "TX" --d1-athletics "5" \\
                          --bio "Experienced basketball coach with 10 years of youth development."

Required Arguments:
  --name <string>         Full name of the coach
  --email <string>        Email address of the coach
  --cell <string>         Cell phone number (supports multiple formats)
  --city <string>         City where the coach is located
  --state <string>        State abbreviation (e.g., TX, CA)
  --d1-athletics <number> Number of D1/professional athletes coached
  --bio <string>          Coach bio (1-2 sentences about their background)

Optional Arguments:
  --dry-run              Validate inputs without making any changes
  --test-email-only      Send test email only (skip user creation and database operations)
  --help, -h             Show this help message

Examples:
  # Basic invitation
  npm run invite-coach -- --name "Sarah Rodriguez" --email "sarah@example.com" \\
    --cell "(512) 555-9876" --city "Austin" --state "TX" --d1-athletics "3" \\
    --bio "Licensed coach with 8 years experience in youth development."

  # Dry run (validation only)
  npm run invite-coach -- --name "Test Coach" --email "test@example.com" \\
    --cell "+1234567890" --city "Test City" --state "TX" --d1-athletics "1" \\
    --bio "This is a test." --dry-run

  # Test email only
  npm run invite-coach -- --name "Danny Mota" --email "danny.mota@superbuilders.school" \\
    --cell "+1555123467" --city "Austin" --state "TX" --d1-athletics "8" \\
    --bio "Tech entrepreneur and sports enthusiast." --test-email-only

Features:
  ✅ Input validation and sanitization
  ✅ Cognito user creation with temporary passwords
  ✅ GraphQL database operations
  ✅ TSA email template system integration
  ✅ Comprehensive error handling
  ✅ Dry run and test modes

Environment Requirements:
  - Amplify sandbox must be running: npx ampx sandbox
  - AWS credentials configured (via aws configure or environment variables)
  - SES email sending configured for team@texassportsacademy.com
`);
    process.exit(0);
  }

  // Parse arguments
  const getArg = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    return index !== -1 ? args[index + 1] : undefined;
  };

  const hasFlag = (flag: string): boolean => args.includes(flag);

  try {
    // Parse required arguments
    const coachData: CoachInvitationData = {
      name: getArg('--name') || '',
      email: getArg('--email') || '',
      cell: getArg('--cell') || '',
      city: getArg('--city') || '',
      state: getArg('--state') || '',
      d1Athletics: parseInt(getArg('--d1-athletics') || '0'),
      bio: getArg('--bio') || '',
    };

    // Parse options
    const options = {
      dryRun: hasFlag('--dry-run'),
      testEmailOnly: hasFlag('--test-email-only'),
    };

    if (options.dryRun) {
      console.log('🧪 DRY RUN MODE - No actual changes will be made');
    } else if (options.testEmailOnly) {
      console.log(
        '📧 TEST EMAIL MODE - Sending email only (no user creation or database operations)'
      );
    }

    // Initialize service and process invitation
    const service = new TSACoachInvitationService();
    const result = await service.inviteCoach(coachData, options);

    if (result.success) {
      console.log('\n🎉 Process completed successfully!');
      process.exit(0);
    } else {
      console.error(`\n❌ Process failed: ${result.error}`);
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n💥 Unexpected error:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Handle uncaught errors gracefully
process.on('uncaughtException', error => {
  console.error('\n💥 Uncaught exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error('\n💥 Unhandled rejection:', reason);
  process.exit(1);
});

if (require.main === module) {
  main();
}

export { TSACoachInvitationService, type CoachInvitationData, type InvitationResult };
