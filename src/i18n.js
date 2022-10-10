import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import contentCn from './locales/cn/content.json';
import contentDe from './locales/de/content.json';
import contentEn from './locales/en/content.json';
import contentEs from './locales/es/content.json';
import contentFi from './locales/fi/content.json';
import contentFr from './locales/fr/content.json';
import contentId from './locales/id/content.json';
import contentMr from './locales/mr/content.json';
import contentPl from './locales/pl/content.json';
import contentPt from './locales/pt/content.json';
import contentTa from './locales/ta/content.json';
import contentPa from './locales/pa/content.json';
import contentHi from './locales/hi/content.json';
import contentBn from './locales/bn/content.json';
import contentAr from './locales/ar/content.json';
import contentGu from './locales/gu/content.json';
import contentNo from './locales/no/content.json';
import contentKa from './locales/ka/content.json';
import contentTe from './locales/te/content.json';
import contentSv from './locales/sv/content.json';
import contentMl from './locales/ml/content.json';
import contentUk from './locales/uk/content.json';
import contentJp from './locales/jp/content.json';
import contentHe from './locales/he/content.json';
import contentTr from './locales/tr/content.json';

const options = {
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
};

const resources = {
  cn: contentCn,
  de: contentDe,
  en: contentEn,
  es: contentEs,
  fi: contentFi,
  fr: contentFr,
  id: contentId,
  mr: contentMr,
  pl: contentPl,
  pt: contentPt,
  ta: contentTa,
  pa: contentPa,
  hi: contentHi,
  bn: contentBn,
  ar: contentAr,
  gu: contentGu,
  no: contentNo,
  ka: contentKa,
  te: contentTe,
  sv: contentSv,
  ml: contentMl,
  uk: contentUk,
  jp: contentJp,
  he: contentHe,
  tr: contentTr;
};

// Feel free to translate the language name
export const localesList = [
  { locale: 'ar', description: 'Arabic' },
  { locale: 'bn', description: 'Bengali' },
  { locale: 'cn', description: 'Mandarin' },
  { locale: 'de', description: 'German' },
  { locale: 'en', description: 'English' },
  { locale: 'es', description: 'Español' },
  { locale: 'fi', description: 'Finnish' },
  { locale: 'fr', description: 'Français' },
  { locale: 'gu', description: 'Gujarati' },
  { locale: 'he', description: 'Hebrew' },
  { locale: 'hi', description: 'Hindi' },
  { locale: 'id', description: 'Indonesian' },
  { locale: 'jp', description: 'Japanese' },
  { locale: 'ka', description: 'Kannada' },
  { locale: 'ml', description: 'Malayalam' },
  { locale: 'mr', description: 'Marathi' },
  { locale: 'no', description: 'Norsk' },
  { locale: 'pa', description: 'Punjabi' },
  { locale: 'pl', description: 'Polish' },
  { locale: 'pt', description: 'Português' },
  { locale: 'sv', description: 'Swedish' },
  { locale: 'ta', description: 'Tamil' },
  { locale: 'te', description: 'Telugu' },
  { locale: 'tr', description: 'Turkish' },
  { locale: 'uk', description: 'Ukraine' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    detection: options,
    fallbackLng: 'en',
  });

export default i18n;
