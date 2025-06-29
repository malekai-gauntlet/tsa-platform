import { PersonalInfoClient } from './PersonalInfoClient';

interface PersonalInfoPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// Server Component - handles URL params properly
export default function PersonalInfoPage({ searchParams }: PersonalInfoPageProps) {
  const invite = typeof searchParams.invite === 'string' ? searchParams.invite : undefined;
  const bypass = typeof searchParams.bypass === 'string' ? searchParams.bypass : undefined;

  return <PersonalInfoClient invite={invite} bypass={bypass} />;
}
