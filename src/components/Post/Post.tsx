import {Avatar, Box, Button, Container, IconButton, OutlinedInput, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {postsApi} from "../../redux/api/postsApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export default function Post() {

    const {id = ''} = useParams<{ id: string }>()!
    const {data: post, isLoading: isPostLoading} = postsApi.useGetPostByIdQuery(id)


    const theme = useTheme()
    const {main} = theme.palette.primary

    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    if (isPostLoading) {
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

    const {_id: postId, author, title, body, tags, likesCount, image: {url: postImageURL}} = post
    const {username, _id: authorId, avatar: {url: avatarURL = ''}, subscribers} = author
    const subscribersAmount = subscribers.length
    const formattedTags = tags.join(' ')

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
                            width: isSmallerLaptop ? '100%' : '50%'
                        }}
                    >
                        <Box sx={{
                            display: 'flex', alignItems: 'center', alignSelf: 'flex-start', width: '100%',
                        }}>
                            <IconButton sx={{ml: 'auto'}}>
                                <BookmarkBorderIcon/>
                            </IconButton>
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
                            <Button sx={{
                                ml: 2,
                                borderRadius: 4,
                            }}
                            variant='contained'
                            >
                                Subscribe
                            </Button>
                        </Box>
                        <Box sx={{my: 1}}>
                            <Typography variant='body1'>{body}</Typography>
                            <Typography variant='body2'>{formattedTags}</Typography>
                        </Box>
                        <Box sx={{
                            mt: 'auto',
                            display: 'flex', alignItems: 'center', alignSelf: 'flex-start',
                        }}>
                            <IconButton>
                                <FavoriteBorderIcon/>
                            </IconButton>
                            <Typography sx={{ml: 0.5}}>
                                {likesCount}
                            </Typography>
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