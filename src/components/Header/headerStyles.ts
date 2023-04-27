import { styled, Theme } from '@mui/material'
import { NavLink } from 'react-router-dom'

const headerStyles = (theme: Theme) => {
  const { palette, breakpoints } = theme
  const { up, down } = breakpoints
  const { primary, secondary, mode, background } = palette
  const { main, dark, light } = primary

  return {
    header: {
      borderBottom: `15px solid ${main}`,
      padding: 0,
      bgcolor: mode === 'dark' ? 'background.default' : 'background.paper',
      color: 'text.primary',
      zIndex: 1000,
      boxShadow: `0px 10px 30px -14px ${main}`,
      position: 'fixed',
      width: '100%',
      [up('mobile')]: {
        top: 0
      },
      [down('mobile')]: {
        bottom: 0
      }
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      my: 1,
      [down('mobile')]: {
        px: 1
      }
    },
    link: {
      color: theme.palette.text.primary,
      marginLeft: '12px',
      textShadow: `0px 0px 30px ${primary.main}`,
      // filter: 'drop-shadow(-3px 4px 4px var(--primary-500))',
      '&:hover': {
        color: primary.main
      },
      '&.active': {
        color: primary.main
      }
    },
    activeLink: {
      color: primary.main,
      marginLeft: '12px',
      textShadow: `0px 0px 30px ${primary.main}`,
      '&:hover': {
        color: 'green'
      }
    },
    navMobileContainer: {
      ml: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      [up('laptop')]: {
        display: 'none'
      }
    },
    navContainer: {
      marginLeft: 'auto',
      // width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      [down('laptop')]: {
        display: 'none'
      }
    },
    openMenuButton: {
      ml: 1,
      '& svg': {
        width: 30,
        height: 30
      }
    },
    menuContainer: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    mobileNavbar: {
      '& .MuiDrawer-paper': {
        width: '50vw',
        mx: 'auto',
        mt: 5,
        padding: 5,
        background: 'none',
        borderRadius: 4,
        bgcolor: theme.palette.background.default,
        [down('tablet')]: {
          width: '100%',
          borderRadius: '0 0 8px 8px',
          padding: 0,
          py: 2,
          mt: 0
        },
        [down('mobile')]: {
          borderRadius: '16px 16px 0 0'
        }
      }
    },
    mobileAccountContainer: { display: 'flex', alignItems: 'center' },
    mobileNavbarButton: { mt: 2 },
    searchBar: {
      inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(1200)]: {
          width: '100%',
          justifyContent: 'center',
          position: 'fixed',
          top: '10%',
          left: '50%',
          padding: 4,
          borderRadius: 4,
          zIndex: '1000',
          background: theme.palette.background.paper,
          transform: 'translateX(-50%)'
        },
        [theme.breakpoints.down('mobile')]: {
          bottom: '12.5%',
          top: 'unset'
        }
      },
      input: {
        width: '200px',
        mx: 1,
        display: 'flex',
        alignItems: 'center'
      }
    },
    notifications: {
      openMenuButton: {
        '&:hover': {
          color: theme.palette.primary.main
        },
        '&.active': {
          color: theme.palette.primary.main
        }
      },
      menu: {
        '& .MuiPaper-root': {
          maxWidth: '400px'
        },
        [theme.breakpoints.down('tablet')]: {
          '& .MuiPaper-root': {
            maxHeight: '500px',
            maxWidth: '90%',
            width: '90%',
            left: '50% !important',
            transform: 'translateX(-50%) !important'
          },
          '& .MuiList-root': {
            top: '0px !important',
            left: '0px !important',
            width: '100%',
            maxWidth: '100%',
            height: '100%',
            maxHeight: 'none',
            py: 1
          }
        }
      },
      loaderWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 2
      },
      menuItem: {
        whiteSpace: 'normal',
        color: 'inherit'
      },
      menuItemActive: {
        whiteSpace: 'normal',
        color: theme.palette.primary.main
      },
      avatar: {
        position: 'absolute',
        top: '40%',
        left: '40%',
        zIndex: 100,
        width: '30px',
        height: '30px'
      },
      image: { borderRadius: 1 },
      imageWrapper: { position: 'relative', mr: 1 }
    }
  }
}

export const StyledHeaderNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: '12px',
  textShadow: `0px 0px 30px ${theme.palette.primary.main}`,
  [theme.breakpoints.down('mobile')]: {
    marginLeft: theme.spacing(1)
  },
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&.active': {
    color: theme.palette.primary.main
  },
  '&.first': {
    marginLeft: 0
  }
}))

export const StyledMenuNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1),
  display: 'block',
  textShadow: `0px 0px 30px ${theme.palette.primary.main}`,
  // [theme.breakpoints.down('mobile')]: {
  //     marginLeft: theme.spacing(1),
  // },
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&.active': {
    color: theme.palette.primary.main
  },
  '&.first': {
    marginTop: 0
  }
}))

export const StyledHeaderLogo = styled('svg')(({ theme }) => ({
  width: 200,
  height: 50,
  [theme.breakpoints.down('tablet')]: {
    display: 'none'
  },
  filter: `drop-shadow(-3px 4px 4px ${theme.palette.primary.main})`,
  fill: theme.palette.mode === 'dark' ? 'white' : 'black',
  '&:hover': {
    fill: theme.palette.primary.main
  }
}))

export const StyledMobileHeaderLogo = styled(StyledHeaderLogo)(({ theme }) => ({
  [theme.breakpoints.up('tablet')]: {
    display: 'none'
  },
  [theme.breakpoints.down('tablet')]: {
    display: 'block',
    height: 40,
    width: 60
  }
}))

export default headerStyles
