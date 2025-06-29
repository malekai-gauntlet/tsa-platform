'use client';

import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSection,
} from '@/components/sidebar';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import { SidebarNavigation } from './SidebarNavigation';
import { UserDropdown } from './UserDropdown';

interface DesktopSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  pathname: string;
  profilePhoto: string | null;
  currentUser: any | null;
}

export function DesktopSidebar({
  isCollapsed,
  onToggle,
  pathname,
  profilePhoto,
  currentUser,
}: DesktopSidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 transition-all duration-300 max-lg:hidden ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <Sidebar className="relative h-full w-full" data-tour="sidebar">
        {/* Floating Toggle Button */}
        <button
          onClick={onToggle}
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
            <SidebarNavigation pathname={pathname} isCollapsed={isCollapsed} />
          </SidebarSection>
        </SidebarBody>

        <SidebarFooter className="max-lg:hidden">
          {!isCollapsed && (
            <UserDropdown
              anchor="top start"
              profilePhoto={profilePhoto}
              currentUser={currentUser}
              data-tour="profile-dropdown"
            />
          )}
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
