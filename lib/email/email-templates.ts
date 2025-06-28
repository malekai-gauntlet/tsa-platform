/**
 * 🎨 TSA EMAIL TEMPLATE SYSTEM
 *
 * Beautiful, consistent email templates for all TSA platform communications.
 * Each template follows TSA branding guidelines with:
 * - Consistent header with logo and branding
 * - Responsive design for all devices
 * - Professional typography and spacing
 * - Clear call-to-action buttons
 * - Branded footer with support information
 */

import { EMAIL_ASSETS } from './email-assets';

// Base template types
export interface BaseEmailData {
  to: string;
  recipientName?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
}

export interface BookingEmailData extends BaseEmailData {
  bookingId: string;
  parentName: string;
  studentName: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  notes?: string;
  coachName?: string;
  cancellationReason?: string;
}

export interface NotificationEmailData extends BaseEmailData {
  title: string;
  content: string;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'normal' | 'high';
  category: 'application' | 'document' | 'system' | 'achievement' | 'reminder';
}

export interface WelcomeEmailData extends BaseEmailData {
  role: 'Coach' | 'Parent' | 'Admin';
  loginUrl?: string;
  nextSteps?: string[];
  schoolName?: string;
  personalMessage?: string;
}

export interface EducationalEmailData extends BaseEmailData {
  type: 'quiz_completion' | 'bootcamp_progress' | 'achievement' | 'course_reminder';
  title: string;
  description: string;
  score?: number;
  passingScore?: number;
  progress?: number;
  achievementBadge?: string;
  actionUrl?: string;
  actionText?: string;
}

export interface InvitationEmailData extends BaseEmailData {
  firstName: string;
  lastName: string;
  message: string;
  invitationToken: string;
  role: string;
  sport?: string;
}

/**
 * 🎨 EMAIL TEMPLATE GENERATOR
 */
export class TSAEmailTemplates {
  private static readonly TSA_COLORS = {
    primary: '#0066ff',
    primaryDark: '#004aad',
    secondary: '#1e40af',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      300: '#cbd5e1',
      600: '#475569',
      700: '#334155',
      900: '#0f172a',
    },
  };

  private static readonly LOGO_URL = EMAIL_ASSETS.logo.data;
  private static readonly SUPPORT_EMAIL = 'team@texassportsacademy.com';
  private static readonly PLATFORM_URL = 'https://main.d198fzips1kae2.amplifyapp.com';

  /**
   * Generate base template structure with consistent TSA branding
   */
  private static generateBaseTemplate(params: {
    title: string;
    headerColor?: string;
    headerText?: string;
    content: string;
    footerNote?: string;
    recipientEmail: string;
  }): string {
    const {
      title,
      headerColor = this.TSA_COLORS.primary,
      headerText = 'Texas Sports Academy',
      content,
      footerNote,
      recipientEmail,
    } = params;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${this.TSA_COLORS.gray[50]};">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, ${this.TSA_COLORS.primaryDark} 0%, ${headerColor} 100%); padding: 40px 20px; text-align: center;">
      <img src="${this.LOGO_URL}" alt="Texas Sports Academy" style="height: 60px; margin-bottom: 20px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">${headerText}</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      ${content}
    </div>
    
    <!-- Footer -->
    <div style="background-color: ${this.TSA_COLORS.gray[50]}; padding: 30px; text-align: center; border-top: 1px solid ${this.TSA_COLORS.gray[300]};">
      ${footerNote ? `<p style="color: ${this.TSA_COLORS.gray[600]}; font-size: 14px; margin: 0 0 15px;">${footerNote}</p>` : ''}
      <p style="color: ${this.TSA_COLORS.gray[700]}; font-size: 16px; margin: 0 0 20px; font-weight: 500;">
        Best regards,<br>
        Texas Sports Academy
      </p>
      <p style="color: ${this.TSA_COLORS.gray[600]}; font-size: 12px; margin: 0;">
        <strong>Texas Sports Academy</strong><br>
        This email was sent to ${recipientEmail}<br>
        <a href="mailto:${this.SUPPORT_EMAIL}" style="color: ${this.TSA_COLORS.primary}; text-decoration: none;">Contact Support</a> |
        <a href="${this.PLATFORM_URL}" style="color: ${this.TSA_COLORS.primary}; text-decoration: none;">Visit Platform</a>
      </p>
    </div>
    
  </div>
</body>
</html>
    `;
  }

  /**
   * Generate CTA button with consistent styling
   */
  private static generateCTAButton(
    text: string,
    url: string,
    color: string = this.TSA_COLORS.primary
  ): string {
    return `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" 
           style="background-color: ${color}; color: white; padding: 16px 32px; 
                  text-decoration: none; border-radius: 8px; display: inline-block;
                  font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);">
          ${text}
        </a>
      </div>
    `;
  }

  /**
   * Generate info box with consistent styling
   */
  private static generateInfoBox(
    content: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ): string {
    const colors = {
      info: { bg: '#eff6ff', border: this.TSA_COLORS.primary, text: this.TSA_COLORS.secondary },
      success: { bg: '#f0fdf4', border: this.TSA_COLORS.success, text: '#166534' },
      warning: { bg: '#fef3c7', border: this.TSA_COLORS.warning, text: '#92400e' },
      error: { bg: '#fef2f2', border: this.TSA_COLORS.error, text: '#991b1b' },
    };

    const colorScheme = colors[type];

    return `
      <div style="background-color: ${colorScheme.bg}; border-left: 4px solid ${colorScheme.border}; padding: 16px; margin: 20px 0; border-radius: 0 6px 6px 0;">
        <div style="color: ${colorScheme.text}; line-height: 1.6;">
          ${content}
        </div>
      </div>
    `;
  }

  // =====================================================
  // INVITATION EMAIL TEMPLATES
  // =====================================================

  /**
   * 🎫 Coach Invitation Email (Main template for our script)
   */
  static generateCoachInvitationEmail(data: InvitationEmailData): {
    html: string;
    text: string;
    subject: string;
  } {
    const invitationUrl = `${this.PLATFORM_URL}/onboarding?invite=${data.invitationToken}`;

    const content = `
      <h2 style="color: ${this.TSA_COLORS.gray[900]}; margin: 0 0 20px; font-size: 24px;">
        Welcome to Our Coaching Team! 🏆
      </h2>
      
      <p style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
        Dear ${data.firstName} ${data.lastName},
      </p>

      <div style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
        ${data.message}
      </div>

      ${this.generateInfoBox(
        `
        <strong>🎯 Next Steps:</strong>
        <ol style="margin: 10px 0 0; padding-left: 20px;">
          <li>Click the button below to accept your invitation</li>
          <li>Complete your coaching profile setup</li>
          <li>Start connecting with student athletes</li>
        </ol>
      `,
        'info'
      )}

      ${this.generateCTAButton('Accept Invitation & Get Started', invitationUrl)}

      <h3 style="color: ${this.TSA_COLORS.gray[900]}; margin: 25px 0 15px; font-size: 18px;">
        What makes TSA special:
      </h3>
      
      <ul style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; padding-left: 20px;">
        <li style="margin-bottom: 8px;">🏅 Work with motivated student athletes</li>
        <li style="margin-bottom: 8px;">📚 Access to cutting-edge training resources</li>
        <li style="margin-bottom: 8px;">🤝 Collaborative coaching community</li>
        <li style="margin-bottom: 8px;">📊 Advanced performance tracking tools</li>
      </ul>

      <p style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin: 25px 0;">
        If you have any questions, please don't hesitate to reach out to our team at 
        <a href="mailto:${this.SUPPORT_EMAIL}" style="color: ${this.TSA_COLORS.primary}; text-decoration: none;">${this.SUPPORT_EMAIL}</a>.
      </p>

      <p style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin: 25px 0;">
        We're excited to have you join our mission of developing the next generation of student athletes!
      </p>
    `;

    const html = this.generateBaseTemplate({
      title: 'Invitation to Join Texas Sports Academy',
      headerColor: this.TSA_COLORS.success,
      headerText: 'Welcome to Our Coaching Team!',
      content,
      footerNote:
        "This invitation will expire in 30 days. If you're unable to click the button above, copy and paste this link into your browser: " +
        invitationUrl,
      recipientEmail: data.to,
    });

    const text = `
INVITATION TO JOIN TEXAS SPORTS ACADEMY

Dear ${data.firstName} ${data.lastName},

${data.message}

Next Steps:
1. Click the link below to accept your invitation
2. Complete your coaching profile setup  
3. Start connecting with student athletes

Accept Invitation: ${invitationUrl}

What makes TSA special:
• Work with motivated student athletes
• Access to cutting-edge training resources
• Collaborative coaching community
• Advanced performance tracking tools

If you have any questions, please reach out to ${this.SUPPORT_EMAIL}.

We're excited to have you join our mission of developing the next generation of student athletes!

Best regards,
The Texas Sports Academy Team

---
This invitation will expire in 30 days.
Link: ${invitationUrl}
    `.trim();

    return {
      html,
      text,
      subject: `🏆 Invitation to Join Texas Sports Academy as a ${data.role}`,
    };
  }

  // =====================================================
  // WELCOME & ONBOARDING EMAIL TEMPLATES
  // =====================================================

  /**
   * 👋 Welcome Email
   */
  static generateWelcomeEmail(data: WelcomeEmailData): {
    html: string;
    text: string;
    subject: string;
  } {
    const roleEmojis = {
      Coach: '🏆',
      Parent: '👨‍👩‍👧‍👦',
      Admin: '⚙️',
    };

    const content = `
      <h2 style="color: ${this.TSA_COLORS.gray[900]}; margin: 0 0 20px; font-size: 24px;">
        Welcome to Texas Sports Academy! ${roleEmojis[data.role]}
      </h2>
      
      <p style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
        Hello ${data.recipientFirstName || 'there'}, we're thrilled to have you join our community as a <strong>${data.role}</strong>!
      </p>

      ${
        data.schoolName
          ? this.generateInfoBox(
              `
        <p style="margin: 0;"><strong>🏫 School:</strong> ${data.schoolName}</p>
      `,
              'info'
            )
          : ''
      }

      ${
        data.personalMessage
          ? `
        <div style="background-color: ${this.TSA_COLORS.gray[100]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <p style="color: ${this.TSA_COLORS.gray[700]}; margin: 0; font-style: italic;">
            "${data.personalMessage}"
          </p>
        </div>
      `
          : ''
      }

      <h3 style="color: ${this.TSA_COLORS.gray[900]}; margin: 25px 0 15px; font-size: 18px;">
        Next Steps:
      </h3>
      
      <ul style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; padding-left: 20px;">
        ${
          data.nextSteps
            ? data.nextSteps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')
            : `
          <li style="margin-bottom: 8px;">Complete your profile setup</li>
          <li style="margin-bottom: 8px;">Explore the platform features</li>
          <li style="margin-bottom: 8px;">Connect with our community</li>
        `
        }
      </ul>

      <p style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin: 25px 0;">
        If you have any questions or need assistance getting started, our support team is here to help!
      </p>

      ${this.generateCTAButton('Access Your Dashboard', data.loginUrl || this.PLATFORM_URL)}
    `;

    const html = this.generateBaseTemplate({
      title: 'Welcome to TSA!',
      headerColor: this.TSA_COLORS.success,
      headerText: `Welcome, ${data.recipientFirstName || 'New Member'}!`,
      content,
      footerNote: "Welcome to the TSA family! We're excited to support your journey.",
      recipientEmail: data.to,
    });

    const text = `
WELCOME TO TEXAS SPORTS ACADEMY!

Hello ${data.recipientFirstName || 'there'},

We're thrilled to have you join our community as a ${data.role}!

${data.schoolName ? `School: ${data.schoolName}` : ''}

${data.personalMessage ? `"${data.personalMessage}"` : ''}

Next Steps:
${
  data.nextSteps
    ? data.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')
    : `
1. Complete your profile setup
2. Explore the platform features
3. Connect with our community`
}

Access your dashboard: ${data.loginUrl || this.PLATFORM_URL}

Best regards,
Texas Sports Academy

Questions? Contact us at ${this.SUPPORT_EMAIL}
    `.trim();

    return {
      html,
      text,
      subject: `Welcome to Texas Sports Academy, ${data.recipientFirstName || 'New Member'}!`,
    };
  }

  // =====================================================
  // SYSTEM NOTIFICATION EMAIL TEMPLATES
  // =====================================================

  /**
   * 🔔 System Notification Email
   */
  static generateNotificationEmail(data: NotificationEmailData): {
    html: string;
    text: string;
    subject: string;
  } {
    const priorityColors = {
      low: this.TSA_COLORS.gray[600],
      normal: this.TSA_COLORS.primary,
      high: this.TSA_COLORS.error,
    };

    const priorityLabels = {
      low: '',
      normal: '🔔',
      high: '🚨 URGENT:',
    };

    const content = `
      <h2 style="color: ${this.TSA_COLORS.gray[900]}; margin: 0 0 20px; font-size: 24px;">
        ${priorityLabels[data.priority]} ${data.title}
      </h2>
      
      ${
        data.recipientFirstName
          ? `
        <p style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
          Hello ${data.recipientFirstName},
        </p>
      `
          : ''
      }

      <div style="color: ${this.TSA_COLORS.gray[700]}; line-height: 1.6; font-size: 16px; margin-bottom: 25px;">
        ${data.content}
      </div>

      ${
        data.actionUrl && data.actionText
          ? this.generateCTAButton(data.actionText, data.actionUrl, priorityColors[data.priority])
          : ''
      }

      ${
        data.priority === 'high'
          ? this.generateInfoBox(
              '<strong>⚠️ Action Required:</strong> This notification requires your immediate attention.',
              'warning'
            )
          : ''
      }
    `;

    const html = this.generateBaseTemplate({
      title: `${data.title} - TSA`,
      headerColor: priorityColors[data.priority],
      headerText: data.priority === 'high' ? 'Urgent Notification' : 'TSA Notification',
      content,
      footerNote:
        data.priority === 'high'
          ? 'This is an urgent notification that requires your attention.'
          : undefined,
      recipientEmail: data.to,
    });

    const text = `
${priorityLabels[data.priority]} ${data.title.toUpperCase()} - Texas Sports Academy

${data.recipientFirstName ? `Hello ${data.recipientFirstName},` : ''}

${data.content}

${data.actionUrl && data.actionText ? `${data.actionText}: ${data.actionUrl}` : ''}

${data.priority === 'high' ? 'ACTION REQUIRED: This notification requires your immediate attention.' : ''}

Best regards,
Texas Sports Academy

Questions? Contact us at ${this.SUPPORT_EMAIL}
    `.trim();

    return {
      html,
      text,
      subject: `${priorityLabels[data.priority]} ${data.title}`.trim(),
    };
  }
}

// Export convenience functions for easy use
export const { generateCoachInvitationEmail, generateWelcomeEmail, generateNotificationEmail } =
  TSAEmailTemplates;
