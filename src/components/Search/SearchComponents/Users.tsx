import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import {extendedUsersApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";

export default function SearchUsers() {

    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || ''
    const [debouncedQuery] = useDebounce(query, 500)

    const {data: users = [], isLoading} = extendedUsersApi.useGetUsersByUsernameQuery({
        username: debouncedQuery,
    }, {
        skip: debouncedQuery.length < 2
    })

    const navigate = useNavigate()

    if (isLoading) {
        return (
            <Box>
                <MiniLoader/>
            </Box>
        )
    }

    if (!isLoading && users.length === 0 && debouncedQuery.length > 2) {
        return (
            <Box>
                <Typography variant='h3' textAlign='center'>Not found</Typography>
            </Box>
        )
    }

    if (users.length === 0 && debouncedQuery.length < 2) {
        return (
            <Box>
                <Typography variant='h3' textAlign='center'>Enter username</Typography>
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant='h3' textAlign='center'>USERS</Typography>
            <List
                sx={{
                    display: 'flex',
                    width: '100%'
                }}
            >
                {users.map((user) => {
                    const {_id, avatar = '', username} = user
                    return (
                        <ListItem
                            key={_id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '20%',
                                bgcolor: 'background.paper',
                                margin: 1,
                                borderRadius: 4,
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                    color: '#121212'
                                }
                            }}
                            onClick={() => {
                                navigate(`/users/${_id}`)
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{
                                    width: 100,
                                    height: 100
                                }} src={avatar as string}/>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography>
                                    {username}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}