import React from "react";
import {ICollection} from "../../types/collection";
import useAnchorEl from "../../hooks/useAnchorEl";
import {Box, Button, IconButton, ListItemText, Menu, MenuItem} from "@mui/material";;


interface ISavesInfoProps {
    collections: ICollection[],
    openModal: () => void,
    collectionIdError: boolean,
    willSavedInCollectionTitle: string,
    selectCollection: (collectionId: string) => void
}

export default function CollectionsInfo(
    {
        collections,
        openModal,
        collectionIdError,
        willSavedInCollectionTitle,
        selectCollection
    }: ISavesInfoProps) {

    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    return (
        <Box sx={{
            ml: 'auto'
        }}>
            <Button
                id="basic-button"
                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAnchorEl ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    color: collectionIdError ? 'red' : 'primary.main'
                }}
            >
                {willSavedInCollectionTitle}
            </Button>
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
                {collections.map(({title, _id}, i) => {
                    return (
                        <MenuItem
                            sx={{
                                bgcolor: 'background.paper',
                                position: 'relative'
                            }}
                            key={i}
                            onClick={() => {
                                selectCollection(_id)
                                handleClose()
                            }}
                        >
                            <ListItemText sx={{mr: 1}}>
                                {title}
                            </ListItemText>
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