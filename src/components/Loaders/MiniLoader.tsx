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
            mt: 7,
            position: 'relative',
            width: size || '20vw',
            height: size || '20vh',
            mx: 'auto',
        }}>
            <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <CircularProgress size={size || '20vw'}/>
            </Box>
        </Box>
    )

}