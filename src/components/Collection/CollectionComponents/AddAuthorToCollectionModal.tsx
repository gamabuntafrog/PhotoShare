import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {extendedCollectionsApi, extendedUsersApi} from "../../../redux/api/rootApi";
import {NavLink, useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import MiniLoader from "../../Loaders/MiniLoader";
import {
    Avatar,
    Box,
    Button, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    OutlinedInput, TextField,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useSx from "../../../hooks/useSx";
import collectionStyles from "../collectionStyles";
import {IUserForAddInCollection} from "../../../types/user";

interface IUserItemProps {
    author: IUserForAddInCollection,
    collectionId: string
}

function UserItem({author, collectionId}: IUserItemProps) {

    const {_id, username, avatar} = author

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()

    const onClickAddAuthor = () => addAuthor({collectionId, authorId: _id})

    const {addAuthorModal: styles} = useSx(collectionStyles)

    return (
        <ListItem
            sx={styles.userItem}
            key={_id}>
            <ListItemAvatar
                sx={styles.avatarWrapper}
            >
                <NavLink to={`/users/${_id}`}>
                    <Avatar
                        sx={styles.avatar}
                        src={avatar || ''}
                    />
                </NavLink>
            </ListItemAvatar>
            <ListItemText
                sx={styles.usernameWrapper}
            >
                <NavLink to={`/users/${_id}`}>
                    {username}
                </NavLink>
            </ListItemText>
            <Button
                variant='contained'
                onClick={onClickAddAuthor}
            >
                Add
            </Button>
        </ListItem>
    )
}


interface IAddAuthorToCollectionModalProps {
    isAddAuthorModalOpen: boolean,
    closeAddAuthorModal: () => void,
    collectionId: string,
}

export default function AddAuthorToCollectionModal(
    {
        isAddAuthorModalOpen,
        closeAddAuthorModal,
        collectionId
    }: IAddAuthorToCollectionModalProps) {

    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 1000)


    const {data: users, isLoading} = extendedUsersApi.useGetUsersForAddInCollectionQuery({
        username: debouncedQuery,
        collectionId
    }, {
        skip: debouncedQuery.length < 2
    })

    const {addAuthorModal: styles} = useSx(collectionStyles)

    const showUsersCondition = (users && users.length > 0 && debouncedQuery.length > 2)
    const showNotFoundCondition = (users && users.length === 0 || !users && debouncedQuery.length > 2)

    const onChangeUsernameQuery = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)

    return (
        <Modal
            open={isAddAuthorModalOpen}
            onClose={closeAddAuthorModal}
            sx={styles.backdrop}
        >
            <Box
                sx={styles.modalWrapper}
            >
                <IconButton
                    color='error'
                    sx={styles.closeIcon}
                    onClick={closeAddAuthorModal}
                >
                    <CloseIcon/>
                </IconButton>
                <Typography
                    variant='h3'
                    sx={styles.title}
                >
                    Add authors
                </Typography>
                <TextField
                    sx={{my: 1}}
                    fullWidth
                    variant='standard'
                    placeholder='Enter username'
                    value={query}
                    onChange={onChangeUsernameQuery}
                />
                {isLoading && <MiniLoader bgOff size='100px'/>}
                {showUsersCondition && (
                    <List>
                        {users?.map((author) => <UserItem
                            key={author._id}
                            author={author}
                            collectionId={collectionId}/>
                        )}
                    </List>
                )}
                {showNotFoundCondition &&
                    <Typography
                        variant='h5'
                        sx={styles.notFound}
                    >
                        Not Found
                    </Typography>
                }
            </Box>
        </Modal>
    )
}