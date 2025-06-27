'use client'

import { useState } from 'react'

export interface AddressData {
  street: string
  city: string
  state: string
  zip: string
}

interface AddressAutocompleteProps {
  value?: string
  onChange?: (value: string) => void
  onAddressSelect?: (address: AddressData) => void
  placeholder?: string
  label?: string
  className?: string
}

export function AddressAutocomplete({
  value = '',
  onChange,
  onAddressSelect,
  placeholder = 'Enter address...',
  label,
  className = ''
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {/* TODO: Add actual address autocomplete functionality */}
    </div>
  )
} 