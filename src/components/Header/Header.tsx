import {
    Avatar,
    Box,
    Container
} from "@mui/material";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {logout} from "../../redux/slices/userSlice";
import useSx from "../../hooks/useSx";
import headerStyles, {} from "./headerStyles";
import MobileNavbar from "./HeaderComponents/MobileNavbar";
import MobileHeaderNavigation from "./HeaderComponents/MobileHeaderNavigation";
import DesktopHeaderNavigation from "./HeaderComponents/DesktopHeaderNavigation";
import HeaderLogo from "./HeaderComponents/HeaderLogo";





export default function Header() {

    const {user, isLoggedIn} = useAppSelector((state) => state.userReducer)
    const styles = useSx(headerStyles)

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()


    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)

    const exitFromAccount = async () => {
        await dispatch(logout())
        closeModal()
    }

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

