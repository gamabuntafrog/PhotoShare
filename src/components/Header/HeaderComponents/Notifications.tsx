import useAnchorEl from "../../../hooks/useAnchorEl";
import extendedUsersApi from "../../../redux/api/extendedUsersApi";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, IconButton, ListItemAvatar, ListItemText, Typography, useTheme} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StyledCustomMenu from "../../../library/CustomMenu/StyledCustomMenu";
import MiniLoader from "../../Loaders/MiniLoader";
import StyledCustomMenuItem from "../../../library/CustomMenu/StyledCustomMenuItem";
import React, {useEffect} from "react";
import extendedNotificationsApi from "../../../redux/api/extendedNotificationsApi";

function Notification() {

}

export default function Notifications() {
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    const {
        data: notifications = [],
        isLoading,
        isError
    } = extendedNotificationsApi.useGetNotificationsQuery(undefined, {pollingInterval: 5000})

    const isThereNonChecked = notifications.some(({checked}) => checked === false)

    // console.log(notifications)

    useEffect(() => {
        if (!isAnchorEl) return
        if (!isThereNonChecked) return

        // makeAllChecked
    }, [isAnchorEl]);


    const navigate = useNavigate()
    const theme = useTheme()


    return (
        <Box>
            <IconButton
                id="basic-button"
                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAnchorEl ? 'true' : undefined}
                onClick={handleClick}
                color={isThereNonChecked ? 'primary' : 'standard'}
                sx={{
                    '&:hover': {
                        color: theme.palette.primary.main
                    },
                    '&.active': {
                        color: theme.palette.primary.main
                    },
                }}
            >
                <NotificationsIcon/>
            </IconButton>
            <StyledCustomMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isAnchorEl}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        maxWidth: '300px',
                        maxHeight: '300px',
                        minHeight: isLoading ? '0px' : 'auto'
                    }
                }}
            >
                {(isError || notifications.length === 0) && (
                    <StyledCustomMenuItem
                        onClick={handleClose}
                    >
                        <ListItemText>
                            List is clear
                        </ListItemText>
                    </StyledCustomMenuItem>
                )}
                {(isLoading) ?
                    (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            padding: 2
                        }}>
                            <MiniLoader size='80%'/>
                        </Box>
                    )
                    :
                    notifications.map((notification) => {
                        const {user, type, post, checked} = notification

                        const userId = user._id
                        const username = user?.username || userId
                        const avatarURL = user?.avatarURL || ''
                        const textColor = checked ? 'inherit' : 'theme.palette.primary.main'

                        if (type === 'subscribe') {
                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/users/${userId}`)
                                        handleClose()
                                    }}
                                    sx={{
                                        whiteSpace: 'normal',
                                        color: textColor
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} subscribed on you
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }

                        if (type === 'unsubscribe') {
                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/users/${userId}`)
                                        handleClose()
                                    }}
                                    sx={{
                                        whiteSpace: 'normal',
                                        color: textColor

                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} unsubscribed from you
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }
                        if (type === 'likePost') {
                            const postId = post._id
                            const imageURL = post?.image || ''
                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/posts/${postId}`)
                                        handleClose()
                                    }}
                                    sx={{
                                        whiteSpace: 'normal',
                                        color: textColor
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{borderRadius: 1}} src={imageURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} liked your post
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }
                        if (type === 'unlikePost') {
                            const postId = post._id
                            const imageURL = post?.image || ''
                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/posts/${postId}`)
                                        handleClose()
                                    }}
                                    sx={{
                                        whiteSpace: 'normal',
                                        color: textColor

                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{borderRadius: 1}} src={imageURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} remove like from your post
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }
                        return <StyledCustomMenuItem></StyledCustomMenuItem>
                    })
                }
            </StyledCustomMenu>

        </Box>
    )
}