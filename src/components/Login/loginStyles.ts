import { Theme } from '@mui/material'

const background =
  'https://images.unsplash.com/photo-1534484374439-6b8cd79be97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'

const loginStyles = (theme: Theme) => {
  return {
    backdrop: {
      background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
      backgroundPositionY: 'center',
      backgroundSize: 'cover',
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    loginContainer: {
      py: 2,
      width: '90%',
      mx: 'auto',
      bgcolor: 'background.default',
      [theme.breakpoints.down('tablet')]: {
        width: '100%'
      }
    },
    title: { textAlign: 'center', fontWeight: 'bold' },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: 300,
      mx: 'auto',
      padding: 3,
      mt: 2,
      [theme.breakpoints.down('mobile')]: {
        width: 'auto',
        py: 1,
        px: 3
      }
    },
    formInput: { mt: 1, mb: 2 },
    signInButton: { width: '50%', mx: 'auto' },
    signUpLink: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '16px',
      textDecoration: 'underline'
    }
  }
}

export default loginStyles
