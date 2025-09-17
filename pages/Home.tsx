
import React from 'react';
import { Link } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import ImageCarousel from '../components/ImageCarousel';
import { getImageUrl, WHATSAPP_LINK } from '../constants';


const Home: React.FC = () => {
  const t = useTranslations();

  const whyUsItems = [
    { imageKey: 'why-us-precision', title: t.home_why_us_1_title, text: t.home_why_us_1_text },
    { imageKey: 'why-us-price', title: t.home_why_us_2_title, text: t.home_why_us_2_text },
    { imageKey: 'why-us-service', title: t.home_why_us_3_title, text: t.home_why_us_3_text },
    { imageKey: 'why-us-speed', title: t.home_why_us_4_title, text: t.home_why_us_4_text },
  ];

  const carouselImageKeys = ['home-carousel-1', 'home-carousel-2', 'home-carousel-3', 'home-carousel-4'];
  const carouselDescriptions = [
    t.home_carousel_desc_1,
    t.home_carousel_desc_2,
    t.home_carousel_desc_3,
    t.home_carousel_desc_4
  ];

  const testimonials = [
      { text: t.home_testimonial_1_text, author: t.home_testimonial_1_author },
      { text: t.home_testimonial_2_text, author: t.home_testimonial_2_author },
      { text: t.home_testimonial_3_text, author: t.home_testimonial_3_author },
  ];

  return (
    <div>
  {/* Hero Section */}
  <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(/project-images/tło.jpg)` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in-down">{t.home_hero_title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl animate-fade-in-up">{t.home_hero_subtitle}</p>
          <Link to="/contact" className="mt-8 px-8 py-3 bg-brand-gold text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-transform hover:scale-105 transform">
            {t.home_hero_cta}
          </Link>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">{t.home_why_us_title}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">{t.home_why_us_subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsItems.map((item, index) => (
              <div key={index} className="relative group overflow-hidden text-center p-6 bg-brand-light rounded-lg shadow-md hover:shadow-xl transition-shadow after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <img src={getImageUrl(item.imageKey, 100, 100)} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Realizations Section */}
      <section className="py-20 bg-brand-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">{t.home_realizations_title}</h2>
              <ImageCarousel imageKeys={carouselImageKeys} descriptions={carouselDescriptions} />
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">{t.home_testimonials_title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                      <div key={index} className="relative group overflow-hidden bg-brand-light p-8 rounded-lg shadow-lg after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full">
                          <div className="w-16 h-16 mb-4 rounded-full overflow-hidden shadow-md">
                            <img src={getImageUrl(`testimonial-avatar-${index+1}`, 64, 64)} alt={testimonial.author} className="w-full h-full object-cover"/>
                          </div>
                          <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                          <p className="font-bold text-right text-brand-dark">- {testimonial.author}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-dark text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">{t.home_cta_final_title}</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">{t.home_cta_final_text}</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-brand-gold text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-transform hover:scale-105 transform">
                  {t.cta_whatsapp_now}
              </a>
          </div>
      </section>

    </div>
  );
};

export default Home;
