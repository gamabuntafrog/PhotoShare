import {
    Accordion, AccordionDetails, AccordionSummary, Avatar,
    Box, Button,
    Container, IconButton,
    ImageList, ListItem, ListItemAvatar, ListItemText, Modal, Switch,
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
import AddUserToCollection from "./CollectionComponents/AddAuthorToCollection/AddUserToCollection";
import CollectionInfo from "./CollectionComponents/CollectionInfo";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthorsInfo from "./CollectionComponents/AuthorsInfo";
import CloseIcon from '@mui/icons-material/Close';
import useAnchorEl from "../../hooks/useAnchorEl";
import StyledCustomMenu from "../../library/CustomMenu/StyledCustomMenu";
import StyledCustomMenuItem from "../../library/CustomMenu/StyledCustomMenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomOpenMenuButton from "../../library/CustomMenu/CustomOpenMenuButton";
import ViewersInfo from "./CollectionComponents/ViewersInfo";


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {
        data,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id})

    const [posts, postsActions] = usePostsActions({initPosts: data?.collection.posts})

    console.log(data)
    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [changeIsPrivate] = extendedCollectionsApi.useChangeIsPrivateMutation()

    const styles = useSx(collectionStyles)

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };


    const openAddUserAccordion = () => setExpanded('panel1')
    const openSettingsModal = () => setIsSettingsOpen(true)
    const closeSettingsModal = () => setIsSettingsOpen(false)

    if (isCollectionLoading) return <FullScreenLoader/>

    if (collectionError || !data) {
        return (
            <Container sx={styles.errorContainer}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }


    const {collection, currentUserStatus} = data
    const {_id: collectionId, title, tags, authors, isPrivate, viewers} = collection

    const {isAuthor, isAdmin} = currentUserStatus

    const formattedTags = tags.join(' ')


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
                    <Box sx={styles.closeIconWrapper}>
                        <Typography variant='body1' sx={styles.title}>Settings</Typography>

                        <IconButton onClick={closeSettingsModal} sx={styles.closeIcon} color='error'>
                            <CloseIcon/>
                        </IconButton>
                    </Box>

                    <Box sx={styles.modalContainer}>
                        <Accordion
                            sx={styles.accordionWrapper}
                            expanded={expanded === 'panel1'}
                            onChange={handleChange('panel1')}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color='primary'/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    Add users
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AddUserToCollection
                                    collectionId={collectionId}
                                />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion
                            sx={styles.accordionWrapper}
                                   expanded={expanded === 'panel2'}
                                   onChange={handleChange('panel2')}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color='primary'/>}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    Authors
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AuthorsInfo
                                    authors={authors}
                                    collectionId={collectionId}
                                    openAddUserAccordion={openAddUserAccordion}
                                />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion
                            sx={styles.accordionWrapper}
                            expanded={expanded === 'panel3'}
                            onChange={handleChange('panel3')}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color='primary'/>}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    Viewers
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ViewersInfo openAddUserAccordion={openAddUserAccordion} viewers={viewers} collectionId={collectionId}/>
                            </AccordionDetails>
                        </Accordion>
                        <Box sx={styles.togglePrivateContainer}>
                            <Box>
                                <Typography>Private mode</Typography>
                                <Typography variant='caption' sx={{color: 'text.secondary'}}>
                                    Make your collection invisible for non-viewers and non-authors
                                </Typography>
                            </Box>
                            <Switch
                                checked={isPrivate}
                                onClick={() => changeIsPrivate({collectionId})}
                            />
                        </Box>
                        <Box sx={{
                            px: 1,
                        }}>
                            <Button
                                // onClick={}
                                color='error'
                                variant='contained'
                            >
                                Delete collection
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Box sx={styles.collectionWrapper}>
                {isAuthor &&
                    <>
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