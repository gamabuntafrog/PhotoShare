import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import StandardHelmet from '../StandardHelmet'

interface IMiniLoaderProps {
  size?: string
  bgOff?: boolean
  withMeta?: boolean
}


export default function MiniLoader({ size, withMeta = false }: IMiniLoaderProps) {
  return (
    <Box sx={{height: (`calc(${size || '20vw'} + 100px)`)}}>
      {withMeta && <StandardHelmet keyOfOther="loading" />}
      <CircularProgress size={size || '20vw'} />
    </Box>
  )
}
