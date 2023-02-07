import {useTranslation} from "react-i18next";


export default function useShortTranslation (componentNameKey: string | void = '') {

    const {t} = useTranslation()

    if (!componentNameKey) {
        return (key: string) => t(key)
    }

    return (key: string) => t(`${componentNameKey}.${key}`)

    // Example: Login.title
}