/**
 * Custom hook for managing onboarding state with invitation integration
 * Handles pre-filled data, progress tracking, and DynamoDB synchronization
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  invitationAPI,
  InvitationData,
  OnboardingProgress,
  OnboardingStep,
  ONBOARDING_STEPS,
  getStoredInvitationData,
  getStoredOnboardingProgress,
  storeOnboardingProgress,
  isFieldPreFilled,
  getPreFilledValue,
  getCachedInvitationToken,
  storeInvitationData,
} from '@/lib/api/invitation-api';
import type { OnboardingFormData } from '@/lib/types/onboarding';

interface UseOnboardingStateOptions {
  currentStep: OnboardingStep;
  requiredFields?: string[];
}

interface UseOnboardingStateReturn {
  // Data state
  formData: OnboardingFormData;
  invitationData: InvitationData | null;
  progress: OnboardingProgress | null;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;

  // Error states
  errors: Record<string, string>;
  hasErrors: boolean;

  // Actions
  updateField: (field: string, value: any) => void;
  updateMultipleFields: (fields: Record<string, any>) => void;
  saveProgress: () => Promise<boolean>;
  autoSave: () => Promise<boolean>;
  validateStep: () => boolean;
  markStepComplete: () => Promise<boolean>;

  // Utilities
  isFieldPreFilled: (field: string) => boolean;
  getFieldValue: (field: string) => any;
  getCompletedSteps: () => string[];
  getCurrentStepIndex: () => number;
  getTotalSteps: () => number;
  getProgressPercentage: () => number;
}

export function useOnboardingState({
  currentStep,
  requiredFields = [],
}: UseOnboardingStateOptions): UseOnboardingStateReturn {
  // State - using standardized OnboardingFormData interface
  const [formData, setFormData] = useState<OnboardingFormData>({
    // Personal Information (standardized camelCase)
    email: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    birthDate: '',
    birthCity: '',
    birthStateAbbreviation: '',
    sex: '',
    hispanicLatinoEthnicity: false,
    races: [],
    generationCodeSuffix: '',

    // Role and Experience (Ed-Fi compliant)
    roleType: 'COACH',
    experience: '0',
    certificationLevel: '',
    specialties: [],
    bio: '',
    certifications: [],
    yearsOfPriorProfessionalExperience: 0,

    // School Information (direct EducationOrganization mapping)
    nameOfInstitution: '',
    shortNameOfInstitution: '',
    schoolType: '',
    gradeLevels: [],
    hasPhysicalLocation: false,
    website: '',
    academicYear: '2024-2025',

    // Address (flattened for JSON storage)
    schoolStreet: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    schoolPhone: '',

    // School Focus
    sport: '',
    footballType: '',
    schoolCategories: [],
    programFocus: [],

    // Student Planning
    estimatedStudentCount: 0,
    enrollmentCapacity: 100,
    hasCurrentStudents: false,
    currentStudentDetails: '',
    studentGradeLevels: [],

    // Agreements
    platformAgreement: false,

    // System fields
    invitationBased: false,
    invitationToken: '',
    currentStep: 'PERSONAL_INFO',
    completedSteps: [],
  });

  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Ref for debouncing auto-save
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define initializeOnboardingState before it's used in useEffect
  const initializeOnboardingState = useCallback(async () => {
    try {
      setIsLoading(true);

      // Check local cache first
      const cachedProgress = getStoredOnboardingProgress();
      const storedInvitationData = getStoredInvitationData();

      // Check if we're in bypass mode
      const isInBypassMode =
        typeof window !== 'undefined' &&
        (window.location.search.includes('bypass=true') ||
          (!window.location.search.includes('invite=') && process.env.NODE_ENV === 'development'));

      // Create simulated invitation data for bypass mode
      if (isInBypassMode && !storedInvitationData) {
        const simulatedInvitationData = {
          email: 'test.coach@bypass.local',
          role: 'COACH',
          firstName: 'Test',
          lastName: 'Coach',
          phone: '555-123-4567',
          phoneFormatted: '(555) 123-4567',
          city: 'Dallas',
          state: 'TX',
          bio: 'Simulated coach for bypass mode testing',
          fullName: 'Test Coach',
          location: 'Dallas, TX',
          schoolName: 'Test Academy',
          schoolType: 'private',
          sport: 'Basketball',
        };

        console.log('🛠️ Bypass mode: Creating simulated invitation data');
        setInvitationData(simulatedInvitationData);
        storeInvitationData(simulatedInvitationData);

        // Pre-fill form with simulated data using standardized field names
        setFormData(prev => ({
          ...prev,
          firstName: simulatedInvitationData.firstName,
          lastName: simulatedInvitationData.lastName,
          email: simulatedInvitationData.email,
          phone: simulatedInvitationData.phone,
          schoolCity: simulatedInvitationData.city,
          schoolState: simulatedInvitationData.state,
          bio: simulatedInvitationData.bio,
          nameOfInstitution: simulatedInvitationData.schoolName,
          sport: simulatedInvitationData.sport,
        }));
      } else if (storedInvitationData) {
        setInvitationData(storedInvitationData);

        // Pre-fill form with invitation data using standardized field names
        setFormData(prev => ({
          ...prev,
          // Map invitation fields to standardized form fields
          firstName: storedInvitationData.firstName || '',
          lastName: storedInvitationData.lastName || '',
          email: storedInvitationData.email || '',
          phone: storedInvitationData.phoneFormatted || storedInvitationData.phone || '',
          schoolCity: storedInvitationData.city || '',
          schoolState: storedInvitationData.state || '',
          bio: storedInvitationData.bio || '',
          // Map school information if available
          nameOfInstitution: storedInvitationData.schoolName || '',
          schoolType: storedInvitationData.schoolType || '',
          sport: storedInvitationData.sport || '',
        }));
      }

      // If we have cached progress, use it first
      if (cachedProgress) {
        setProgress(cachedProgress);
        setLastSaved(new Date(cachedProgress.last_updated));

        // Merge cached step data into form
        if (cachedProgress.step_data) {
          setFormData(prev => ({
            ...prev,
            ...cachedProgress.step_data,
          }));
        }
      }

      // Then try to get fresh data from server
      const email = storedInvitationData?.email || cachedProgress?.email;
      const invitationToken = getCachedInvitationToken();

      console.log('🔍 Attempting to fetch server data:', {
        email,
        invitationToken,
        hasStoredInvitation: !!storedInvitationData,
        hasCachedProgress: !!cachedProgress,
      });

      if (email) {
        try {
          const backendProgress = await invitationAPI.getOnboardingProgress(
            email,
            invitationToken || undefined
          );

          console.log('📡 Server response received:', {
            hasBackendProgress: !!backendProgress,
            backendProgress: backendProgress,
            serverStepData: backendProgress?.step_data,
            serverCompletedSteps: backendProgress?.completed_steps,
            serverCurrentStep: backendProgress?.current_step,
            serverLastUpdated: backendProgress?.last_updated,
          });

          if (backendProgress) {
            // Check if server data is newer than cached data
            const serverDate = new Date(backendProgress.last_updated);
            const cachedDate = cachedProgress ? new Date(cachedProgress.last_updated) : new Date(0);

            console.log('📅 Date comparison:', {
              serverDate: serverDate.toISOString(),
              cachedDate: cachedDate.toISOString(),
              serverIsNewer: serverDate > cachedDate,
            });

            if (serverDate > cachedDate) {
              console.log('🔄 Server data is newer, using server progress');
              console.log('📊 Merging server step data into form:', backendProgress.step_data);

              setProgress(backendProgress);
              setLastSaved(serverDate);
              storeOnboardingProgress(backendProgress);

              // Merge server step data into form
              if (backendProgress.step_data) {
                setFormData(prev => {
                  const mergedData = {
                    ...prev,
                    ...backendProgress.step_data,
                  };
                  console.log('🔀 Form data after server merge:', mergedData);
                  return mergedData;
                });
              }
            } else {
              console.log('💾 Local cache is up to date');
            }
          } else if (!cachedProgress) {
            // Create new progress if none exists locally or on server
            const newProgress: OnboardingProgress = {
              user_id: email,
              email,
              current_step: currentStep,
              completed_steps: [],
              step_data: {},
              last_updated: new Date().toISOString(),
              invitation_based: !!invitationToken,
            };

            // ✅ Create backend session immediately
            console.log('Creating new backend onboarding session for:', email);
            const backendCreated = await invitationAPI.updateOnboardingProgress(
              email,
              currentStep,
              {}, // empty step data initially
              [],
              invitationToken || undefined
            );

            if (backendCreated) {
              console.log('✅ Backend session created successfully');
              setProgress(newProgress);
              storeOnboardingProgress(newProgress);
            } else {
              console.error('❌ Failed to create backend session, using local only');
              // Still set local progress as fallback
              setProgress(newProgress);
              storeOnboardingProgress(newProgress);
            }
          }
        } catch (error) {
          console.error('Error fetching server progress, using cached data:', error);
          // Continue with cached data if server fails
        }
      }

      // Load any additional cached form data from localStorage
      loadCachedFormData();
    } catch (error) {
      console.error('Error initializing onboarding state:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentStep]);

  // Define getCompletedSteps before it's used in autoSave
  const getCompletedSteps = useCallback(() => {
    if (!progress) return [];
    return progress.completed_steps || [];
  }, [progress]);

  // Define autoSave before it's used in useEffect
  const autoSave = useCallback(async (): Promise<boolean> => {
    if (isSaving || !hasUnsavedChanges) return false;

    try {
      setIsSaving(true);

      const email = invitationData?.email || progress?.email;
      const invitationToken = getCachedInvitationToken();

      if (!email) {
        console.error('No email available for auto-save');
        return false;
      }

      // Merge current formData with existing step_data to avoid overwriting
      const mergedStepData = { ...progress!.step_data, ...formData };

      const success = await invitationAPI.updateOnboardingProgress(
        email,
        currentStep,
        mergedStepData,
        getCompletedSteps(),
        invitationToken || undefined
      );

      if (success) {
        setHasUnsavedChanges(false);
        setLastSaved(new Date());

        // Update local progress - MERGE step data instead of overwriting
        const updatedProgress: OnboardingProgress = {
          ...progress!,
          current_step: currentStep,
          step_data: { ...progress!.step_data, ...formData },
          completed_steps: getCompletedSteps(),
          last_updated: new Date().toISOString(),
        };

        setProgress(updatedProgress);
        storeOnboardingProgress(updatedProgress);

        console.log('✅ Auto-save completed successfully');
        return true;
      } else {
        console.error('❌ Auto-save failed');
        return false;
      }
    } catch (error) {
      console.error('Error during auto-save:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [
    isSaving,
    hasUnsavedChanges,
    invitationData,
    progress,
    currentStep,
    formData,
    getCompletedSteps,
  ]);

  // Initialize onboarding state on mount
  useEffect(() => {
    initializeOnboardingState();

    // Cleanup timeout on unmount
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [initializeOnboardingState]);

  // Simplified auto-save when hasUnsavedChanges changes
  useEffect(() => {
    if (hasUnsavedChanges && !isSaving) {
      // Single debounced auto-save after 5 seconds of inactivity
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSave();
      }, 5000); // 5 seconds debounce (simplified from multiple mechanisms)
    }
  }, [hasUnsavedChanges, isSaving, autoSave]);

  const loadCachedFormData = () => {
    // Form data now comes from server progress only
    // Individual field caching removed to simplify state management
    console.log('📋 Using server progress data instead of individual field cache');
  };

  const updateField = useCallback(
    (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      setHasUnsavedChanges(true);

      // Clear error for this field
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    },
    [errors]
  );

  const updateMultipleFields = useCallback(
    (fields: Record<string, any>) => {
      setFormData(prev => ({ ...prev, ...fields }));
      setHasUnsavedChanges(true);

      // Clear errors for updated fields
      const updatedErrorKeys = Object.keys(fields).filter(key => errors[key]);
      if (updatedErrorKeys.length > 0) {
        setErrors(prev => {
          const newErrors = { ...prev };
          updatedErrorKeys.forEach(key => delete newErrors[key]);
          return newErrors;
        });
      }
    },
    [errors]
  );

  const saveProgress = useCallback(async () => {
    if (!progress || !invitationData?.email) return false;

    setIsSaving(true);

    try {
      const updatedProgress: OnboardingProgress = {
        ...progress,
        current_step: currentStep,
        step_data: { ...progress.step_data, ...formData },
        last_updated: new Date().toISOString(),
      };

      console.log('💾 Saving progress to server:', {
        email: invitationData.email,
        currentStep,
        formData,
        mergedStepData: updatedProgress.step_data,
        completedSteps: progress.completed_steps,
      });

      // Get the invitation token from cache
      const invitationToken = getCachedInvitationToken();

      // Save to backend
      const success = await invitationAPI.updateOnboardingProgress(
        invitationData.email,
        currentStep,
        formData,
        progress.completed_steps,
        invitationToken || undefined
      );

      console.log('📤 Server save result:', {
        success,
        email: invitationData.email,
        currentStep,
        invitationToken: invitationToken ? 'present' : 'missing',
      });

      if (success) {
        setProgress(updatedProgress);
        storeOnboardingProgress(updatedProgress);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [progress, invitationData, currentStep, formData]);

  const validateStep = useCallback(() => {
    const newErrors: Record<string, string> = {};

    requiredFields.forEach(field => {
      const value = formData[field as keyof OnboardingFormData];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors[field] = `${field.replace('_', ' ')} is required`;
      }
    });

    // Custom validation rules using standardized field names
    if (requiredFields.includes('birthDate') && formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.birthDate = 'You must be at least 18 years old';
      }
    }

    if (requiredFields.includes('email') && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, requiredFields]);

  const markStepComplete = useCallback(async () => {
    if (!progress || !validateStep()) return false;

    const completedSteps = [...progress.completed_steps];
    if (!completedSteps.includes(currentStep)) {
      completedSteps.push(currentStep);
    }

    setIsSaving(true);

    try {
      const updatedProgress: OnboardingProgress = {
        ...progress,
        current_step: currentStep,
        completed_steps: completedSteps,
        step_data: { ...progress.step_data, ...formData },
        last_updated: new Date().toISOString(),
      };

      console.log('✅ Marking step complete and saving to server:', {
        email: invitationData?.email || progress.email,
        currentStep,
        newCompletedSteps: completedSteps,
        formData,
        mergedStepData: updatedProgress.step_data,
        previousCompletedSteps: progress.completed_steps,
      });

      // Get the invitation token from cache
      const invitationToken = getCachedInvitationToken();

      // Save to backend
      const success = await invitationAPI.updateOnboardingProgress(
        invitationData?.email || progress.email,
        currentStep,
        formData,
        completedSteps,
        invitationToken || undefined
      );

      console.log('🎯 Step completion server result:', {
        success,
        email: invitationData?.email || progress.email,
        currentStep,
        completedStepsCount: completedSteps.length,
        invitationToken: invitationToken ? 'present' : 'missing',
      });

      if (success) {
        setProgress(updatedProgress);
        storeOnboardingProgress(updatedProgress);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Error marking step complete:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [progress, invitationData, currentStep, formData, validateStep]);

  // Utility functions
  const isFieldPreFilledFn = useCallback(
    (field: string) => {
      return isFieldPreFilled(field, invitationData);
    },
    [invitationData]
  );

  const getFieldValue = useCallback(
    (field: string) => {
      return formData[field as keyof OnboardingFormData];
    },
    [formData]
  );

  const getCurrentStepIndex = useCallback(() => {
    const stepOrder = Object.values(ONBOARDING_STEPS);
    return stepOrder.indexOf(currentStep);
  }, [currentStep]);

  const getTotalSteps = useCallback(() => {
    return Object.values(ONBOARDING_STEPS).length;
  }, []);

  const getProgressPercentage = useCallback(() => {
    const totalSteps = getTotalSteps();
    const completedCount = getCompletedSteps().length;
    return Math.round((completedCount / totalSteps) * 100);
  }, [getTotalSteps, getCompletedSteps]);

  return {
    // Data state
    formData,
    invitationData,
    progress,

    // Loading states
    isLoading,
    isSaving,
    lastSaved,
    hasUnsavedChanges,

    // Error states
    errors,
    hasErrors: Object.keys(errors).length > 0,

    // Actions
    updateField,
    updateMultipleFields,
    saveProgress,
    autoSave,
    validateStep,
    markStepComplete,

    // Utilities
    isFieldPreFilled: isFieldPreFilledFn,
    getFieldValue,
    getCompletedSteps,
    getCurrentStepIndex,
    getTotalSteps,
    getProgressPercentage,
  };
}
