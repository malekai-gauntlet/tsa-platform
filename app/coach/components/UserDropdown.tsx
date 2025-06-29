'use client';

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown';
import { Avatar } from '@/components/data-display';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import { signOut } from 'aws-amplify/auth';

interface UserDropdownProps {
  anchor: 'top start' | 'bottom end';
  profilePhoto: string | null;
  currentUser: any | null;
  className?: string;
}

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

export function UserDropdown({ anchor, profilePhoto, currentUser, className }: UserDropdownProps) {
  return (
    <Dropdown>
      <DropdownButton className={className}>
        <span className="flex min-w-0 items-center gap-3">
          <Avatar src={profilePhoto || '/default-profile.png'} className="size-10" square alt="" />
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
      <AccountDropdownMenu anchor={anchor} />
    </Dropdown>
  );
}
