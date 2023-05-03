import en from "./assets/i18n/en.json";
import uk from "./assets/i18n/uk.json";
import { createI18n } from "vue-i18n";

if (localStorage.getItem("locale") === null) {
  localStorage.setItem("locale", "uk");
}

export default new createI18n({
  locale: localStorage.getItem("locale"),
  messages: {
    en: en,
    uk: uk,
  },
});
