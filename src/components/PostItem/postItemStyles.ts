import {Theme} from "@mui/material";


const postItemStyles = (theme: Theme) => {

    const {palette} = theme
    const {primary} = palette

    return {
        postItem: {
            display: 'inline-block',
            '&:hover .buttonsBar': {
                opacity: 1
            }
        },
        postItemWrapper: {
            position: 'relative',
            '&:hover .postImage': {
                filter: 'brightness(80%)',
            },
        },
        image: {
            width: '100%',
            borderRadius: '8px',
            backgroundColor: primary.main,
        },
        postTopButtonsWrapper: {
            display: 'flex',
            alignItems: 'center',
            padding: 0.5,
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: 100,
            opacity: 0,
            [theme.breakpoints.down('laptop')]: {
                opacity: 100,
            }
        },
        postBottomButtonsWrapper: {
            display: 'flex',
            alignItems: 'center',
            padding: 0.5,
            position: 'absolute',
            top: '100%',
            transform: 'translateY(-110%)',
            zIndex: 100,
            opacity: 0,
            color: theme.palette.text.light,
            [theme.breakpoints.down('laptop')]: {
                opacity: 100,
            }
        },
        postItemTitleWrapper: {
            px: 0.5,
            pb: 1,
            whiteSpace: 'break-spaces',
            wordBreak: 'break-all',
            [theme.breakpoints.down('tablet')]: {
                pl: 0.5,
                pr: 0,
                pb: 0
            }
        },
        postItemTitleUsernameWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
        },
        authorAvatar: {
            width: '40px',
            height: '40px',
            [theme.breakpoints.down('tablet')]: {
                width: 32,
                height: 32
            }
        }
    }
}

export default postItemStyles