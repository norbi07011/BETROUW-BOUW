
import React from 'react';
import { Link } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import { getImageUrl, PHONE_NUMBER, WHATSAPP_LINK, BLOG_POST_LINK } from '../constants';
import { ArrowTrendingUpIcon } from '../components/icons';
import ImageCarousel from '../components/ImageCarousel';

const Financing: React.FC = () => {
    const t = useTranslations();

    const processSteps = [
        { imageKey: 'financing-analysis', title: t.financing_step_1_title, text: t.financing_step_1_text },
        { imageKey: 'financing-price', title: t.financing_step_2_title, text: t.financing_step_2_text },
        { imageKey: 'financing-documents', title: t.financing_step_3_title, text: t.financing_step_3_text },
    ];
    
    const subsidyConditions = [
        { imageKey: 'financing-condition-standards', text: t.financing_conditions_item_1 },
        { imageKey: 'financing-condition-owner', text: t.financing_conditions_item_2 },
        { imageKey: 'financing-condition-professional', text: t.financing_conditions_item_3 },
    ];
    
    const maximizationCarouselKeys = ['financing-carousel-1', 'financing-carousel-2', 'financing-carousel-3'];
    const maximizationCarouselDescs = [
        t.project_1_img_1_desc,
        t.project_3_img_4_desc,
        t.project_4_img_2_desc,
    ];

    const windowsCarouselKeys = ['project1_img_3_desc', 'project3_img_2_desc', 'home-carousel-1'];
    const windowsCarouselDescs = [
        t.project_1_img_3_desc,
        t.project_3_img_2_desc,
        t.home_carousel_desc_1,
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-cover bg-center py-24" style={{ backgroundImage: `url(${getImageUrl('financing-hero-bg', 1920, 500)})` }}>
                <div className="absolute inset-0 bg-brand-dark/70"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold">{t.financing_hero_title}</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">{t.financing_hero_subtitle}</p>
                </div>
            </section>

            {/* Step-by-step Process Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark">{t.financing_process_title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative group overflow-hidden bg-white p-8 rounded-xl shadow-lg text-center transition-shadow duration-300 hover:shadow-2xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                                    <img src={getImageUrl(step.imageKey, 100, 100)} alt={step.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-brand-dark">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* ISDE Details Section */}
            <section className="py-20 bg-brand-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-dark">{t.financing_isde_rates_title}</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t.financing_isde_rates_intro}</p>
                    </div>
                    
                    {/* Rates Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-yellow-400 to-brand-gold p-8 rounded-xl shadow-2xl text-white text-center flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
                            <h4 className="text-2xl font-bold mb-2">{t.financing_isde_rates_hr_title}</h4>
                            <p className="text-6xl font-extrabold">111€<span className="text-3xl font-semibold">/m²</span></p>
                            <p className="opacity-80 mt-2">{t.financing_isde_rates_hr_subtitle}</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-brand-dark p-8 rounded-xl shadow-2xl text-white text-center flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
                           <h4 className="text-2xl font-bold mb-2">{t.financing_isde_rates_other_title}</h4>
                           <p className="text-6xl font-extrabold">222€<span className="text-3xl font-semibold">/m²</span></p>
                           <p className="opacity-80 mt-2">{t.financing_isde_rates_other_subtitle}</p>
                        </div>
                    </div>

                    {/* How to Maximize Card */}
                    <div className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2 p-8 md:p-12 order-2 lg:order-1">
                             <div className="bg-brand-gold text-white rounded-full h-16 w-16 flex items-center justify-center mb-6">
                                <ArrowTrendingUpIcon className="h-8 w-8"/>
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-brand-dark">{t.financing_maximize_title}</h3>
                            <p className="text-gray-700 mb-4 text-lg leading-relaxed">{t.financing_maximize_text_1}</p>
                            <p className="text-gray-800 font-semibold text-lg">{t.financing_maximize_text_2}</p>
                        </div>
                         <div className="lg:w-1/2 w-full order-1 lg:order-2">
                           <ImageCarousel imageKeys={maximizationCarouselKeys} descriptions={maximizationCarouselDescs} />
                        </div>
                    </div>

                    {/* Conditions Cards */}
                    <div className="mt-20">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-brand-dark">{t.financing_conditions_title}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             {subsidyConditions.map((item, index) => (
                                <div key={index} className="relative group overflow-hidden bg-white p-8 rounded-xl shadow-lg text-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                                        <img src={getImageUrl(item.imageKey, 100, 100)} alt={item.text.substring(0, 20)} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-lg">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Combined CTA & Blog Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        <div className="lg:col-span-2 bg-brand-dark text-white p-8 md:p-12 rounded-2xl shadow-2xl flex flex-col justify-center text-center">
                             <h3 className="text-3xl font-bold text-brand-gold mb-4">{t.financing_questions_title}</h3>
                            <p className="text-gray-300 mb-8 flex-grow">{t.financing_questions_subtitle}</p>
                            <Link to="/contact" className="w-full mt-auto px-8 py-4 bg-brand-gold text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-transform hover:scale-105 transform">
                                {t.financing_questions_cta}
                            </Link>
                        </div>
                        <div className="lg:col-span-3 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-8 md:p-12">
                                <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.financing_blog_title}</h3>
                            </div>
                            <div className="px-8 md:px-12 pb-8 flex flex-col flex-grow">
                                <div className="bg-gray-100 p-6 rounded-lg flex-grow">
                                    <h4 className="text-xl font-bold text-brand-dark mb-3">{t.financing_blog_article_title}</h4>
                                    <p className="text-gray-600 mb-6">{t.financing_blog_article_intro}</p>
                                    <a href={BLOG_POST_LINK} className="text-brand-gold font-semibold hover:underline">{t.financing_blog_read_more} &rarr;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Final CTA */}
            <section className="bg-brand-dark text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t.financing_final_cta_title}</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto mb-8">{t.financing_final_cta_text}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                         <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-brand-gold text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-transform hover:scale-105 transform">
                            {t.cta_whatsapp}
                        </a>
                         <a href={`tel:${PHONE_NUMBER}`} className="inline-block px-8 py-3 bg-white text-brand-dark font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-transform hover:scale-105 transform">
                            {t.financing_final_cta_phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Financing;
