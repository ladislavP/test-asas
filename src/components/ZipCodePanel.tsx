'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/context/LocationContext';
import { MapPin, X } from 'lucide-react';

interface ZipCodePanelProps {
  variant?: 'homepage' | 'compact';
  className?: string;
}

const ZipCodePanel = ({ variant = 'homepage', className = '' }: ZipCodePanelProps) => {
  const { setZipCode } = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call to validate ZIP code
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setZipCode(inputValue.trim());
    setInputValue('');
    setIsSubmitting(false);
  };

  const validateZipCode = (value: string) => {
    // Slovak ZIP code format: 123 45 or 12345
    const slovakZipRegex = /^\d{3}\s?\d{2}$/;
    return slovakZipRegex.test(value);
  };

  const formatZipCode = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as XXX XX
    if (digits.length >= 3) {
      return digits.slice(0, 3) + (digits.length > 3 ? ' ' + digits.slice(3, 5) : '');
    }
    return digits;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setInputValue(formatted);
  };

  if (variant === 'homepage') {
    return (
      <div className={`bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-8 ${className}`}>
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Zadajte vaše PSČ
          </h3>
          <p className="text-gray-600">
            Zobrazíme vám dostupnosť produktov a odberné miesta vo vašej oblasti
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="napr. 821 01"
                maxLength={6}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
              />
              {inputValue && !validateZipCode(inputValue) && (
                <p className="text-red-500 text-sm mt-1">
                  Zadajte platné PSČ (napr. 821 01)
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={!inputValue || !validateZipCode(inputValue) || isSubmitting}
              className="px-8"
            >
              {isSubmitting ? 'Overujem...' : 'Potvrdiť'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <MapPin className="w-5 h-5 text-primary" />
        <h4 className="font-semibold text-gray-900">Vaše PSČ</h4>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="napr. 821 01"
          maxLength={6}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!inputValue || !validateZipCode(inputValue) || isSubmitting}
        >
          {isSubmitting ? '...' : 'OK'}
        </Button>
      </form>
    </div>
  );
};

export default ZipCodePanel;
