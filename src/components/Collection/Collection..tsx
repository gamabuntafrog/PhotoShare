import {
    Box, Button,
    Container,
    ImageList,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PostItem from "../PostItem";
import React, {useEffect, useState} from "react";
import usePostsActions from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import collectionStyles from "./collectionStyles";
import useShortTranslation from "../../hooks/useShortTranslation";
import StandardHelmet from "../StandardHelmet";
import extendedCollectionsApi from "../../redux/api/extendedCollectionsApi";

const CollectionInfo = React.lazy(() => import( "./CollectionComponents/CollectionInfo"));
const CollectionSettings = React.lazy(() => import( "./CollectionComponents/CollectionSettings"));

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

    if (isCollectionLoading) return <FullScreenLoader withMeta/>

    if (collectionError || !data) {
        return (
            <>
                <StandardHelmet keyOfOther='error'/>
                <Container sx={styles.errorContainer}>
                    <Typography variant='h1' sx={{textAlign: 'center'}}>{t('errorMessage')}</Typography>
                </Container>
            </>
        )
    }

    const {collection, currentUserStatus} = data
    const {_id: collectionId, title, tags, authors, isPrivate} = collection

    const {isAuthor, isAdmin} = currentUserStatus

    const formattedTags = tags.join(' ')

    const headTitleKey = isPrivate ? 'privateCollection' : 'publicCollection'

    const collectionPostsListCols = isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5

    return (
        <>
            <StandardHelmet keyOfTitle={headTitleKey}/>
            <Box>
                {(isAuthor || isAdmin) && (
                    <React.Suspense fallback={<FullScreenLoader fixed withMeta/>}>
                        <CollectionSettings
                            data={data}
                            closeSettingsModal={closeSettingsModal}
                            isSettingsOpen={isSettingsOpen}
                        />
                    </React.Suspense>
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
        </>
    )
}