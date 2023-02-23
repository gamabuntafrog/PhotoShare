import {styled, Theme} from "@mui/material";


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
            }
        },
        postWrapper: {
            display: 'flex',
            flexDirection: 'row',
            mx: 'auto',
            mb: 2,
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
            avatar: {width: '40px', height: '40px'},
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
    }
}))