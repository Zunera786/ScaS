import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageMeta = () => {
  const { t, getCurrentLanguage } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = `${t('home.title')} ${t('home.titleAccent')} - Smart Crop Advisor`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('home.subtitle'));
    }
    
    // Update language attribute
    document.documentElement.lang = getCurrentLanguage().code;
  }, [t, getCurrentLanguage]);

  return null;
};

export default LanguageMeta;