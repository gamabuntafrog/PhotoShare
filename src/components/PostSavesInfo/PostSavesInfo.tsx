import {ISavesInfo} from "../../types/types";
import {toggleSaveType} from "../../hooks/usePostsActions";
import useAnchorEl from "../../hooks/useAnchorEl";
import {Box, Button, IconButton, ListItemText, Menu, MenuItem, useTheme} from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React from "react";
import useSx from "../../hooks/useSx";
import postSavesInfoStyles from "./postSavesInfoStyles";
import useShortTranslation from "../../hooks/useShortTranslation";

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

    const t = useShortTranslation({componentNameKey: 'PostSavesInfo'})

    const styles = useSx(postSavesInfoStyles)


    return (
        <Box sx={styles.wrapper}>
            <IconButton
                id="basic-button"
                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAnchorEl ? 'true' : undefined}
                onClick={handleClick}
                sx={styles.openMenuButton}
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
                sx={styles.menuList}
            >
                {collections.map(({title, isSaved, collectionId}) => {
                    const postActionLabel = isSaved ? t('deletePostButton') : t('savePostButton')

                    return (
                        <MenuItem sx={styles.menuItem} key={collectionId} onClick={() => onToggleSave(postId, collectionId, isSaved)}>
                            <ListItemText sx={{mr: 1}}>
                                {title}
                            </ListItemText>
                            <Button
                                className='saveActionButton'
                                color={isSaved ? 'error' : 'success'}
                                sx={styles.menuItemButton}
                                variant='contained'
                            >
                                {postActionLabel}
                            </Button>
                        </MenuItem>
                    )
                })}
                <Box
                    sx={styles.staticButtonsWrapper}
                >
                    <Button
                        variant='contained'
                        onClick={() => {
                            handleClose()
                            openModal()
                        }}
                    >
                        {t('createNewCollectionButton')}
                    </Button>
                </Box>
            </Menu>
        </Box>
    )
}
