import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import ua from "./languages/ua.json";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './languages/en.json'
import {MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH} from "../validationSchemas";

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en,
            ua
        },
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
            defaultVariables: {
                MIN_PASSWORD_LENGTH,
                MAX_PASSWORD_LENGTH,
                MIN_USERNAME_LENGTH,
                MAX_USERNAME_LENGTH,
            }
        },
        detection: {
            order: ['localStorage'],
            caches: ['localStorage']
        },
    });

// i18n.services.formatter?.add('MIN_PASSWORD_LENGTH', () => String(MIN_PASSWORD_LENGTH))
// i18n.t('MIN_PASSWORD_LENGTH', String(MIN_PASSWORD_LENGTH))
// i18n.setDefaultNamespace({
//     MIN_PASSWORD_LENGTH: String(MIN_PASSWORD_LENGTH)
// })
// i18n.t('Login.passwordMinLengthError', {
//     interpolation: {
//         defaultVariables: {
//             MIN_PASSWORD_LENGTH
//         }
//     }
// })
export default i18n