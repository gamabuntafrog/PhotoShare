import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {
  TextField,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import UsersList from "./AddUserToCollectionComponents/UsersList";
import MiniLoader from "../../../../../Loaders/MiniLoader";
import collectionStyles from "../../../../collectionStyles";
import useSx from "../../../../../../hooks/useSx";
import {extendedUsersApi} from "../../../../../../redux/api/rootApi";
import useShortTranslation from "../../../../../../hooks/useShortTranslation";



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

    const t = useShortTranslation({componentNameKey: 'Collection.CollectionSettings.AddUserToCollection'})

    return (
        <>
            <TextField
                sx={{my: 1}}
                fullWidth
                placeholder={t('inputPlaceholder')}
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
                    {t('notFoundMessage')}
                </Typography>
            }
        </>
    )
}