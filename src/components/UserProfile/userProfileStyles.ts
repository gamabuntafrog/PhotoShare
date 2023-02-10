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
        allowedToViewCollectionsWrapper: {mt: 3, mb: 6, pt: 3, borderTop: `8px solid ${theme.palette.primary.main}`},
        navLinksWrapper: {
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            '& > a': {
                marginLeft: 3
            },
            [theme.breakpoints.down('tablet')]: {
                flexDirection: 'column',
                '& > a': {
                    marginTop: 1,
                    marginLeft: 0,
                }
            }
        }

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