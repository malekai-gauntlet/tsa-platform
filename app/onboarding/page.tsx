import { OnboardingClient } from './OnboardingClient';

interface OnboardingPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Server Component - handles URL params properly
export default function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const invite = typeof searchParams.invite === 'string' ? searchParams.invite : undefined;
  const bypass = typeof searchParams.bypass === 'string' ? searchParams.bypass : undefined;

  return <OnboardingClient invite={invite} bypass={bypass} />;
}
