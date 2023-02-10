import {
    Avatar,
    Box,
    Button,
    Container, Drawer,
    IconButton,
    Link,
    List,
    ListItem,
} from "@mui/material";
import {NavLink} from "react-router-dom";
import React, {Dispatch, SetStateAction, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logout} from "../../redux/slices/userSlice";
import {INotificationWithUser} from "../../types/notification";
import useSx from "../../hooks/useSx";
import headerStyles, {} from "./headerStyles";
import MobileNavbar from "./HeaderComponents/MobileNavbar";
import MobileHeaderNavigation from "./HeaderComponents/MobileHeaderNavigation";
import DesktopHeaderNavigation from "./HeaderComponents/DesktopHeaderNavigation";
import HeaderLogo from "./HeaderComponents/HeaderLogo";


export function Notifications({notifications, setIsNotificationsOpen}: {
    notifications: INotificationWithUser[],
    setIsNotificationsOpen: Dispatch<SetStateAction<boolean>>
}) {

    // робити запит за сповіщеннями з полем user: true

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50px',
                left: '0px',
                transform: 'translateX(-50%)',
                bgcolor: 'background.paper',
                height: '40vh',
                width: '400px',
                overflowY: 'auto'
            }}
        >
            <List
                sx={{
                    height: '90%'
                }}
            >
                {notifications.map((notification) => {

                    const {_id: nId, type, user, receiver, checked} = notification
                    const {username, _id: userId} = user
                    // console.log(user)
                    const message = `${username} ${type === 'subscribe' ? 'subscribed on' : 'unsubscribed from'} you`

                    return (
                        <ListItem
                            key={nId}
                            onClick={(e) => {
                                // e.stopPropagation()
                                setIsNotificationsOpen(false)
                            }}
                        >
                            <NavLink style={{color: checked ? 'primary.main' : 'primary.main'}}
                                     to={`/users/${userId}`}>{message}</NavLink>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}



export default function Header() {

    const {user, isLoading, isLoggedIn, notifications} = useAppSelector((state) => state.userReducer)
    const styles = useSx(headerStyles)

    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const dispatch = useAppDispatch()


    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)


    const exitFromAccount = async () => {
        await dispatch(logout())
        closeModal()
    }

    const {username, _id: currentUserId} = user || {}

    const unCheckedNotificationsLength = notifications?.filter(({checked}) => checked === false).length


    return (
        <Box sx={styles.header}>
            <MobileNavbar
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
                user={user}
                isLoggedIn={isLoggedIn}
                exitFromAccount={exitFromAccount}
            />
            <Container
                maxWidth="desktop"
                sx={styles.container}
            >
                <HeaderLogo/>
                <MobileHeaderNavigation
                    openModal={openModal}
                    user={user}
                    isLoggedIn={isLoggedIn}
                />
                <DesktopHeaderNavigation
                    user={user}
                    isLoggedIn={isLoggedIn}
                    exitFromAccount={exitFromAccount}
                />
            </Container>
        </Box>
    )
}

