import {ICurrentUser} from "../../../types/user";
import useSx from "../../../hooks/useSx";
import headerStyles, {StyledHeaderNavLink} from "../headerStyles";
import {Avatar, Box, IconButton} from "@mui/material";
import {NavLink} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import SearchBar from "./SearchBar";

interface IMobileHeaderNavigationProps {
    openModal: () => void,
    user: ICurrentUser | null,
    isLoggedIn: boolean,
}

export default function MobileHeaderNavigation(
    {
        openModal,
        user,
        isLoggedIn,
    }: IMobileHeaderNavigationProps) {

    const styles = useSx(headerStyles)

    return (
        <Box
            // MOBILE HEADER CONTAINER
            sx={styles.navMobileContainer}
        >
            {user && isLoggedIn &&
                <>
                    <SearchBar/>
                    <StyledHeaderNavLink className='first' to='/post/create'>
                        <IconButton color='inherit'>
                            <AddBoxIcon/>
                        </IconButton>
                    </StyledHeaderNavLink>
                    <IconButton
                        onClick={(e) => {
                            // setIsNotificationsOpen(isOpen => !isOpen)
                        }}
                        className={'tabindex="0"'}
                        onBlur={(e) => {
                            // console.log(e)
                            // setIsNotificationsOpen(!isNotificationsOpen)
                        }}
                        sx={{color: 'text.primary'}}
                        disabled={true}
                    >
                        <NotificationsIcon/>
                        {/*{unCheckedNotificationsLength > 0 &&*/}
                        {/*    <Typography sx={{color: 'error.main'}}>*/}
                        {/*        {unCheckedNotificationsLength}*/}
                        {/*    </Typography>*/}
                        {/*}*/}
                    </IconButton>
                    <StyledHeaderNavLink to={`/users/${user._id}`}>
                        <Avatar src={user.avatar.url || ''}/>
                    </StyledHeaderNavLink>
                </>
            }
            <IconButton onClick={openModal} color='inherit' sx={styles.openMenuButton}>
                <MenuIcon/>
            </IconButton>
        </Box>
    )
}