'use client';

import { useState } from 'react';
import { Button } from '@/components/button';
import { Input, InputGroup } from '@/components/input';
import { Select } from '@/components/form';
import { Subheading } from '@/components/heading';
import { Badge } from '@/components/data-display';
import {
  MagnifyingGlassIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from '@heroicons/react/20/solid';
import { formatDateTime } from '@/lib/utils/coach/formatters';

// Import RSVP type from our types directory
import { RSVP } from '@/lib/types/coach';

interface RSVPSectionProps {
  rsvps: RSVP[];
  loading: boolean;
  onUpdateRSVPStatus: (rsvpId: string, status: string) => void;
}

/**
 * RSVP management section component
 */
export function RSVPSection({ rsvps, loading, onUpdateRSVPStatus }: RSVPSectionProps) {
  const [showRSVPs, setShowRSVPs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter RSVPs based on search term and status
  const filteredRSVPs = rsvps.filter(rsvp => {
    const matchesSearch =
      searchTerm === '' ||
      rsvp.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.parent_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.student_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rsvp.rsvp_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate RSVP stats
  const stats = {
    confirmed: rsvps.filter(r => r.rsvp_status === 'confirmed').length,
    pending: rsvps.filter(r => r.rsvp_status === 'pending').length,
    declined: rsvps.filter(r => r.rsvp_status === 'declined').length,
    waitlist: rsvps.filter(r => r.rsvp_status === 'waitlist').length,
    total: rsvps.length,
  };

  // Helper function to get status badge
  const getRSVPStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge color="green">Confirmed</Badge>;
      case 'pending':
        return <Badge color="yellow">Pending</Badge>;
      case 'declined':
        return <Badge color="red">Declined</Badge>;
      case 'waitlist':
        return <Badge color="blue">Waitlist</Badge>;
      default:
        return <Badge color="zinc">Unknown</Badge>;
    }
  };

  // Helper function to get status icon
  const getRSVPStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'declined':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case 'waitlist':
        return <UsersIcon className="h-5 w-5 text-blue-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <Subheading>RSVPs ({stats.total})</Subheading>
        <Button
          outline
          onClick={() => setShowRSVPs(!showRSVPs)}
          className="flex items-center gap-2"
        >
          <UserIcon className="h-4 w-4" />
          {showRSVPs ? 'Hide RSVPs' : 'Show RSVPs'}
        </Button>
      </div>

      {/* RSVP Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-xl font-semibold text-gray-900">{stats.confirmed}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <ClockIcon className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Waitlist</p>
              <p className="text-xl font-semibold text-gray-900">{stats.waitlist}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <XCircleIcon className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Declined</p>
              <p className="text-xl font-semibold text-gray-900">{stats.declined}</p>
            </div>
          </div>
        </div>
      </div>

      {showRSVPs && (
        <>
          {/* RSVP Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon data-slot="icon" />
                <Input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search by parent, student, or email..."
                />
              </InputGroup>
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="waitlist">Waitlist</option>
                <option value="declined">Declined</option>
              </Select>
            </div>
          </div>

          {/* RSVP List */}
          <div>
            {loading ? (
              <div className="rounded-lg bg-white py-12 text-center shadow-sm ring-1 ring-gray-900/5">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
                <p className="mt-2 text-sm text-gray-500">Loading RSVPs...</p>
              </div>
            ) : filteredRSVPs.length === 0 ? (
              <div className="rounded-lg bg-white py-12 text-center shadow-sm ring-1 ring-gray-900/5">
                <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  {rsvps.length === 0 ? 'No RSVPs yet' : 'No RSVPs match your filters'}
                </h3>
                <p className="text-sm text-gray-500">
                  {rsvps.length === 0
                    ? 'RSVPs will appear here when parents sign up for your event.'
                    : 'Try adjusting your search or filter criteria.'}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
                <div className="divide-y divide-gray-200">
                  {filteredRSVPs.map(rsvp => (
                    <div key={rsvp.rsvp_id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            {getRSVPStatusIcon(rsvp.rsvp_status)}
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900">
                                {rsvp.student_name}
                                {rsvp.student_age && ` (${rsvp.student_age} years old)`}
                              </h3>
                              <p className="text-sm text-gray-600">Parent: {rsvp.parent_name}</p>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                                <a
                                  href={`mailto:${rsvp.parent_email}`}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {rsvp.parent_email}
                                </a>
                              </div>
                              {rsvp.parent_phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                                  <a
                                    href={`tel:${rsvp.parent_phone}`}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    {rsvp.parent_phone}
                                  </a>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>RSVP'd {formatDateTime(rsvp.rsvp_date)}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {rsvp.special_requirements && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700">
                                    Special Requirements:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {rsvp.special_requirements}
                                  </p>
                                </div>
                              )}
                              {rsvp.emergency_contact && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700">
                                    Emergency Contact:
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {rsvp.emergency_contact}
                                    {rsvp.emergency_phone && ` - ${rsvp.emergency_phone}`}
                                  </p>
                                </div>
                              )}
                              {rsvp.additional_notes && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700">Notes:</p>
                                  <p className="text-sm text-gray-600">{rsvp.additional_notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="ml-6 flex flex-col items-end gap-3">
                          {getRSVPStatusBadge(rsvp.rsvp_status)}

                          <Select
                            value={rsvp.rsvp_status}
                            onChange={e => onUpdateRSVPStatus(rsvp.rsvp_id, e.target.value)}
                            className="text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="waitlist">Waitlist</option>
                            <option value="declined">Declined</option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RSVPSection;
