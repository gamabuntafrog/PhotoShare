import {
    Avatar,
    Box,
    Button,
    Container,
    ImageList,
    List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu,
    MenuItem, MenuList,
    Modal,
    OutlinedInput,
    Typography
} from "@mui/material";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Posts from "../Posts";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "../Posts/Posts.module.css";
import PostItem from "../PostItem";
import React, {useDeferredValue, useEffect, useState} from "react";
import CreateCollectionModal from "../CreateCollectionModal";
import {extendedCollectionsApi, extendedUsersApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import {ICurrentUser} from "../../types/user";
import {useDebounce} from "use-debounce";
import {MIN_USERNAME_LENGTH} from "../../utils/validationSchemas";
import {IAuthorOfCollection} from "../../types/collection";
import useAnchorEl from "../../hooks/useAnchorEl";
import MiniLoader from "../Loaders/MiniLoader";
import FullScreenLoader from "../Loaders/FullScreenLoader";

interface IAddAuthorToCollectionModalProps {
    isAddAuthorModalOpen: boolean,
    closeAddAuthorModal: () => void,
    collectionId: string,
}

function AddAuthorToCollectionModal(
    {
        isAddAuthorModalOpen,
        closeAddAuthorModal,
        collectionId
    }: IAddAuthorToCollectionModalProps) {

    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 1000)

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
    const [getUsersByUsername, {data: users, isLoading}] = extendedUsersApi.useLazyGetUsersForAddInCollectionQuery()

    const navigate = useNavigate()

    useEffect(() => {
        if (debouncedQuery.length < 2) return

        getUsersByUsername({username: debouncedQuery, collectionId})
    }, [debouncedQuery]);

    const showUsersCondition = (users && users.length > 0 && debouncedQuery.length > 2)
    const showNotFoundCondition = (users && users.length === 0 || !users && debouncedQuery.length > 2)

    const theme = useTheme()

    if (isLoading) return <MiniLoader/>

    return (
        <Modal
            open={isAddAuthorModalOpen}
            onClose={closeAddAuthorModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    width: '50vw',
                    maxHeight: '100vh',
                    overflow: 'auto',
                    padding: 2,
                    pt: 8,
                    color: 'text.primary',
                    borderRadius: 2,
                    position: 'relative',
                    [theme.breakpoints.down('tablet')]: {
                        width: '80vw',
                    }
                }}
            >
                <Button color='error' sx={{position: 'absolute', right: 20, top: 20}}
                        onClick={closeAddAuthorModal}>Close</Button>
                <Typography
                    variant='h3'
                    sx={{padding: 1, textAlign: 'center', color: 'primary.main', wordBreak: 'break-word'}}
                >
                    Add authors
                </Typography>
                <OutlinedInput
                    sx={{my: 1}}
                    fullWidth
                    placeholder='Enter username'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {showUsersCondition && <List>
                    {users.map(({_id, username, avatar}) => {
                        return (
                            <ListItem
                                sx={{
                                    [theme.breakpoints.down('tablet')]: {
                                        padding: 1
                                    }
                                }}
                                key={_id}>
                                <ListItemAvatar
                                    sx={{cursor: 'pointer', minWidth: 'auto'}}
                                >
                                    <NavLink to={`/users/${_id}`}>
                                        <Avatar
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                [theme.breakpoints.down('tablet')]: {
                                                    width: 40,
                                                    height: 40,
                                                }
                                            }}
                                            src={avatar || ''}
                                        />
                                    </NavLink>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        ml: 2,
                                        mr: 1,
                                        [theme.breakpoints.down('tablet')]: {
                                            mx: 1
                                        },
                                        cursor: 'pointer'
                                    }}
                                >
                                    <NavLink to={`/users/${_id}`}>
                                        {username}
                                    </NavLink>
                                </ListItemText>
                                <Button
                                    variant='contained'
                                    onClick={() => addAuthor({collectionId, authorId: _id})}
                                >
                                    Add
                                </Button>
                            </ListItem>
                        )
                    })}
                </List>
                }
                {showNotFoundCondition &&
                    <Typography
                        variant='h5'
                        sx={{textAlign: 'center', padding: 2}}
                    >
                        Not Found
                    </Typography>
                }
            </Box>
        </Modal>
    )
}

interface IDeleteAuthorFromCollectionProps {
    isDeleteAuthorModalOpen: boolean,
    closeDeleteAuthorModal: () => void,
    authors: IAuthorOfCollection[],
    currentUserId: string,
    collectionId: string
}

function DeleteAuthorFromCollection(
    {
        isDeleteAuthorModalOpen,
        closeDeleteAuthorModal,
        authors,
        currentUserId,
        collectionId
    }: IDeleteAuthorFromCollectionProps) {

    const authorsWithoutCurrentUser = authors.filter(({_id}) => _id !== currentUserId)

    const [deleteAuthor] = extendedCollectionsApi.useDeleteAuthorFromCollectionMutation()

    const theme = useTheme()

    return (
        <Modal
            open={isDeleteAuthorModalOpen}
            onClose={closeDeleteAuthorModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{
                bgcolor: 'background.paper',
                width: '50vw',
                maxHeight: '100vh',
                overflow: 'auto',
                padding: 2,
                pt: 8,
                color: 'text.primary',
                borderRadius: 2,
                position: 'relative',
                [theme.breakpoints.down('tablet')]: {
                    width: '80vw',
                }
            }}>
                <Button
                    color='error'
                    sx={{position: 'absolute', right: 20, top: 20}}
                    onClick={closeDeleteAuthorModal}
                >
                    Close
                </Button>
                {authorsWithoutCurrentUser.length > 0 ?
                    <>
                        <Typography
                            variant='h3'
                            sx={{padding: 1, textAlign: 'center', wordBreak: 'break-word'}}
                            color='error'
                        >
                            Delete authors
                        </Typography>
                        {authorsWithoutCurrentUser.map((author) => {
                            const {_id, username, avatar} = author
                            return (
                                <ListItem key={_id}>
                                    <ListItemAvatar>
                                        <NavLink to={`/users/${_id}`}>
                                            <Avatar
                                                sx={{
                                                    width: 60,
                                                    height: 60
                                                }}
                                                src={avatar || ''}
                                            />
                                        </NavLink>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            ml: 2,
                                            mr: 1,
                                        }}
                                    >
                                        <NavLink to={`/users/${_id}`}>
                                            {username}
                                        </NavLink>
                                    </ListItemText>
                                    <Button
                                        variant='contained'
                                        color='error'
                                        onClick={() => deleteAuthor({collectionId, authorId: _id})}
                                    >
                                        Delete
                                    </Button>
                                </ListItem>
                            )
                        })}
                    </>
                    :
                    <Typography
                        variant='h3'
                        sx={{padding: 1, textAlign: 'center', wordBreak: 'break-word'}}
                        color='error'
                    >
                        You are the sole author
                    </Typography>
                }

            </Box>
        </Modal>
    )
}


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {_id: currentUserId} = useAppSelector((state) => state.userReducer.user) as ICurrentUser

    const {
        data: collection,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id})

    const [posts, postsActions] = usePostsActions({initPosts: collection?.posts})

    console.log(collection)
    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));


    const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
    const [isDeleteAuthorModalOpen, setIsDeleteAuthorModalOpen] = useState(false);

    const [deleteColl] = extendedCollectionsApi.useDeleteCollectionMutation()
    const [deleteCurrentUserFromCollection] = extendedCollectionsApi.useDeleteCurrentUserFromCollectionMutation()

    const deleteCollection = async () => {
        await deleteColl({id})
    }

    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    if (isCollectionLoading) return <FullScreenLoader/>

    if (collectionError || !collection) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }

    const {_id: collectionId, title, tags, authors} = collection
    const formattedTags = tags.join(' ')
    const isCurrentUserAuthorOfCollection = authors.some(({_id}) => currentUserId === _id)

    const closeAddAuthorModal = () => setIsAddAuthorModalOpen(false)
    const openAddAuthorModal = () => setIsAddAuthorModalOpen(true)
    const closeDeleteAuthorModal = () => setIsDeleteAuthorModalOpen(false)
    const openDeleteAuthorModal = () => setIsDeleteAuthorModalOpen(true)


    return (
        <Box>
            <AddAuthorToCollectionModal
                isAddAuthorModalOpen={isAddAuthorModalOpen}
                closeAddAuthorModal={closeAddAuthorModal}
                collectionId={collectionId}
            />
            <DeleteAuthorFromCollection
                isDeleteAuthorModalOpen={isDeleteAuthorModalOpen}
                closeDeleteAuthorModal={closeDeleteAuthorModal}
                authors={collection.authors}
                currentUserId={currentUserId}
                collectionId={collectionId}
            />
            <Box sx={{
                py: 2,
                position: 'relative'
            }}>
                {isCurrentUserAuthorOfCollection &&
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 20,
                            top: 20
                        }}
                    >
                        <Button
                            id="basic-button"
                            aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isAnchorEl ? 'true' : undefined}
                            onClick={handleClick}
                            variant='contained'
                        >
                            Settings
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={isAnchorEl}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                '& .MuiPaper-root': {
                                    bgcolor: 'background.paper',
                                    maxHeight: '300px',
                                },
                                '& .MuiMenu-list': {
                                    bgcolor: 'background.paper',
                                    py: 0
                                }
                            }}
                        >
                            <MenuItem
                                sx={{
                                    bgcolor: 'background.paper',
                                    position: 'relative'
                                }}
                                onClick={() => {
                                    openAddAuthorModal()
                                    handleClose()
                                }}
                            >
                                Add new author
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    bgcolor: 'background.paper',
                                    position: 'relative'
                                }}
                                onClick={() => {
                                    openDeleteAuthorModal()
                                    handleClose()
                                }}>
                                <Typography color='error'>Delete author</Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    bgcolor: 'background.paper',
                                    position: 'relative'
                                }}
                                onClick={() => {
                                    deleteCurrentUserFromCollection({collectionId})
                                    handleClose()
                                }}>
                                <Typography color='error'>Stop being an author</Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    bgcolor: 'background.paper',
                                    position: 'relative'
                                }}
                                onClick={() => {
                                    deleteCollection()
                                    handleClose()
                                }}>
                                <Typography color='error'>Delete collection</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                }
                <Box sx={{mb: 2, mt: 6}}>
                    <Typography
                        variant='h1'
                        sx={{
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            [theme.breakpoints.down('tablet')]: {
                                fontSize: 50,
                            },
                            padding: 2
                        }}>
                        {title}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            textAlign: 'center',
                        }}>
                        {formattedTags}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='body2'>by</Typography>
                    {authors.map((author) => {
                        const {_id: authorId, username, avatar} = author

                        return (
                            <NavLink
                                to={`/users/${authorId}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                key={authorId}
                            >
                                <Avatar sx={{width: '80px', height: '80px'}} src={avatar || ''} alt={username}/>
                                <Typography sx={{ml: 1}} variant='h5'>{username}</Typography>
                            </NavLink>
                        )
                    })}
                    {isCurrentUserAuthorOfCollection &&
                        <Button
                            variant='contained'
                            sx={{mt: 3}}
                        >
                            <NavLink to={`/post/create/${collectionId}`}>
                                Add new post
                            </NavLink>
                        </Button>
                    }

                </Box>
            </Box>
            <ImageList
                variant="masonry"
                sx={{
                    width: '95%',
                    py: 2,
                    mx: 'auto'
                }}
                gap={12}
                cols={isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5}
            >
                {posts.map((post) => <PostItem
                    postsActions={postsActions}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}