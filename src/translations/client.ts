import { createI18nClient } from "next-international/client";

const i18n = createI18nClient({
  en: () => import("./locales/en"),
  ar: () => import("./locales/ar"),
});

const useTranslation = () => {
  const t = i18n.useI18n();
  const lang = i18n.useCurrentLocale();

  return {
    t,
    lang,
    isRTL: lang === "ar",
    changeLanguage: i18n.useChangeLocale(),
  };
};

const I18nProviderClient = i18n.I18nProviderClient;

export { I18nProviderClient, useTranslation };
