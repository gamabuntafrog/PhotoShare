import { Theme } from '@mui/material'

const registerStyles = (theme: Theme) => {
  return {
    container: {
      py: 3,
      bgcolor: 'background.default',
      width: '100%'
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      [theme.breakpoints.down('tablet')]: {
        fontSize: 50
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px',
      mx: 'auto',
      padding: 3,
      mt: 2,
      borderRadius: 1,
      [theme.breakpoints.down('mobile')]: {
        padding: 1
      }
    },
    label: { whiteSpace: 'unset' },
    input: { mt: 1, mb: 2 },
    signInLink: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '16px',
      textDecoration: 'underline'
    }
  }
}

export default registerStyles
