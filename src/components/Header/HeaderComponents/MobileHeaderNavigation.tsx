import { ICurrentUser } from '../../../types/types'
import useSx from '../../../hooks/useSx'
import headerStyles, { StyledHeaderNavLink } from '../headerStyles'
import { Avatar, Box, IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import SearchBar from './SearchBar'
import Notifications from './Notifications'

interface IMobileHeaderNavigationProps {
  openModal: () => void
  user: ICurrentUser | null
  isLoggedIn: boolean
}

export default function MobileHeaderNavigation({
  openModal,
  user,
  isLoggedIn
}: IMobileHeaderNavigationProps) {
  const styles = useSx(headerStyles)

  return (
    <Box
      // MOBILE HEADER CONTAINER
      sx={styles.navMobileContainer}
    >
      {user && isLoggedIn && (
        <>
          <SearchBar />
          <StyledHeaderNavLink className="first" to="/post/create">
            <IconButton color="inherit">
              <AddBoxIcon />
            </IconButton>
          </StyledHeaderNavLink>
          <Notifications />
          <StyledHeaderNavLink to={`/users/${user._id}`}>
            <Avatar src={user.avatar.url || ''} />
          </StyledHeaderNavLink>
        </>
      )}
      <IconButton onClick={openModal} color="inherit" sx={styles.openMenuButton}>
        <MenuIcon />
      </IconButton>
    </Box>
  )
}
