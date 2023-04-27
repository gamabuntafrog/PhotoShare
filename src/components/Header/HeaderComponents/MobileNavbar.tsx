import { ICurrentUser } from '../../../types/types'
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import useSx from '../../../hooks/useSx'
import headerStyles, { StyledMenuNavLink } from '../headerStyles'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useShortTranslation from '../../../hooks/useShortTranslation'

interface IMobileNavbarProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  user: ICurrentUser | null
  isLoggedIn: boolean
  exitFromAccount: () => Promise<void>
}

export default function MobileNavbar({
  isOpen,
  openModal,
  closeModal,
  user,
  isLoggedIn,
  exitFromAccount
}: IMobileNavbarProps) {
  const { username, _id: currentUserId } = user || {}

  const theme = useTheme()
  const styles = useSx(headerStyles)
  const isSmallerMobile = useMediaQuery(theme.breakpoints.down('mobile'))

  const t = useShortTranslation({ componentNameKey: 'Header' })

  return (
    <SwipeableDrawer
      // MOBILE NAVBAR
      anchor={isSmallerMobile ? 'bottom' : 'top'}
      open={isOpen}
      onOpen={openModal}
      onClose={closeModal}
      sx={styles.mobileNavbar}
    >
      <Container sx={styles.menuContainer}>
        {user && isLoggedIn ? (
          <>
            <Box sx={styles.mobileAccountContainer}>
              <StyledMenuNavLink
                className="first"
                to={`/users/${currentUserId}`}
                sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
                onClick={closeModal}
              >
                <Avatar sx={{ width: 50, height: 50 }} src={user.avatar.url || ''} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {username}
                </Typography>
              </StyledMenuNavLink>
            </Box>
            <Button
              sx={{ ...styles.mobileNavbarButton, mb: 2 }}
              color="error"
              variant="outlined"
              onClick={exitFromAccount}
            >
              {t('exitButton')}
            </Button>
          </>
        ) : (
          <>
            <StyledMenuNavLink onClick={closeModal} to="/">
              <Typography variant="h6">{t('loginLink')}</Typography>
            </StyledMenuNavLink>
            <StyledMenuNavLink onClick={closeModal} to="/register">
              <Typography variant="h6">{t('registerLink')}</Typography>
            </StyledMenuNavLink>
          </>
        )}
        <StyledMenuNavLink onClick={closeModal} to="/settings">
          <SettingsIcon />
        </StyledMenuNavLink>
        <IconButton sx={styles.mobileNavbarButton} onClick={closeModal} color="error">
          <CloseIcon />
        </IconButton>
      </Container>
    </SwipeableDrawer>
  )
}
