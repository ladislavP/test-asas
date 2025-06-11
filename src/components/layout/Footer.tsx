import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/products';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="text-white font-bold">🏠</div>
              </div>
              <div>
                <div className="font-bold text-lg text-primary">ASAS</div>
                <div className="text-xs text-gray-400">STAVEBNINY</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Sieť stavebnín ASAS združuje od roku 2009 predajcov stavebnín z celého Slovenska. 
              Vytvárame sieť strategických partnerstiev pre váš úspech.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Rýchle odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produkty" className="text-gray-300 hover:text-primary transition-colors">
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-gray-300 hover:text-primary transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-300 hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/vernostny-program" className="text-gray-300 hover:text-primary transition-colors">
                  Vernostný program
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kategórie</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/produkty/${category.id}`} 
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>asas@asas-sk.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+421 948 300 481</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>Slovensko</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ASAS Stavebniny. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

