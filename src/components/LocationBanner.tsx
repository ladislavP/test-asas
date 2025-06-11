'use client';

import React from 'react';
import { useLocation } from '@/context/LocationContext';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationBanner = () => {
  const { zipCode, clearZipCode, isLocationSet } = useLocation();

  if (!isLocationSet) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <span className="text-green-800 font-medium">
                Vaša lokalita: PSČ {zipCode}
              </span>
              <span className="text-green-600 text-sm ml-2">
                • Zobrazujeme dostupnosť pre vašu oblasť
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearZipCode}
            className="text-green-700 hover:text-green-800 hover:bg-green-100"
          >
            <X className="w-4 h-4" />
            <span className="ml-1 hidden sm:inline">Zmeniť</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationBanner;
