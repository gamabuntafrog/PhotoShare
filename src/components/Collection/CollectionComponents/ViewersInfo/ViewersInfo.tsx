import {IViewerOfCollection} from "../../../../types/collection";
import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import CustomOpenMenuButton from "../../../../library/CustomMenu/CustomOpenMenuButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledCustomMenu from "../../../../library/CustomMenu/StyledCustomMenu";
import StyledCustomMenuItem from "../../../../library/CustomMenu/StyledCustomMenuItem";
import React, {ChangeEvent, useState} from "react";
import useSx from "../../../../hooks/useSx";
import collectionStyles from "../../collectionStyles";
import useAnchorEl from "../../../../hooks/useAnchorEl";
import {extendedCollectionsApi} from "../../../../redux/api/rootApi";
import CallMadeIcon from "@mui/icons-material/CallMade";

interface IViewersInfoProps {
    viewers: IViewerOfCollection[],
    collectionId: string,
    openAddUserAccordion: () => void
}

interface IViewerInfoProps {
    viewer: IViewerOfCollection,
    collectionId: string
}

function Viewer({viewer, collectionId}: IViewerInfoProps) {

    const {_id, avatar, username} = viewer

    const [addAuthor] = extendedCollectionsApi.useAddAuthorToCollectionMutation()
    const [deleteViewerFromCollection] = extendedCollectionsApi.useDeleteViewerFromCollectionMutation()


    const styles = useSx(collectionStyles)
    const {anchorEl, isAnchorEl, handleClick, handleClose} = useAnchorEl()

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
            <CustomOpenMenuButton
                isAnchorEl={isAnchorEl}
                iconButton
                handleClick={handleClick}
            >
                <MoreVertIcon/>
            </CustomOpenMenuButton>
            <StyledCustomMenu
                anchorEl={anchorEl}
                open={isAnchorEl}
                onClose={handleClose}
            >
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addAuthor({collectionId, authorId: _id, role: 'AUTHOR'})
                    }}
                >
                    <ListItemText >
                        Make an author
                    </ListItemText>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        addAuthor({collectionId, authorId: _id, role: 'ADMIN'})
                    }}
                >
                    <ListItemText>
                        Make an admin
                    </ListItemText>
                </StyledCustomMenuItem>
                <StyledCustomMenuItem
                    onClick={() => {
                        handleClose()
                        deleteViewerFromCollection({collectionId, viewerId: _id})
                    }}
                >
                    <Typography color='error'>
                        Delete from collection
                    </Typography>
                </StyledCustomMenuItem>
            </StyledCustomMenu>
        </ListItem>
    )
}

export default function ViewersInfo({viewers, collectionId, openAddUserAccordion}: IViewersInfoProps) {
    const [query, setQuery] = useState('');

    const handleQuery = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setQuery(e.target.value)

    const filteredViewers = viewers.filter(({username}) => username.includes(query))

    if (filteredViewers.length === 0) {
        return <>
            <TextField sx={{mb: 2}} onChange={handleQuery} fullWidth placeholder='Enter username'/>
            <Typography variant='h4' textAlign='center'>Wrong username</Typography>
        </>
    }

    return (
        <>
            <TextField sx={{mb: 2}} onChange={handleQuery} fullWidth placeholder='Enter username'/>
            {filteredViewers.map((viewer) => <Viewer viewer={viewer} collectionId={collectionId}/>)}
            <ListItem onClick={openAddUserAccordion}>
                <Button endIcon={<CallMadeIcon/>} fullWidth variant='contained'>Add new</Button>
            </ListItem>
        </>
    )
}