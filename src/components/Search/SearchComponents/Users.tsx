import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import {extendedUsersApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";
import useShortTranslation from "../../../hooks/useShortTranslation";
import useSx from "../../../hooks/useSx";
import searchStyles from "../searchStyles";

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

    const t = useShortTranslation({componentNameKey: 'Search.Users'})

    const {users: styles} = useSx(searchStyles)

    if (isLoading) {
        return (
            <>
                <Box>
                    <MiniLoader/>
                </Box>
            </>
        )
    }

    if (!isLoading && users.length === 0 && debouncedQuery.length > 2) {
        return (
            <Box>
                <Typography sx={styles.title} variant='h3' textAlign='center'>{t('notFound')}</Typography>
            </Box>
        )
    }

    if (users.length === 0 && debouncedQuery.length < 2) {
        return (
            <Box>
                <Typography variant='h3' sx={styles.title} textAlign='center'>{t('enterUsername')}</Typography>
            </Box>
        )
    }

    return (
        <>
            <List
                sx={styles.usersList}
            >
                {users.map((user) => {
                    const {_id, avatar = '', username} = user
                    return (
                        <ListItem
                            key={_id}
                            sx={styles.item}
                            onClick={() => {
                                navigate(`/users/${_id}`)
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={styles.avatar} src={avatar as string}/>
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
        </>
    )
}