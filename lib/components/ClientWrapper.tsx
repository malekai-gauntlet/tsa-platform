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
  );
} 