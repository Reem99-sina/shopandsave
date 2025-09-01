import "server-only";

import { createI18nServer } from "next-international/server";

const i18n = createI18nServer({
  en: () => import("./locales/en"),
  ar: () => import("./locales/ar"),
});

const getTranslation = async () => {
  const t = await i18n.getI18n();
  const lang = await i18n.getCurrentLocale();

  return {
    t,
    lang,
    isRTL: lang === "ar",
  };
};

export { getTranslation };
