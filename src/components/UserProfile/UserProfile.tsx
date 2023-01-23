import {
    Avatar,
    Box,
    Button,
    MenuItem,
    Modal,
    Typography, useTheme
} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import React, { useEffect, useState} from "react";
import {extendedCollectionsApi, extendedUsersApi} from "../../redux/api/rootApi";
import useToggleSubscribe from "../../hooks/useToggleSubscribe";
import Collections from "../Collections";
import ChangeUserProfile from "../ChangeUserProfile";
import {ICurrentUser} from "../../types/user";
import MiniLoader from "../Loaders/MiniLoader";


interface IFormData {
    imageList: FileList,
    username: string
}

interface IAddAuthorModalProps {
    isAddUserModalOpen: boolean,
    closeAddAuthorModal: () => void,
    authorId: string,
}

export function AddAuthorModal({isAddUserModalOpen, closeAddAuthorModal, authorId}: IAddAuthorModalProps) {

    const {
        data: currentUserCollections = [],
        isLoading: isCurrentUserCollectionsLoading
    } = extendedCollectionsApi.useGetCurrentUserCollectionsQuery()

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
    const [deleteAuthor] = extendedCollectionsApi.useDeleteAuthorFromCollectionMutation()

    const collectionsWithoutAuthor = currentUserCollections.filter((col) => col.authors.every((_id) => _id !== authorId))
    const collectionsWithAuthor = currentUserCollections.filter((col) => col.authors.some((_id) => _id === authorId))

    return (
        <Modal
            open={isAddUserModalOpen}
            onClose={closeAddAuthorModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box>
                {isCurrentUserCollectionsLoading ?
                    <MiniLoader/>
                    :
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            width: '50vw',
                            padding: 2,
                            color: 'text.primary',
                            borderRadius: 2,
                        }}
                    >
                        {collectionsWithoutAuthor.length > 0 &&
                            <>
                                <Typography color='green' sx={{cursor: 'default', mb: 1}}>Add author</Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    {collectionsWithoutAuthor.map((collection) => {
                                        const {_id, title} = collection

                                        return (
                                            <MenuItem
                                                key={_id}
                                                onClick={() => {
                                                    addAuthor({collectionId: _id, authorId})
                                                }}
                                            >
                                                <Typography>{title}</Typography>
                                            </MenuItem>
                                        )
                                    })}
                                </Box>
                            </>
                        }
                        {collectionsWithAuthor.length > 0 &&
                            <>
                                <Typography color='error' sx={{cursor: 'default', mb: 1}}>Delete author</Typography>
                                {collectionsWithAuthor.map((collection) => {
                                    const {_id, title} = collection

                                    return (
                                        <MenuItem
                                            key={_id}
                                            onClick={() => {
                                                deleteAuthor({collectionId: _id, authorId})
                                            }}
                                        >
                                            <Typography>{title}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </>
                        }
                    </Box>
                }
            </Box>
        </Modal>
    )
}


export default function UserProfile() {
    const {id = ''} = useParams<{ id: string }>()!

    const currentUser = useAppSelector(state => state.userReducer.user) as ICurrentUser

    const {data: user, isLoading, error} = extendedUsersApi.useGetUserByIdQuery({id})

    const [isUserUpdating, setIsUserUpdating] = useState(false);
    const [avatarFile, setAvatarFile] = useState<null | string>(null);
    const [isChangingMode, setIsChangingMode] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const {isSubscribed, toggleSubscribe} = useToggleSubscribe(id)
    const theme = useTheme()

    if (isLoading || isUserUpdating) {
        return (
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h1'>Loading...</Typography>
            </Box>
        )
    }

    if (!user || error || !currentUser) {
        return (
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h1'>404</Typography>
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
        collections
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

    return (
        <Box
            sx={{overflowY: 'auto', height: '92vh'}}
        >
            <AddAuthorModal isAddUserModalOpen={isAddUserModalOpen} closeAddAuthorModal={closeAddAuthorModal}
                            authorId={id}/>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: 3,
                    [theme.breakpoints.down('tablet')]: {
                        flexDirection: 'column'
                    }

                }}
            >
                <Avatar sx={{width: '200px', height: '200px'}} src={avatarFile || avatarURL}/>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        ml: 2
                    }}
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
                            <Box sx={{display: 'flex', margin: 1}}>
                                <Typography sx={{mx: 1, textAlign: 'center'}}>{postsCount} posts</Typography>
                                <Typography sx={{mx: 1, textAlign: 'center'}}>{subscribesCount} subscribes</Typography>
                                <Typography sx={{mx: 1, textAlign: 'center'}}>{subscribersCount} subscribers</Typography>
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
                            onClick={() => setIsAddUserModalOpen(true)}>
                            Add author to your collection
                        </Button>
                    }
                </Box>
            </Box>
            <Box
                sx={{
                    width: '90%',
                    mx: 'auto',
                    pb: 4,
                }}
            >
                <Collections collections={collections}/>
            </Box>
        </Box>
    )
}

