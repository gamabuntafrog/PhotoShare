import {Avatar, Box, Button, Container, IconButton, Menu, MenuItem, OutlinedInput, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {postsApi} from "../../redux/api/postsApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggleSaveOfPostCreator from "../../hooks/useToggleSaveOfPostCreator";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import useToggleLikeOfPostCreator from "../../hooks/useToggleLikeOfPostCreator";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, {useState} from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import {usersApi} from "../../redux/api/usersApi";


export default function Post() {
    const {id = ''} = useParams<{ id: string }>()!

    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    const {_id: currentUserId} = user

    const [subscribe] = usersApi.useSubscribeMutation()
    const [unsubscribe] = usersApi.useUnsubscribeMutation()

    const {data: post, isLoading: isPostLoading} = postsApi.useGetPostByIdQuery(id)
    const {data: author, isLoading: isUserLoading} = usersApi.useGetByIdQuery({id: post?.author?._id || '', token, posts: false, collections: false})

    const useToggleLike = useToggleLikeOfPostCreator({token, currentUserId})
    const [{isLiked, likes}, toggleLike] = useToggleLike({
        skip: isPostLoading,
        postId: id,
        usersLiked: post?.usersLiked || [],
        likesCount: post?.likesCount || 0
    })

    const [{isLoading, refetch}, useToggleSave] = useToggleSaveOfPostCreator({token})
    const [{isSaved, saves, savesInfo}, toggleSave, addNewCollectionInSavesInfo] = useToggleSave({
        skip: isPostLoading,
        savesCount: post?.savesCount || 0,
        postId: id
    })

    const theme = useTheme()
    const {main} = theme.palette.primary

    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleSubscribe = async (userId: string, token: string, isSubscribed: boolean) => {
        isSubscribed ? unsubscribe({userId, token}) : subscribe({userId, token})
    }

    if (isPostLoading || isLoading || isUserLoading) {
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

    if (!post) {
        return (
            <Box>
                <Typography variant='h1'>404 Not Found</Typography>
            </Box>
        )
    }

    const {_id: postId, title, body, tags, likesCount, image: {url: postImageURL}} = post
    const {username, _id: authorId, avatar: {url: avatarURL = ''}, subscribers} = author!
    const subscribersAmount = subscribers.length
    const formattedTags = tags.join(' ')
    const isProfileOfCurrentUser = currentUserId === post.author._id
    const isSubscribed = !!subscribers.find((id) => id === currentUserId)
    console.log(isSubscribed)
    console.log(post)
    return (
        <Box
            sx={{overflowY: 'auto', height: '92vh'}}

        >
            <Container
                maxWidth={isSmallerLaptop ? 'tablet' : 'laptop'}
                sx={{
                    py: 2,
                    px: isSmallerLaptop ? 2 : 0
                }}
            >
                <Box
                    key={postId}
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallerLaptop ? 'column' : 'row',
                        // justifyContent: 'space-between',
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '8px',

                    }}
                >

                    <img
                        src={postImageURL}
                        style={{
                            width: isSmallerLaptop ? '100%' : '50%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            backgroundColor: main
                        }}
                    />

                    <Box
                        sx={{
                            px: isSmallerLaptop ? 0 : 3,
                            mt: 1,
                            width: isSmallerLaptop ? '100%' : '50%'
                        }}
                    >
                        <Box sx={{
                            display: 'flex', alignItems: 'center', alignSelf: 'flex-start', width: '100%',
                        }}>
                            <IconButton onClick={toggleLike}>
                                {isLiked ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon/>}
                            </IconButton>
                            <Typography sx={{ml: 0.5}}>
                                {likes}
                            </Typography>
                            {/*<IconButton sx={{ml: 'auto'}}>*/}
                            {/*    <BookmarkBorderIcon/>*/}
                            {/*</IconButton>*/}

                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ml: 'auto'}}
                            >
                                {isSaved ? <BookmarkAddedIcon/> : <BookmarkBorderIcon/>}
                            </IconButton>
                            <Box>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    sx={{
                                        maxHeight: '300px'
                                    }}
                                >
                                    {savesInfo.map(({savedInCollectionTitle, postId, isSaved, collectionId}, i) => {
                                        return (
                                            <MenuItem key={i} onClick={() => {
                                                handleClose()
                                                toggleSave({collectionId, isSavedInCollection: isSaved})
                                            }}>
                                                {isSaved ? 'saved in' : 'not saved in'} {savedInCollectionTitle}
                                            </MenuItem>
                                        )
                                    })}
                                    <Button
                                        variant='contained'
                                        onClick={() => {
                                            handleClose()
                                            // openModal()

                                        }}
                                        sx={{mx: 1, my: 1}}
                                    >
                                        Create new collection
                                    </Button>
                                </Menu>
                            </Box>
                        </Box>
                        <Box sx={{
                            mt: 'auto',
                            display: 'flex', alignItems: 'center', alignSelf: 'flex-start',
                        }}>

                        </Box>
                        <Typography variant='h3'>{title}</Typography>
                        <Box
                            sx={{display: 'flex'}}
                        >
                            <NavLink
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                }}
                                to={`/users/${authorId}`}>
                                <Avatar sx={{width: '40px', height: '40px'}} src={avatarURL as string}/>
                                <Box
                                    sx={{
                                        ml: 1,
                                        lineHeight: '0px'
                                    }}
                                >
                                    <Typography variant='h6'>{username}</Typography>
                                    <Typography variant='caption'>{subscribersAmount} subscribers</Typography>
                                </Box>
                            </NavLink>
                            {!isProfileOfCurrentUser && <Button
                                sx={{
                                    ml: 2,
                                    borderRadius: 4,
                                }}
                                variant='contained'
                                onClick={() => toggleSubscribe(authorId, token, isSubscribed)}
                            >
                                {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                            </Button>}
                        </Box>
                        <Box sx={{my: 1}}>
                            <Typography variant='body1'>{body}</Typography>
                            <Typography variant='body2'>{formattedTags}</Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6'>Comments</Typography>
                            <OutlinedInput multiline fullWidth sx={{
                                minHeight: '200px',
                                alignItems: 'flex-start'
                            }}/>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}