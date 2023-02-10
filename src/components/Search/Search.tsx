import {Box, Container, TextField, Typography, useTheme} from "@mui/material";
import {Outlet, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import {StyledHeaderNavLink} from "../Header/headerStyles";
import useSx from "../../hooks/useSx";
import searchStyles from "./searchStyles";

export default function Search() {

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || ''

    const styles = useSx(searchStyles)

    return (
        <Container
            sx={styles.container}
        >
            <TextField
                onChange={(e) => setSearchParams(`query=${e.target.value}`, {replace: true})}
                sx={styles.input}
                value={query}
                placeholder='Enter query'
                variant='standard'
            />
            <Typography
                sx={styles.caption}
                variant='body1'
                textAlign='center'
            >
                Search posts, collections and users by title, tags or username
            </Typography>
            <Box
                sx={styles.linksWrapper}
            >
                <StyledHeaderNavLink className='first' to={`users?query=${query}`} end>USERS</StyledHeaderNavLink>
                <StyledHeaderNavLink to={`posts?query=${query}`}>POSTS</StyledHeaderNavLink>
                <StyledHeaderNavLink to={`collections?query=${query}`}>COLLECTIONS</StyledHeaderNavLink>
            </Box>
            <Box
                sx={styles.outletWrapper}
            >
                <Outlet/>
            </Box>
        </Container>
    )
}