import React, {ChangeEvent, useState} from "react";
import useShortTranslation from "../../../../../../hooks/useShortTranslation";
import FullScreenLoader from "../../../../../Loaders/FullScreenLoader";
import {IUserFromRequestsOfCollection} from "../../../../../../types/types";
import {Button, ListItem, TextField, Typography} from "@mui/material";
const UsersList = React.lazy(() => import("./RequestsInfoComponents/UsersList"));

interface IAddAuthorToCollectionModalProps {
    collectionId: string,
    users: IUserFromRequestsOfCollection[]
}

export default function RequestsInfo(
    {
        collectionId,
        users
    }: IAddAuthorToCollectionModalProps) {
    const [query, setQuery] = useState('');

    const handleQuery = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)

    const filteredUsers = users.filter(({username}) => username.includes(query))

    const t = useShortTranslation({componentNameKey: 'Collection.CollectionSettings.RequestsInfo'})

    if (filteredUsers.length === 0 && users.length !== 0) {
        return (
            <>
                <TextField sx={{mb: 2}} onChange={handleQuery} fullWidth  placeholder={t('inputPlaceholder')}/>
                <Typography variant='h4' textAlign='center'>{t('wrongUsernameMessage')}</Typography>
            </>
        )
    }

    if (users.length === 0) {
        return (
            <>
                <Typography variant='h4' textAlign='center'>{t('listIsEmpty')}</Typography>
            </>
        )
    }

    return (
        <>
            <TextField sx={{mb: 2}} onChange={handleQuery} fullWidth placeholder={t('inputPlaceholder')}/>
            <React.Suspense fallback={<FullScreenLoader fixed withMeta/>}>
                <UsersList users={filteredUsers} collectionId={collectionId}/>
            </React.Suspense>
        </>
    )
}