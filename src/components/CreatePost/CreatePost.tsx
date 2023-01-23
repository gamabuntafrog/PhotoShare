import {
    Box,
    Button,
    Container,
    FormControl,
    FormGroup,
    Grid,
    Input,
    InputLabel, Menu, MenuItem, Modal,
    OutlinedInput,
    Typography, useTheme
} from "@mui/material";
import * as Yup from "yup";
import {useForm, useFormState} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import React, {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import setPreviewImage from "../../utils/setPreviewImage";
import convertImageToString from "../../utils/convertImageToString";
import CreateCollectionModal from "../CreateCollectionModal";
import {createPostValidationSchema} from "../../utils/validationSchemas";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";
import CollectionsInfo from "../CollectionsInfo";
import FullScreenLoader from "../Loaders/FullScreenLoader";


export const breakableText = {wordBreak: 'break-all', whiteSpace: 'break-spaces'}

interface IFormData {
    title: string,
    body: string,
    imageList: FileList,
    tags: string,
    collectionIdIndex: number
}


export default function CreatePost() {
    const {id: collectionId = ''} = useParams<{ id: string }>()!

    const [imageFile, setImageFile] = useState<null | string>(null);
    const [isPostCreating, setIsPostCreating] = useState(false);
    const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);

    const {
        data: userCollections = [],
        isLoading: isUserCollectionsLoading,
        refetch: refetchCollections
    } = extendedCollectionsApi.useGetCurrentUserCollectionsQuery()

    const [createPost] = extendedPostsApi.useCreatePostMutation()

    const navigate = useNavigate()

    const findIndexOfCollection = (id: string) => userCollections.findIndex(({_id}) => _id === id)

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: {
            errors: {
                title: titleError,
                body: bodyError,
                imageList: imageError,
                tags: tagsError,
                collectionIdIndex: collectionIdIndexError
            }
        },
        clearErrors
    } = useForm<IFormData>({
        resolver: yupResolver(createPostValidationSchema),
        mode: 'all',
        defaultValues: {
            title: '',
            body: '',
            collectionIdIndex: -1
        }
    });

    const isErrors = !!(titleError || bodyError || imageError || tagsError || collectionIdIndexError)

    const onSubmit = handleSubmit(async ({title, body, imageList, tags, collectionIdIndex}) => {
        const filteredTags = tags.split(' ').filter((str) => str !== '')
        const image = await convertImageToString(imageList)
        const collectionId = userCollections![collectionIdIndex]._id

        await uploadPost({title, body, image, tags: filteredTags, collectionId})
    });

    const uploadPost = async (body: {
        title: string,
        body: string,
        image: string,
        tags: string[],
        collectionId: string
    }) => {
        setIsPostCreating(true)

        try {
            await createPost({body}).unwrap()
            navigate('/')
        } catch (e) {
            setIsPostCreating(false)
        }
    }

    const closeModal = () => setIsCreateCollectionModalOpen(false)
    const openModal = () => setIsCreateCollectionModalOpen(true)

    useEffect(() => setPreviewImage(watch('imageList'), setImageFile), [watch('imageList')]);

    useEffect(() => {
        setValue('collectionIdIndex', findIndexOfCollection(collectionId))

        // логіка перевірки чи існує колекція у користувача
        if (findIndexOfCollection(collectionId) >= 0) {
            clearErrors('collectionIdIndex')
        }
    }, [collectionId, userCollections.length]);

    const refetchCallback = () => {
        refetchCollections()
    }
    const selectCollectionCallback = (collectionId: string) => {
        navigate(`/post/create/${collectionId}`)
    }
    const theme = useTheme()

    const willSavedInCollectionTitle = userCollections[watch("collectionIdIndex")]?.title || 'Select collection'

    if (isPostCreating || isUserCollectionsLoading) return <FullScreenLoader/>

    return (
        <Container
            sx={{
                py: 3,
                height: '92vh',
                overflowY: 'auto'
            }}
        >
            <CreateCollectionModal
                refetch={refetchCallback}
                closeModal={closeModal}
                isModalOpen={isCreateCollectionModalOpen}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    [theme.breakpoints.down('tablet')]: {
                        flexDirection: 'column'
                    }
                }}
            >
                <form
                    style={{width: '300px'}}
                    onSubmit={onSubmit}
                >
                    <Grid container sx={{
                        flexDirection: 'column'
                    }}
                    >
                        <Grid item ml='auto'>
                            <CollectionsInfo
                                selectCollection={selectCollectionCallback}
                                collections={userCollections}
                                openModal={openModal}
                                collectionIdError={!!collectionIdIndexError}
                                willSavedInCollectionTitle={willSavedInCollectionTitle}
                            />
                        </Grid>
                        <Grid sx={{...breakableText}} item>
                            <InputLabel htmlFor='title' error={!!titleError} sx={{my: 1, ...breakableText}}>
                                {titleError?.message || 'Title'}
                            </InputLabel>
                            <OutlinedInput error={!!titleError} fullWidth id='title' {...register('title')}/>
                        </Grid>
                        <Grid item>
                            <InputLabel htmlFor='body' error={!!bodyError} sx={{my: 1, ...breakableText}}>
                                {bodyError?.message || 'Body'}
                            </InputLabel>
                            <OutlinedInput error={!!bodyError} fullWidth id='body' {...register('body')}/>
                        </Grid>
                        <Grid item>
                            <Button
                                type='button'
                                sx={{my: 1}}
                                color={!!imageError ? 'error' : 'primary'}
                                fullWidth
                            >
                                <InputLabel
                                    error={!!imageError}
                                    sx={{cursor: 'pointer', color: 'inherit', width: '100%'}}
                                    htmlFor='imageList'
                                >
                                    {imageFile ? 'Selected' : 'Select a photo'}
                                </InputLabel>
                                <input
                                    {...register('imageList')}
                                    id='imageList'
                                    type='file'
                                    accept="image/*"
                                    hidden
                                />
                            </Button>
                        </Grid>
                        <Grid item>
                            <InputLabel htmlFor='tags' error={!!tagsError} sx={{my: 1, ...breakableText}}>
                                {tagsError?.message || 'Tags'}
                            </InputLabel>
                            <OutlinedInput error={!!tagsError} fullWidth id='tags' {...register('tags')}/>
                        </Grid>
                        <Button disabled={isErrors} type='submit' sx={{my: 1, justifySelf: 'center'}}>
                            Upload
                        </Button>
                    </Grid>
                </form>
                <Box
                    sx={{
                        [theme.breakpoints.up('tablet')]: {
                            ml: 3,
                            '& img': {width: '400px'},
                        },
                        [theme.breakpoints.down('tablet')]: {
                            '& img': {width: '90%'}
                        }
                    }}>
                    < img
                        style={{maxHeight: '70vh',  objectFit: 'contain'}} src={imageFile || ''}/>
                </Box>
            </Box>
        </Container>
    )
}