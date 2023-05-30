import { Theme } from '@mui/material'

const postSavesInfoStyles = (theme: Theme) => {
  return {
    wrapper: {
      ml: 'auto'
    },
    openMenuButton: {
      ml: 'auto',
      color: theme.palette.text.light,
      [theme.breakpoints.down('tablet')]: {
        padding: '2px'
      }
    },
    menuList: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      '& .MuiPaper-root': {
        bgcolor: 'background.paper',
        maxHeight: '300px'
      },
      '& .MuiMenu-list': {
        bgcolor: 'background.paper',
        pt: 1,
        pb: 0,
        [theme.breakpoints.up('laptop')]: {
          py: 0
        }
      }
    },
    menuItem: {
      '&:hover .saveActionButton': {
        display: 'flex'
      },
      bgcolor: 'background.paper',
      position: 'relative'
    },
    menuItemButton: {
      position: 'absolute',
      display: 'flex',
      right: 12,
      [theme.breakpoints.up('laptop')]: { display: 'none', right: 8 }
    },
    staticButtonsWrapper: {
      bgcolor: 'background.paper',
      px: 1,
      py: 1,
      position: 'sticky',
      bottom: '-1px',
      '&:hover': {
        bgcolor: 'background.paper'
      },
    }
  }
}

export default postSavesInfoStyles
