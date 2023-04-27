import { Alert, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import useSx from '../../hooks/useSx'
import notificationStackStyles from './notificationStackStyles'
import { AppDispatch } from '../../redux/store'
import { pullResponse } from '../../redux/slices/responseNotificationsSlice'

const notificationsCleaner = (dispatch: AppDispatch, notificationsLength: number) => {
  let id: NodeJS.Timer | null = null

  if (notificationsLength) {
    id = setInterval(() => dispatch(pullResponse()), 3000)
  }

  return () => {
    if (id) clearInterval(id)
  }
}

export default function NotificationStack() {
  const notifications = useAppSelector((state) => state.responseNotificationsReducer.notifications)
  const dispatch = useAppDispatch()

  const styles = useSx(notificationStackStyles)

  useEffect(() => notificationsCleaner(dispatch, notifications.length), [notifications.length])

  return (
    <Stack sx={styles.list} spacing={2}>
      {notifications.map(({ message, status, code }, index) => {
        return (
          <Alert key={index} sx={{ alignItems: 'center' }} severity={status}>
            <Typography variant="h6">{message}</Typography>
          </Alert>
        )
      })}
    </Stack>
  )
}
