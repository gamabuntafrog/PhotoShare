import {IAuthorOfCollection} from "../../../types/collection";
import {extendedCollectionsApi} from "../../../redux/api/rootApi";
import {useTheme} from "@mui/material/styles";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";
import useSx from "../../../hooks/useSx";
import collectionStyles from "../collectionStyles";
import CloseIcon from '@mui/icons-material/Close';

interface IDeleteAuthorFromCollectionProps {
    isDeleteAuthorModalOpen: boolean,
    closeDeleteAuthorModal: () => void,
    authors: IAuthorOfCollection[],
    currentUserId: string,
    collectionId: string
}

interface IUserItemProps {
    author: IAuthorOfCollection,
    collectionId: string
}

function UserItem({author, collectionId}: IUserItemProps) {

    const {_id, username, avatar} = author

    const [deleteAuthor] = extendedCollectionsApi.useDeleteAuthorFromCollectionMutation()
    const onClickDeleteAuthor = () => deleteAuthor({collectionId, authorId: _id})

    const {deleteAuthorModal: styles} = useSx(collectionStyles)

    return (
        <ListItem key={_id}>
            <ListItemAvatar>
                <NavLink to={`/users/${_id}`}>
                    <Avatar
                        sx={styles.avatar}
                        src={avatar || ''}
                    />
                </NavLink>
            </ListItemAvatar>
            <ListItemText
                sx={styles.authorUsernameWrapper}
            >
                <NavLink to={`/users/${_id}`}>
                    {username}
                </NavLink>
            </ListItemText>
            <Button
                variant='contained'
                color='error'
                onClick={onClickDeleteAuthor}
            >
                Delete
            </Button>
        </ListItem>
    )
}

export default function DeleteAuthorFromCollectionModal(
    {
        isDeleteAuthorModalOpen,
        closeDeleteAuthorModal,
        authors,
        currentUserId,
        collectionId
    }: IDeleteAuthorFromCollectionProps) {

    const authorsWithoutCurrentUser = authors.filter(({_id}) => _id !== currentUserId)

    const {deleteAuthorModal: styles} = useSx(collectionStyles)

    return (
        <Modal
            open={isDeleteAuthorModalOpen}
            onClose={closeDeleteAuthorModal}
            sx={styles.backdrop}
        >
            <Box sx={styles.modalWrapper}>
                <IconButton
                    color='error'
                    sx={styles.closeIcon}
                    onClick={closeDeleteAuthorModal}
                >
                    <CloseIcon/>
                </IconButton>
                {authorsWithoutCurrentUser.length > 0 ?
                    <>
                        <Typography
                            variant='h3'
                            sx={styles.title}
                            color='error'
                        >
                            Delete authors
                        </Typography>
                        {authorsWithoutCurrentUser.map((author) =>
                            <UserItem author={author} collectionId={collectionId}/>
                        )}
                    </>
                    :
                    <Typography
                        variant='h3'
                        sx={styles.errorTitle}
                        color='error'
                    >
                        You are the sole author
                    </Typography>
                }

            </Box>
        </Modal>
    )
}