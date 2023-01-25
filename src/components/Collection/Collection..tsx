import {
    Box,
    Container,
    ImageList,
    Typography
} from "@mui/material";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import cssStyles from "../Posts/Posts.module.css";
import PostItem from "../PostItem";
import React, {useEffect, useState} from "react";
import {extendedCollectionsApi, extendedUsersApi} from "../../redux/api/rootApi";
import usePostsActions from "../../hooks/usePostsActions";
import {ICurrentUser} from "../../types/user";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import collectionStyles from "./collectionStyles";
import AddAuthorToCollectionModal from "./CollectionComponents/AddAuthorToCollectionModal";
import DeleteAuthorFromCollectionModal from "./CollectionComponents/DeleteAuthorFromCollectionModal";
import CollectionContextMenu from "./CollectionComponents/CollectionContextMenu";
import CollectionInfo from "./CollectionComponents/CollectionInfo";



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

    const [deleteColl] = extendedCollectionsApi.useDeleteCollectionMutation()
    const [deleteCurrentUserFromCollection] = extendedCollectionsApi.useDeleteCurrentUserFromCollectionMutation()

    const deleteCollection = async () => {
        await deleteColl({id})
    }

    const styles = useSx(collectionStyles)

    if (isCollectionLoading) return <FullScreenLoader/>

    if (collectionError || !collection) {
        return (
            <Container className={cssStyles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }

    const {_id: collectionId, title, tags, authors} = collection
    const formattedTags = tags.join(' ')
    const isCurrentUserAuthorOfCollection = authors.some(({_id}) => currentUserId === _id)

    const closeAddAuthorModal = () => setIsAddAuthorModalOpen(false)
    const openAddAuthorModal = () => setIsAddAuthorModalOpen(true)
    const closeDeleteAuthorModal = () => setIsDeleteAuthorModalOpen(false)
    const openDeleteAuthorModal = () => setIsDeleteAuthorModalOpen(true)

    const collectionPostsListCols = isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5

    return (
        <Box>
            <AddAuthorToCollectionModal
                isAddAuthorModalOpen={isAddAuthorModalOpen}
                closeAddAuthorModal={closeAddAuthorModal}
                collectionId={collectionId}
            />
            <DeleteAuthorFromCollectionModal
                isDeleteAuthorModalOpen={isDeleteAuthorModalOpen}
                closeDeleteAuthorModal={closeDeleteAuthorModal}
                authors={collection.authors}
                currentUserId={currentUserId}
                collectionId={collectionId}
            />
            <Box sx={styles.collectionWrapper}>
                {isCurrentUserAuthorOfCollection &&
                    <CollectionContextMenu
                        openAddAuthorModal={openAddAuthorModal}
                        openDeleteAuthorModal={openDeleteAuthorModal}
                        deleteCurrentUserFromCollectionCallback={() => deleteCurrentUserFromCollection({collectionId})}
                        deleteCollection={deleteCollection}
                    />
                }
                <CollectionInfo
                    title={title}
                    formattedTags={formattedTags}
                    authors={authors}
                    isCurrentUserAuthorOfCollection={isCurrentUserAuthorOfCollection}
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