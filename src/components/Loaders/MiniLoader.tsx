import {Box, CircularProgress} from "@mui/material";
import React from "react";

export default function MiniLoader() {

    return (
        <Box sx={{
            bgcolor: 'background.default',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3
        }}>
            <CircularProgress size='20vw'/>
        </Box>
    )

}