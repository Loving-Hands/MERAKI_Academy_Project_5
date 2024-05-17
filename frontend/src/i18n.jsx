import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Search": "Search",
      "Login": "Login",
      "Register": "Register",
      "Contact Us": "Contact Us",
      "Clinics": "Clinics",
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  ar: {
    translation: {
      "Search": "بحث",
      "Login": "تسجيل الدخول",
      "Register": "التسجيل",
      "Contact Us": "اتصل بنا",
      "Clinics": "العيادات",
      "Welcome to React": "مرحب بك في الموقع"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", // يمكنك تغيير اللغة الافتراضية هنا
    interpolation: {
      escapeValue: false // react بالفعل آمن من XSS
    }
  });

export default i18n;
