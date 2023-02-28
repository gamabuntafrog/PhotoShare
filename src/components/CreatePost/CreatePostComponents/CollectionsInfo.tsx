import React from "react";
import {ICollection} from "../../../types/types";
import useAnchorEl from "../../../hooks/useAnchorEl";
import {Box, Button, IconButton, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import useShortTranslation from "../../../hooks/useShortTranslation";
import useSx from "../../../hooks/useSx";
import createPostStyles from "../createPostStyles";
import StyledCustomMenu from "../../../library/CustomMenu/StyledCustomMenu";
import StyledCustomMenuItem from "../../../library/CustomMenu/StyledCustomMenuItem";

;


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

    const t = useShortTranslation({componentNameKey: 'CreatePost.CollectionsInfo'})

    const {collectionsInfo: styles} = useSx(createPostStyles)

    return (
        <>
            <Box sx={styles.buttonWrapper}>
                <Typography color='text.secondary'>{t('saveIn')}</Typography>
                <Button
                    id="basic-button"
                    aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isAnchorEl ? 'true' : undefined}
                    onClick={handleClick}
                    sx={styles.openMenuButton(collectionIdError)}
                >
                    {willSavedInCollectionTitle}
                </Button>
            </Box>
            <StyledCustomMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isAnchorEl}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {collections.map(({title, _id}, i) => {
                    return (
                        <StyledCustomMenuItem
                            key={i}
                            onClick={() => {
                                selectCollection(_id)
                                handleClose()
                            }}
                        >
                            <ListItemText sx={{mr: 1}}>
                                {title}
                            </ListItemText>
                        </StyledCustomMenuItem>
                    )
                })}
                <Box
                    sx={styles.lastItemWrapper}
                >
                    <Button
                        variant='contained'
                        onClick={() => {
                            handleClose()
                            openModal()
                        }}
                    >
                        {t('createNewCollection')}
                    </Button>
                </Box>
            </StyledCustomMenu>
        </>
    )
}