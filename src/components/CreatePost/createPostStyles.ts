import {styled, Theme} from "@mui/material";


const createPostStyles = (theme: Theme) => {

    const breakableText = {
        wordBreak: 'break-all',
        whiteSpace: 'break-spaces'
    }

    return {
        createPostContainer: {
            pt: 6,
            pb: 3,
        },
        formWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('tablet')]: {
                flexDirection: 'column'
            }
        },
        form: {width: '300px'},
        formInputsWrapper: {
            flexDirection: 'column'
        },
        breakableText: {
            wordBreak: 'break-all',
            whiteSpace: 'break-spaces'
        },
        formInputLabel: {
            my: 1,
            ...breakableText
        },
        uploadButton: {
            mb: 1,
            mt: 3,
            justifySelf: 'center',
            ml: 'auto',
            width: '50%'
        },
        imageWrapper: {
            [theme.breakpoints.up('tablet')]: {
                ml: 3,
            },
            [theme.breakpoints.down('tablet')]: {
                width: '100%'
            }
        },
        imageButtonInputLabel: {cursor: 'pointer', color: 'inherit', width: '100%', pointerEvents: 'none'}

    }
}

export default createPostStyles

export const StyledImage = styled("img")(({theme}) => ({
    maxHeight: '70vh',
    objectFit: 'contain',
    [theme.breakpoints.up('tablet')]: {width: '400px'},
    [theme.breakpoints.up('laptop')]: {width: '800px'},
    [theme.breakpoints.down('tablet')]: {width: '100%'},
}))