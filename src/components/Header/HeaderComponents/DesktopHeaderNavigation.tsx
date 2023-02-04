import {ICurrentUser} from "../../../types/user";
import useSx from "../../../hooks/useSx";
import headerStyles, {StyledHeaderNavLink} from "../headerStyles";
import {Box, Button, IconButton} from "@mui/material";
import {NavLink} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

interface IDesktopHeaderNavigationProps {
    user: ICurrentUser | null,
    isLoggedIn: boolean,
    exitFromAccount: () => Promise<void>
}

export default function DesktopHeaderNavigation({user, isLoggedIn, exitFromAccount}: IDesktopHeaderNavigationProps) {

    const styles = useSx(headerStyles)

    const {username, _id: currentUserId} = user || {}

    return (
        <Box
            // DESKTOP CONTAINER
            sx={styles.navContainer}
        >
            {
                user && isLoggedIn ?
                    <>
                        <NavLink to='/post/create'>
                            <IconButton color='primary'>
                                <AddBoxIcon/>
                            </IconButton>
                        </NavLink>
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
                                color='primary'
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
                            <IconButton sx={{color: 'currentColor'}}>
                                <SettingsIcon/>
                            </IconButton>
                        </StyledHeaderNavLink>
                        <Button
                            sx={{ml: 2}}
                            variant='outlined'
                            color='error'
                            onClick={exitFromAccount}
                        >
                            Exit
                        </Button>
                    </>
                    :
                    <>
                        <StyledHeaderNavLink to='/'>Login</StyledHeaderNavLink>
                        <StyledHeaderNavLink to='/register'>Register</StyledHeaderNavLink>
                    </>
            }
        </Box>
    )
}