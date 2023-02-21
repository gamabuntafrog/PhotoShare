import {
    Avatar,
    Box,
    Button,
    Typography, useTheme
} from "@mui/material";
import {NavLink, Outlet, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import React, {useEffect, useState} from "react";
import useToggleSubscribe from "../../hooks/useToggleSubscribe";
import {ICurrentUser} from "../../types/user";
import useSx from "../../hooks/useSx";
import userProfileStyles from "./userProfileStyles";
import ChangeUserProfile from "./UserProfileComponents/ChangeUserProfile";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import {StyledHeaderNavLink} from "../Header/headerStyles";
import useShortTranslation from "../../hooks/useShortTranslation";
import StandardHelmet from "../StandardHelmet";
import extendedUsersApi from "../../redux/api/extendedUsersApi";


export default function UserProfile() {
    const {id = ''} = useParams<{ id: string }>()!

    const currentUser = useAppSelector(state => state.userReducer.user) as ICurrentUser

    const {data: user, isLoading, error} = extendedUsersApi.useGetUserByIdQuery({id})

    const [isUserUpdating, setIsUserUpdating] = useState(false);
    const [avatarFile, setAvatarFile] = useState<null | string>(null);
    const [isChangingMode, setIsChangingMode] = useState(false);

    const {isSubscribed, toggleSubscribe, subscribersCount} = useToggleSubscribe(id, user?.subscribersCount || 0)

    const styles = useSx(userProfileStyles)

    const t = useShortTranslation({componentNameKey: 'UserProfile'})


    if (isLoading || isUserUpdating) return <FullScreenLoader withMeta/>

    if (!user || error || !currentUser) {
        return (
            <>
                <StandardHelmet keyOfOther='error'/>
                <Box sx={styles.loaderOrErrorWrapper}>
                    <Typography variant='h1'>{t('notFound')}</Typography>
                </Box>
            </>
        )
    }

    const {
        avatar,
        username,
        email,
        createdAt,
        _id: userId,
        subscribesCount,
        postsCount,
        canViewAllowedToViewCollections
    } = user


    const avatarURL = avatar || ''
    const [month, day, year] = new Date(createdAt).toLocaleDateString('en-US').split('/')
    const formattedCreatedAt = [day, month, year].join('.')

    const {_id: currentUserId} = currentUser
    const isProfileOfCurrentUser = currentUserId === userId

    const onToggleSubscribe = () => toggleSubscribe(id, isSubscribed)

    const turnOnChangingMode = () => setIsChangingMode(true)
    const turnOffChangingMode = () => {
        setAvatarFile(null)
        setIsChangingMode(false)
    }


    return (
        <Box>
            <StandardHelmet keyOfTitle='userProfile' options={{username}}/>
            <Box
                sx={styles.wrapper}
            >
                <Avatar sx={styles.avatar} src={avatarFile || avatarURL}/>
                <Box
                    sx={styles.userInfoWrapper}
                >
                    {isChangingMode ?
                        <ChangeUserProfile
                            setIsUserUpdating={setIsUserUpdating}
                            turnOffChangingMode={turnOffChangingMode}
                            setAvatarFile={setAvatarFile}
                        />
                        :
                        <>
                            <Typography variant='h4'>{username}</Typography>
                            <Typography variant='body1'>{email}</Typography>
                            <Box sx={styles.userInfoSecondWrapper}>
                                <Typography sx={styles.infoItem}>{t('postsCount', {postsCount})}</Typography>
                                <Typography sx={styles.infoItem}> {t('subscribesCount', {subscribesCount})}</Typography>
                                <Typography sx={styles.infoItem}>{t('subscribersCount', {subscribersCount})}</Typography>
                            </Box>
                            <Typography>{t('userCreatedAt', {date: formattedCreatedAt})}</Typography>
                        </>
                    }
                    {isProfileOfCurrentUser && !isChangingMode &&
                        <Button onClick={turnOnChangingMode}>
                            {t('changeProfileButton')}
                        </Button>
                    }
                    {!isProfileOfCurrentUser &&
                        <Button
                            variant='outlined'
                            sx={{mt: 1}}
                            onClick={onToggleSubscribe}>
                            {!isSubscribed ? t('subscribeButton') : t('unsubscribeButton')}
                        </Button>
                    }
                    {/*{(!isProfileOfCurrentUser && !isAddUserModalOpen) &&*/}
                    {/*    <Button*/}
                    {/*        variant='outlined'*/}
                    {/*        sx={{mt: 1}}*/}
                    {/*        onClick={openAddAuthorModal}>*/}
                    {/*        Add author to your collection*/}
                    {/*    </Button>*/}
                    {/*}*/}

                </Box>
            </Box>
            <Box sx={styles.navLinksWrapper}>
                <StyledHeaderNavLink className='first' to={``} end>{t('linkToPosts')}</StyledHeaderNavLink>
                <StyledHeaderNavLink to={`collections`}>{t('linkToCollections')}</StyledHeaderNavLink>
                {canViewAllowedToViewCollections && (
                    <StyledHeaderNavLink to={`allowedToView`}>{t('linkToAllowedToView')}</StyledHeaderNavLink>
                )}
            </Box>
            <Box sx={{minHeight: '100vh'}}>
                <Outlet/>
            </Box>
        </Box>
    )
}

