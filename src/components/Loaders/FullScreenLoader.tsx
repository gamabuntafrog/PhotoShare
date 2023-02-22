import {Box, CircularProgress, Typography} from "@mui/material";
import React from "react";
import StandardHelmet from "../StandardHelmet";

interface IFullScreenLoaderProps {
    withMeta?: boolean,
    fixed?: boolean,
    smaller?: boolean
}

export default function FullScreenLoader({withMeta, fixed, smaller = false}: IFullScreenLoaderProps) {

    return (
        <>
            {withMeta && (
                <StandardHelmet keyOfOther='loading'/>
            )}
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: smaller ? '40vh' : '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...(fixed && {
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100,
                    width: '100%',
                    height: '100%',
                })
            }}>
                <CircularProgress size='20vw'/>
            </Box>
        </>
    )
}

