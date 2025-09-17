
import React from 'react';
import useTranslations from '../hooks/useTranslations';
import { getImageUrl } from '../constants';

const About: React.FC = () => {
  const t = useTranslations();

  const values = [
      { imageKey: 'values-reliability', title: t.about_value_1 },
      { imageKey: 'values-precision', title: t.about_value_2 },
      { imageKey: 'values-price', title: t.about_value_3 },
      { imageKey: 'values-satisfaction', title: t.about_value_4 },
  ];

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="relative bg-brand-dark text-white py-24 text-center">
        <div className="absolute inset-0 opacity-10">
            <img src={getImageUrl('about-bg', 1920, 400)} className="w-full h-full object-cover" alt="Architectural background"/>
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-brand-gold">{t.about_header_title}</h1>
          <p className="mt-4 text-xl text-gray-300">{t.about_header_subtitle}</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">{t.about_main_title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{t.about_main_text_1}</p>
            <p className="text-gray-700 leading-relaxed font-semibold">{t.about_main_text_2}</p>
            <p className="mt-6 text-brand-gold font-bold text-lg">{t.about_main_highlight}</p>
          </div>
          <div className="w-full h-96 rounded-lg shadow-2xl overflow-hidden">
            <img src={"/project-images/o%20nas%20.jpg"} alt={t.about_team_alt} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="bg-brand-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">{t.about_values_title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                    <div key={index} className="relative group overflow-hidden flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full">
                        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden shadow-lg">
                            <img src={getImageUrl(value.imageKey, 100, 100)} alt={value.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-semibold text-brand-dark">{value.title}</h3>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
