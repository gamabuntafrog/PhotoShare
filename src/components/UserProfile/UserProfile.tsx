import {
    Avatar,
    Box,
    Button,
    MenuItem,
    Modal,
    Typography, useTheme
} from "@mui/material";
import {NavLink, Outlet, useMatch, useOutlet, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedUsersApi} from "../../redux/api/rootApi";
import useToggleSubscribe from "../../hooks/useToggleSubscribe";
import {ICurrentUser} from "../../types/user";
import {AddAuthorModal} from "./UserProfileComponents/AddAuthorModal";
import useSx from "../../hooks/useSx";
import userProfileStyles from "./userProfileStyles";
import Collections from "./UserProfileComponents/Collections";
import ChangeUserProfile from "./UserProfileComponents/ChangeUserProfile";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import {StyledHeaderNavLink} from "../Header/headerStyles";


export default function UserProfile() {
    const {id = ''} = useParams<{ id: string }>()!

    const currentUser = useAppSelector(state => state.userReducer.user) as ICurrentUser

    const {data: user, isLoading, error} = extendedUsersApi.useGetUserByIdQuery({id})

    const [isUserUpdating, setIsUserUpdating] = useState(false);
    const [avatarFile, setAvatarFile] = useState<null | string>(null);
    const [isChangingMode, setIsChangingMode] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const {isSubscribed, toggleSubscribe} = useToggleSubscribe(id)

    const styles = useSx(userProfileStyles)

    const match = useMatch('/posts')
    console.log(match)

    if (isLoading || isUserUpdating) return <FullScreenLoader/>

    if (!user || error || !currentUser) {
        return (
            <Box sx={styles.loaderOrErrorWrapper}>
                <Typography variant='h1'>Not Found</Typography>
            </Box>
        )
    }


    const {
        avatar,
        username,
        email,
        createdAt,
        _id: userId,
        subscribesCount,
        subscribersCount,
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

    const closeAddAuthorModal = () => setIsAddUserModalOpen(false)
    const openAddAuthorModal = () => setIsAddUserModalOpen(true)

    return (
        <Box>
            <AddAuthorModal
                isAddUserModalOpen={isAddUserModalOpen}
                closeAddAuthorModal={closeAddAuthorModal}
                authorId={id}
            />
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
                                <Typography sx={styles.infoItem}>{postsCount} posts</Typography>
                                <Typography sx={styles.infoItem}>{subscribesCount} subscribes</Typography>
                                <Typography sx={styles.infoItem}>{subscribersCount} subscribers</Typography>
                            </Box>
                            <Typography>Created at {formattedCreatedAt}</Typography>
                        </>
                    }
                    {isProfileOfCurrentUser && !isChangingMode &&
                        <Button onClick={turnOnChangingMode}>
                            Change profile
                        </Button>
                    }
                    {!isProfileOfCurrentUser &&
                        <Button
                            variant='outlined'
                            sx={{mt: 1}}
                            onClick={onToggleSubscribe}>
                            {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                        </Button>
                    }
                    {(!isProfileOfCurrentUser && !isAddUserModalOpen) &&
                        <Button
                            variant='outlined'
                            sx={{mt: 1}}
                            onClick={openAddAuthorModal}>
                            Add author to your collection
                        </Button>
                    }

                </Box>
            </Box>
            <Box sx={{padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px'}}>
                <StyledHeaderNavLink className='first' to={`posts`}>POSTS</StyledHeaderNavLink>
                <StyledHeaderNavLink sx={{ml: 3}} to={`collections`}>COLLECTIONS</StyledHeaderNavLink>
                {canViewAllowedToViewCollections && (
                    <StyledHeaderNavLink sx={{ml: 3}} to={`allowedToView`}>ALLOWED TO VIEW</StyledHeaderNavLink>
                )}
            </Box>
            <Outlet/>
        </Box>
    )
}

