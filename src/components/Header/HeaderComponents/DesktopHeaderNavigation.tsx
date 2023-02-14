import {ICurrentUser, IUserForSearchBar} from "../../../types/user";
import useSx from "../../../hooks/useSx";
import headerStyles, {StyledHeaderNavLink} from "../headerStyles";
import {
    Box,
    Button,
    IconButton,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import useShortTranslation from "../../../hooks/useShortTranslation";
import SearchBar from "./SearchBar";


interface IDesktopHeaderNavigationProps {
    user: ICurrentUser | null,
    isLoggedIn: boolean,
    exitFromAccount: () => Promise<void>
}


export default function DesktopHeaderNavigation({user, isLoggedIn, exitFromAccount}: IDesktopHeaderNavigationProps) {

    const styles = useSx(headerStyles)

    const {username, _id: currentUserId} = user || {}

    const t = useShortTranslation({componentNameKey: 'Header'});

    return (
        <Box
            // DESKTOP CONTAINER
            sx={styles.navContainer}
        >

            {
                (user && isLoggedIn) ?
                    <>
                        <SearchBar/>
                        <StyledHeaderNavLink className='first' to='/post/create'>
                            <IconButton color='inherit'>
                                <AddBoxIcon/>
                            </IconButton>
                        </StyledHeaderNavLink>
                        <Box
                            sx={{ml: 1, position: 'relative'}}
                        >

                            <IconButton
                                onClick={(e) => {
                                    // setIsNotificationsOpen(isOpen => !isOpen)
                                }}
                                className={'tabindex="0"'}
                                onBlur={(e) => {
                                    // console.log(e)
                                    // setIsNotificationsOpen(!isNotificationsOpen)
                                }}
                                disabled={true}
                                sx={{color: 'text.primary'}}
                            >
                                <NotificationsIcon/>
                                {/*{unCheckedNotificationsLength > 0 &&*/}
                                {/*    <Typography sx={{color: 'error.main'}}>*/}
                                {/*        {unCheckedNotificationsLength}*/}
                                {/*    </Typography>*/}
                                {/*}*/}
                            </IconButton>
                            {/*{isNotificationsOpen &&*/}
                            {/*    <Notifications*/}
                            {/*        notifications={notifications}*/}
                            {/*        setIsNotificationsOpen={setIsNotificationsOpen}*/}
                            {/*    />*/}
                            {/*}*/}
                        </Box>
                        <StyledHeaderNavLink to={`/users/${currentUserId}`}>
                            {username}
                        </StyledHeaderNavLink>
                        <StyledHeaderNavLink to='/settings'>
                            <IconButton color='inherit'>
                                <SettingsIcon/>
                            </IconButton>
                        </StyledHeaderNavLink>
                        <Button
                            sx={{ml: 2}}
                            variant='outlined'
                            color='error'
                            onClick={exitFromAccount}
                        >
                            {t('exitButton')}
                        </Button>
                    </>
                    :
                    <>
                        <StyledHeaderNavLink to='/'>{t('loginLink')}</StyledHeaderNavLink>
                        <StyledHeaderNavLink to='/register'>{t('registerLink')}</StyledHeaderNavLink>
                        <StyledHeaderNavLink to='/settings'>
                            <IconButton color='inherit'>
                                <SettingsIcon/>
                            </IconButton>
                        </StyledHeaderNavLink>
                    </>
            }
        </Box>
    )
}
