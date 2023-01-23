import {Box, CircularProgress, Typography} from "@mui/material";
import React from "react";


export default function FullScreenLoader() {

    return (
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
    )
}

