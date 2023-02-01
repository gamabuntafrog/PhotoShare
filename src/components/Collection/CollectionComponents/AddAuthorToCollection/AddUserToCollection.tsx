import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {extendedCollectionsApi, extendedUsersApi} from "../../../../redux/api/rootApi";
import {NavLink, useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import MiniLoader from "../../../Loaders/MiniLoader";
import {
  TextField,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useSx from "../../../../hooks/useSx";
import collectionStyles from "../../collectionStyles";
import UsersList from "./AddUserToCollectionComponents/UsersList";



interface IAddAuthorToCollectionModalProps {
    collectionId: string,
}

export default function AddUserToCollection(
    {
        collectionId
    }: IAddAuthorToCollectionModalProps) {

    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 1000)


    const {data: users, isLoading} = extendedUsersApi.useGetUsersForAddInCollectionQuery({
        username: debouncedQuery,
        collectionId
    }, {
        skip: debouncedQuery.length < 2
    })

    const {addAuthorModal: styles} = useSx(collectionStyles)

    const showUsersCondition = (users && users.length > 0 && debouncedQuery.length > 2)
    const showNotFoundCondition = (users && users.length === 0 || !users && debouncedQuery.length > 2)

    const onChangeUsernameQuery = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)

    return (
        <>
            <TextField
                sx={{my: 1}}
                fullWidth
                placeholder='Enter username'
                value={query}
                name='users'
                type='text'
                onChange={onChangeUsernameQuery}
            />
            {isLoading && <MiniLoader bgOff size='100px'/>}
            {showUsersCondition && (
                <UsersList authors={users} collectionId={collectionId}/>
            )}
            {showNotFoundCondition &&
                <Typography
                    variant='h5'
                    sx={styles.notFound}
                >
                    Not Found
                </Typography>
            }
        </>
    )
}