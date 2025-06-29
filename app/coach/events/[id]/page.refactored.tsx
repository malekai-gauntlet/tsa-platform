'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/button';
import { Badge } from '@/components/data-display';
import { Input } from '@/components/input';
import {
  ChevronLeftIcon,
  XMarkIcon,
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/16/solid';
import { Subheading } from '@/components/heading';
import { Link as CustomLink } from '@/components/link';

// Import custom hooks
import { useCoachEvents, useEventRSVPs, useEventInvitations } from '@/lib/hooks/coach';

// Import reusable components
import { EventHeader, EventActions, RSVPSection } from '../components';

// Import types & utility functions
import { InvitationForm } from '@/lib/types/coach';
import { formatDate, formatTime } from '@/lib/utils/coach/formatters';

export default function EventView({ params }: { params: { id: string } }) {
  // Component state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [syncingToGoogleCalendar, setSyncingToGoogleCalendar] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [invitationForm, setInvitationForm] = useState<InvitationForm>({
    invitee_email: '',
    invitee_name: '',
    message: '',
  });

  const router = useRouter();

  // Use our custom hooks
  const {
    loading: eventLoading,
    error: eventError,
    fetchEventById,
    updateEvent,
  } = useCoachEvents({ autoFetch: false });

  const {
    rsvps,
    loading: rsvpLoading,
    updateRSVPStatus,
  } = useEventRSVPs({ eventId: params.id, autoFetch: true });

  const { sendingInvitation, sendInvitation } = useEventInvitations({
    eventId: params.id,
    autoFetch: true,
  });

  // Get current event from params id
  const [event, setEvent] = useState<any>(null);

  // Fetch event on mount
  useEffect(() => {
    const getEvent = async () => {
      const eventData = await fetchEventById(params.id);
      if (eventData) {
        setEvent(eventData);
      }
    };

    getEvent();
  }, [params.id, fetchEventById]);

  /**
   * Handles deletion of an event
   */
  const handleDeleteEvent = useCallback(async (): Promise<boolean> => {
    try {
      setDeleteLoading(true);
      // Call Lambda API directly
      const apiUrl = '/api/coach';
      const response = await fetch(`${apiUrl}/events/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/coach/events');
        return true;
      } else {
        alert('Failed to delete event');
        return false;
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
      return false;
    } finally {
      setDeleteLoading(false);
    }
  }, [params.id, router]);

  /**
   * Handles syncing event to Google Calendar
   */
  const handleSyncToGoogleCalendar = useCallback(
    async (eventId: string) => {
      try {
        setSyncingToGoogleCalendar(true);
        const apiUrl = '/api/coach';
        const response = await fetch(`${apiUrl}/events/${eventId}/sync-google-calendar`, {
          method: 'POST',
        });

        if (response.ok) {
          alert('Event synced to Google Calendar successfully!');
          // Refresh event data to get Google Calendar details
          await fetchEventById(eventId);
          return true;
        } else {
          const errorData = await response.json();
          alert(`Failed to sync to Google Calendar: ${errorData.error || 'Unknown error'}`);
          return false;
        }
      } catch (error) {
        console.error('Error syncing to Google Calendar:', error);
        alert('Failed to sync to Google Calendar');
        return false;
      } finally {
        setSyncingToGoogleCalendar(false);
      }
    },
    [fetchEventById]
  );

  /**
   * Handles sending an invitation
   */
  const handleSendInvitation = useCallback(async () => {
    const success = await sendInvitation(invitationForm);

    if (success) {
      alert('Event invitation sent successfully!');
      setShowInviteModal(false);
      setInvitationForm({
        invitee_email: '',
        invitee_name: '',
        message: '',
      });
    }
  }, [invitationForm, sendInvitation]);

  /**
   * Recalculate participant count when RSVPs change
   */
  const updateEventParticipantCount = useCallback(async () => {
    if (!event) return;

    const confirmedCount = rsvps.filter(rsvp => rsvp.rsvp_status === 'confirmed').length;
    if (event.registeredCount !== confirmedCount) {
      await updateEvent(event.id, { registeredCount: confirmedCount });
    }
  }, [event, rsvps, updateEvent]);

  if (eventLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {eventError || 'Event not found'}
        </h3>
        <CustomLink href="/coach/events" className="text-blue-600 hover:text-blue-800">
          ← Back to Events
        </CustomLink>
      </div>
    );
  }

  return (
    <>
      {/* Header with back link */}
      <div className="max-lg:hidden">
        <CustomLink
          href="/coach/events"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Events
        </CustomLink>
      </div>

      {/* Event header and actions */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <EventHeader event={event} />

        <EventActions
          event={event}
          onDelete={handleDeleteEvent}
          onSyncToGoogleCalendar={handleSyncToGoogleCalendar}
          onShowInviteModal={() => setShowInviteModal(true)}
          loading={{
            deleting: deleteLoading,
            syncing: syncingToGoogleCalendar,
          }}
        />
      </div>

      {/* Event photos */}
      {event.images && event.images.length > 0 && (
        <div className="mt-6">
          <Subheading>Photos</Subheading>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {event.images.map((photo: string, index: number) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img src={photo} alt={`event-photo-${index}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event details grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Participants */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <UserIcon className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Participants</p>
              <p className="text-2xl font-semibold text-gray-900">
                {event.registeredCount}
                {event.capacity && `/${event.capacity}`}
              </p>
              {event.capacity && (
                <p className="text-xs text-gray-500">
                  {Math.round((event.registeredCount || 0 / event.capacity) * 100)}% full
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cost */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(() => {
                  const cost =
                    typeof event.price === 'string' ? parseFloat(String(event.price)) : event.price;
                  return isNaN(Number(cost)) || Number(cost) === 0
                    ? 'Free'
                    : `$${Number(cost).toFixed(2)}`;
                })()}
              </p>
            </div>
          </div>
        </div>

        {/* Registration Deadline */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Registration Deadline</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(event.registrationDeadline)}
              </p>
              <p className="text-xs text-gray-500">{formatTime(event.registrationDeadline)}</p>
            </div>
          </div>
        </div>

        {/* Event ID */}
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div>
            <p className="text-sm font-medium text-gray-600">Event ID</p>
            <p className="mt-1 font-mono text-sm text-gray-900">{event.id}</p>
            <p className="mt-1 text-xs text-gray-500">Created {formatDate(event.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <Subheading>Description</Subheading>
        <div className="mt-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <p className="whitespace-pre-wrap text-gray-700">{event.description}</p>
        </div>
      </div>

      {/* Tags and Requirements */}
      {((event.tags && event.tags.length > 0) ||
        (event.requirements && event.requirements.length > 0)) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div>
              <Subheading>Tags</Subheading>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag: string, index: number) => (
                  <Badge key={index} color="blue">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <div>
              <Subheading>Requirements</Subheading>
              <div className="mt-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <ul className="space-y-2">
                  {event.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 text-blue-600">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RSVPs Section */}
      <RSVPSection rsvps={rsvps} loading={rsvpLoading} onUpdateRSVPStatus={updateRSVPStatus} />

      {/* Event Invitation Modal */}
      <Dialog
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                Invite Participants to Event
              </DialogTitle>
              <button
                onClick={() => setShowInviteModal(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 rounded-lg bg-blue-50 p-3">
              <p className="text-sm text-blue-800">
                <strong>Event:</strong> {event?.title}
              </p>
              <p className="mt-1 text-xs text-blue-600">
                {formatDate(event.startDate)} at {formatTime(event.startDate)}
              </p>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendInvitation();
              }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Participant Email *
                </label>
                <Input
                  type="email"
                  required
                  value={invitationForm.invitee_email}
                  onChange={e =>
                    setInvitationForm((prev: InvitationForm) => ({ ...prev, invitee_email: e.target.value }))
                  }
                  placeholder="participant@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Participant Name
                </label>
                <Input
                  type="text"
                  value={invitationForm.invitee_name}
                  onChange={e =>
                    setInvitationForm((prev: InvitationForm) => ({ ...prev, invitee_name: e.target.value }))
                  }
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Personal Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={invitationForm.message}
                  onChange={e => setInvitationForm((prev: InvitationForm) => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#004aad] focus:ring-1 focus:ring-[#004aad] focus:outline-none"
                  placeholder="I'd love to have you join us for this event..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#004aad] text-white hover:bg-[#003888]"
                  disabled={sendingInvitation}
                >
                  {sendingInvitation ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="mr-2 h-4 w-4" />
                      Send Invitation
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  outline
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1"
                  disabled={sendingInvitation}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-md space-y-4 rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Event</h3>
            </div>
            <p className="text-gray-600">
              Are you sure you want to delete &ldquo;{event.title}&rdquo;? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button outline onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDeleteEvent} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting...' : 'Delete Event'}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
