export type Country = {
  id: string;
  name: string;
  code: string;
};

// Country data for address forms
export async function getCountries(): Promise<Country[]> {
  // Return a list of countries - this could be enhanced to come from a database or API
  return [
    { id: 'US', name: 'United States', code: 'US' },
    { id: 'CA', name: 'Canada', code: 'CA' },
    { id: 'MX', name: 'Mexico', code: 'MX' },
    { id: 'GB', name: 'United Kingdom', code: 'GB' },
    { id: 'DE', name: 'Germany', code: 'DE' },
    { id: 'FR', name: 'France', code: 'FR' },
    { id: 'AU', name: 'Australia', code: 'AU' },
    { id: 'JP', name: 'Japan', code: 'JP' },
    { id: 'KR', name: 'South Korea', code: 'KR' },
    { id: 'CN', name: 'China', code: 'CN' },
    { id: 'IN', name: 'India', code: 'IN' },
    { id: 'BR', name: 'Brazil', code: 'BR' },
  ];
}
