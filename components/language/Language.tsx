import styles from "./language.module.scss";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { englishDictionary } from "../../config/languages/en";
import { frenchDictionary } from "../../config/languages/fr";
import { ChangeEvent } from "react";
import { getPreferedLanguage } from "../../utils/function/language";

const prefLanguage = getPreferedLanguage() || "en";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: englishDictionary },
    fr: { translation: frenchDictionary },
  },
  lng: prefLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function Language() {
  function languageChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    i18next.changeLanguage(event.target.value);
    document.cookie = `language=${event.target.value}; expires=Tue, 19 Jan 2038 03:14:07 UTC`;
  }

  return (
    <div className={styles.appLanguage}>
      <select
        name="language"
        id=""
        defaultValue={prefLanguage}
        onChange={languageChangeHandler}
      >
        <option value="en">ENG</option>
        <option value="fr">FRA</option>
      </select>
    </div>
  );
}

export default Language;
