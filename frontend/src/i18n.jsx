import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  ar: {
    translation: {
      "Welcome to React": "مرحب بك في الموقع"
    }
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "ar",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;