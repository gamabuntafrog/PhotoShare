import {useParams} from "react-router-dom";
import {extendedCollectionsApi} from "../../../redux/api/rootApi";
import MiniLoader from "../../Loaders/MiniLoader";
import {Box} from "@mui/material";
import Collections from "./Collections";
import React from "react";

export default function UserAllowedToViewCollections() {

    const {id = ''} = useParams<{ id: string }>()!

    const {data: collections, isLoading, isError} = extendedCollectionsApi.useGetAllowedToViewCollectionsQuery({id})
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