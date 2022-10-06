/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import contentCn from "./locales/cn/content.json";
import contentDe from "./locales/de/content.json";
import contentEn from "./locales/en/content.json";
import contentEs from "./locales/es/content.json";
import contentFi from "./locales/fi/content.json";
import contentFr from "./locales/fr/content.json";
import contentId from "./locales/id/content.json";
import contentMr from "./locales/mr/content.json";
import contentPl from "./locales/pl/content.json";
import contentPt from "./locales/pt/content.json";
import contentTa from "./locales/ta/content.json";
import contentPa from "./locales/pa/content.json";
import contentHi from "./locales/hi/content.json";
import contentBn from "./locales/bn/content.json";

const options = {
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "sessionStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain",
  ],
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
};

export const resources = {
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
};

// Feel free to translate the language name
export const localesList = [
  { locale: "cn", description: "Mandarin" },
  { locale: "de", description: "German" },
  { locale: "en", description: "English" },
  { locale: "es", description: "Español" },
  { locale: "fi", description: "Finnish" },
  { locale: "fr", description: "Français" },
  { locale: "id", description: "Indonesian" },
  { locale: "mr", description: "Marathi" },
  { locale: "pl", description: "Polish" },
  { locale: "pt", description: "Português" },
  { locale: "ta", description: "Tamil" },
  { locale: "pa", description: "Punjabi" },
  { locale: "hi", description: "Hindi" },
  { locale: "bn", description: "Bengali" },
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
    fallbackLng: "en",
  });

export default i18n;
