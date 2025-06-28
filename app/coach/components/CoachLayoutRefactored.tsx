'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';
import { MobileNavbar } from './MobileNavbar';
import { useCoachProfile } from './useCoachProfile';

interface CoachLayoutRefactoredProps {
  children: React.ReactNode;
}

export function CoachLayoutRefactored({ children }: CoachLayoutRefactoredProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, profilePhoto, loading } = useCoachProfile();

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Listen for toggle events from main content
  useEffect(() => {
    const handleToggle = () => {
      toggleSidebar();
    };

    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, [toggleSidebar]);

  if (loading) {
    return (
      <div className="relative isolate flex min-h-screen w-full bg-white max-lg:flex-col lg:bg-[#004aad] dark:bg-zinc-900 dark:lg:bg-zinc-950">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate flex min-h-screen w-full bg-white max-lg:flex-col lg:bg-[#004aad] dark:bg-zinc-900 dark:lg:bg-zinc-950">
      {/* Mobile Components */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        profilePhoto={profilePhoto}
        currentUser={currentUser}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
        pathname={pathname}
        profilePhoto={profilePhoto}
        currentUser={currentUser}
      />

      {/* Mobile Navbar */}
      <MobileNavbar
        onMenuToggle={toggleMobileMenu}
        profilePhoto={profilePhoto}
      />

      {/* Main Content */}
      <main
        className={`flex flex-1 flex-col pb-2 transition-all duration-300 lg:min-w-0 lg:pt-2 lg:pr-2 ${
          isCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}
      >
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  );
}