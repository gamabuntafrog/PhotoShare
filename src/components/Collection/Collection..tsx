import {
    Box, Button,
    Container,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import usePostsActions from "../../hooks/usePostsActions";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import collectionStyles from "./collectionStyles";
import useShortTranslation from "../../hooks/useShortTranslation";
import StandardHelmet from "../StandardHelmet";
import extendedCollectionsApi from "../../redux/api/extendedCollectionsApi";
import useGetPostsByCollectionIdWithInfiniteScroll
    from "../../redux/api/hooks/useGetPostsByCollectionIdWithInfiniteScroll";
import MasonryPostsDrawer from "../MasonryPostsDrawer";

const CollectionInfo = React.lazy(() => import( "./CollectionComponents/CollectionInfo"));
const CollectionSettings = React.lazy(() => import( "./CollectionComponents/CollectionSettings"));

export default function Collection() {
    const {id = ''} = useParams<{ id: string }>()!

    const {
        data: collectionData,
        isLoading: isCollectionLoading,
        error: collectionError,
    } = extendedCollectionsApi.useGetOneWithPostsAndAuthorQuery({id})

    const {
        data: postsData,
        isLoading: isPostsLoading,
        isError: postsError,
        ref
    } = useGetPostsByCollectionIdWithInfiniteScroll({id})

    const [posts, postsActions] = usePostsActions({initPosts: postsData})

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const styles = useSx(collectionStyles)

    const openSettingsModal = () => setIsSettingsOpen(true)
    const closeSettingsModal = () => setIsSettingsOpen(false)

    const t = useShortTranslation({componentNameKey: "Collection"})

    const [sendRequest] = extendedCollectionsApi.useSendRequestToJoinToCollectionMutation()
    const [unsendRequest] = extendedCollectionsApi.useUnsendRequestToJoinFromCollectionMutation()

    if (isCollectionLoading || isPostsLoading) return <FullScreenLoader withMeta/>

    if (collectionError || !collectionData || postsError) {
        return (
            <>
                <StandardHelmet keyOfOther='error'/>
                <Container sx={styles.errorContainer}>
                    <Typography variant='h1' sx={{textAlign: 'center'}}>{t('errorMessage')}</Typography>
                </Container>
            </>
        )
    }

    const {collection, currentUserStatus} = collectionData
    const {_id: collectionId, title, tags, authors, isPrivate} = collection

    const {isAuthor, isAdmin, isViewer, isInQueue} = currentUserStatus

    const formattedTags = tags.join(' ')

    const headTitleKey = isPrivate ? 'privateCollection' : 'publicCollection'

    return (
        <>
            <StandardHelmet keyOfTitle={headTitleKey}/>
            <Box>
                {(isAuthor || isAdmin) && (
                    <React.Suspense fallback={<FullScreenLoader fixed withMeta/>}>
                        <CollectionSettings
                            data={collectionData}
                            closeSettingsModal={closeSettingsModal}
                            isSettingsOpen={isSettingsOpen}
                        />
                    </React.Suspense>
                )}
                <Box sx={styles.collectionWrapper}>
                    <Box sx={styles.buttonsWrapper}>
                        {(isAuthor || isAdmin) &&
                            <Button sx={{mx: 1}} variant='contained' onClick={openSettingsModal}>
                                {t('openSettingsButton')}
                            </Button>
                        }
                        {(!isAuthor && !isAdmin && !isViewer && !isInQueue) &&
                            <Button sx={{mx: 1}} variant='contained' onClick={() => sendRequest({collectionId: id})}>
                                {t('sendRequest')}
                            </Button>
                        }
                        {(isInQueue) &&
                            <Button sx={{mx: 1}} variant='contained' onClick={() => unsendRequest({collectionId: id})}>
                                {t('unsendRequest')}
                            </Button>
                        }
                    </Box>
                    <React.Suspense fallback={<FullScreenLoader fixed withMeta/>}>
                        <CollectionInfo
                            title={title}
                            formattedTags={formattedTags}
                            authors={authors}
                            isCurrentUserAuthorOfCollection={isAuthor}
                            collectionId={collectionId}
                        />
                    </React.Suspense>
                </Box>
                <MasonryPostsDrawer posts={posts} postsActions={postsActions}/>
                <div ref={ref}/>
            </Box>
        </>
    )
}