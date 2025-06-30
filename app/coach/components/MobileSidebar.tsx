'use client';

import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSection,
} from '@/components/sidebar';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { SidebarNavigation } from './SidebarNavigation';
import { UserDropdown } from './UserDropdown';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  profilePhoto: string | null;
  currentUser: any | null;
}

export function MobileSidebar({
  isOpen,
  onClose,
  pathname,
  profilePhoto,
  currentUser,
}: MobileSidebarProps) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && <div className="fixed inset-0 z-50 bg-black/25 lg:hidden" onClick={onClose} />}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar className="h-full w-full">
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-3">
              <img 
                src="/logo.svg" 
                alt="Texas Sports Academy" 
                className="h-16 w-auto brightness-0 invert" 
              />
              <button onClick={onClose} className="rounded-md p-2 text-white hover:bg-white/10">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarNavigation pathname={pathname} onItemClick={onClose} />
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter>
            <UserDropdown
              anchor="top start"
              profilePhoto={profilePhoto}
              currentUser={currentUser}
            />
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}
