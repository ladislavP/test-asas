'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/data/products';
import ZipCodePanel from '@/components/ZipCodePanel';
import { useLocation } from '@/context/LocationContext';

const HomePage = () => {
  const featuredProducts = products.slice(0, 3);
  const { isLocationSet } = useLocation();

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-cover bg-center bg-no-repeat overflow-hidden" 
               style={{ backgroundImage: "url('/images/banner/banner.png')" }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            {/* Text Content Box */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl">
              <div className="text-sm text-gray-600 font-medium mb-4">
                Pracujeme pre vás už 16 rokov
              </div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Kto stavia s nami,{' '}
                <span className="text-primary">odmena ho neminie</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Sieť stavebnín ASAS združuje predajcov stavebnín z celého Slovenska. 
                Vytvárame sieť strategických partnerstiev pre váš úspech.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/produkty">
                    Prehliadnuť produkty
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="/o-nas">
                    Viac o nás
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Additional Info Card */}
            <div className="mt-8 bg-primary/90 backdrop-blur-sm rounded-xl p-6 text-white max-w-md">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏗️</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Vernostný program
                  </h3>
                  <p className="text-white/90 text-sm">
                    V aliancii ASAS vás za vernosť odmeníme
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZIP Code Panel - Only show if location not set */}
      {!isLocationSet && (
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <ZipCodePanel variant="homepage" />
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Naše kategórie produktov
            </h2>
            <p className="text-lg text-gray-600">
              Všetko čo potrebujete pre vašu stavbu na jednom mieste
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600', 
                'from-purple-500 to-purple-600'
              ];
              const icons = ['📦', '🎨', '🚿'];
              
              return (
                <Link
                  key={category.id}
                  href={`/produkty/${category.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                      {icons[index]}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      {category.description}
                    </p>
                    <div className="mt-4 text-center">
                      <span className="text-primary font-medium text-sm group-hover:underline">
                        Zobraziť →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Odporúčané produkty
            </h2>
            <p className="text-lg text-gray-600">
              Najobľúbenejšie produkty našich zákazníkov
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/produkt/${product.id}`} className="block">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <div className="text-6xl text-gray-400">📦</div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link href={`/produkt/${product.id}`} className="hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      €{product.price.toFixed(2)}
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/produkt/${product.id}`}>
                        Zobraziť
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/produkty">
                Zobraziť všetky produkty
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">📅</div>
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-gray-600">Rokov skúseností</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">🏪</div>
              <div className="text-3xl font-bold text-gray-900">25</div>
              <div className="text-gray-600">Predajných miest</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">👥</div>
              <div className="text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Spokojných zákazníkov</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-2">🏆</div>
              <div className="text-3xl font-bold text-gray-900">2000+</div>
              <div className="text-gray-600">Certifikovaných produktov</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

