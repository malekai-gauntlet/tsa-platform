'use client';

import { usePathname } from 'next/navigation';
import { SessionProvider, useSession, signIn } from 'next-auth/react';
import Image from 'next/image';

interface ClientWrapperProps {
  children: React.ReactNode;
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Public routes that don't require authentication
  const publicRoutes = ['/map', '/login'];
  const publicPathPrefixes = ['/onboarding'];
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicPathPrefixes.some(prefix => pathname.startsWith(prefix));

  // For public routes, render children without authentication
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!session) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img 
              src="/logo.svg" 
              alt="Texas Sports Academy" 
              style={{ width: '200px', height: 'auto' }} 
              className="brightness-0 invert"
            />
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as any).email.value;
              const password = (e.target as any).password.value;
              signIn('credentials', { email, password });
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Email
              </label>
              <input
                id="email"
                name="email" 
                type="email"
                required
                placeholder="malekaimischke@gmail.com"
                style={{
                  width: '100%',
                  padding: '0.6rem 1.2rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Password
              </label>
              <input
                id="password"
                name="password" 
                type="password"
                required
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.6rem 1.2rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.6rem 1.2rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Sign in
            </button>
          </form>

          <div className="contact-info">
            <p>
              <strong>Development Mode:</strong> Enter any email and password to login.
            </p>
            <p>
              Can't login? Contact us at{' '}
              <a href="mailto:team@texassportsacademy.com">team@texassportsacademy.com</a> for
              an invite.
            </p>
          </div>
        </div>

        <style jsx global>{`
          .auth-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%);
            padding: 20px;
            font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
          }

          .auth-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            border: 1px solid #9ca3af;
            width: 100%;
            max-width: 400px;
          }

          .contact-info {
            text-align: center;
            padding-top: 1rem;
          }

          .contact-info p {
            margin: 0;
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.4;
          }

          .contact-info a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }

          .contact-info a:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }
        `}</style>
      </div>
    );
  }

  // User is authenticated, render the app
  return <>{children}</>;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
}
