import {extendedCollectionsApi} from "../../../redux/api/rootApi";
import {Box, MenuItem, Modal, Typography} from "@mui/material";
import MiniLoader from "../../Loaders/MiniLoader";
import React from "react";

interface IAddAuthorModalProps {
    isAddUserModalOpen: boolean,
    closeAddAuthorModal: () => void,
    authorId: string,
}

export function AddAuthorModal({isAddUserModalOpen, closeAddAuthorModal, authorId}: IAddAuthorModalProps) {

    const {
        data: currentUserCollections = [],
        isLoading: isCurrentUserCollectionsLoading
    } = extendedCollectionsApi.useGetCurrentUserCollectionsQuery()

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
    const [deleteAuthor] = extendedCollectionsApi.useDeleteAuthorFromCollectionMutation()

    const collectionsWithoutAuthor = currentUserCollections.filter((col) => col.authors.every((_id) => _id !== authorId))
    const collectionsWithAuthor = currentUserCollections.filter((col) => col.authors.some((_id) => _id === authorId))

    return (
        <Modal
            open={isAddUserModalOpen}
            onClose={closeAddAuthorModal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box>
                {isCurrentUserCollectionsLoading ?
                    <MiniLoader/>
                    :
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            width: '50vw',
                            padding: 2,
                            color: 'text.primary',
                            borderRadius: 2,
                        }}
                    >
                        {collectionsWithoutAuthor.length > 0 &&
                            <>
                                <Typography color='green' sx={{cursor: 'default', mb: 1}}>Add author</Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    {collectionsWithoutAuthor.map((collection) => {
                                        const {_id, title} = collection

                                        return (
                                            <MenuItem
                                                key={_id}
                                                onClick={() => {
                                                    addAuthor({collectionId: _id, authorId})
                                                }}
                                            >
                                                <Typography>{title}</Typography>
                                            </MenuItem>
                                        )
                                    })}
                                </Box>
                            </>
                        }
                        {collectionsWithAuthor.length > 0 &&
                            <>
                                <Typography color='error' sx={{cursor: 'default', mb: 1}}>Delete author</Typography>
                                {collectionsWithAuthor.map((collection) => {
                                    const {_id, title} = collection

                                    return (
                                        <MenuItem
                                            key={_id}
                                            onClick={() => {
                                                deleteAuthor({collectionId: _id, authorId})
                                            }}
                                        >
                                            <Typography>{title}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </>
                        }
                    </Box>
                }
            </Box>
        </Modal>
    )
}
