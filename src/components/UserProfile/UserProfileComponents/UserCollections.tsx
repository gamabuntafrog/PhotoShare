import {useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {extendedCollectionsApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";
import Collections from "./Collections";
import React from "react";
import useShortTranslation from "../../../hooks/useShortTranslation";


export default function UserCollections() {

    const {id = ''} = useParams<{ id: string }>()!

    const {data: collections, isLoading, isError} = extendedCollectionsApi.useGetCollectionsByUserIdQuery({id})

    const t = useShortTranslation({componentNameKey: 'UserProfile.AllowedToViewCollections'})

    if (isLoading) {
        return <MiniLoader/>
    }

    if (isError) {
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