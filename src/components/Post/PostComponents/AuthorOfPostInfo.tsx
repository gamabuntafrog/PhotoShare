import useToggleSubscribe from "../../../hooks/useToggleSubscribe";
import useShortTranslation from "../../../hooks/useShortTranslation";
import useSx from "../../../hooks/useSx";
import postStyles from "../postStyles";
import {Avatar, Box, Button, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";

interface IAuthorOfPostInfoProps {
    authorId: string,
    avatarURL: string | null,
    username: string,
    subscribersCount: number,
    isUserAuthorOfPost: boolean,
}

export default function AuthorOfPostInfo(
    {
        authorId,
        avatarURL,
        username,
        subscribersCount: initSubscribersCount,
        isUserAuthorOfPost,
    }: IAuthorOfPostInfoProps) {

    const {toggleSubscribe, isSubscribed, subscribersCount} = useToggleSubscribe(authorId, initSubscribersCount)
    const onToggleSubscribe = () => toggleSubscribe(authorId, isSubscribed)

    const t = useShortTranslation({componentNameKey: 'Post'})

    const userActionsButton = isSubscribed ? t('unsubscribeButton') : t('subscribeButton')

    const {authorInfo: styles} = useSx(postStyles)


    return (
        <Box
            sx={styles.container}
        >
            <NavLink
                style={styles.wrapper}
                to={`/users/${authorId}`}>
                <Avatar sx={styles.avatar} src={avatarURL as string}/>
                <Box
                    sx={styles.userInfoWrapper}
                >
                    <Typography variant='h6'>{username}</Typography>
                    <Typography variant='caption'>{t('subscribersCount', {subscribersCount})}</Typography>
                </Box>
            </NavLink>
            {!isUserAuthorOfPost && <Button
                sx={styles.subscribeButton}
                variant='contained'
                onClick={onToggleSubscribe}
            >
                {userActionsButton}
            </Button>}
        </Box>
    )
}