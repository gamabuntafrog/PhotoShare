import { Theme } from '@mui/material'

const createCollectionModalStyles = (theme: Theme) => {
  return {
    backdrop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    wrapper: {
      bgcolor: 'background.default',
      mx: 2,
      py: 2,
      px: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      borderRadius: 4
    },
    title: {
      color: theme.palette.text.standard,
      textAlign: 'center',
      mx: 'auto',
      my: 2,
      wordBreak: 'break-word'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '90%'
    } as const,
    label: { my: 1 },
    submitButton: { alignSelf: 'end', mt: 2 }
  }
}

export default createCollectionModalStyles
