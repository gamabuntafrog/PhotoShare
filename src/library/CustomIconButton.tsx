import { IconButton, styled } from '@mui/material'

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main
  }
}))
