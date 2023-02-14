import {Box, CircularProgress, Typography} from "@mui/material";
import React from "react";
import StandardHelmet from "../StandardHelmet";

interface IFullScreenLoaderProps {
    withMeta?: boolean
}

export default function FullScreenLoader({withMeta}: IFullScreenLoaderProps) {

    return (
        <>
            {withMeta && (
                <StandardHelmet keyOfOther='loading'/>
            )}
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress size='20vw'/>
            </Box>
        </>
    )
}

