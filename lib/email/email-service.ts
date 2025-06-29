/**
 * Unified Email Service - Production Implementation
 * Handles all email sending operations with AWS SES integration
 * Uses centralized TSA email template system
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { TSAEmailTemplates, type InvitationEmailData } from './email-templates';

interface InvitationEmailParams {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  invitationToken: string;
  role: string;
  sport?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class UnifiedEmailService {
  private static instance: UnifiedEmailService;
  private sesClient: SESClient;
  private readonly fromEmail = 'team@texassportsacademy.com';
  private readonly fromName = 'Texas Sports Academy';
  private readonly replyTo = 'info@texassportsacademy.com';

  private constructor() {
    // Initialize SES client
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  public static getInstance(): UnifiedEmailService {
    if (!UnifiedEmailService.instance) {
      UnifiedEmailService.instance = new UnifiedEmailService();
    }
    return UnifiedEmailService.instance;
  }

  /**
   * Send invitation email using centralized TSA template system
   */
  public async sendInvitationEmail(params: InvitationEmailParams): Promise<EmailResult> {
    try {
      console.log('🚀 Sending invitation email to:', params.email);

      // Transform params to match TSA template interface
      const templateData: InvitationEmailData = {
        to: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        message: params.message,
        invitationToken: params.invitationToken,
        role: params.role,
        sport: params.sport,
        recipientFirstName: params.firstName,
        recipientLastName: params.lastName,
      };

      // Generate email using centralized TSA template system
      const { html, text, subject } = TSAEmailTemplates.generateCoachInvitationEmail(templateData);

      const command = new SendEmailCommand({
        Source: `${this.fromName} <${this.fromEmail}>`,
        Destination: {
          ToAddresses: [params.email],
        },
        ReplyToAddresses: [this.replyTo],
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: html,
              Charset: 'UTF-8',
            },
            Text: {
              Data: text,
              Charset: 'UTF-8',
            },
          },
        },
      });

      const response = await this.sesClient.send(command);

      if (response.MessageId) {
        console.log('✅ Email sent successfully!');
        console.log(`   📧 To: ${params.email}`);
        console.log(`   🆔 SES Message ID: ${response.MessageId}`);
        console.log(`   🎨 Template: TSA Coach Invitation`);

        return {
          success: true,
          messageId: response.MessageId,
        };
      } else {
        throw new Error('No MessageId received from SES');
      }
    } catch (error: any) {
      console.error('❌ Error sending invitation email:', error);

      // Handle specific SES errors
      if (error.name === 'MessageRejected') {
        return {
          success: false,
          error: 'Email was rejected by SES. Please check the recipient email address.',
        };
      } else if (error.name === 'MailFromDomainNotVerifiedException') {
        return {
          success: false,
          error: 'The sender email domain is not verified in SES.',
        };
      } else if (error.name === 'ConfigurationSetDoesNotExistException') {
        return {
          success: false,
          error: 'SES configuration set does not exist.',
        };
      } else if (error.name === 'AccountSendingDisabledException') {
        return {
          success: false,
          error: 'SES sending is disabled for this account.',
        };
      } else if (error.name === 'SendingQuotaExceededException') {
        return {
          success: false,
          error: 'SES daily sending quota exceeded.',
        };
      }

      return {
        success: false,
        error: error.message || 'Unknown error sending email via SES',
      };
    }
  }
}

// Also export as default for better compatibility
export default UnifiedEmailService;
