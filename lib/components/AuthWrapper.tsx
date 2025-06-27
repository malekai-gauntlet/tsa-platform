'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';
import { AUTH_CONFIG } from '@/lib/constants/auth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    isLoading: boolean;
  }>({ isAuthenticated: null, isLoading: true });
  
  const router = useRouter();
  const pathname = usePathname();

  // Check if current route is public (doesn't require authentication)
  const isPublicRoute = AUTH_CONFIG.PUBLIC_ROUTES.includes(pathname as '/login' | '/map');

  // Check auth state - called once when component mounts
  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setAuthState({ isAuthenticated: true, isLoading: false });
      
      // If user is authenticated and on login page, redirect to dashboard
      if (pathname === AUTH_CONFIG.ROUTES.LOGIN) {
        router.push(AUTH_CONFIG.ROUTES.DASHBOARD);
      }
    } catch (error) {
      setAuthState({ isAuthenticated: false, isLoading: false });
      
      // If user is not authenticated and on a protected route, redirect to login
      if (!isPublicRoute) {
        router.push(AUTH_CONFIG.ROUTES.LOGIN);
      }
    }
  };

  // Call auth check if not already done
  if (authState.isAuthenticated === null) {
    checkAuthState();
  }

  // Show loading spinner while checking auth state
  if (authState.isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
        
        <style jsx>{`
          .auth-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .loading-spinner {
            text-align: center;
            color: white;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }

          .loading-spinner p {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 500;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // For public routes, always render children
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, only render if authenticated
  if (authState.isAuthenticated) {
    return <>{children}</>;
  }

  // This shouldn't happen due to redirect logic, but fallback
  return null;
} 