'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Plus, Minus, ShoppingCart, Truck, Shield, Check, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { pickupPoints, getAvailabilityInfo, PickupPoint } from '@/data/pickupPoints';
import ZipCodePanel from '@/components/ZipCodePanel';
import { useLocation } from '@/context/LocationContext';

const ProductDetailPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState('');
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isLocationSet } = useLocation();

  const product = products.find(p => p.id === parseInt(params.id as string));
  
  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    // Show enhanced toast notification with image and price
    toast({
      title: "Produkt pridaný do košíka",
      description: (
        <div className="flex items-center mt-2">
          <div className="flex-shrink-0 w-16 h-16 bg-white rounded-md overflow-hidden mr-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium">{quantity}x {product.name}</p>
            <p className="text-sm text-white/80 mt-1">Cena: <span className="font-bold">€{(product.price * quantity).toFixed(2)}</span></p>
          </div>
        </div>
      ),
      variant: "success",
      action: (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-white bg-white text-green-600 hover:bg-gray-100 hover:text-green-700 font-medium"
        >
          <Link href="/kosik">
            Prejsť do košíka
          </Link>
        </Button>
      ),
    });
  };

  // Get the selected pickup point object
  const selectedLocation = pickupPoints.find(point => point.id === selectedPickupPoint);

  // Get availability status at the selected location
  const availabilityStatus = selectedPickupPoint ? product.pickupPointAvailability[selectedPickupPoint] : null;
  const availabilityDetails = availabilityStatus ? getAvailabilityInfo(availabilityStatus) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">Domov</Link>
        <span>/</span>
        <Link href="/produkty" className="hover:text-primary">Produkty</Link>
        <span>/</span>
        <Link href={`/produkty/${product.category}`} className="hover:text-primary">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Button variant="outline" size="sm" className="mb-6" asChild>
        <Link href="/produkty">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Späť
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 transition-colors overflow-hidden ${
                  selectedImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">{product.categoryName}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl font-bold text-primary">
                €{product.price.toFixed(2)}
              </div>
              {product.inStock ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Skladom
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Nedostupné
                </Badge>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Pickup Point Selection */}
          {product.inStock && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Odberné miesto:
                </label>
                <Select
                  value={selectedPickupPoint}
                  onValueChange={setSelectedPickupPoint}
                  disabled={pickupPoints.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="w-full" placeholder="Vyberte odberné miesto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {pickupPoints.map(point => {
                        const pointAvailability = product.pickupPointAvailability[point.id];
                        const availInfo = pointAvailability ? getAvailabilityInfo(pointAvailability) : null;
                        return (
                          <SelectItem className={'w-full'} key={point.id} value={point.id}>
                            <div className="flex w-full items-center pr-24">
                              <span className="text-sm">{point.name}</span>
                              <span className={`text-xs ml-4 whitespace-nowrap ${availInfo ? availInfo.color : 'text-red-500'}`}>
                                {availInfo ? availInfo.text : 'Nedostupné'}
                              </span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-600">
                  {selectedPickupPoint
                    ? `Vybrali ste odberné miesto: ${pickupPoints.find(point => point.id === selectedPickupPoint)?.name}`
                    : 'Vyberte si odberné miesto pre dostupnosť'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {selectedPickupPoint && product.pickupPointAvailability[selectedPickupPoint] && product.pickupPointAvailability[selectedPickupPoint] !== 'none' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                {selectedPickupPoint && (
                  <span className={`text-sm ${
                    product.pickupPointAvailability[selectedPickupPoint] && product.pickupPointAvailability[selectedPickupPoint] !== 'none'
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}>
                    {product.pickupPointAvailability[selectedPickupPoint] && product.pickupPointAvailability[selectedPickupPoint] !== 'none'
                      ? getAvailabilityInfo(product.pickupPointAvailability[selectedPickupPoint]).text
                      : 'Nedostupné na tomto odbernom mieste'}
                  </span>
                )}
                {!selectedPickupPoint && (
                  <span className="text-sm text-gray-600">
                    Vyberte si odberné miesto pre zobrazenie dostupnosti
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ZIP Code Panel - Only show if location not set */}
          {!isLocationSet && (
            <div className="border-t border-b border-gray-200 py-6">
              <ZipCodePanel variant="compact" />
            </div>
          )}

          {/* Quantity and Add to Cart */}
          {product.inStock && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Množstvo:
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Pridať do košíka - €{(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="w-4 h-4 text-primary" />
              <span>Doprava do 24h</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-primary" />
              <span>Záruka kvality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technické špecifikácie</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="px-6 py-4 flex justify-between">
                <dt className="font-medium text-gray-900">{key}</dt>
                <dd className="text-gray-600">{value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Súvisiace produkty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/produkt/${relatedProduct.id}`} className="block">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    {relatedProduct.image ? (
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-4xl text-gray-400">📦</div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href={`/produkt/${relatedProduct.id}`} className="hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-primary">
                      €{relatedProduct.price.toFixed(2)}
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/produkt/${relatedProduct.id}`}>
                        Zobraziť
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
