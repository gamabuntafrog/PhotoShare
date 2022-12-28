import {
    Box,
    Button,
    Container,
    FormControl,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {postsApi} from "../../redux/api/postsApi";
import {useNavigate} from "react-router-dom";
import setPreviewImage from "../../utils/setPreviewImage";
import convertImageToString from "../../utils/convertImageToString";

const postSchema = Yup.object({
    title: Yup.string().max(48, "Max title length is 48 symbols").required(),
    body: Yup.string().max(256, "Max body length is 48 symbols").required(),
    imageList: Yup.mixed().required('image is required').test('required', 'file is required', (value) => {
        return value && value[0]
    }).test('size', 'max file size is 20mb', (value) => {
        const twentyMB = 20000000

        return value && value[0] && value[0].size < twentyMB
    }),
    tags: Yup.string().min(3, "min 1 tag ang length 3 symbols").required().test('validation', 'every tag must have "#"', (string) => {
        const check = string?.split(' ').find((str) => str[0] !== '#' || str.length < 2)

        return !check
    })
}).required()

interface IFormData {
    title: string,
    body: string,
    imageList: FileList,
    tags: string
}

export default function CreatePost() {
    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized
    const [createPost] = postsApi.useCreatePostMutation()
    const [avatarFile, setImageFile] = useState<null | string>(null);
    const [isPostCreating, setIsPostCreating] = useState(false);

    const navigate = useNavigate()

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: {errors: {title: titleError, body: bodyError, imageList: imageError, tags: tagsError}}
    } = useForm<IFormData>({
        resolver: yupResolver(postSchema),
        mode: 'all'
    });

    const onSubmit = handleSubmit(async ({title, body, imageList, tags}) => {
        const filteredTags = tags.split(' ').filter((str) => str !== '')
        const image = await convertImageToString(imageList)

        await uploadPhoto({title, body, image, tags: filteredTags})
    });
    // переробити завантаження аватарки так само як тут
    const uploadPhoto = async (body: {
        title: string,
        body: string,
        image: string,
        tags: string[]
    }) => {
        setIsPostCreating(true)

        const result = await createPost({body, token})

        navigate('/')
    }

    useEffect(() => setPreviewImage(watch('imageList'), setImageFile), [watch('imageList')]);

    if (isPostCreating) {
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
                pt: 3
            }}
        >
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
                                <InputLabel error={!!imageError}
                                            sx={{cursor: 'pointer', color: 'inherit', width: '100%'}}
                                            htmlFor='imageList'>
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