'use client';

import { useState } from 'react';
import { Button } from '@/components/button';
import { useRouter } from 'next/navigation';
import { PencilIcon, TrashIcon, PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { Event } from '@/lib/types/coach';

interface EventActionsProps {
  event: Event;
  onDelete?: (eventId: string) => Promise<boolean>;
  onSyncToGoogleCalendar?: (eventId: string) => Promise<boolean>;
  onShowInviteModal?: () => void;
  loading?: {
    deleting: boolean;
    syncing: boolean;
  };
}

/**
 * Event actions component for edit, delete, and other operations
 */
export function EventActions({
  event,
  onDelete,
  onSyncToGoogleCalendar,
  onShowInviteModal,
  loading = { deleting: false, syncing: false },
}: EventActionsProps) {
  const router = useRouter();

  // Handle navigation to edit page
  const handleEdit = () => {
    router.push(`/coach/events/${event.id}/edit`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {onShowInviteModal && (
        <Button outline onClick={onShowInviteModal} className="flex items-center gap-2">
          <PaperAirplaneIcon className="h-4 w-4" />
          Invite Participants
        </Button>
      )}

      <Button outline onClick={handleEdit} className="flex items-center gap-2">
        <PencilIcon className="h-4 w-4" />
        Edit
      </Button>

      {/* Google Calendar Actions */}
      {onSyncToGoogleCalendar && !event.googleCalendarEventId ? (
        <Button
          color="green"
          onClick={() => onSyncToGoogleCalendar(event.id)}
          disabled={loading.syncing}
          className="flex items-center gap-2"
        >
          {loading.syncing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Syncing...
            </>
          ) : (
            <>📅 Sync to Google Calendar</>
          )}
        </Button>
      ) : event.googleMeetUrl ? (
        <Button
          color="blue"
          href={event.googleMeetUrl}
          target="_blank"
          className="flex items-center gap-2"
        >
          📹 Join Google Meet
        </Button>
      ) : event.googleCalendarEventId ? (
        <Button
          outline
          onClick={() => onSyncToGoogleCalendar && onSyncToGoogleCalendar(event.id)}
          disabled={loading.syncing}
          className="flex items-center gap-2"
        >
          {loading.syncing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-600"></div>
              Updating...
            </>
          ) : (
            <>🔄 Update Calendar</>
          )}
        </Button>
      ) : null}

      {onDelete && (
        <Button
          color="red"
          onClick={() => onDelete(event.id)}
          disabled={loading.deleting}
          className="flex items-center gap-2"
        >
          {loading.deleting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Deleting...
            </>
          ) : (
            <>
              <TrashIcon className="h-4 w-4" />
              Delete
            </>
          )}
        </Button>
      )}
    </div>
  );
}

export default EventActions;
