'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CategoryPage = () => {
  const params = useParams();
  const { addToCart } = useCart();
  const category = categories.find(cat => cat.id === params.category);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(product => product.category === params.category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">Domov</Link>
        <span>/</span>
        <Link href="/produkty" className="hover:text-primary">Produkty</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
        <p className="text-lg text-gray-600">{category.description}</p>
      </div>

      {/* Subcategories */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Podkategórie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2">{subcategory.name}</h3>
                <p className="text-sm text-gray-600">{subcategory.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Produkty ({categoryProducts.length})
        </h2>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">        {categoryProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/produkt/${product.id}`} className="block">
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative hover:bg-gray-50 transition-colors">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-6xl text-gray-400">📦</div>
                )}
                {!product.inStock && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    Nedostupné
                  </Badge>
                )}
              </div>
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                <Link href={`/produkt/${product.id}`} className="hover:text-primary transition-colors">
                  {product.name}
                </Link>
              </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-primary">
                    €{product.price.toFixed(2)}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Do košíka' : 'Nedostupné'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Žiadne produkty v tejto kategórii
          </h3>
          <p className="text-gray-600 mb-6">
            Produkty v kategórii {category.name} budú čoskoro dostupné.
          </p>
          <Button asChild variant="outline">
            <Link href="/produkty">
              Prehliadnuť všetky produkty
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
