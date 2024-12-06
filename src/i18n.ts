import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from "./locale/en.json";
import kaJson from "./locale/ka.json";
import ruJSON from "./locale/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    ENG: { ...enJSON },
    RUS: { ...ruJSON },
    KA: { ...kaJson },
  },
  lng: "ENG",
});
