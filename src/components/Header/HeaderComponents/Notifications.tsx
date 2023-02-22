import useAnchorEl from "../../../hooks/useAnchorEl";
import extendedUsersApi from "../../../redux/api/extendedUsersApi";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, IconButton, ListItemAvatar, ListItemText, Theme, Typography, useTheme} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StyledCustomMenu from "../../../library/CustomMenu/StyledCustomMenu";
import MiniLoader from "../../Loaders/MiniLoader";
import StyledCustomMenuItem from "../../../library/CustomMenu/StyledCustomMenuItem";
import React, {useEffect} from "react";
import extendedNotificationsApi from "../../../redux/api/extendedNotificationsApi";
import useSx from "../../../hooks/useSx";

const notificationsStyles = (theme: Theme) => {


    return {
        openMenuButton: {
            '&:hover': {
                color: theme.palette.primary.main
            },
            '&.active': {
                color: theme.palette.primary.main
            },
        },
        menu: {
            '& .MuiPaper-root': {
                maxWidth: '400px'
            },
            [theme.breakpoints.down('tablet')]: {
                '& .MuiPaper-root': {
                    maxHeight: '500px',
                    maxWidth: '90%',
                    width: '90%',
                    left: '50% !important',
                    transform: 'translateX(-50%) !important'
                    // minHeight: isLoading ? '0px' : 'auto'
                },
                '& .MuiList-root': {
                    top: '0px !important',
                    left: '0px !important',
                    width: '100%',
                    maxWidth: '100%',
                    height: '100%',
                    maxHeight: 'none',
                    py: 1
                }
            }
        },
        loaderWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: 2
        },
        menuItem: {
            whiteSpace: 'normal',
            color: 'inherit'
        },
        menuItemActive: {
            whiteSpace: 'normal',
            color: theme.palette.primary.main
        },
        avatar: {
            position: 'absolute',
            top: '40%',
            left: '40%',
            zIndex: 100,
            width: '30px',
            height: '30px'
        },
        image: {borderRadius: 1},
        imageWrapper: {position: 'relative'}
    }
}

function Notification() {

}

export default function Notifications() {
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    const {
        data: notifications = [],
        isLoading,
        isError
    } = extendedNotificationsApi.useGetNotificationsQuery(undefined, {pollingInterval: 5000})
    const [checkNotifications] = extendedNotificationsApi.useCheckNotificationsMutation()

    const isThereNonChecked = notifications.some(({checked}) => checked === false)

    console.log(notifications)

    useEffect(() => {
        if (!isAnchorEl) return
        if (!isThereNonChecked) return

        checkNotifications()
    }, [isAnchorEl]);

    const navigate = useNavigate()

    const styles = useSx(notificationsStyles)

    return (
        <Box>
            <IconButton
                id="basic-button"
                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAnchorEl ? 'true' : undefined}
                onClick={handleClick}
                color={isThereNonChecked ? 'primary' : 'standard'}
                sx={styles.openMenuButton}
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
                sx={styles.menu}
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
                        <Box sx={styles.loaderWrapper}>
                            <MiniLoader size='80%'/>
                        </Box>
                    )
                    :
                    notifications.map((notification) => {
                        const {user, type, post, collection, checked} = notification

                        const userId = user._id
                        const username = user?.username || userId
                        const avatarURL = user?.avatarURL || ''
                        const menuItemStyle = checked ? styles.menuItem : styles.menuItemActive

                        if (type === 'subscribe') {
                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/users/${userId}`)
                                        handleClose()
                                    }}
                                    sx={menuItemStyle}
                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
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
                                    sx={menuItemStyle}

                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
                                        <Avatar src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} unsubscribed from you
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }
                        if (type === 'likePost' || type === 'unlikePost') {
                            if (!post) return null

                            const postId = post._id
                            const imageURL = post?.image || ''

                            const message = type === 'likePost' ? `${username} liked your post` : `${username} remove like from your post`

                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/posts/${postId}`)
                                        handleClose()
                                    }}
                                    sx={menuItemStyle}
                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
                                        <Avatar sx={styles.image} src={imageURL}/>
                                        <Avatar sx={styles.avatar} src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {message}
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }

                        if (type === 'savePost') {
                            if (!post) return null

                            const postId = post._id
                            const imageURL = post?.image || ''
                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/posts/${postId}`)
                                        handleClose()
                                    }}
                                    sx={menuItemStyle}
                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
                                        <Avatar sx={styles.image} src={imageURL}/>
                                        <Avatar sx={styles.avatar} src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} saved your post
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }

                        if (type === 'addUserToCollection' || type === 'deleteUserFromCollection') {
                            if (!collection) return null

                            const collectionId = collection._id
                            const collectionTitle = collection?.title || collection._id

                            const message = type === 'addUserToCollection' ? `${username} added you to collection ${collectionTitle}` : `${username} deleted you from collection ${collectionTitle}`

                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/collections/${collectionId}`)
                                        handleClose()
                                    }}
                                    sx={menuItemStyle}

                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
                                        <Avatar src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {message}
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }

                        if (type === 'changeUserRoleInCollection') {
                            if (!collection) return null

                            const collectionId = collection._id
                            const collectionTitle = collection?.title || collection._id

                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/collections/${collectionId}`)
                                        handleClose()
                                    }}
                                    sx={menuItemStyle}

                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
                                        <Avatar src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {username} changed your role in collection {collectionTitle}
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }

                        if (type === 'acceptJoinToCollectionRequest' || type === 'declineJoinToCollectionRequest') {
                            if (!collection) return null

                            const collectionId = collection._id
                            const collectionTitle = collection?.title || collection._id

                            const message = type === 'acceptJoinToCollectionRequest' ? `${username} accept your request to join to collection ${collectionTitle}` : `${username} decline your request to join to collection ${collectionTitle}`

                            return (
                                <StyledCustomMenuItem
                                    onClick={() => {
                                        navigate(`/collections/${collectionId}`)
                                        handleClose()
                                    }}
                                    sx={menuItemStyle}
                                >
                                    <ListItemAvatar sx={styles.imageWrapper}>
                                        <Avatar src={avatarURL}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {message}
                                    </ListItemText>
                                </StyledCustomMenuItem>
                            )
                        }


                        return null
                    })
                }
            </StyledCustomMenu>

        </Box>
    )
}