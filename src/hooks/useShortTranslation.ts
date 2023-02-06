import {useTranslation} from "react-i18next";


export default function useShortTranslation (main: string) {

    const {t: translate} = useTranslation()

    return (key: string) => translate(`${main}.${key}`)
}