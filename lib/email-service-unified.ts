/**
 * Unified Email Service
 * Handles all email sending operations with consistent templates
 */

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

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): UnifiedEmailService {
    if (!UnifiedEmailService.instance) {
      UnifiedEmailService.instance = new UnifiedEmailService();
    }
    return UnifiedEmailService.instance;
  }

  public async sendInvitationEmail(params: InvitationEmailParams): Promise<EmailResult> {
    try {
      console.log('Sending invitation email to:', params.email);
      
      // In a real implementation, this would connect to SES or another email provider
      // For now, just simulate success
      return {
        success: true,
        messageId: `mock-${Date.now()}-${params.email}`,
      };
    } catch (error: any) {
      console.error('Error sending invitation email:', error);
      return {
        success: false,
        error: error.message || 'Unknown error sending email',
      };
    }
  }
}