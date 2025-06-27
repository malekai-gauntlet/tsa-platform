'use client';

import { usePathname } from 'next/navigation';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Image from 'next/image';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ['/map', '/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // For public routes, render children without authentication
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, wrap with Authenticator
  return (
    <div className="auth-container">
      <Authenticator
        hideSignUp={true}
        formFields={{
          signIn: {
            username: {
              label: 'Email',
              placeholder: 'Enter your email',
            },
          },
        }}
        components={{
          Header() {
            return (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Image
                  src="/logo.svg"
                  alt="Texas Sports Academy"
                  width={200}
                  height={94}
                />
              </div>
            );
          },
        }}
      >
        {({ signOut, user }) => {
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
          font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        }

        /* Center the Amplify Authenticator */
        .auth-container [data-amplify-authenticator] {
          width: 100%;
          max-width: 400px;
        }

        /* Style the form container to match app design */
        .auth-container [data-amplify-authenticator] [data-amplify-container] {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          border: 1px solid transparent;
        }

        /* Style form inputs to match app design */
        .auth-container [data-amplify-authenticator] input {
          border-radius: 8px;
          font-family: inherit;
          font-size: 1em;
          padding: 0.6em 1.2em;
        }

        /* Style submit button to match app design */
        .auth-container [data-amplify-authenticator] button[type="submit"] {
          border-radius: 8px;
          border: 1px solid transparent;
          padding: 0.6em 1.2em;
          font-size: 1em;
          font-weight: 500;
          font-family: inherit;
          background-color: #2563eb;
          color: white;
          cursor: pointer;
          transition: all 0.25s;
          width: 100%;
        }

        .auth-container [data-amplify-authenticator] button[type="submit"]:hover {
          background-color: #1d4ed8;
        }

        .auth-container [data-amplify-authenticator] button[type="submit"]:focus,
        .auth-container [data-amplify-authenticator] button[type="submit"]:focus-visible {
          outline: 4px auto -webkit-focus-ring-color;
        }

        /* Style secondary buttons/links */
        .auth-container [data-amplify-authenticator] button[data-variation="link"] {
          font-family: inherit;
          font-weight: 500;
          color: #2563eb;
        }

        .auth-container [data-amplify-authenticator] button[data-variation="link"]:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
} 