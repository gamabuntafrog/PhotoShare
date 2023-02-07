import {useParams} from "react-router-dom";
import {extendedCollectionsApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";
import {Box, Typography} from "@mui/material";
import Collections from "./Collections";
import React from "react";
import useShortTranslation from "../../../hooks/useShortTranslation";

export default function UserAllowedToViewCollections() {

    const {id = ''} = useParams<{ id: string }>()!

    const {data: collections, isLoading, isError} = extendedCollectionsApi.useGetAllowedToViewCollectionsQuery({id})

    const t = useShortTranslation({componentNameKey: 'UserProfile.AllowedToViewCollections'})

    if (isLoading) {
        return <MiniLoader/>
    }

    if (isError || !collections) {
        return <Typography variant='h1'>{t('error')}</Typography>
    }

    if (!collections) {
        return <Typography variant='h1'>{t('noCollectionsMessage')}</Typography>
    }

    return (
        <Box>
            <Collections collections={collections}/>
        </Box>
    )
}