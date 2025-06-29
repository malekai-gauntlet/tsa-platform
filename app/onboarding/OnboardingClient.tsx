'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/components/link';
import { motion } from 'framer-motion';
import { ProgressFooter } from '@/components/progress-footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  storeInvitationURL,
  storeInvitationData,
  getStoredInvitationData,
  type InvitationData,
} from '@/lib/api/invitation-api';

const steps = [
  {
    number: 1,
    title: 'Tell us about yourself',
    description: 'Share basic personal information and professional background.',
    imageUrl: '/onboarding/coach.png',
    altText: 'Illustration of a coach with a clipboard',
  },
  {
    number: 2,
    title: 'School information',
    description: 'Set up your school details, location, and grade levels.',
    imageUrl: '/onboarding/school.png',
    altText: 'Illustration of a school building',
  },
  {
    number: 3,
    title: 'Programs & focus',
    description: 'Define your sports programs and educational approach.',
    imageUrl: '/onboarding/family.png',
    altText: 'Illustration of a diverse group of students and families',
  },
];

interface OnboardingClientProps {
  invite?: string;
  bypass?: string;
}

export function OnboardingClient({ invite, bypass }: OnboardingClientProps) {
  const router = useRouter();

  // State management
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [isInvitation, setIsInvitation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [validationComplete, setValidationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Clean URL parameter handling
  const isInBypassMode = bypass === 'true';
  const isDev = process.env.NODE_ENV === 'development';
  const allowBypass = isDev || isInBypassMode;
  const storedInvitationData = getStoredInvitationData();

  useEffect(() => {
    setMounted(true);

    // Debug logging removed for security
  }, [
    isInBypassMode,
    allowBypass,
    isDev,
    storedInvitationData,
    invite,
    bypass,
    mounted,
    isLoading,
    validationComplete,
    accessDenied,
  ]);

  useEffect(() => {
    if (!mounted) return;

    const initializeOnboarding = async () => {
      try {
        setIsLoading(true);

        if (invite) {
          console.log('🎟️ Processing invitation token:', invite.substring(0, 20) + '...');

          try {
            const response = await fetch('/api/onboarding/validate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: invite }),
            });

            const validation = await response.json();

            if (validation.valid && validation.invitation) {
              setInvitationData(validation.invitation);
              storeInvitationData(validation.invitation);
              setIsInvitation(true);
              setValidationComplete(true);
              setAccessDenied(false);
            } else {
              console.error('❌ Invalid invitation:', validation.error);
              setError(validation.error || 'Invalid invitation');
              setAccessDenied(true);
            }
          } catch (error) {
            console.error('❌ Error validating invitation:', error);
            setError('Failed to validate invitation');
            setAccessDenied(true);
          }
        } else if (allowBypass) {
          // Development/bypass mode - allow access without invitation
          console.log('🛠️ Bypass mode enabled - allowing access without invitation');
          setIsInvitation(false);
          setValidationComplete(true);
          setAccessDenied(false);

          // Store the current URL for navigation
          if (typeof window !== 'undefined') {
            storeInvitationURL(window.location.href);
          }
        } else {
          // No invitation and no bypass - deny access
          setError('Onboarding access requires a valid invitation');
          setAccessDenied(true);
        }
      } catch (error) {
        console.error('❌ Error initializing onboarding:', error);
        setError('Failed to initialize onboarding process');
        setAccessDenied(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeOnboarding();
  }, [mounted, invite, allowBypass]);

  // Show loading state for invitation validation
  if (isLoading) {
    return (
      <div className="font-poppins flex min-h-screen flex-col bg-white">
        <header className="flex flex-shrink-0 items-center justify-between px-10 py-5">
          <Link href="/" aria-label="Homepage">
            <img
              src={process.env.NEXT_PUBLIC_TSA_LOGO_URL || '/logo.svg'}
              alt="Texas Sports Academy"
              className="h-12 w-auto"
            />
          </Link>
        </header>

        <main className="flex flex-grow flex-col items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#174fa2]"></div>
            <h1 className="mb-2 text-2xl font-semibold text-[#222222]">
              {invite ? 'Validating your invitation...' : 'Checking access...'}
            </h1>
            <p className="text-[#717171]">Please wait while we verify your access.</p>
          </div>
        </main>
      </div>
    );
  }

  // Show access denied or error state
  if (accessDenied || error) {
    return (
      <div className="font-poppins flex min-h-screen flex-col bg-white">
        <header className="flex flex-shrink-0 items-center justify-between px-10 py-5">
          <Link href="/" aria-label="Homepage">
            <img
              src={process.env.NEXT_PUBLIC_TSA_LOGO_URL || '/logo.svg'}
              alt="Texas Sports Academy"
              className="h-12 w-auto"
            />
          </Link>
        </header>

        <main className="flex flex-grow flex-col items-center justify-center">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-7V6a2 2 0 00-2-2H7a2 2 0 00-2 2v2"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-[#222222]">
              {error ? 'Invalid Invitation' : 'Access Restricted'}
            </h1>
            <p className="mb-6 text-[#717171]">
              {error ||
                'Onboarding is only available through invitation. Please contact an administrator to receive an invitation link.'}
            </p>
            <div className="space-y-3">
              <Link href="/">
                <button className="w-full rounded-lg bg-gradient-to-r from-[#004aad] to-[#0066ff] px-6 py-3 font-medium text-white transition-colors hover:from-[#003a8c] hover:to-[#0052cc]">
                  Coach Login
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="font-poppins flex min-h-screen flex-col bg-white pb-[66px]">
      {/* Bypass Indicator */}
      {isInBypassMode && !accessDenied && (
        <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                🚧 BYPASS MODE
              </span>
              <span className="text-yellow-700">
                Onboarding bypass active - no invitation required
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Invitation Success Indicator */}
      {isInvitation && invitationData && !accessDenied && (
        <div className="border-b border-green-200 bg-green-50 px-4 py-2">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                ✅ INVITATION VALIDATED
              </span>
              <span className="text-green-700">
                Welcome {invitationData.firstName || 'there'}! Your invitation is valid.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between px-10 py-5">
        <Link href="/" aria-label="Homepage">
          <img
            src={process.env.NEXT_PUBLIC_TSA_LOGO_URL || '/logo.svg'}
            alt="Texas Sports Academy"
            className="h-12 w-auto"
          />
        </Link>
        <Link href="/">
          <button className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
            Exit
          </button>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex flex-grow flex-col md:flex-row">
        {/* Left column - Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center p-10 md:w-1/2 md:px-16 md:pt-8 md:pb-20 lg:px-24 lg:pt-12 lg:pb-28"
        >
          <h1 className="font-integral text-5xl leading-[0.9] tracking-tight text-[#222222] md:text-6xl">
            It&apos;s easy to start a school with{' '}
            <span className="text-[#174fa2]">Texas Sports Academy</span>
          </h1>
        </motion.div>

        {/* Right column - Steps list */}
        <div className="flex flex-col justify-center p-10 md:w-1/2 md:py-0 md:pt-8 md:pr-16 md:pb-20 md:pl-10 lg:pt-12 lg:pr-24 lg:pb-28">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  {/* Step number */}
                  <div className="w-8 flex-shrink-0 text-2xl font-bold text-[#222222]">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="mr-6 flex-grow">
                    <h2 className="mb-1 text-2xl font-semibold text-[#222222]">{step.title}</h2>
                    <p className="text-xl text-[#717171]">{step.description}</p>
                  </div>

                  {/* Image */}
                  <div className="flex h-30 w-30 flex-shrink-0 items-center justify-center">
                    <Image
                      src={step.imageUrl}
                      alt={step.altText}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>
                {index < steps.length - 1 && <div className="border-b border-gray-200 pt-8 pb-0" />}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Progress Footer */}
      <ProgressFooter
        progressPercent={0}
        nextButtonText="Get started"
        disabled={!validationComplete}
        buttonAction={() => {
          // Clean URL building
          let nextUrl = '/onboarding/personal-info';
          const params = new URLSearchParams();

          if (invite) {
            params.set('invite', invite);
          }
          if (bypass) {
            params.set('bypass', bypass);
          }

          if (params.toString()) {
            nextUrl += `?${params.toString()}`;
          }

          router.push(nextUrl);
        }}
        nextButtonClassName="bg-gradient-to-r from-[#004aad] to-[#0066ff] hover:from-[#003a8c] hover:to-[#0052cc] text-white"
      />
    </div>
  );
}
