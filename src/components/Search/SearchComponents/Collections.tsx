import {Box, Typography} from "@mui/material";
import Collections from "../../Collections";
import {extendedCollectionsApi, extendedPostsApi} from "../../../redux/api/rootApi";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import MiniLoader from "../../Loaders/MiniLoader";
import React from "react";
import useShortTranslation from "../../../hooks/useShortTranslation";
import useSx from "../../../hooks/useSx";
import searchStyles from "../searchStyles";


export default function SearchCollections() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || ''
    const [debouncedQuery] = useDebounce(query, 500)


    const {
        data: collections = [],
        isLoading
    } = extendedCollectionsApi.useSearchCollectionsQuery({title: debouncedQuery}, {
        skip: debouncedQuery.length < 2
    })

    const t = useShortTranslation({componentNameKey: 'Search.Collections'})

    const {collections: styles} = useSx(searchStyles)

    if (isLoading) {
        return (
            <>
                <MiniLoader/>
            </>
        )
    }

    if (!isLoading && collections.length === 0 && debouncedQuery.length > 2) {
        return (
            <>
                <Typography variant='h3' sx={styles.title} textAlign='center'>{t('notFound')}</Typography>
            </>
        )
    }

    if (collections.length === 0 && debouncedQuery.length < 2) {
        return (
            <>
                <Typography variant='h3' sx={styles.title} textAlign='center'>{t('enterTitle')}</Typography>
            </>
        )
    }

    return (
        <Collections collections={collections}/>
    )
}