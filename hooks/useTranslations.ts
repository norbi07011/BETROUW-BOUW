
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};

export default useTranslations;
