
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';
import { LogoIcon, MenuIcon, CloseIcon } from './icons';
import { WHATSAPP_LINK } from '../constants';

const Header: React.FC = () => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t.nav_home },
    { path: '/offer', label: t.nav_offer },
    { path: '/projects', label: t.nav_projects },
    { path: '/about', label: t.nav_about },
    { path: '/financing', label: t.nav_financing },
    { path: '/blog', label: t.nav_blog },
    { path: '/careers', label: t.nav_careers },
    { path: '/contact', label: t.nav_contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <LogoIcon className="h-10 w-10 text-brand-gold" />
            <span className="font-bold text-xl text-brand-dark hidden sm:block">BETROUW BOUW</span>
          </NavLink>

          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold hover:text-brand-gold transition-colors ${
                    isActive ? 'text-brand-gold' : 'text-gray-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-gold text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all text-sm"
            >
              {t.cta_whatsapp}
            </a>
          </div>

          <div className="lg:hidden flex items-center">
             <LanguageSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4 rtl:mr-4 rtl:ml-0">
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center p-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold hover:text-brand-gold transition-colors ${
                    isActive ? 'text-brand-gold' : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center mt-4 px-4 py-3 bg-brand-gold text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all"
            >
              {t.cta_whatsapp}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;