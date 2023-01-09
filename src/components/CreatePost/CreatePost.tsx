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
import {useNavigate, useParams} from "react-router-dom";
import setPreviewImage from "../../utils/setPreviewImage";
import convertImageToString from "../../utils/convertImageToString";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {ICollection} from "../../types/collection";
import CreateCollectionModal from "../CreateCollectionModal";

const postSchema = Yup.object({
    title: Yup.string().max(48, "Max title length is 48 symbols"),
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
    collectionId: Yup.string().required()
}).required()



interface IFormData {
    title: string,
    body: string,
    imageList: FileList,
    tags: string,
    collectionId: string
}


export default function CreatePost() {
    const {id: collectionId = ''} = useParams<{ id: string }>()!
    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized

    const [avatarFile, setImageFile] = useState<null | string>(null);
    const [isPostCreating, setIsPostCreating] = useState(false);
    const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);

    const closeModal = () => setIsCreateCollectionModalOpen(false)
    const openModal = () => setIsCreateCollectionModalOpen(true)

    const {data: userCollections = [], isLoading: isUserCollectionsLoading} = collectionsApi.useGetCurrentQuery({token})

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
                collectionId: collectionIdError
            }
        }
    } = useForm<IFormData>({
        resolver: yupResolver(postSchema),
        mode: 'all'
    });


    const findIndexOfCollection = (id: string) => userCollections.findIndex(({_id}) => _id === id)
    useEffect(() => void setValue('collectionId', collectionId), []);

    const willSavedInCollectionIndex = !!watch('collectionId') ? findIndexOfCollection(watch('collectionId')) : findIndexOfCollection(collectionId)

    const onSubmit = handleSubmit(async ({title, body, imageList, tags, collectionId}) => {
        const filteredTags = tags.split(' ').filter((str) => str !== '')
        const image = await convertImageToString(imageList)

        await uploadPhoto({title, body, image, tags: filteredTags, collectionId})
    });

    // переробити завантаження аватарки так само як тут
    const uploadPhoto = async (body: {
        title: string,
        body: string,
        image: string,
        tags: string[],
        collectionId: string
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
            <CreateCollectionModal closeModal={closeModal} isModalOpen={isCreateCollectionModalOpen}/>
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
                                    color: !!collectionIdError ? 'red' : 'primary.main'
                                }}
                            >
                                {userCollections[willSavedInCollectionIndex]?.title || 'Select collection'}
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
                                            setValue('collectionId', collection._id)
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
                                    {imageError?.message || (watch('imageList')?.length > 0) ? 'Selected' : 'Select a photo'}
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