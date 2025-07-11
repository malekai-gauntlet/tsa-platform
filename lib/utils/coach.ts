import type { Application, ApplicationStats } from '@/lib/types/coach';

// Date formatting utility - only show year if different from current year
export const formatDate = (dateString: string): string => {
  const currentYear = new Date().getFullYear();
  const date = new Date(dateString);
  const dateYear = date.getFullYear();

  if (dateYear === currentYear) {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

// Calculate age from date of birth
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Get status badge color
export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'accepted':
      return 'green';
    case 'pending':
      return 'amber';
    case 'expired':
      return 'red';
    case 'under-review':
      return 'blue';
    case 'rejected':
      return 'red';
    case 'waitlisted':
      return 'orange';
    default:
      return 'zinc';
  }
};

// Get application icon color
export const getApplicationColor = (type: string): string => {
  switch (type) {
    case 'application':
      return 'green';
    case 'interest-form':
      return 'blue';
    default:
      return 'gray';
  }
};

// Get booking color
export const getBookingColor = (eventType: string): string => {
  switch (eventType) {
    case 'call':
      return 'blue';
    case 'tour':
      return 'green';
    case 'shadow-day':
      return 'purple';
    default:
      return 'gray';
  }
};

// Calculate application stats
export const calculateApplicationStats = (applications: Application[]): ApplicationStats => {
  return {
    total: applications.length,
    pending: applications.filter(app => app.status === 'PENDING').length,
    accepted: applications.filter(app => app.status === 'APPROVED').length,
    thisWeek: applications.filter(app => {
      const submittedDate = new Date(app.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submittedDate >= weekAgo;
    }).length,
  };
};

// Generate time-based greeting
export const generateGreeting = (firstName: string): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Good morning';

  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good afternoon';
  } else if (hour >= 17) {
    timeGreeting = 'Good evening';
  }

  return `${timeGreeting}, Coach ${firstName}`;
};

export const getStatusBadgeVariant = (
  status: 'PENDING' | 'APPROVED' | 'WAITLIST' | 'REJECTED' | string
) => {
  const variants: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    WAITLIST: 'bg-blue-100 text-blue-800 border-blue-200',
    APPROVED: 'bg-green-100 text-green-800 border-green-200',
    REJECTED: 'bg-red-100 text-red-800 border-red-200',
  };
  return variants[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const formatStatusText = (status: string) => {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, ' ');
};
