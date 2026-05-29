import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import frTranslations from './fr.json';

// Simple browser language detection with persistence support
let defaultLanguage = 'en';

if (typeof window !== 'undefined') {
  const savedLanguage = window.localStorage.getItem('language');
  if (savedLanguage === 'en' || savedLanguage === 'fr') {
    defaultLanguage = savedLanguage;
  } else {
    const browserLang = window.navigator.language || (window.navigator as any).userLanguage;
    if (browserLang && browserLang.toLowerCase().startsWith('fr')) {
      defaultLanguage = 'fr';
    }
    window.localStorage.setItem('language', defaultLanguage);
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations }
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values to prevent XSS
    },
    react: {
      useSuspense: false // Prevents suspense loading states causing SSR hydration issues
    }
  });

export default i18n;
export type { enTranslations };
