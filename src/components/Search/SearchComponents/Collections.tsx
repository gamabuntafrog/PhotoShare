import {Box, Typography} from "@mui/material";
import Collections from "../../Collections";
import {extendedCollectionsApi, extendedPostsApi} from "../../../redux/api/rootApi";
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "use-debounce";
import MiniLoader from "../../Loaders/MiniLoader";
import React from "react";


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

    console.log(collections)

    if (isLoading) {
        return (
            <Box>

                <MiniLoader/>
            </Box>
        )
    }

    if (!isLoading && collections.length === 0 && debouncedQuery.length > 2) {
        return (
            <Box>
                <Typography variant='h3' textAlign='center'>Not found</Typography>
            </Box>
        )
    }

    if (collections.length === 0 && debouncedQuery.length < 2) {
        return (
            <Box>
                <Typography variant='h3' textAlign='center'>Enter title</Typography>
            </Box>
        )
    }

    return (
        <Collections collections={collections}/>
    )
}