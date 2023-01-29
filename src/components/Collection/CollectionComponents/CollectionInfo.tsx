import {IAuthorOfCollection} from "../../../types/collection";
import {useTheme} from "@mui/material/styles";
import {Avatar, Box, Button, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import useSx from "../../../hooks/useSx";
import collectionStyles from "../collectionStyles";

interface ICollectionInfoProps {
    title: string,
    formattedTags: string,
    authors: IAuthorOfCollection[],
    isCurrentUserAuthorOfCollection: boolean,
    collectionId: string
}

export default function CollectionInfo(
    {
        title,
        formattedTags,
        authors,
        isCurrentUserAuthorOfCollection,
        collectionId
    }: ICollectionInfoProps) {

    const {collectionInfo: styles} = useSx(collectionStyles)

    const navigate = useNavigate()

    return (
        <>
            <Box sx={styles.wrapper}>
                <Typography
                    variant='h1'
                    sx={styles.title}>
                    {title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={styles.tags}>
                    {formattedTags}
                </Typography>
            </Box>
            <Box
                sx={styles.secondWrapper}
            >
                <Typography variant='body2'>by</Typography>
                {authors.map(({_id: authorId, username, avatar, isAdmin}) => {
                    return (
                        <Box
                            sx={styles.authorLinkWrapper}
                            key={authorId}
                            onClick={() => navigate(`/users/${authorId}`)}
                        >
                            <Avatar sx={styles.avatar} src={avatar || ''} alt={username}/>
                            <Box sx={styles.authorContainerWrapper}>
                                {isAdmin ?
                                    <Typography sx={styles.userRole} variant='caption'>Admin</Typography>
                                    :
                                    <Typography sx={styles.userRole} variant='caption'>Author</Typography>
                                }
                                <Typography sx={{ml: 1}} variant='h5'>{username}</Typography>
                            </Box>



                        </Box>
                    )
                })}
                {isCurrentUserAuthorOfCollection &&
                    <Button
                        variant='contained'
                        sx={styles.addNewPostButton}
                    >
                        <NavLink to={`/post/create/${collectionId}`}>
                            Add new post
                        </NavLink>
                    </Button>
                }
            </Box>
        </>
    )
}