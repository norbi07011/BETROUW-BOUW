
import React from 'react';
import { Link } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import { getImageUrl } from '../constants';

interface OfferItemProps {
  title: string;
  description: string;
  imageKey: string;
  ctaText: string;
}

const OfferItem: React.FC<OfferItemProps> = ({ title, description, imageKey, ctaText }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group transition-shadow duration-300 hover:shadow-xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 group-hover:after:w-full">
      <div className="relative h-64">
        <img src={getImageUrl(imageKey, 800, 600)} alt={title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link 
          to="/contact"
          state={{ category: title }}
          className="inline-block px-6 py-2 bg-brand-gold text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};


const Offer: React.FC = () => {
  const t = useTranslations();

  const offerItems = [
    { title: t.offer_windows_title, description: t.offer_windows_text, imageKey: 'offer-windows' },
    { title: t.offer_doors_title, description: t.offer_doors_text, imageKey: 'offer-doors' },
    { title: t.offer_blinds_title, description: t.offer_blinds_text, imageKey: 'offer-blinds' },
    { title: t.offer_facades_title, description: t.offer_facades_text, imageKey: 'offer-facades' },
  ];

  return (
    <div className="bg-brand-light py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4">{t.offer_page_title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.offer_page_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {offerItems.map((item) => (
            <OfferItem
              key={item.title}
              title={item.title}
              description={item.description}
              imageKey={item.imageKey}
              ctaText={t.offer_cta_button}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;
