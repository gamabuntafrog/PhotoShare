import React, {useState} from "react";


export default function useAnchorEl () {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return {
        anchorEl,
        setAnchorEl,
        isAnchorEl: Boolean(anchorEl),
        handleClick,
        handleClose
    }
}