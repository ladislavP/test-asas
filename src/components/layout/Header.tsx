'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Package,
  Info,
  Phone,
  ChevronDown
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { getTotalItems } = useCart();
  const pathname = usePathname();

  // Removed "Domov" from navigation array
  const navigation = [
    { name: 'O nás', href: '/o-nas', icon: Info },
    { name: 'Kontakt', href: '/kontakt', icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>📧 asas@asas-sk.com</span>
              <span>📞 +421 948 300 481</span>
            </div>
            <div className="hidden md:block">
              <span>Pracujeme pre vás už 16 rokov</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Now using SVG logo from public directory */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/images/ASAS_logo_2025.svg"
              alt="ASAS Stavebniny"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 transition-colors ${
                  isActive(item.href) 
                    ? 'text-primary font-medium' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Products with Categories Dropdown - Improved hover behavior */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 transition-colors ${
                  isActive('/produkty') 
                    ? 'text-primary font-medium' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Produkty</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Extending dropdown to prevent hover gap */}
              <div className="absolute -bottom-5 left-0 right-0 h-5 bg-transparent"></div>
              {/* Categories Dropdown - Full width implementation with better hover */}
              {isCategoriesOpen && (
                <div className="fixed left-0 right-0 top-[100px] z-50 w-screen">
                  <div className="w-full bg-white border border-gray-200 shadow-lg">
                    <div className="container mx-auto py-4 px-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <Link
                          href="/produkty"
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900">Všetky produkty</div>
                          <div className="text-sm text-gray-600">Prehliadnuť celý sortiment</div>
                        </Link>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/produkty/${category.id}`}
                            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-600">{category.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/kosik" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Button variant="outline" size="sm">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">Môj účet</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Products Menu */}
              <div className="px-4 py-2">
                <div className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                  <Package className="w-4 h-4" />
                  <span>Produkty</span>
                </div>
                <div className="ml-6 space-y-1">
                  <Link
                    href="/produkty"
                    className="block py-1 text-sm text-gray-600 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Všetky produkty
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produkty/${category.id}`}
                      className="block py-1 text-sm text-gray-600 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
