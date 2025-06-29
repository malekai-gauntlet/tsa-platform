'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';

import { Avatar } from '@/components/data-display';
import { Badge } from '@/components/data-display';
import { Button } from '@/components/ui/button';
import { Checkbox, CheckboxField } from '@/components/checkbox';
import { Divider } from '@/components/layout';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/form';
import { Label, Fieldset } from '@/components/fieldset';
import { Select } from '@/components/form';
import { Text } from '@/components/data-display';
import { Textarea } from '@/components/form';
import { Switch, SwitchField } from '@/components/switch';
import { getEvents } from '@/data';
import { Address } from '@/app/coach/settings/address';
import Link from 'next/link';
import { useRef } from 'react';
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'next/navigation';
import { GoogleCalendarConnection } from '@/components/integration';

// AWS Amplify imports
import { getCurrentUser, fetchAuthSession, AuthUser } from 'aws-amplify/auth';
import { uploadData, getUrl, remove, list } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { extractDisplayNameFromEmail } from '@/lib/utils';

const client = generateClient<Schema>();

function SettingsContent() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User data state
  const [user, setUser] = useState<AuthUser | null>(null);
  const [coachRecord, setCoachRecord] = useState<any>(null);
  const [profileRecord, setProfileRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile photo state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolBio: '',
    schoolEmail: '',
    emailIsPublic: true,
    firstName: '',
    lastName: '',
    phone: '',
    workEmail: '',
    googleCalendarEnabled: false,
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
    },
  });

  // Save state
  const [isSaving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isLoadedFromCache, setIsLoadedFromCache] = useState(false);

  // Secret button state
  const [secretClickCount, setSecretClickCount] = useState(0);

  // Load user data on component mount
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // Get current user from Cognito
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      // Extract user data from Cognito attributes
      const email = currentUser.signInDetails?.loginId || '';
      const firstName = extractDisplayNameFromEmail(email);

      // Try to load from local cache first
      let cachedData = null;
      try {
        const cached = localStorage.getItem('coach_settings_cache');
        if (cached) {
          const parsedCache = JSON.parse(cached);
          // Check if cache is for the current user and is recent (less than 1 hour old)
          const cacheAge = new Date().getTime() - new Date(parsedCache.lastSaved).getTime();
          const oneHour = 60 * 60 * 1000;

          if (parsedCache.userId === currentUser.userId && cacheAge < oneHour) {
            cachedData = parsedCache;
            setIsLoadedFromCache(true);
            console.log('✅ Loaded settings from cache');
          } else {
            console.log('⚠️ Cache expired or for different user, loading from server');
            localStorage.removeItem('coach_settings_cache');
            setIsLoadedFromCache(false);
          }
        }
      } catch (cacheError) {
        console.warn('⚠️ Could not load from cache:', cacheError);
        setIsLoadedFromCache(false);
      }

      // Load Coach record
      const coachData = await loadCoachRecord(email, currentUser.userId);

      // Load Profile record
      const profileData = await loadProfileRecord(currentUser.userId);

      // Populate form with data from cache first, then server data
      const profileAddress = (profileData?.address as any) || {};
      const profilePreferences = (profileData?.preferences as any) || {};

      setFormData({
        schoolName:
          cachedData?.schoolName || profilePreferences.schoolName || 'Texas Sports Academy',
        schoolBio:
          cachedData?.schoolBio ||
          profileData?.bio ||
          'Developing student-athletes through excellence in education and athletics.',
        schoolEmail:
          cachedData?.schoolEmail || profilePreferences.schoolEmail || coachData?.email || email,
        emailIsPublic: cachedData?.emailIsPublic !== undefined ? cachedData.emailIsPublic : true,
        firstName: cachedData?.firstName || coachData?.firstName || firstName,
        lastName: cachedData?.lastName || coachData?.lastName || '',
        phone: cachedData?.phone || coachData?.phone || '',
        workEmail: cachedData?.workEmail || coachData?.email || email,
        googleCalendarEnabled:
          cachedData?.googleCalendarEnabled !== undefined
            ? cachedData.googleCalendarEnabled
            : profilePreferences.googleCalendarEnabled || false,
        address: cachedData?.address || {
          streetAddress: profileAddress.streetAddress || '',
          city: profileAddress.city || '',
          state: profileAddress.state || '',
          zipCode: profileAddress.zipCode || '',
          country: profileAddress.country || 'US',
        },
      });

      // Load profile photo from Storage
      await loadProfilePhoto(currentUser.userId);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCoachRecord = async (email: string, amplifyUserId: string) => {
    try {
      // Try to find existing user record by email
      const { data: users } = await client.models.User.list({
        filter: { email: { eq: email } },
      });

      if (users.length > 0) {
        const user = users[0];
        setCoachRecord(user);
        return user;
      } else {
        // Create new user record if doesn't exist with improved name extraction
        const displayName = extractDisplayNameFromEmail(email);
        const newUser = await client.models.User.create({
          email: email,
          amplifyUserId: amplifyUserId,
          firstName: displayName,
          role: 'COACH',
          status: 'ACTIVE',
        });
        setCoachRecord(newUser.data);
        return newUser.data;
      }
    } catch (error) {
      console.error('Error loading user record:', error);
      return null;
    }
  };

  const loadProfileRecord = async (userId: string) => {
    try {
      // Try to find existing profile record
      const { data: profiles } = await client.models.Profile.list({
        filter: { userId: { eq: userId } },
      });

      if (profiles.length > 0) {
        const profile = profiles[0];
        setProfileRecord(profile);
        return profile;
      } else {
        // Create new profile record if doesn't exist
        const newProfile = await client.models.Profile.create({
          userId: userId,
          profileType: 'COACH',
          preferences: {
            googleCalendarEnabled: false,
          },
          onboardingComplete: false,
        });
        setProfileRecord(newProfile.data);
        return newProfile.data;
      }
    } catch (error) {
      console.error('Error loading profile record:', error);
      return null;
    }
  };

  const loadProfilePhoto = async (userId: string) => {
    try {
      const photoKey = `profile-pictures/${userId}/profile-photo`;
      const result = await getUrl({ key: photoKey });
      setProfilePhoto(result.url.toString());
    } catch (error) {
      // No profile photo exists yet, use default
      console.log('No profile photo found, using default');
      setProfilePhoto('/default-profile.png');
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Upload to AWS S3 via Amplify Storage
      const photoKey = `profile-pictures/${user.userId}/profile-photo`;

      // Remove old photo if exists
      try {
        await remove({ key: photoKey });
      } catch (error) {
        // Old photo doesn't exist, that's fine
      }

      // Upload new photo
      const result = await uploadData({
        key: photoKey,
        data: file,
        options: {
          contentType: file.type,
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              const progress = Math.round((transferredBytes / totalBytes) * 100);
              console.log(`Upload progress: ${progress}%`);
            }
          },
        },
      }).result;

      // Get the public URL
      const photoUrl = await getUrl({ key: photoKey });
      const newPhotoUrl = photoUrl.url.toString();
      setProfilePhoto(newPhotoUrl);

      // Dispatch event to update sidebar photo
      window.dispatchEvent(new CustomEvent('profilePhotoChange', { detail: newPhotoUrl }));

      console.log('✅ Photo uploaded successfully');
    } catch (error) {
      console.error('❌ Error uploading photo:', error);
      setUploadError('Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user) return;

    try {
      // Remove photo from AWS S3 Storage
      const photoKey = `profile-pictures/${user.userId}/profile-photo`;
      await remove({ key: photoKey });

      // Update local state to default
      setProfilePhoto('/default-profile.png');

      // Dispatch event to update sidebar photo
      window.dispatchEvent(
        new CustomEvent('profilePhotoChange', { detail: '/default-profile.png' })
      );

      console.log('✅ Photo removed successfully');
    } catch (error) {
      console.error('❌ Error removing photo:', error);
      // Still update local state as fallback
      setProfilePhoto('/default-profile.png');
      window.dispatchEvent(
        new CustomEvent('profilePhotoChange', { detail: '/default-profile.png' })
      );
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (addressData: any) => {
    setFormData(prev => ({
      ...prev,
      address: addressData,
    }));
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      let updatedUserRecord = coachRecord;
      let updatedProfileRecord = profileRecord;

      // Update User record with basic user info only
      if (coachRecord) {
        const userUpdateResult = await client.models.User.update({
          id: coachRecord.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.workEmail,
        });

        if (userUpdateResult.data) {
          updatedUserRecord = userUpdateResult.data;
          setCoachRecord(updatedUserRecord);
          console.log('✅ User record updated successfully');
        }
      }

      // Update Profile record with extended profile information
      if (profileRecord) {
        const profileUpdateResult = await client.models.Profile.update({
          id: profileRecord.id,
          bio: formData.schoolBio,
          preferences: {
            ...profileRecord.preferences,
            googleCalendarEnabled: formData.googleCalendarEnabled,
            schoolName: formData.schoolName,
            schoolEmail: formData.schoolEmail,
            emailIsPublic: formData.emailIsPublic,
          },
          address: formData.address,
        });

        if (profileUpdateResult.data) {
          updatedProfileRecord = profileUpdateResult.data;
          setProfileRecord(updatedProfileRecord);
          console.log('✅ Profile record updated successfully');
        }
      }

      // Update local cache with the saved data to ensure consistency
      const savedData = {
        schoolName: formData.schoolName,
        schoolBio: formData.schoolBio,
        schoolEmail: formData.schoolEmail,
        emailIsPublic: formData.emailIsPublic,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        workEmail: formData.workEmail,
        googleCalendarEnabled: formData.googleCalendarEnabled,
        address: formData.address,
      };

      // Store in localStorage for persistence across sessions
      try {
        localStorage.setItem(
          'coach_settings_cache',
          JSON.stringify({
            ...savedData,
            lastSaved: new Date().toISOString(),
            userId: user.userId,
          })
        );
        setIsLoadedFromCache(true);
        console.log('✅ Settings cached locally');
      } catch (cacheError) {
        console.warn('⚠️ Could not cache settings locally:', cacheError);
      }

      // Update form data to reflect saved state
      setFormData(prev => ({
        ...prev,
        ...savedData,
      }));

      setSaveMessage('✅ Settings saved successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('❌ Error saving settings:', error);
      setSaveMessage('❌ Failed to save settings');
      setTimeout(() => setSaveMessage(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const clearCache = () => {
    try {
      localStorage.removeItem('coach_settings_cache');
      setIsLoadedFromCache(false);
      setSaveMessage('✅ Cache cleared successfully!');
      setTimeout(() => setSaveMessage(null), 3000);
      console.log('✅ Settings cache cleared');
    } catch (error) {
      console.error('❌ Error clearing cache:', error);
      setSaveMessage('❌ Failed to clear cache');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <Text className="mt-2 text-gray-600">Loading your settings...</Text>
        </div>
      </div>
    );
  }

  return (
    <form method="post" className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <Heading
            onClick={() => {
              setSecretClickCount(prev => prev + 1);
              if (secretClickCount >= 4) {
                clearCache();
                setSecretClickCount(0);
              }
            }}
            className="cursor-pointer"
          >
            Settings
          </Heading>
          <Text className="mt-2 text-gray-600">
            Manage your profile, school details, and preferences.
          </Text>
        </div>
        {isLoadedFromCache && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <Text className="text-xs text-green-700">Loaded from cache</Text>
          </div>
        )}
      </div>
      {saveMessage && (
        <div
          className={`mt-4 rounded-lg border p-3 ${
            saveMessage.includes('✅') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}
        >
          <Text
            className={`text-sm ${saveMessage.includes('✅') ? 'text-green-800' : 'text-red-800'}`}
          >
            {saveMessage}
          </Text>
        </div>
      )}

      <Divider className="my-10 mt-6" />

      {/* Profile Photo Section */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Profile Photo</Subheading>
          <Text>This will be displayed in your sidebar and profile.</Text>
          {uploadError && <Text className="text-sm text-red-600">{uploadError}</Text>}
        </div>
        <div className="flex items-center gap-6">
          <Avatar
            src={profilePhoto || '/default-profile.png'}
            className="size-20"
            square
            alt="Profile photo"
          />
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={triggerFileUpload}
              disabled={isUploading}
              variant="primary"
              size="md"
              loading={isUploading}
              icon={<PhotoIcon className="h-4 w-4" />}
            >
              {profilePhoto && profilePhoto !== '/default-profile.png'
                ? 'Change Photo'
                : 'Upload Photo'}
            </Button>
            {profilePhoto && profilePhoto !== '/default-profile.png' && !isUploading && (
              <Button
                type="button"
                onClick={handleRemovePhoto}
                variant="danger"
                size="md"
                icon={<TrashIcon className="h-4 w-4" />}
              >
                Remove Photo
              </Button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>
      </section>

      <Divider className="my-10" soft />

      {/* Personal Information */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Personal Information</Subheading>
          <Text>Your name and contact details from your account.</Text>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Fieldset>
              <Label>First Name</Label>
              <Input
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label>Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
              />
            </Fieldset>
          </div>
          <Fieldset>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </Fieldset>
          <Fieldset>
            <Label>Account Email</Label>
            <Input
              type="email"
              value={user?.signInDetails?.loginId || 'Not available'}
              readOnly
              className="cursor-not-allowed bg-gray-50"
              title="Account email cannot be changed"
            />
            <Text className="mt-1 text-sm text-gray-500">
              This is your login email and cannot be changed
            </Text>
          </Fieldset>
          <Fieldset>
            <Label>Work Email</Label>
            <Input
              type="email"
              value={formData.workEmail}
              onChange={e => handleInputChange('workEmail', e.target.value)}
            />
          </Fieldset>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>School Name</Subheading>
          <Text>This will be displayed on your public profile.</Text>
        </div>
        <div>
          <Input
            aria-label="School Name"
            value={formData.schoolName}
            onChange={e => handleInputChange('schoolName', e.target.value)}
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>School Bio</Subheading>
          <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
        </div>
        <div>
          <Textarea
            aria-label="School Bio"
            value={formData.schoolBio}
            onChange={e => handleInputChange('schoolBio', e.target.value)}
            maxLength={240}
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>School Email</Subheading>
          <Text>This is how parents and families can contact your school for support.</Text>
        </div>
        <div className="space-y-4">
          <Input
            type="email"
            aria-label="School Email"
            value={formData.schoolEmail}
            onChange={e => handleInputChange('schoolEmail', e.target.value)}
          />
          <CheckboxField>
            <Checkbox
              checked={formData.emailIsPublic}
              onChange={checked => handleInputChange('emailIsPublic', checked)}
            />
            <Label>Show email on public profile</Label>
          </CheckboxField>
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Address</Subheading>
          <Text>This is where your school is located.</Text>
        </div>
        <Address initialAddress={formData.address} onAddressChange={handleAddressChange} />
      </section>

      <Divider className="my-10" soft />

      {/* Google Calendar Integration */}
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Google Calendar Integration</Subheading>
          <Text>
            Connect your Google account to automatically create calendar events and Google Meet
            links for your coaching sessions.
          </Text>
        </div>
        <div className="space-y-4">
          <GoogleCalendarConnection userId={user?.userId} />
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving || !user}
          loading={isSaving}
          variant="primary"
          size="md"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}

export default function Settings() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 h-8 w-1/4 animate-pulse rounded bg-gray-200"></div>
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-10 animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
