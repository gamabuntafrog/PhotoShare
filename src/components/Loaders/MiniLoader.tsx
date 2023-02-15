import {Box, CircularProgress} from "@mui/material";
import React from "react";
import StandardHelmet from "../StandardHelmet";

interface IMiniLoaderProps {
    size?: string,
    bgOff?: boolean,
    withMeta?: boolean
}

export default function MiniLoader({size, bgOff, withMeta}: IMiniLoaderProps) {

    return (
        <>
            {withMeta && (
                <StandardHelmet keyOfOther='loading'/>
            )}
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
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%'}}>
                    <CircularProgress size={size || '20vw'}/>
                </Box>
            </Box>
        </>
    )

}