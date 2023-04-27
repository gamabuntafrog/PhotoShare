import { Avatar, Box, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import React from 'react'
import useSx from '../../../hooks/useSx'
import postItemStyles, { StyledNavLink } from '../postItemStyles'

interface IPostItemTitleProps {
  postId: string
  title: string
  formattedTags: string
  authorId: string
  avatarURL: string | null
  username: string
  showAuthor: boolean
}

export default function PostItemTitle({
  postId,
  title,
  formattedTags,
  authorId,
  avatarURL,
  username,
  showAuthor
}: IPostItemTitleProps) {
  const styles = useSx(postItemStyles)

  return (
    <>
      <Box sx={styles.postItemTitleWrapper}>
        <NavLink to={`/posts/${postId}`}>
          <Typography sx={{ mb: '-4px' }} variant="h6">
            {title}
          </Typography>
          <Typography variant="caption">{formattedTags}</Typography>
        </NavLink>
      </Box>
      {showAuthor && (
        <StyledNavLink to={`/users/${authorId}`}>
          <Avatar sx={styles.authorAvatar} src={avatarURL || ''} />
          <Typography className="username" sx={styles.authorUsername}>
            {username}
          </Typography>
        </StyledNavLink>
      )}
    </>
  )
}
