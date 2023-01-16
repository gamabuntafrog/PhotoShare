import {Box, Typography} from "@mui/material";
import React from "react";


export default function Loader() {

    return (
        <Box sx={{
            bgcolor: 'background.default',
            color: 'var(--text-primary)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant='h1'>Loading...</Typography>
        </Box>
    )

}