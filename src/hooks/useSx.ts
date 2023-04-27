import { Theme, useTheme } from '@mui/material'

const useSx = <T>(getStyles: (theme: Theme) => T) => {
  const theme = useTheme()

  return getStyles(theme)
}

export default useSx
