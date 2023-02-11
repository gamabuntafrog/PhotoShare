import {
    Box,
    Button,
    Container,
    Grid,
    Input,
    InputLabel,
    OutlinedInput, TextField,
    Typography, useTheme
} from "@mui/material";
import {useForm, useFormState} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import React, {useEffect, useRef, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import setPreviewImage from "../../utils/setPreviewImage";
import convertImageToString from "../../utils/convertImageToString";
import CreateCollectionModal from "../CreateCollectionModal";
import {createPostValidationSchema} from "../../utils/validationSchemas";
import {extendedCollectionsApi, extendedPostsApi} from "../../redux/api/rootApi";
import CollectionsInfo from "./CreatePostComponents/CollectionsInfo";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import useSx from "../../hooks/useSx";
import createPostStyles, {StyledImage} from "./createPostStyles";
import useShortTranslation from "../../hooks/useShortTranslation";


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

    const imageInputLabelRef = useRef<null | HTMLLabelElement>(null)

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

    const registeredImageList = register('imageList')

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
            await createPost({body}).unwrap().then(() => navigate('/'))

        } catch (e) {
            setIsPostCreating(false)
        }
    }

    const closeModal = () => setIsCreateCollectionModalOpen(false)
    const openModal = () => setIsCreateCollectionModalOpen(true)

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

    // const a = (navigate) => {
    //     navigate()
    // }

    const styles = useSx(createPostStyles)
    const t = useShortTranslation({componentNameKey: 'CreatePost'})

    const willSavedInCollectionTitle = userCollections[watch("collectionIdIndex")]?.title || t('selectCollectionButton')
    const onImageInputLabelClick = () => imageInputLabelRef.current?.click()

    const titleLabel = titleError?.message ? t(titleError.message) : t('titleLabel')
    const bodyLabel = bodyError?.message ? t(bodyError.message) : t('bodyLabel')
    const imageLabel = imageError?.message ? t(imageError.message) : Boolean(imageFile) ? t('selectedImageLabel') : t('imageLabel')
    const tagsLabel = tagsError?.message ? t(tagsError.message) : t('tagsLabel')

    if (isPostCreating || isUserCollectionsLoading) return <FullScreenLoader/>

    return (
        <Container
            sx={styles.createPostContainer}
        >
            <CreateCollectionModal
                refetch={refetchCallback}
                closeModal={closeModal}
                isModalOpen={isCreateCollectionModalOpen}
            />
            <Box
                sx={styles.formWrapper}
            >
                <form
                    style={styles.form}
                    onSubmit={onSubmit}
                >
                    <Grid container sx={styles.formInputsWrapper}
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
                        <Grid sx={{...styles.breakableText, my: 2}} item>
                            {titleError &&
                                <InputLabel htmlFor='title' error={!!titleError} sx={styles.formInputLabel}>
                                    {titleLabel}
                                </InputLabel>
                            }
                            <Input
                                placeholder={t('titlePlaceholder')}
                                error={!!titleError}
                                fullWidth id='title'
                                {...register('title')}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel htmlFor='body' error={!!bodyError} sx={styles.formInputLabel}>
                                {bodyLabel}
                            </InputLabel>
                            <TextField
                                placeholder={t('bodyPlaceholder')}
                                multiline
                                maxRows={6}
                                minRows={3}
                                error={!!bodyError}
                                fullWidth
                                id='body'
                                {...register('body')}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type='button'
                                sx={{my: 1}}
                                color={!!imageError ? 'error' : 'primary'}
                                fullWidth
                                onClick={onImageInputLabelClick}
                            >
                                <InputLabel
                                    error={!!imageError}
                                    sx={styles.imageButtonInputLabel}
                                    htmlFor='imageList'
                                    ref={imageInputLabelRef}
                                >
                                    {imageLabel}
                                </InputLabel>
                                <input
                                    {...registeredImageList}
                                    id='imageList'
                                    type='file'
                                    accept="image/*"
                                    onChange={(e) => {
                                        registeredImageList.onChange(e)
                                        if (e.target.files) {
                                            setPreviewImage(e.target.files, setImageFile)
                                        }
                                    }}
                                    hidden
                                />
                            </Button>
                        </Grid>
                        <Grid item>
                            <InputLabel
                                htmlFor='tags'
                                error={!!tagsError}
                                sx={styles.formInputLabel}>
                                {tagsLabel}
                            </InputLabel>
                            <OutlinedInput
                                placeholder={t('tagsPlaceholder')}
                                error={!!tagsError}
                                fullWidth
                                id='tags'
                                {...register('tags')}
                            />
                        </Grid>
                        <Button
                            variant='contained'
                            disabled={isErrors}
                            type='submit'
                            sx={styles.uploadButton}
                        >
                            {isErrors ? t('submitButtonDisabled') : t('submitButton')}
                        </Button>
                    </Grid>
                </form>
                <Box
                    sx={styles.imageWrapper}>
                    <StyledImage src={imageFile || ''}/>
                </Box>
            </Box>
        </Container>
    )
}