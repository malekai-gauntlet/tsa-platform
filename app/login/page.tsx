'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/navigation';
import { AUTH_CONFIG } from '@/lib/constants/auth';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1>TSA Platform</h1>
          <p>Texas Sports Academy</p>
        </div>
        
        <Authenticator
          formFields={{
            signUp: {
              'custom:firstName': {
                label: 'First Name',
                placeholder: 'Enter your first name',
                order: 1,
              },
              'custom:lastName': {
                label: 'Last Name',
                placeholder: 'Enter your last name',
                order: 2,
              },
              'custom:role': {
                label: 'Role',
                placeholder: 'Select your role',
                order: 3,
              },
            },
          }}
        >
          {({ signOut, user }) => {
            // Auto-redirect on successful authentication
            if (user) {
              router.push(AUTH_CONFIG.ROUTES.DASHBOARD);
            }
            return (
              <div className="success-message">
                <h2>Welcome to TSA Platform!</h2>
                <p>Redirecting to dashboard...</p>
              </div>
            );
          }}
        </Authenticator>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h1 {
          color: #1e293b;
          margin: 0 0 8px 0;
          font-size: 2rem;
          font-weight: 700;
        }

        .login-header p {
          color: #64748b;
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
        }

        .success-message {
          text-align: center;
          padding: 20px;
        }

        .success-message h2 {
          color: #059669;
          margin: 0 0 10px 0;
        }

        .success-message p {
          color: #6b7280;
          margin: 0;
        }

        /* Override Amplify UI styles for better integration */
        :global([data-amplify-authenticator]) {
          --amplify-colors-brand-primary-60: #2563eb;
          --amplify-colors-brand-primary-80: #1d4ed8;
          --amplify-colors-brand-primary-90: #1e40af;
          --amplify-colors-brand-primary-100: #1e3a8a;
          --amplify-radii-medium: 8px;
          --amplify-space-medium: 1rem;
        }

        :global([data-amplify-authenticator] .amplify-button--primary) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          font-weight: 600;
        }

        :global([data-amplify-authenticator] .amplify-button--primary:hover) {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        :global([data-amplify-authenticator] .amplify-field__label) {
          font-weight: 600;
          color: #374151;
        }

        :global([data-amplify-authenticator] .amplify-input) {
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }

        :global([data-amplify-authenticator] .amplify-input:focus) {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
        }
      `}</style>
    </div>
  );
} 