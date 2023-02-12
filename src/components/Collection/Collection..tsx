import {
    Box, Button,
    Container, IconButton,
    ImageList,
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
import CollectionInfo from "./CollectionComponents/CollectionInfo";
import CollectionSettings from "./CollectionComponents/CollectionSettings";
import useShortTranslation from "../../hooks/useShortTranslation";


export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {
        data,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id})

    const [posts, postsActions] = usePostsActions({initPosts: data?.collection.posts})

    const theme = useTheme()
    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const styles = useSx(collectionStyles)

    const openSettingsModal = () => setIsSettingsOpen(true)
    const closeSettingsModal = () => setIsSettingsOpen(false)


    const t = useShortTranslation({componentNameKey: "Collection"})

    if (isCollectionLoading) return <FullScreenLoader/>

    if (collectionError || !data) {
        return (
            <Container sx={styles.errorContainer}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>{t('errorMessage')}</Typography>
            </Container>
        )
    }


    const {collection, currentUserStatus} = data
    const {_id: collectionId, title, tags, authors} = collection

    const {isAuthor, isAdmin} = currentUserStatus

    const formattedTags = tags.join(' ')


    const collectionPostsListCols = isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5

    return (
        <Box>
            {(isAuthor || isAdmin) && (
                <CollectionSettings
                    data={data}
                    closeSettingsModal={closeSettingsModal}
                    isSettingsOpen={isSettingsOpen}
                />
            )}
            <Box sx={styles.collectionWrapper}>
                {(isAuthor || isAdmin) &&
                    <Button sx={styles.openButton} variant='contained' onClick={openSettingsModal}>
                        {t('openSettingsButton')}
                    </Button>
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