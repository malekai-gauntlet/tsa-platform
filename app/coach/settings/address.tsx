'use client';

import { Input } from '@/components/form';
import { Listbox, ListboxLabel, ListboxOption } from '@/components/form/listbox';
import { Text } from '@/components/data-display';
import { getCountries, type Country } from '@/lib/constants/countries';
import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

interface AddressData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressProps {
  initialAddress?: AddressData;
  onAddressChange?: (addressData: AddressData) => void;
}

export function Address({ initialAddress, onAddressChange }: AddressProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [addressData, setAddressData] = useState<AddressData>({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryList = await getCountries();
        setCountries(countryList);

        // Set default country (US)
        const defaultCountry = countryList.find(c => c.code === 'US') || countryList[0];
        if (defaultCountry) {
          setCountry(defaultCountry);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading countries:', error);
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (initialAddress && countries.length > 0) {
      setAddressData(initialAddress);
      // Find the country object that matches the country code
      const matchingCountry = countries.find(c => c.code === initialAddress.country);
      if (matchingCountry) {
        setCountry(matchingCountry);
      }
    }
  }, [initialAddress, countries]);

  const handleAddressChange = (field: keyof AddressData, value: string) => {
    const newAddressData = {
      ...addressData,
      [field]: value,
    };
    setAddressData(newAddressData);

    // Notify parent component of changes
    onAddressChange?.(newAddressData);
  };

  const handleCountryChange = (newCountry: Country) => {
    setCountry(newCountry);
    const newAddressData = {
      ...addressData,
      country: newCountry.code,
      state: '', // Reset state when country changes
    };
    setAddressData(newAddressData);

    // Notify parent component of changes
    onAddressChange?.(newAddressData);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 h-10 animate-pulse rounded bg-gray-200" />
        <div className="col-span-2 h-10 animate-pulse rounded bg-gray-200" />
        <div className="h-10 animate-pulse rounded bg-gray-200" />
        <div className="h-10 animate-pulse rounded bg-gray-200" />
        <div className="col-span-2 h-10 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  const hasAddressData =
    addressData.streetAddress || addressData.city || addressData.state || addressData.zipCode;

  return (
    <div className="space-y-4">
      {!hasAddressData && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <Text className="text-sm text-gray-600">
            <strong>Address not specified</strong> - Please enter your organization's address below
          </Text>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <Input
          aria-label="Street Address"
          name="address"
          placeholder="Street Address"
          value={addressData.streetAddress}
          onChange={e => handleAddressChange('streetAddress', e.target.value)}
          className="col-span-2"
        />
        <Input
          aria-label="City"
          name="city"
          placeholder="City"
          value={addressData.city}
          onChange={e => handleAddressChange('city', e.target.value)}
          className="col-span-2"
        />
        <Input
          aria-label="State/Province"
          name="state"
          placeholder="State/Province"
          value={addressData.state}
          onChange={e => handleAddressChange('state', e.target.value)}
        />
        <Input
          aria-label="Postal code"
          name="postal_code"
          placeholder="Postal Code"
          value={addressData.zipCode}
          onChange={e => handleAddressChange('zipCode', e.target.value)}
        />
        <Listbox
          aria-label="Country"
          name="country"
          placeholder="Country"
          by="code"
          value={country}
          onChange={handleCountryChange}
          className="col-span-2"
        >
          {countries.map(countryOption => (
            <ListboxOption key={countryOption.code} value={countryOption}>
              <ListboxLabel>{countryOption.name}</ListboxLabel>
            </ListboxOption>
          ))}
        </Listbox>
      </div>
    </div>
  );
}
