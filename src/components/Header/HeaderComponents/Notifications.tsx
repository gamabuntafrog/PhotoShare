import useAnchorEl from "../../../hooks/useAnchorEl";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, IconButton, ListItemAvatar, ListItemText, Theme, Typography, useTheme} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StyledCustomMenu from "../../../library/CustomMenu/StyledCustomMenu";
import MiniLoader from "../../Loaders/MiniLoader";
import StyledCustomMenuItem from "../../../library/CustomMenu/StyledCustomMenuItem";
import React, {useEffect} from "react";
import extendedNotificationsApi from "../../../redux/api/extendedNotificationsApi";
import useSx from "../../../hooks/useSx";
import {INotification} from "../../../types/user";
import headerStyles from "../headerStyles";
import useShortTranslation from "../../../hooks/useShortTranslation";

const longPollingInterval = (process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 60000 : 15000

export interface INotificationProps {
    notification: INotification,
    handleClose: () => void
}

function Notification({notification, handleClose}: INotificationProps) {
    const {notifications: styles} = useSx(headerStyles)

    const {user, type, post, collection, checked, comment} = notification

    const userId = user._id
    const username = user?.username || userId
    const avatarURL = user?.avatarURL || ''
    const menuItemStyle = checked ? styles.menuItem : styles.menuItemActive

    const navigate = useNavigate()

    const t = useShortTranslation({componentNameKey: 'Header.Notifications'})

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
                    {t('subscribed', {username})}
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
                    {t('unsubscribed', {username})}
                </ListItemText>
            </StyledCustomMenuItem>
        )
    }
    if (type === 'likePost' || type === 'unlikePost') {
        if (!post) return null

        const postId = post._id
        const imageURL = post?.image || ''

        const message = type === 'likePost' ? t('likedPost', {username}) : t('unlikedPost', {username})

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
                    {t('savedPost', {username})}
                </ListItemText>
            </StyledCustomMenuItem>
        )
    }

    if (type === 'addUserToCollection' || type === 'deleteUserFromCollection') {
        if (!collection) return null

        const collectionId = collection._id
        const collectionTitle = collection?.title || collection._id

        const message = type === 'addUserToCollection' ? t('addedUserToCollection', {
            username,
            collectionTitle
        }) : t('deleteUserFromCollection', {username, collectionTitle})

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
                    {t('changedUserRoleInCollection', {username, collectionTitle})}
                </ListItemText>
            </StyledCustomMenuItem>
        )
    }

    if (type === 'acceptJoinToCollectionRequest' || type === 'declineJoinToCollectionRequest') {
        if (!collection) return null

        const collectionId = collection._id
        const collectionTitle = collection?.title || collection._id

        const message = type === 'acceptJoinToCollectionRequest' ? t('acceptedJoinToCollectionRequest', {
            username,
            collectionTitle
        }) : t('declinedJoinToCollectionRequest', {username, collectionTitle})

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

    if (type === 'addCommentToPost') {
        if (!post) return null
        if (!comment) return null

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
                    {t('addCommentToPost', {username, text: comment.text})}
                </ListItemText>
            </StyledCustomMenuItem>
        )
    }

    if (type === 'addReplyToComment') {
        if (!post) return null
        if (!comment) return null

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
                    {t('addReplyToComment', {username, text: comment.text})}
                </ListItemText>
            </StyledCustomMenuItem>
        )
    }

    return null
}

export default function Notifications() {
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    const {
        data: notifications = [],
        isLoading,
        isError
    } = extendedNotificationsApi.useGetNotificationsQuery(undefined, {pollingInterval: longPollingInterval})
    const [checkNotifications] = extendedNotificationsApi.useCheckNotificationsMutation()

    const isThereNonChecked = notifications.some(({checked}) => checked === false)

    // console.log(notifications)

    useEffect(() => {
        if (!isAnchorEl) return
        if (!isThereNonChecked) return

        checkNotifications()
    }, [isAnchorEl]);

    const {notifications: styles} = useSx(headerStyles)

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
                    isError ?
                        null
                        :
                        notifications.map((notification, index) =>
                            <Notification
                                key={index}
                                notification={notification}
                                handleClose={handleClose}
                            />
                        )
                }
            </StyledCustomMenu>

        </Box>
    )
}