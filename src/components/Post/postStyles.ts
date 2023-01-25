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
            width:'50%',
            [down('laptop')]: {
                px: 0,
                width: '100%'
            }
        },
        postButtons: {
            display: 'flex', alignItems: 'center', alignSelf: 'flex-start', width: '100%',
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