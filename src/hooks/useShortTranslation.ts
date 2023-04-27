import { useTranslation } from 'react-i18next'

export default function useShortTranslation({
  componentNameKey = ''
}: {
  componentNameKey: string | void
}) {
  const { t } = useTranslation()

  if (!componentNameKey) {
    return (key: string, options?: object) => t(key, options || {})
  }

  return (key: string, options?: object) => t(`${componentNameKey}.${key}`, options || {})

  // Example: Login.title
}
