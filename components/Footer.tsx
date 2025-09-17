
import React from 'react';
import useTranslations from '../hooks/useTranslations';
import { LogoIcon, PhoneIcon, MailIcon, WhatsAppIcon } from './icons';
import { PHONE_NUMBER, EMAIL_ADDRESS, WHATSAPP_LINK } from '../constants';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const t = useTranslations();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <LogoIcon className="h-12 w-12 text-brand-gold" />
              <span className="font-bold text-2xl">BETROUW BOUW</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">{t.footer_tagline}</p>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg text-brand-gold mb-4">{t.footer_quick_links}</h3>
            <ul className="space-y-2">
              <li><NavLink to="/offer" className="hover:text-brand-gold transition-colors">{t.nav_offer}</NavLink></li>
              <li><NavLink to="/projects" className="hover:text-brand-gold transition-colors">{t.nav_projects}</NavLink></li>
              <li><NavLink to="/about" className="hover:text-brand-gold transition-colors">{t.nav_about}</NavLink></li>
              <li><NavLink to="/financing" className="hover:text-brand-gold transition-colors">{t.nav_financing}</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-brand-gold transition-colors">{t.nav_blog}</NavLink></li>
              <li><NavLink to="/careers" className="hover:text-brand-gold transition-colors">{t.nav_careers}</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-brand-gold transition-colors">{t.nav_contact}</NavLink></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
             <h3 className="font-bold text-lg text-brand-gold mb-4">{t.footer_our_offer}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t.offer_windows_title}</li>
              <li>{t.offer_doors_title}</li>
              <li>{t.offer_blinds_title}</li>
              <li>{t.offer_facades_title}</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg text-brand-gold mb-4">{t.footer_contact_us}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-brand-gold">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold" />
                <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-brand-gold">{EMAIL_ADDRESS}</a>
              </li>
               <li className="flex items-center">
                <WhatsAppIcon className="h-5 w-5 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">{t.contact_on_whatsapp}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BETROUW BOUW B.V. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;