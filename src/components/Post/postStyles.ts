import {styled, Theme} from "@mui/material";
import {commentsType} from "../../hooks/useCommentsActions";


const postStyles = (theme: Theme) => {

    const {breakpoints, palette} = theme
    const {down, up, values} = breakpoints
    const {primary} = palette

    return {
        postContainer: {
            pt: 4,
            pb: 2,
            px: 2,
            maxWidth: values.laptop,
            [down('laptop')]: {
                pt: 2,
            },
            minHeight: '92vh'
        },
        postWrapper: {
            display: 'flex',
            flexDirection: 'row',
            mx: 'auto',
            borderRadius: '8px',
            [down('laptop')]: {
                flexDirection: 'column',
            }
        },
        postImage: {
            width: '50%',
            borderRadius: '8px',
            backgroundColor: primary.main,
            [breakpoints.down('laptop')]: {
                width: '100%'
            }
        },
        postInfo: {
            px: 3,
            mt: 1,
            width: '50%',
            [down('laptop')]: {
                px: 0,
                width: '100%'
            }
        },
        postButtons: {
            display: 'flex', alignItems: 'center', alignSelf: 'flex-start', width: '100%',
        },
        authorInfo: {
            container: {
                display: 'flex',
                [theme.breakpoints.down('tablet')]: {
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }
            },
            wrapper: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
            },
            subscribeButton: {
                ml: 2,
                borderRadius: 4,
                [theme.breakpoints.down('tablet')]: {
                    ml: 0,
                    mt: 1,
                    borderRadius: 2,
                }
            },
            avatar: {
                width: '40px',
                height: '40px'
            },
            userInfoWrapper: {
                ml: 1,
                lineHeight: '0px'
            }
        },
        similarPosts: {
            loaderContainer: {
                height: '40vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }
        },
        comments: {
            repliesList: {alignSelf: 'start', pl: 2, pt: 0, width: '-webkit-fill-available'},
            container: {
                minHeight: '20vh',
                maxHeight: '50vh',
                height: '100%',
                overflow: 'auto',
                [down('tablet')]: {
                    maxHeight: '70vh'
                },
                display: 'flex',
                flexDirection: 'column',
            },
            commentItem: {
                flexDirection: 'column',
                py: 0,
                px: 0.5,
            },
            commentContainer: {display: 'flex', alignSelf: 'start', width: '100%'},
            avatarWrapper: {display: 'flex', alignItems: 'center', cursor: 'pointer'},
            commentWrapper: {display: 'flex', flexDirection: 'column', width: '100%'},
            commentSecondWrapper: {display: 'flex', alignItems: 'baseline', width: '100%'},
            username: {
                cursor: 'pointer',
                color: theme.palette.primary.main
            },
            replyButton: {
                cursor: 'pointer',
                '&:hover': {
                    textDecoration: 'underline'
                },
                color: theme.palette.text.secondary
            },
            avoid: {ml: 0.5, mr: 1, flex: 0},
            writeCommentContainer: (isReply: boolean) => ({
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                bottom: 0,
                bgcolor: 'background.default',
                px: 1,
                [down('tablet')]: {
                    px: 0
                },
                mt: 'auto',
                pt: isReply ? 3.5 : 1,
            }),
            inputWrapper: {position: 'relative', width: '100%'},
            replyContainer: {
                position: 'absolute',
                bottom: '105%',
                left: '6px',
                display: 'flex',
                alignItems: 'center',
            },
            deleteButton: {
                ml: 'auto',
                mr: 1,
                alignSelf: 'center'
            }
        }
    }
}

export default postStyles

export const StyledPostImage = styled("img")(({theme}) => ({
    width: '50%',
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('laptop')]: {
        width: '100%'
    },
    height: 'fit-content'
}))