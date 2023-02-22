import {Menu, styled} from "@mui/material";
import React from "react";

const StyledCustomMenu = styled(Menu)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    '& .MuiPaper-root': {
        backgroundColor: theme.palette.background.paper,
        maxHeight: '300px',
    },
    '& .MuiMenu-list': {
        backgroundColor: theme.palette.background.paper,
        padding: 0,
    }
}))

export default StyledCustomMenu

// export default function StyledMenuComponent({anchorEl, isAnchorEl, handleClose, children}: {
//     anchorEl: HTMLElement | null,
//     isAnchorEl: boolean,
//     handleClose: () => void,
//     children: React.ReactNode
// }) {
//
//     return (
//         <CustomMenu
//             anchorEl={anchorEl}
//             open={isAnchorEl}
//             onClose={handleClose}
//             MenuListProps={{
//                 'aria-labelledby': 'basic-button',
//             }}
//         >
//             {children}
//         </CustomMenu>
//     )
// }