'use client';

import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { UserDropdown } from './UserDropdown';

interface MobileNavbarProps {
  onMenuToggle: () => void;
  profilePhoto: string | null;
}

export function MobileNavbar({ onMenuToggle, profilePhoto }: MobileNavbarProps) {
  return (
    <header className="flex items-center px-4 lg:hidden">
      <div className="py-2.5">
        <NavbarItem aria-label="Open navigation" onClick={onMenuToggle}>
          <Bars3Icon className="h-6 w-6" />
        </NavbarItem>
      </div>
      <div className="min-w-0 flex-1">
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <UserDropdown
              anchor="bottom end"
              profilePhoto={profilePhoto}
              currentUser={null}
            />
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  );
}