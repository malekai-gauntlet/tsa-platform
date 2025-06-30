import { useSession, signOut } from 'next-auth/react';

export function useAuthSession() {
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === 'authenticated';
  
  const checkAuthState = async () => {
    // NextAuth handles this automatically
    return isAuthenticated;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    isAuthenticated,
    checkAuthState,
    signOut: handleSignOut,
    session,
    status,
  };
}
