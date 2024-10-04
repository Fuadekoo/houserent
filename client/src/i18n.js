import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: require('./locales/en/translation.json')
      },
      am: {
        translation: require('./locales/am/translation.json')
      }
    },
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
