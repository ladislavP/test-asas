'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';
import ZipCodePanel from '@/components/ZipCodePanel';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isLocationSet } = useLocation();

  const shippingCost = getTotalPrice() >= 50 ? 0 : 5.00;
  const totalWithShipping = getTotalPrice() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl text-gray-300 mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Váš košík je prázdny</h1>
            <p className="text-gray-600 mb-8">
              Pridajte si produkty do košíka a pokračujte v nákupe.
            </p>
            <Button asChild size="lg">
              <Link href="/produkty">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Začať nakupovať
              </Link>
            </Button>
          </div>

          {/* ZIP Code Panel - Only show if location not set */}
          {!isLocationSet && (
            <ZipCodePanel variant="homepage" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nákupný košík</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Položky v košíku ({items.length})
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vyprázdniť košík
            </Button>
          </div>

          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <div className="text-2xl text-gray-400">📦</div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="text-sm text-gray-500">{item.categoryName}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    <Link href={`/produkt/${item.id}`} className="hover:text-primary">
                      {item.name}
                    </Link>
                  </h3>
                  <div className="text-xl font-bold text-primary">
                    €{item.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* ZIP Code Panel - Only show if location not set */}
          {!isLocationSet && (
            <ZipCodePanel variant="compact" />
          )}

          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Súhrn objednávky</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Počet položiek:</span>
                <span className="font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Medzisúčet:</span>
                <span className="font-medium">€{getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Doprava:</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Zadarmo' : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              {getTotalPrice() < 50 && (
                <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                  Pridajte ešte €{(50 - getTotalPrice()).toFixed(2)} pre dopravu zadarmo
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Celkom:</span>
                  <span className="text-primary">€{totalWithShipping.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full mb-4">
              Pokračovať k objednávke
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link href="/produkty">
                Pokračovať v nákupe
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

