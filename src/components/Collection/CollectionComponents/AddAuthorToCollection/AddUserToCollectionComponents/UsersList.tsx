import {IUserForAddInCollection} from "../../../../../types/user";
import {extendedCollectionsApi} from "../../../../../redux/api/rootApi";
import useSx from "../../../../../hooks/useSx";
import collectionStyles from "../../../collectionStyles";
import useAnchorEl from "../../../../../hooks/useAnchorEl";
import {Avatar, Button, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import StyledCustomMenu from "../../../../../library/CustomMenu/StyledCustomMenu";
import StyledCustomMenuItem from "../../../../../library/CustomMenu/StyledCustomMenuItem";
import React from "react";

interface IUsersListProps {
    authors: IUserForAddInCollection[],
    collectionId: string
}

interface IUserItemProps {
    author: IUserForAddInCollection,
    collectionId: string
}

function UserItem({author, collectionId}: IUserItemProps) {
    const {_id: authorId, username, avatar} = author

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
    const [addViewer] = extendedCollectionsApi.useAddViewerToCollectionMutation()

    const {addAuthorModal: styles} = useSx(collectionStyles)
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    return (
        <ListItem
            sx={styles.userItem}
            key={authorId}>
            <ListItemAvatar
                sx={styles.avatarWrapper}
            >
                <NavLink to={`/users/${authorId}`}>
                    <Avatar
                        sx={styles.avatar}
                        src={avatar || ''}
                    />
                </NavLink>
            </ListItemAvatar>
            <ListItemText
                sx={styles.usernameWrapper}
            >
                <NavLink to={`/users/${authorId}`}>
                    {username}
                </NavLink>
            </ListItemText>
            <Button
                variant='contained'
                id="basic-button"
                aria-controls={isAnchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isAnchorEl ? 'true' : undefined}
                onClick={handleClick}
            >
                Add
            </Button>
            <StyledCustomMenu
                anchorEl={anchorEl}
                open={isAnchorEl}
                onClose={handleClose}
            >
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addAuthor({collectionId, authorId, role: 'AUTHOR'})
                    }}
                >
                    <ListItemText sx={{mr: 1}}>
                        As author
                    </ListItemText>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addAuthor({collectionId, authorId, role: 'ADMIN'})
                    }}
                >
                    <ListItemText sx={{mr: 1}}>
                        As admin
                    </ListItemText>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addViewer({collectionId, viewerId: authorId})
                    }}
                >
                    <ListItemText sx={{mr: 1}}>
                        As viewer
                    </ListItemText>
                </StyledCustomMenuItem>
            </StyledCustomMenu>
        </ListItem>
    )
}

export default function UsersList({authors, collectionId}: IUsersListProps) {

    return (
        <List>
            {authors?.map((author) => <UserItem
                    author={author}
                    collectionId={collectionId}
                    key={author._id}
                />
            )}
        </List>
    )
}