import {ICurrentUser, IUserForSearchBar} from "../../../types/user";
import useSx from "../../../hooks/useSx";
import headerStyles, {StyledHeaderNavLink, StyledMenuNavLink} from "../headerStyles";
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import useShortTranslation from "../../../hooks/useShortTranslation";
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import {CustomIconButton} from "../../../library/CustomIconButton";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {useDebounce} from "use-debounce";
import {extendedUsersApi} from "../../../redux/api/rootApi";
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
