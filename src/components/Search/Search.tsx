import {Box, Container, TextField, Typography, useTheme} from "@mui/material";
import {Outlet, useLocation, useParams, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import {extendedUsersApi} from "../../redux/api/rootApi";
import {useDebounce} from "use-debounce";
import {StyledHeaderNavLink} from "../Header/headerStyles";


export default function Search() {

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || ''

    const theme = useTheme()

    return (
        <Container
            maxWidth={'laptop'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Typography
                sx={{
                    mt: 3
                }}
                variant='h2'
                textAlign='center'
            >
                Search
            </Typography>
            <TextField
                onChange={(e) => setSearchParams(`query=${e.target.value}`, {replace: true})}
                sx={{
                    my: 2,
                    width: theme.breakpoints.values.mobile
                }}
                value={query}
                placeholder='Enter query'
            />
            <Box
                sx={{
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
                }}
            >
                <StyledHeaderNavLink className='first' to={`users?query=${query}`} end>USERS</StyledHeaderNavLink>
                <StyledHeaderNavLink to={`posts?query=${query}`}>POSTS</StyledHeaderNavLink>
                <StyledHeaderNavLink to={`collections?query=${query}`}>COLLECTIONS</StyledHeaderNavLink>
            </Box>
            <Box
                sx={{
                    mt: 2,
                    padding: 1,
                    width: '100%'

                }}
            >
                <Outlet/>
            </Box>
        </Container>
    )
}