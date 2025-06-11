'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/data/products';
import { Search, Grid, List } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addToCart } = useCart();

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-primary">Domov</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Produkty</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Všetky produkty</h1>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Hľadať produkty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Všetky kategórie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="name">Názov A-Z</option>
            <option value="price-low">Cena: nízka → vysoká</option>
            <option value="price-high">Cena: vysoká → nízka</option>
          </select>

          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Zobrazených {filteredProducts.length} produktov
        </p>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
                <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>
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
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-6">
                <Link href={`/produkt/${product.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="text-3xl text-gray-400">📦</div>
                    )}
                  </div>
                </Link>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link href={`/produkt/${product.id}`} className="hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      €{product.price.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-4">
                      {!product.inStock && (
                        <Badge variant="destructive">Nedostupné</Badge>
                      )}
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'Do košíka' : 'Nedostupné'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Žiadne produkty sa nenašli
          </h3>
          <p className="text-gray-600">
            Skúste zmeniť vyhľadávacie kritériá alebo kategóriu.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

