import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {extendedCollectionsApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";
import Collections from "./Collections";
import React from "react";


export default function UserCollections() {

    const {id = ''} = useParams<{ id: string }>()!

    const {data: collections, isLoading, isError} = extendedCollectionsApi.useGetCollectionsByUserIdQuery({id})
    console.log(collections)

    if (isLoading) {
        return <MiniLoader/>
    }

    if (isError || !collections) {
        return <h1>Error</h1>
    }

    return (
        <Box>
            <Collections collections={collections}/>
        </Box>
    )
}