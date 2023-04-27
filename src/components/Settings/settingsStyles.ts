import { Theme } from '@mui/material'

const settingsStyles = (theme: Theme) => {
  return {
    container: {
      minHeight: '90vh',
      pt: 4,
      pb: 2
    },
    title: {
      fontWeight: '600',
      textAlign: 'center',
      [theme.breakpoints.down('laptop')]: {
        fontSize: 55
      },
      [theme.breakpoints.down('tablet')]: {
        fontSize: 40
      },
      [theme.breakpoints.down('mobile')]: {
        fontSize: 30
      }
    },
    wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 },
    colorModeButton: { my: 2, color: 'primary.main' },
    colorsList: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    colorItem: { width: 'auto' },
    colorButton: (color: string) => {
      return { bgcolor: `${color} !important` }
    }
  }
}

export default settingsStyles
