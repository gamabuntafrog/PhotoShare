import {IUserForAddInCollection} from "../../../../../../../types/user";
import extendedCollectionsApi from "../../../../../../../redux/api/extendedCollectionsApi";
import useSx from "../../../../../../../hooks/useSx";
import collectionStyles from "../../../../../collectionStyles";
import useAnchorEl from "../../../../../../../hooks/useAnchorEl";
import useShortTranslation from "../../../../../../../hooks/useShortTranslation";
import {Avatar, Button, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";
import StyledCustomMenu from "../../../../../../../library/CustomMenu/StyledCustomMenu";
import StyledCustomMenuItem from "../../../../../../../library/CustomMenu/StyledCustomMenuItem";
import React from "react";
import {IUserFromRequestsOfCollection} from "../../../../../../../types/collection";

interface IUsersListProps {
    users: IUserFromRequestsOfCollection[],
    collectionId: string
}

interface IUserItemProps {
    user: IUserFromRequestsOfCollection,
    collectionId: string
}

function UserItem({user, collectionId}: IUserItemProps) {
    const {_id: authorId, username, avatar} = user

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
    const [addViewer] = extendedCollectionsApi.useAddViewerToCollectionMutation()

    const {addAuthorModal: styles} = useSx(collectionStyles)
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    const t = useShortTranslation({componentNameKey: 'Collection.CollectionSettings.AddUserToCollection'})

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
                {t('addButton')}
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
                        {t('asAuthor')}
                    </ListItemText>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addAuthor({collectionId, authorId, role: 'ADMIN'})
                    }}
                >
                    <ListItemText sx={{mr: 1}}>
                        {t('asAdmin')}
                    </ListItemText>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addViewer({collectionId, viewerId: authorId})
                    }}
                >
                    <ListItemText sx={{mr: 1}}>
                        {t('asViewer')}
                    </ListItemText>
                </StyledCustomMenuItem>
            </StyledCustomMenu>
        </ListItem>
    )
}

export default function UsersList({users, collectionId}: IUsersListProps) {

    return (
        <List>
            {users?.map((user) => <UserItem
                user={user}
                    collectionId={collectionId}
                    key={user._id}
                />
            )}
        </List>
    )
}