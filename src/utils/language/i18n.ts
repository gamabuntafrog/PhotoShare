import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import ua from "./languages/ua.json";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './languages/en.json'
import {
    MAX_BODY_LENGTH, MAX_COLLECTION_TITLE_LENGTH,
    MAX_PASSWORD_LENGTH, MAX_POST_TITLE_LENGTH, MAX_TAG_LENGTH,
    MAX_USERNAME_LENGTH, MIN_BODY_LENGTH, MIN_COLLECTION_TITLE_LENGTH,
    MIN_PASSWORD_LENGTH, MIN_POST_TITLE_LENGTH, MIN_TAG_LENGTH,
    MIN_USERNAME_LENGTH
} from "../validationSchemas";

const languages = ['uk', 'en-US']

const defaultLanguage = localStorage.getItem('i18nextLng') || languages.find((lang) => lang === window.navigator.language) || 'en-US'

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            'en-US': en,
            'uk': ua
        },
        fallbackLng: defaultLanguage,
        debug: true,
        interpolation: {
            escapeValue: false,
            defaultVariables: {
                // for forms validation
                MIN_PASSWORD_LENGTH,
                MAX_PASSWORD_LENGTH,
                MIN_USERNAME_LENGTH,
                MAX_USERNAME_LENGTH,
                MAX_COLLECTION_TITLE_LENGTH,
                MIN_COLLECTION_TITLE_LENGTH,
                MIN_POST_TITLE_LENGTH,
                MAX_POST_TITLE_LENGTH,
                MIN_BODY_LENGTH,
                MAX_BODY_LENGTH,
                MIN_TAG_LENGTH,
                MAX_TAG_LENGTH,
            }
        },
        detection: {
            order: ['localStorage'],
            caches: ['localStorage']
        },
    });


export default i18n