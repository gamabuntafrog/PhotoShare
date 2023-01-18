import {ISavesInfo} from "../../types/post";
import {toggleSaveType} from "../../hooks/usePostsActions";
import useAnchorEl from "../../hooks/useAnchorEl";
import {Box, Button, IconButton, ListItemText, Menu, MenuItem} from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React from "react";

interface ISavesInfoProps {
    collections: ISavesInfo[],
    toggleSave: toggleSaveType,
    postId: string,
    isSaved: boolean,
    openModal: () => void
}

export default function PostSavesInfo({collections, toggleSave, postId, isSaved, openModal}: ISavesInfoProps) {

    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()
    const onToggleSave = (postId: string, collectionId: string, isSaved: boolean) => {
        handleClose()
        toggleSave(postId, collectionId, isSaved)
    }

    return (
        <Box sx={{
            ml: 'auto'
        }}>
            <IconButton
                id="basic-button"
                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAnchorEl ? 'true' : undefined}
                onClick={handleClick}
                sx={{ml: 'auto'}}
            >
                {isSaved ? <BookmarkAddedIcon/> : <BookmarkBorderIcon/>}
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isAnchorEl}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    '& .MuiPaper-root': {
                        bgcolor: 'background.paper',
                        maxHeight: '300px',
                    },
                    '& .MuiMenu-list': {
                        bgcolor: 'background.paper',
                        py: 0
                    }
                }}
            >
                {collections.map(({title, isSaved, collectionId}, i) => {
                    return (
                        <MenuItem sx={{
                            '&:hover .saveActionButton': {
                                display: 'flex'
                            },
                            bgcolor: 'background.paper',
                            position: 'relative'
                        }} key={i} onClick={() => onToggleSave(postId, collectionId, isSaved)}>
                            <ListItemText sx={{mr: 1}}>
                                {title}
                            </ListItemText>
                            <Button
                                className='saveActionButton'
                                color={isSaved ? 'error' : 'success'}
                                sx={{position: 'absolute', right: 8, display: 'none'}}
                                variant='contained'
                            >
                                {isSaved ? 'delete' : 'save'}
                            </Button>
                        </MenuItem>
                    )
                })}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        px: 1,
                        py: 1,
                        position: 'sticky',
                        bottom: '-1px',
                        '&:hover': {
                            bgcolor: 'background.paper',
                        }
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={() => {
                            handleClose()
                            openModal()
                        }}
                    >
                        Create new collection
                    </Button>
                </Box>
            </Menu>
        </Box>
    )
}
