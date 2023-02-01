import {styled, Theme} from "@mui/material";
import {NavLink} from "react-router-dom";


const userProfileStyles = (theme: Theme) => {


    return {
        loaderOrErrorWrapper: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 3,
            [theme.breakpoints.down('tablet')]: {
                flexDirection: 'column'
            }
        },
        avatar: {width: '200px', height: '200px'},
        userInfoWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            ml: 2
        },
        userInfoSecondWrapper: {display: 'flex', margin: 1},
        infoItem: {mx: 1, textAlign: 'center'},
        collections: {
            container: {
                width: '90%',
                mx: 'auto',
                pb: 0,
            },
            wrapper: {
                display: 'grid',
                gap: 3,
                color: theme.palette.text.light,
                [theme.breakpoints.up('laptop')]: {
                    gridTemplateColumns: `repeat(${5}, 1fr)`,
                },
                [theme.breakpoints.up('tablet')]: {
                    gridTemplateColumns: `repeat(${3}, 1fr)`,
                },
                [theme.breakpoints.down('tablet')]: {
                    gridTemplateColumns: `repeat(${2}, 1fr)`,
                }
            },
            itemWrapper: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.2)',
                zIndex: '99',
            },
            title: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                textAlign: 'center',
                zIndex: '100',
                padding: 1,

            },
            postsList: {
                overflow: 'hidden',
                margin: 0,
                background: 'rgba(0, 0, 0, 1)',
            },
            postItem: {
                bgcolor: 'primary.main',
                overflow: 'hidden',
                height: 'auto'
            },
        },
        allowedToViewCollectionsWrapper: {mt: 3, mb: 6, pt: 3, borderTop: `8px solid ${theme.palette.primary.main}`}

    }
}

export default userProfileStyles

export const StyledCollectionItem = styled(NavLink)(({theme}) => ({
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '8px',
    overflow: 'hidden',
    minHeight: '150px',
    [theme.breakpoints.down('tablet')]: {
        height: '150px',
    }
}))