import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import CustomOpenMenuButton from "../../../../library/CustomMenu/CustomOpenMenuButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledCustomMenu from "../../../../library/CustomMenu/StyledCustomMenu";
import StyledCustomMenuItem from "../../../../library/CustomMenu/StyledCustomMenuItem";
import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import {IAuthorOfCollection} from "../../../../types/collection";
import useAnchorEl from "../../../../hooks/useAnchorEl";
import useSx from "../../../../hooks/useSx";
import collectionStyles from "../../collectionStyles";
import {extendedCollectionsApi} from "../../../../redux/api/rootApi";

import CallMadeIcon from '@mui/icons-material/CallMade';
function AuthorInfo({author, collectionId}: { author: IAuthorOfCollection, collectionId: string }) {

    const {_id, avatar, username, isAdmin, isAuthor} = author
    const {authorInfo: styles} = useSx(collectionStyles)
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

    const [deleteAuthorFromCollection] = extendedCollectionsApi.useDeleteAuthorFromCollectionMutation()
    const [changeAuthorRole] = extendedCollectionsApi.useChangeAuthorRoleInCollectionMutation()
    const [makeViewer] = extendedCollectionsApi.useAddViewerToCollectionMutation()

    const navigate = useNavigate()

    return (
        <ListItem sx={styles.listItem} key={_id}>
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
                onClick={() => navigate(`/users/${_id}`)}
            >
                <Typography variant='caption' color='primary'>
                    {isAdmin && 'Admin'}
                    {isAuthor && 'Author'}
                </Typography>
                <Typography>
                    {username}
                </Typography>
            </ListItemText>
            <CustomOpenMenuButton
                handleClick={handleClick}
                isAnchorEl={isAnchorEl}
                iconButton={true}
            >
                <MoreVertIcon/>
            </CustomOpenMenuButton>
            <StyledCustomMenu
                anchorEl={anchorEl}
                open={isAnchorEl}
                onClose={handleClose}
            >
                {isAuthor && (<StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        changeAuthorRole({collectionId, authorId: _id, role: 'ADMIN'})
                    }}
                >
                    <Typography>
                        Make an admin
                    </Typography>
                </StyledCustomMenuItem>)}
                {isAdmin && (<StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        changeAuthorRole({collectionId, authorId: _id, role: 'AUTHOR'})
                    }}
                >
                    <Typography
                    >
                        Make an author
                    </Typography>
                </StyledCustomMenuItem>)}
                <StyledCustomMenuItem>
                    <Typography
                        onClick={() => {
                            makeViewer({collectionId, viewerId: _id})
                        }}
                    >
                        Make an viewer
                    </Typography>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem>
                    <Typography
                        color='error'
                        onClick={() => {
                            deleteAuthorFromCollection({collectionId, authorId: _id})
                        }}
                    >
                        Delete from collection
                    </Typography>
                </StyledCustomMenuItem>
            </StyledCustomMenu>
        </ListItem>
    )
}

export default function AuthorsInfo({authors, collectionId, openAddUserAccordion}: { authors: IAuthorOfCollection[], collectionId: string, openAddUserAccordion: () => void}) {

    const [query, setQuery] = useState('');

    const handleQuery = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)

    const filteredAuthors = authors.filter(({username}) => username.includes(query))

    if (filteredAuthors.length === 0) {
        return <>
            <TextField sx={{mb: 2}} onChange={handleQuery} fullWidth placeholder='Enter username'/>
            <Typography variant='h4' textAlign='center'>Wrong username</Typography>
        </>
    }

    return (
        <>
            <TextField sx={{mb: 2}} onChange={handleQuery} fullWidth placeholder='Enter username'/>
            {filteredAuthors.map((author) => <AuthorInfo key={author._id} author={author} collectionId={collectionId}/>)}
            <ListItem onClick={openAddUserAccordion}>
                <Button endIcon={<CallMadeIcon/>} fullWidth variant='contained'>Add new</Button>
            </ListItem>
        </>
    )
}