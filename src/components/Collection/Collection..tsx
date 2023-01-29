import {
    Accordion, AccordionDetails, AccordionSummary, Avatar,
    Box, Button,
    Container, IconButton,
    ImageList, ListItem, ListItemAvatar, ListItemText, Modal,
    Typography
} from "@mui/material";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PostItem from "../PostItem";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedUsersApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import {ICurrentUser} from "../../types/user";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import collectionStyles from "./collectionStyles";
import AddAuthorToCollection from "./CollectionComponents/AddAuthorToCollection/AddAuthorToCollection";
import DeleteAuthorFromCollectionModal from "./CollectionComponents/DeleteAuthorFromCollectionModal";
import CollectionContextMenu from "./CollectionComponents/CollectionContextMenu";
import CollectionInfo from "./CollectionComponents/CollectionInfo";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthorsInfo from "./CollectionComponents/AuthorsInfo";
import CloseIcon from '@mui/icons-material/Close';



export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {_id: currentUserId} = useAppSelector((state) => state.userReducer.user) as ICurrentUser

    const {
        data: collection,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id})

    const [posts, postsActions] = usePostsActions({initPosts: collection?.posts})

    console.log(collection)
    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));


    const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
    const [isDeleteAuthorModalOpen, setIsDeleteAuthorModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [deleteCurrentUserFromCollection] = extendedCollectionsApi.useDeleteCurrentUserFromCollectionMutation()
    const [changeIsPrivate] = extendedCollectionsApi.useChangeIsPrivateMutation()

    const styles = useSx(collectionStyles)

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    if (isCollectionLoading) return <FullScreenLoader/>

    if (collectionError || !collection) {
        return (
            <Container sx={styles.errorContainer}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }

    const {_id: collectionId, title, tags, authors, isAuthor, isAdmin, isPrivate} = collection
    const formattedTags = tags.join(' ')

    const closeAddAuthorModal = () => setIsAddAuthorModalOpen(false)
    const openAddAuthorModal = () => setIsAddAuthorModalOpen(true)
    const closeDeleteAuthorModal = () => setIsDeleteAuthorModalOpen(false)
    const openDeleteAuthorModal = () => setIsDeleteAuthorModalOpen(true)
    const openSettingsModal = () => setIsSettingsOpen(true)
    const closeSettingsModal = () => setIsSettingsOpen(false)

    const collectionPostsListCols = isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5

    return (
        <Box>
            <Modal
                open={isSettingsOpen}
                onClose={closeSettingsModal}
                sx={styles.backdrop}
            >
                <Box
                    sx={styles.modalWrapper}
                >
                    <IconButton onClick={closeSettingsModal} sx={styles.closeIcon} color='error'>
                        <CloseIcon/>
                    </IconButton>

                    <Typography variant='h2' sx={styles.title}>Settings</Typography>

                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Add authors
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AddAuthorToCollection
                                collectionId={collectionId}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Authors
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AuthorsInfo authors={authors} collectionId={collectionId}/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Viewers
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {authors.map(({_id, avatar, username, isAdmin}) => {
                                return (
                                    <ListItem key={_id}>
                                        <ListItemAvatar>
                                            <NavLink to={`/users/${_id}`}>
                                                <Avatar
                                                    sx={styles.deleteAuthorModal.avatar}
                                                    src={avatar || ''}
                                                />
                                            </NavLink>
                                        </ListItemAvatar>
                                        <ListItemText
                                            sx={styles.deleteAuthorModal.authorUsernameWrapper}
                                        >
                                            <NavLink to={`/users/${_id}`}>
                                                {username}
                                            </NavLink>
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Box sx={{
                        my: 2
                    }}>
                        <Button
                            onClick={() => changeIsPrivate({collectionId})}>{isPrivate ? 'Make unprivate' : 'Make private'}</Button>
                    </Box>
                </Box>
            </Modal>

            <DeleteAuthorFromCollectionModal
                isDeleteAuthorModalOpen={isDeleteAuthorModalOpen}
                closeDeleteAuthorModal={closeDeleteAuthorModal}
                authors={collection.authors}
                currentUserId={currentUserId}
                collectionId={collectionId}
            />
            <Box sx={styles.collectionWrapper}>
                {isAuthor &&
                    <>
                        <CollectionContextMenu
                            isAdmin={isAdmin}
                            isAuthor={isAuthor}
                            openAddAuthorModal={openAddAuthorModal}
                            openDeleteAuthorModal={openDeleteAuthorModal}
                            deleteCurrentUserFromCollectionCallback={() => deleteCurrentUserFromCollection({collectionId})}
                            collectionId={collectionId}
                        />
                        <Button onClick={openSettingsModal}>true settings</Button>
                    </>
                }
                <CollectionInfo
                    title={title}
                    formattedTags={formattedTags}
                    authors={authors}
                    isCurrentUserAuthorOfCollection={isAuthor}
                    collectionId={collectionId}
                />
            </Box>
            <ImageList
                variant="masonry"
                sx={styles.collectionPostsList}
                gap={12}
                cols={collectionPostsListCols}
            >
                {posts.map((post) => <PostItem
                    postsActions={postsActions}
                    post={post}
                    key={post._id}
                />)}
            </ImageList>

        </Box>
    )
}