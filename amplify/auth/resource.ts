import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource for TSA
 * Supports role-based access (admin, coach, parent) with AWS SES email sending
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  senders: {
    email: {
      // Configure using a verified email in Amazon SES
      fromEmail: "team@texassportsacademy.com",
      fromName: "Texas Sports Academy",
      replyTo: "info@texassportsacademy.com"
    },
  },
  userAttributes: {
    // Core TSA user attributes (custom attribute names must be ≤20 chars)
    'custom:firstName': {
      dataType: 'String', 
      mutable: true,
    },
    'custom:lastName': {
      dataType: 'String',
      mutable: true, 
    },
    'custom:schoolName': {
      dataType: 'String',
      mutable: true,
    },
    'custom:phoneNumber': {
      dataType: 'String',
      mutable: true,
    },
  },
  groups: ['admin', 'coach'],
  // Enable email-based account recovery for production
  accountRecovery: 'EMAIL_ONLY'
});
