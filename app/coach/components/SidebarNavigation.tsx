'use client';

import { SidebarItem, SidebarLabel } from '@/components/sidebar';
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
  LockClosedIcon,
} from '@heroicons/react/20/solid';
import { useState } from 'react';

interface LockedSidebarItemProps {
  children: React.ReactNode;
  title: string;
  isCollapsed?: boolean;
}

function LockedSidebarItem({
  children,
  title,
  isCollapsed = false,
}: LockedSidebarItemProps) {
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

interface SidebarNavigationProps {
  pathname: string;
  isCollapsed?: boolean;
  onItemClick?: () => void;
}

export function SidebarNavigation({ pathname, isCollapsed = false, onItemClick }: SidebarNavigationProps) {
  const iconClass = isCollapsed ? "h-8 w-8" : "h-6 w-6";

  return (
    <>
      <SidebarItem
        href="/coach"
        current={pathname === '/coach'}
        onClick={onItemClick}
        data-tour="home-section"
      >
        <HomeIcon className={iconClass} />
        {!isCollapsed && <SidebarLabel className="text-base text-white">Home</SidebarLabel>}
      </SidebarItem>

      <SidebarItem
        href="/coach/marketing"
        current={pathname.startsWith('/coach/marketing')}
        onClick={onItemClick}
        data-tour="marketing-section"
      >
        <MegaphoneIcon className={iconClass} />
        {!isCollapsed && <SidebarLabel className="text-base text-white">Marketing</SidebarLabel>}
      </SidebarItem>

      <SidebarItem
        href="/coach/applications"
        current={pathname.startsWith('/coach/applications')}
        onClick={onItemClick}
        data-tour="applications-section"
      >
        <ClipboardDocumentListIcon className={iconClass} />
        {!isCollapsed && <SidebarLabel className="text-base text-white">Applications</SidebarLabel>}
      </SidebarItem>

      <SidebarItem
        href="/coach/events"
        current={pathname.startsWith('/coach/events')}
        onClick={onItemClick}
        data-tour="events-section"
      >
        <CalendarDaysIcon className={iconClass} />
        {!isCollapsed && <SidebarLabel className="text-base text-white">Events</SidebarLabel>}
      </SidebarItem>

      <SidebarItem
        href="/coach/tuition"
        current={pathname.startsWith('/coach/tuition')}
        onClick={onItemClick}
        data-tour="tuition-section"
      >
        <BanknotesIcon className={iconClass} />
        {!isCollapsed && <SidebarLabel className="text-base text-white">Tuition</SidebarLabel>}
      </SidebarItem>

      <LockedSidebarItem title="Bootcamp" isCollapsed={isCollapsed}>
        <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
          <AcademicCapIcon className={iconClass} />
          {!isCollapsed && <SidebarLabel className="text-base text-white">Bootcamp</SidebarLabel>}
        </SidebarItem>
      </LockedSidebarItem>

      <LockedSidebarItem title="Legal" isCollapsed={isCollapsed}>
        <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
          <ScaleIcon className={iconClass} />
          {!isCollapsed && <SidebarLabel className="text-base text-white">Legal</SidebarLabel>}
        </SidebarItem>
      </LockedSidebarItem>

      <LockedSidebarItem title="Real Estate" isCollapsed={isCollapsed}>
        <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
          <BuildingOffice2Icon className={iconClass} />
          {!isCollapsed && <SidebarLabel className="text-base text-white">Real Estate</SidebarLabel>}
        </SidebarItem>
      </LockedSidebarItem>

      <LockedSidebarItem title="Media" isCollapsed={isCollapsed}>
        <SidebarItem href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>
          <CameraIcon className={iconClass} />
          {!isCollapsed && <SidebarLabel className="text-base text-white">Media</SidebarLabel>}
        </SidebarItem>
      </LockedSidebarItem>
    </>
  );
}