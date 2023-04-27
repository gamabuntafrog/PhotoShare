import { Button, IconButton } from '@mui/material'
import React from 'react'

export default function CustomOpenMenuButton({
  isAnchorEl,
  handleClick,
  children,
  iconButton
}: {
  isAnchorEl: boolean
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  iconButton?: boolean
}) {
  if (iconButton) {
    return (
      <IconButton
        id="basic-button"
        aria-controls={isAnchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isAnchorEl ? 'true' : undefined}
        onClick={handleClick}
        color="primary"
      >
        {children}
      </IconButton>
    )
  }

  return (
    <Button
      variant="contained"
      id="basic-button"
      aria-controls={isAnchorEl ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={isAnchorEl ? 'true' : undefined}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
