'use client';

import { useReducer, useCallback } from 'react';
import { CoachState, CoachProfile, Event, Application, ApplicationStatus } from '@/lib/types/coach';

// Define action types
type CoachAction =
  // Profile actions
  | { type: 'FETCH_PROFILE_START' }
  | { type: 'FETCH_PROFILE_SUCCESS'; payload: CoachProfile }
  | { type: 'FETCH_PROFILE_ERROR'; payload: string }
  | { type: 'UPDATE_PROFILE_START' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: CoachProfile }
  | { type: 'UPDATE_PROFILE_ERROR'; payload: string }

  // Events actions
  | { type: 'FETCH_EVENTS_START' }
  | { type: 'FETCH_EVENTS_SUCCESS'; payload: Event[] }
  | { type: 'FETCH_EVENTS_ERROR'; payload: string }
  | { type: 'CREATE_EVENT_START' }
  | { type: 'CREATE_EVENT_SUCCESS'; payload: Event }
  | { type: 'CREATE_EVENT_ERROR'; payload: string }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string }

  // Applications actions
  | { type: 'FETCH_APPLICATIONS_START' }
  | { type: 'FETCH_APPLICATIONS_SUCCESS'; payload: Application[] }
  | { type: 'FETCH_APPLICATIONS_ERROR'; payload: string }
  | { type: 'UPDATE_APPLICATION_STATUS'; payload: { id: string; status: ApplicationStatus } }
  | { type: 'RESET_ERROR'; section: 'profile' | 'events' | 'applications' };

// Initial state
const initialState: CoachState = {
  profile: {
    data: null,
    loading: false,
    error: null,
  },
  events: {
    data: [],
    loading: false,
    error: null,
  },
  applications: {
    data: [],
    loading: false,
    error: null,
  },
};

// Reducer function
function coachReducer(state: CoachState, action: CoachAction): CoachState {
  switch (action.type) {
    // Profile actions
    case 'FETCH_PROFILE_START':
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
          error: null,
        },
      };
    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        profile: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case 'FETCH_PROFILE_ERROR':
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: action.payload,
        },
      };
    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
          error: null,
        },
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        profile: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: action.payload,
        },
      };

    // Events actions
    case 'FETCH_EVENTS_START':
      return {
        ...state,
        events: {
          ...state.events,
          loading: true,
          error: null,
        },
      };
    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        events: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case 'FETCH_EVENTS_ERROR':
      return {
        ...state,
        events: {
          ...state.events,
          loading: false,
          error: action.payload,
        },
      };
    case 'CREATE_EVENT_START':
      return {
        ...state,
        events: {
          ...state.events,
          loading: true,
          error: null,
        },
      };
    case 'CREATE_EVENT_SUCCESS':
      return {
        ...state,
        events: {
          data: [...state.events.data, action.payload],
          loading: false,
          error: null,
        },
      };
    case 'CREATE_EVENT_ERROR':
      return {
        ...state,
        events: {
          ...state.events,
          loading: false,
          error: action.payload,
        },
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          data: state.events.data.map(event =>
            event.id === action.payload.id ? action.payload : event
          ),
        },
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: {
          ...state.events,
          data: state.events.data.filter(event => event.id !== action.payload),
        },
      };

    // Applications actions
    case 'FETCH_APPLICATIONS_START':
      return {
        ...state,
        applications: {
          ...state.applications,
          loading: true,
          error: null,
        },
      };
    case 'FETCH_APPLICATIONS_SUCCESS':
      return {
        ...state,
        applications: {
          data: action.payload,
          loading: false,
          error: null,
        },
      };
    case 'FETCH_APPLICATIONS_ERROR':
      return {
        ...state,
        applications: {
          ...state.applications,
          loading: false,
          error: action.payload,
        },
      };
    case 'UPDATE_APPLICATION_STATUS':
      return {
        ...state,
        applications: {
          ...state.applications,
          data: state.applications.data.map(application =>
            application.id === action.payload.id
              ? { ...application, status: action.payload.status as ApplicationStatus }
              : application
          ),
        },
      };
    case 'RESET_ERROR':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          error: null,
        },
      };
    default:
      return state;
  }
}

/**
 * Custom hook for managing coach-related state
 * @returns Object containing state and dispatch actions
 */
export function useCoachReducer() {
  const [state, dispatch] = useReducer(coachReducer, initialState);

  // Profile actions
  const fetchProfile = useCallback(() => {
    dispatch({ type: 'FETCH_PROFILE_START' });
  }, []);

  const fetchProfileSuccess = useCallback((profile: CoachProfile) => {
    dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: profile });
  }, []);

  const fetchProfileError = useCallback((error: string) => {
    dispatch({ type: 'FETCH_PROFILE_ERROR', payload: error });
  }, []);

  const updateProfile = useCallback(() => {
    dispatch({ type: 'UPDATE_PROFILE_START' });
  }, []);

  const updateProfileSuccess = useCallback((profile: CoachProfile) => {
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: profile });
  }, []);

  const updateProfileError = useCallback((error: string) => {
    dispatch({ type: 'UPDATE_PROFILE_ERROR', payload: error });
  }, []);

  // Events actions
  const fetchEvents = useCallback(() => {
    dispatch({ type: 'FETCH_EVENTS_START' });
  }, []);

  const fetchEventsSuccess = useCallback((events: Event[]) => {
    dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: events });
  }, []);

  const fetchEventsError = useCallback((error: string) => {
    dispatch({ type: 'FETCH_EVENTS_ERROR', payload: error });
  }, []);

  const createEvent = useCallback(() => {
    dispatch({ type: 'CREATE_EVENT_START' });
  }, []);

  const createEventSuccess = useCallback((event: Event) => {
    dispatch({ type: 'CREATE_EVENT_SUCCESS', payload: event });
  }, []);

  const createEventError = useCallback((error: string) => {
    dispatch({ type: 'CREATE_EVENT_ERROR', payload: error });
  }, []);

  const updateEvent = useCallback((event: Event) => {
    dispatch({ type: 'UPDATE_EVENT', payload: event });
  }, []);

  const deleteEvent = useCallback((id: string) => {
    dispatch({ type: 'DELETE_EVENT', payload: id });
  }, []);

  // Applications actions
  const fetchApplications = useCallback(() => {
    dispatch({ type: 'FETCH_APPLICATIONS_START' });
  }, []);

  const fetchApplicationsSuccess = useCallback((applications: Application[]) => {
    dispatch({ type: 'FETCH_APPLICATIONS_SUCCESS', payload: applications });
  }, []);

  const fetchApplicationsError = useCallback((error: string) => {
    dispatch({ type: 'FETCH_APPLICATIONS_ERROR', payload: error });
  }, []);

  const updateApplicationStatus = useCallback((id: string, status: string) => {
    // Validate status and convert to expected ApplicationStatus type
    const validStatus = ['PENDING', 'APPROVED', 'WAITLIST', 'REJECTED'].includes(status.toUpperCase()) 
      ? status.toUpperCase() as ApplicationStatus 
      : 'PENDING' as ApplicationStatus;
    
    dispatch({ 
      type: 'UPDATE_APPLICATION_STATUS', 
      payload: { id, status: validStatus } 
    });
  }, []);

  const resetError = useCallback((section: 'profile' | 'events' | 'applications') => {
    dispatch({ type: 'RESET_ERROR', section });
  }, []);

  return {
    state,
    actions: {
      fetchProfile,
      fetchProfileSuccess,
      fetchProfileError,
      updateProfile,
      updateProfileSuccess,
      updateProfileError,
      fetchEvents,
      fetchEventsSuccess,
      fetchEventsError,
      createEvent,
      createEventSuccess,
      createEventError,
      updateEvent,
      deleteEvent,
      fetchApplications,
      fetchApplicationsSuccess,
      fetchApplicationsError,
      updateApplicationStatus,
      resetError,
    },
  };
}

export default useCoachReducer;
