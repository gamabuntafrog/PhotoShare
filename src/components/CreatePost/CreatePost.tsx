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
    Typography
} from "@mui/material";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {postsApi} from "../../redux/api/postsApi";
import {useNavigate} from "react-router-dom";
import setPreviewImage from "../../utils/setPreviewImage";
import convertImageToString from "../../utils/convertImageToString";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {ICollection} from "../../types/collection";

const postSchema = Yup.object({
    title: Yup.string().max(48, "Max title length is 48 symbols").required(),
    body: Yup.string().max(256, "Max body length is 48 symbols"),
    imageList: Yup.mixed().required('image is required').test('required', 'file is required', (value) => {
        return value && value[0]
    }).test('size', 'max file size is 20mb', (value) => {
        const twentyMB = 20000000

        return value && value[0] && value[0].size < twentyMB
    }),
    tags: Yup.string().min(3, "min 1 tag ang length 3 symbols").required().test('validation', 'every tag must have "#"', (string) => {
        const check = string?.split(' ').find((str) => str[0] !== '#' || str.length < 2)

        return !check
    }),
    collection: Yup.object({
        title: Yup.string().required(),
        tags: Yup.array().required(),
        author: Yup.string().required(),
        _id: Yup.string().required()
    }).required()
}).required()

const collectionSchema = Yup.object({
    title: Yup.string().max(48, "Max title length is 48 symbols").required(),
    tags: Yup.string().min(3, "min 1 tag ang length 3 symbols").required().test('validation', 'every tag must have "#"', (string) => {
        const check = string?.split(' ').find((str) => str[0] !== '#' || str.length < 2)
        return !check
    })
}).required()

interface IFormData {
    title: string,
    body: string,
    imageList: FileList,
    tags: string,
    collection: ICollection
}

interface ICollectionFormData {
    title: string,
    tags: string
}

export function CreateCollection({closeModal, isModalOpen}: { closeModal: () => void, isModalOpen: boolean }) {
    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized
    const [createCollection, {data, isLoading: isCollectionCreatingLoading}] = collectionsApi.useCreateMutation()

    const {
        register,
        watch,
        setValue,
        reset: resetForm,
        handleSubmit,
        formState: {errors: {title: titleError, tags: tagsError}}
    } = useForm<ICollectionFormData>({
        resolver: yupResolver(collectionSchema),
        mode: 'all'
    });

    const onSubmit = handleSubmit(({title, tags}) => {
        const formattedTags = tags.split(' ')
        console.log({title, tags})

        createNewUserCollection({title, tags: formattedTags})
    })

    const createNewUserCollection = async (body: { title: string, tags: string[] }) => {

        await createCollection({token, body})

        resetForm()
        closeModal()
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container
                sx={{
                    bgcolor: 'background.default',
                    mx: 2,
                    py: 2,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCollectionCreatingLoading ? 'center' : 'center',
                    justifyContent: 'center',
                    minHeight: '50vh'
                }}
                maxWidth='tablet'

            >
                {isCollectionCreatingLoading ?
                    <Typography color='text.standard' variant='h1'>Loading...</Typography>
                    :
                    <>
                        <Button color='error'  sx={{alignSelf: 'end'}} onClick={closeModal}>Close</Button>
                        <Typography color='text.standard' textAlign='center' mx='auto' my={2} variant='h3'>Create new collection</Typography>
                        <form style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '90%',
                        }} onSubmit={onSubmit}>
                            <InputLabel htmlFor='title' error={!!titleError} sx={{my: 1}}>
                                {titleError?.message || 'Title'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='title' {...register('title')}/>
                            <InputLabel htmlFor='tags' error={!!tagsError} sx={{my: 1}}>
                                {tagsError?.message || 'Tags'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='tags' {...register('tags')}/>
                            <Button type='submit' variant='outlined' sx={{alignSelf: 'end', mt: 2}}>Create</Button>
                        </form>

                    </>
                }
            </Container>
        </Modal>
    )
}

export default function CreatePost() {
    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized

    const [avatarFile, setImageFile] = useState<null | string>(null);
    const [isPostCreating, setIsPostCreating] = useState(false);
    const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);

    const closeModal = () => setIsCreateCollectionModalOpen(false)
    const openModal = () => setIsCreateCollectionModalOpen(true)

    const {data: userCollections = [], isLoading: isUserCollectionsLoading} = collectionsApi.useGetCurrentQuery({token})
    // console.log(userCollections)
    const [createPost] = postsApi.useCreatePostMutation()


    const navigate = useNavigate()


    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: {
            errors: {
                title: titleError,
                body: bodyError,
                imageList: imageError,
                tags: tagsError,
                collection: collectionError
            }
        }
    } = useForm<IFormData>({
        resolver: yupResolver(postSchema),
        mode: 'all'
    });

    const willSavedInCollection = watch('collection')
    // console.log('collectionERror: ',collectionError)
    // console.log(willSavedInCollection)

    const onSubmit = handleSubmit(async ({title, body, imageList, tags, collection}) => {
        const filteredTags = tags.split(' ').filter((str) => str !== '')
        const image = await convertImageToString(imageList)

        console.log(collection)

        await uploadPhoto({title, body, image, tags: filteredTags, collection})
    });

    // переробити завантаження аватарки так само як тут
    const uploadPhoto = async (body: {
        title: string,
        body: string,
        image: string,
        tags: string[],
        collection: ICollection
    }) => {
        setIsPostCreating(true)

        const result = await createPost({body, token})

        navigate('/')
    }

    useEffect(() => setPreviewImage(watch('imageList'), setImageFile), [watch('imageList')]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isPostCreating || isUserCollectionsLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <Typography variant='h1'>
                    Loading...
                </Typography>
            </Box>
        )
    }

    return (
        <Container
            sx={{
                py: 3,
                height: '92vh',
                overflowY: 'auto'
            }}
        >
            <CreateCollection closeModal={closeModal} isModalOpen={isCreateCollectionModalOpen}/>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <form
                    style={{width: '300px'}}
                    onSubmit={onSubmit}
                >
                    <Grid container flexDirection='column'>
                        <Grid item ml='auto'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    color: !!collectionError ? 'red' : 'primary.main'
                                }}
                            >
                                {willSavedInCollection?.title || 'Select collection'}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{
                                    maxHeight: '300px'
                                }}
                            >
                                {userCollections.map((collection) => {
                                    // console.log(collection)
                                    return (
                                        <MenuItem key={collection._id} onClick={() => {
                                            handleClose()
                                            setValue('collection', collection)
                                        }}>{collection.title}</MenuItem>
                                    )
                                })}
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        handleClose()
                                        openModal()
                                    }}
                                    sx={{mx: 1, my: 1}}
                                >
                                    Create new collection
                                </Button>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <InputLabel htmlFor='title' error={!!titleError} sx={{my: 1}}>
                                {titleError?.message || 'Title'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='title' {...register('title')}/>
                        </Grid>
                        <Grid item>
                            <InputLabel htmlFor='body' error={!!bodyError} sx={{my: 1}}>
                                {bodyError?.message || 'Body'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='body' {...register('body')}/>
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
                                    {imageError?.message || 'Select a photo'}
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
                            <InputLabel htmlFor='tags' error={!!tagsError} sx={{my: 1}}>
                                {tagsError?.message || 'Tags'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='tags' {...register('tags')}/>
                        </Grid>
                        <Button type='submit' sx={{my: 1, justifySelf: 'center'}}>
                            Upload
                        </Button>
                    </Grid>
                </form>
                <Box
                    sx={{ml: 3}}
                >
                    <img style={{maxHeight: '70vh', width: '400px', objectFit: 'contain'}} src={avatarFile || ''}/>
                </Box>
            </Box>
        </Container>
    )
}