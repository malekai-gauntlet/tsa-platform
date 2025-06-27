'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { usePathname } from 'next/navigation';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const pathname = usePathname();

  // Map route is public and doesn't require authentication
  const isPublicRoute = pathname === '/map';

  // For public routes, render children without authentication
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, use Amplify's Authenticator component
  return (
    <div className="auth-container">
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
          // If user is authenticated, render the protected content
          return <>{children}</>;
        }}
      </Authenticator>

      <style jsx global>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, rgb(117, 81, 194), rgb(255, 255, 255));
          padding: 20px;
        }

        /* Center the Amplify Authenticator */
        .auth-container [data-amplify-authenticator] {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        /* Style the auth form container */
        .auth-container [data-amplify-authenticator] [data-amplify-container] {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          border: 1px solid #e5e7eb;
        }

        /* Add TSA branding to the form */
        .auth-container [data-amplify-authenticator] [data-amplify-container]::before {
          content: "🏆 TSA Platform";
          display: block;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 600;
          color: rgb(117, 81, 194);
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f3f4f6;
        }

        /* Style form inputs */
        .auth-container [data-amplify-authenticator] input {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          padding: 12px;
          font-size: 1rem;
        }

        /* Style submit buttons */
        .auth-container [data-amplify-authenticator] button[type="submit"] {
          background: rgb(117, 81, 194);
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .auth-container [data-amplify-authenticator] button[type="submit"]:hover {
          background: rgb(107, 71, 184);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(117, 81, 194, 0.3);
        }
      `}</style>
    </div>
  );
} 