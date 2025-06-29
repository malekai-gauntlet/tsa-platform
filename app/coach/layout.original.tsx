'use client';

import { Avatar } from '@/components/data-display';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  LockClosedIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/16/solid';
import {
  HomeIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  CameraIcon,
  ScaleIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
  BanknotesIcon,
} from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { userOperations } from '@/lib/services/graphql-client';

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="/coach/settings">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={handleSignOut}>
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

function LockedSidebarItem({
  children,
  title,
  isCollapsed = false,
}: {
  children: React.ReactNode;
  title: string;
  isCollapsed?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Do nothing - completely disabled
  };

  return (
    <div
      className="relative cursor-not-allowed opacity-60"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      <LockClosedIcon className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-white/60" />

      {/* Tooltip */}
      {showTooltip && (
        <div
          className={`absolute z-50 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg ${
            isCollapsed
              ? 'top-1/2 left-full ml-2 -translate-y-1/2 transform'
              : 'top-full left-1/2 mt-2 -translate-x-1/2 transform'
          }`}
        >
          Coming Soon
          <div
            className={`absolute h-2 w-2 rotate-45 transform bg-gray-900 ${
              isCollapsed
                ? 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 transform'
                : 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 transform'
            }`}
          />
        </div>
      )}
    </div>
  );
}

function CoachLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Fetch initial profile data including photo
    fetchProfilePhoto();

    // Listen for profile photo changes
    const handleProfilePhotoChange = (event: CustomEvent) => {
      setProfilePhoto(event.detail);
    };

    window.addEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);

    return () => {
      window.removeEventListener('profilePhotoChange', handleProfilePhotoChange as EventListener);
    };
  }, []);

  const fetchProfilePhoto = async () => {
    try {
      // Use static import instead of dynamic import to avoid chunk loading issues
      const profile = await userOperations.getCurrentProfile();

      if (profile?.preferences && typeof profile.preferences === 'object') {
        const profileData = profile.preferences as any;
        if (profileData.profile_photo_url) {
          setProfilePhoto(profileData.profile_photo_url);
        }
      }
    } catch (error) {
      console.error('Error fetching profile photo:', error);
      // Gracefully handle the error - don't crash the app
      // The profile photo will remain null/default
    }
  };

  useEffect(() => {
    // Get current user on component mount
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  // Listen for toggle events from main content
  useEffect(() => {
    const handleToggle = () => {
      toggleSidebar();
    };

    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, [toggleSidebar]);

  return (
    <div className="relative isolate flex min-h-screen w-full bg-white max-lg:flex-col lg:bg-[#004aad] dark:bg-zinc-900 dark:lg:bg-zinc-950">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/25 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar className="h-full w-full">
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-3">
              <img src="/logo.png" alt="Texas Sports Academy" className="h-16 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-white hover:bg-white/10"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                href="/coach"
                current={pathname === '/coach'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HomeIcon className="h-6 w-6" />
                <SidebarLabel className="text-base text-white">Home</SidebarLabel>
              </SidebarItem>

              {/* Marketing Menu Item */}
              <SidebarItem
                href="/coach/marketing"
                current={pathname.startsWith('/coach/marketing')}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MegaphoneIcon className="h-6 w-6" />
                <SidebarLabel className="text-base text-white">Marketing</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/coach/applications"
                current={pathname.startsWith('/coach/applications')}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ClipboardDocumentListIcon className="h-6 w-6" />
                <SidebarLabel className="text-base text-white">Applications</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/coach/events"
                current={pathname.startsWith('/coach/events')}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarDaysIcon className="h-6 w-6" />
                <SidebarLabel className="text-base text-white">Events</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/coach/tuition"
                current={pathname.startsWith('/coach/tuition')}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BanknotesIcon className="h-6 w-6" />
                <SidebarLabel className="text-base text-white">Tuition</SidebarLabel>
              </SidebarItem>

              <LockedSidebarItem title="Bootcamp">
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <AcademicCapIcon className="h-6 w-6" />
                  <SidebarLabel className="text-base text-white">Bootcamp</SidebarLabel>
                </SidebarItem>
              </LockedSidebarItem>

              <LockedSidebarItem title="Legal">
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <ScaleIcon className="h-6 w-6" />
                  <SidebarLabel className="text-base text-white">Legal</SidebarLabel>
                </SidebarItem>
              </LockedSidebarItem>

              <LockedSidebarItem title="Real Estate">
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <BuildingOffice2Icon className="h-6 w-6" />
                  <SidebarLabel className="text-base text-white">Real Estate</SidebarLabel>
                </SidebarItem>
              </LockedSidebarItem>

              <LockedSidebarItem title="Media">
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <CameraIcon className="h-6 w-6" />
                  <SidebarLabel className="text-base text-white">Media</SidebarLabel>
                </SidebarItem>
              </LockedSidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar
                    src={profilePhoto || '/default-profile.png'}
                    className="size-10"
                    square
                    alt=""
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-white dark:text-white">
                      Coach
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-white/70 dark:text-zinc-400">
                      {currentUser?.signInDetails?.loginId || currentUser?.userId || 'Coach'}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      </div>

      {/* Sidebar on desktop */}
      <div
        className={`fixed inset-y-0 left-0 transition-all duration-300 max-lg:hidden ${isCollapsed ? 'w-16' : 'w-64'}`}
      >
        <Sidebar className="relative h-full w-full" data-tour="sidebar">
          {/* Floating Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 z-10 rounded-md bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronDoubleRightIcon className="h-4 w-4 text-white" />
            ) : (
              <ChevronDoubleLeftIcon className="h-4 w-4 text-white" />
            )}
          </button>

          <SidebarHeader>
            <div className="flex items-center justify-center px-2 py-3">
              {!isCollapsed && (
                <img src="/logo.png" alt="Texas Sports Academy" className="h-16 w-auto" />
              )}
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/coach" current={pathname === '/coach'} data-tour="home-section">
                <HomeIcon className="h-8 w-8" />
                {!isCollapsed && <SidebarLabel className="text-base text-white">Home</SidebarLabel>}
              </SidebarItem>

              {/* Marketing Menu Item */}
              <SidebarItem
                href="/coach/marketing"
                current={pathname.startsWith('/coach/marketing')}
                data-tour="marketing-section"
              >
                <MegaphoneIcon className="h-8 w-8" />
                {!isCollapsed && (
                  <SidebarLabel className="text-base text-white">Marketing</SidebarLabel>
                )}
              </SidebarItem>

              <SidebarItem
                href="/coach/applications"
                current={pathname.startsWith('/coach/applications')}
                data-tour="applications-section"
              >
                <ClipboardDocumentListIcon className="h-8 w-8" />
                {!isCollapsed && (
                  <SidebarLabel className="text-base text-white">Applications</SidebarLabel>
                )}
              </SidebarItem>

              <SidebarItem
                href="/coach/events"
                current={pathname.startsWith('/coach/events')}
                data-tour="events-section"
              >
                <CalendarDaysIcon className="h-8 w-8" />
                {!isCollapsed && (
                  <SidebarLabel className="text-base text-white">Events</SidebarLabel>
                )}
              </SidebarItem>

              <SidebarItem
                href="/coach/tuition"
                current={pathname.startsWith('/coach/tuition')}
                data-tour="tuition-section"
              >
                <BanknotesIcon className="h-8 w-8" />
                {!isCollapsed && (
                  <SidebarLabel className="text-base text-white">Tuition</SidebarLabel>
                )}
              </SidebarItem>

              <LockedSidebarItem title="Bootcamp" isCollapsed={isCollapsed}>
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <AcademicCapIcon className="h-8 w-8" />
                  {!isCollapsed && (
                    <SidebarLabel className="text-base text-white">Bootcamp</SidebarLabel>
                  )}
                </SidebarItem>
              </LockedSidebarItem>

              <LockedSidebarItem title="Legal" isCollapsed={isCollapsed}>
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <ScaleIcon className="h-8 w-8" />
                  {!isCollapsed && (
                    <SidebarLabel className="text-base text-white">Legal</SidebarLabel>
                  )}
                </SidebarItem>
              </LockedSidebarItem>

              <LockedSidebarItem title="Real Estate" isCollapsed={isCollapsed}>
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <BuildingOffice2Icon className="h-8 w-8" />
                  {!isCollapsed && (
                    <SidebarLabel className="text-base text-white">Real Estate</SidebarLabel>
                  )}
                </SidebarItem>
              </LockedSidebarItem>

              <LockedSidebarItem title="Media" isCollapsed={isCollapsed}>
                <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
                  <CameraIcon className="h-8 w-8" />
                  {!isCollapsed && (
                    <SidebarLabel className="text-base text-white">Media</SidebarLabel>
                  )}
                </SidebarItem>
              </LockedSidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            {!isCollapsed && (
              <Dropdown>
                <DropdownButton as={SidebarItem} data-tour="profile-dropdown">
                  <span className="flex min-w-0 items-center gap-3">
                    <Avatar
                      src={profilePhoto || '/default-profile.png'}
                      className="size-10"
                      square
                      alt=""
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm/5 font-medium text-white dark:text-white">
                        Coach
                      </span>
                      <span className="block truncate text-xs/5 font-normal text-white/70 dark:text-zinc-400">
                        {currentUser?.signInDetails?.loginId || currentUser?.userId || 'Coach'}
                      </span>
                    </span>
                  </span>
                  <ChevronUpIcon />
                </DropdownButton>
                <AccountDropdownMenu anchor="top start" />
              </Dropdown>
            )}
          </SidebarFooter>
        </Sidebar>
      </div>

      {/* Mobile Navbar */}
      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <NavbarItem aria-label="Open navigation" onClick={toggleMobileMenu}>
            <Bars3Icon className="h-6 w-6" />
          </NavbarItem>
        </div>
        <div className="min-w-0 flex-1">
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar src={profilePhoto || '/default-profile.png'} square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </NavbarSection>
          </Navbar>
        </div>
      </header>

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

export default CoachLayout;
