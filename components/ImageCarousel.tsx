import React, { useState } from 'react';
import { getImageUrl } from '../constants';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import useTranslations from '../hooks/useTranslations';
import { useLanguage } from '../context/LanguageContext';

interface ImageCarouselProps {
  imageKeys: string[];
  descriptions: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageKeys, descriptions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations();
  // FIX: `direction` should come from `useLanguage`, not `useTranslations`.
  const { direction } = useLanguage();


  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageKeys.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === imageKeys.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!imageKeys || imageKeys.length === 0) {
    return <div>{t.carousel_no_images}</div>;
  }

  return (
    <div className="relative w-full aspect-video group">
      <div className="relative h-full rounded-lg overflow-hidden shadow-2xl">
        {imageKeys.map((key, index) => (
          <div
            key={key}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'
            }`}
          >
            <img 
              src={getImageUrl(key, 1200, 800)} 
              alt={descriptions[index] || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
            <h3 className="text-white text-2xl font-bold">{descriptions[currentIndex]}</h3>
        </div>
      </div>
      
      {/* Left Arrow */}
      <button 
        onClick={handlePrev} 
        aria-label={direction === 'rtl' ? t.carousel_next_slide : t.carousel_previous_slide}
        className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 z-30 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100"
      >
        {direction === 'rtl' ? <ChevronRightIcon className="h-6 w-6" /> : <ChevronLeftIcon className="h-6 w-6" />}
      </button>

      {/* Right Arrow */}
      <button 
        onClick={handleNext} 
        aria-label={direction === 'rtl' ? t.carousel_previous_slide : t.carousel_next_slide}
        className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 z-30 w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100"
      >
        {direction === 'rtl' ? <ChevronLeftIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {imageKeys.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${t.carousel_go_to_slide} ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;