import React, {useState} from "react";
import {useDebounce} from "use-debounce";
import extendedUsersApi from "../../../../../../redux/api/extendedUsersApi";
import useSx from "../../../../../../hooks/useSx";
import collectionStyles from "../../../../collectionStyles";
import useShortTranslation from "../../../../../../hooks/useShortTranslation";
import {TextField, Typography} from "@mui/material";
import MiniLoader from "../../../../../Loaders/MiniLoader";
import FullScreenLoader from "../../../../../Loaders/FullScreenLoader";
import UsersList from "./RequestsInfoComponents/UsersList";
import {IUserFromRequestsOfCollection} from "../../../../../../types/collection";

interface IAddAuthorToCollectionModalProps {
    collectionId: string,
    users: IUserFromRequestsOfCollection[]
}

export default function RequestsInfo(
    {
        collectionId,
        users
    }: IAddAuthorToCollectionModalProps) {

    const {addAuthorModal: styles} = useSx(collectionStyles)

    const t = useShortTranslation({componentNameKey: 'Collection.CollectionSettings.AddUserToCollection'})

    return (
        <>
            {/*<TextField*/}
            {/*    sx={{my: 1}}*/}
            {/*    fullWidth*/}
            {/*    placeholder={t('inputPlaceholder')}*/}
            {/*    value={query}*/}
            {/*    name='users'*/}
            {/*    type='text'*/}
            {/*    onChange={onChangeUsernameQuery}*/}
            {/*/>*/}
            <UsersList users={users} collectionId={collectionId}/>
        </>
    )
}