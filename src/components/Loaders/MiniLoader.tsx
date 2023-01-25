import {Box, CircularProgress} from "@mui/material";
import React from "react";

interface IMiniLoaderProps {
    size?: string,
    bgOff?: boolean,
}

export default function MiniLoader({size, bgOff}: IMiniLoaderProps) {

    return (
        <Box sx={{
            bgcolor: bgOff ? 'none' : 'background.default',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3
        }}>
            <CircularProgress size={size || '20vw'}/>
        </Box>
    )

}