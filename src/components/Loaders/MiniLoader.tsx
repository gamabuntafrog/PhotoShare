import { CircularProgress } from '@mui/material'
import React from 'react'
import StandardHelmet from '../StandardHelmet'

interface IMiniLoaderProps {
  size?: string
  bgOff?: boolean
  withMeta?: boolean
  center?: boolean
}

export default function MiniLoader({ size, withMeta = false, center = false }: IMiniLoaderProps) {
  return (
    <>
      {withMeta && <StandardHelmet keyOfOther="loading" />}
      <CircularProgress sx={center ? { mx: 'auto', display: 'block' } : {}} size={size || '20vw'} />
    </>
  )
}
