import {Box, Button, Container, FormGroup, Input, InputLabel, OutlinedInput} from "@mui/material";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {ChangeEvent, useState} from "react";
import {useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {postsApi} from "../../redux/api/postsApi";
import {useNavigate} from "react-router-dom";

const postSchema = Yup.object({
    title: Yup.string().max(48, "Max title length is 48 symbols").required(),
    body: Yup.string().max(256, "Max body length is 48 symbols").required(),
    image: Yup.mixed().required('Image is required'),
    tags: Yup.string().min(3, "Minimum 1 tag ang length 3 symbols").required()
}).required()

interface IFormData {
    title: string,
    body: string,
    image: FileList,
    tags: string
}

export default function CreatePost() {
    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized
    const [createPost] = postsApi.useCreatePostMutation()
    const [avatarFile, setAvatarFile] = useState<null | string>(null);

    const navigate = useNavigate()

    const {register, setValue, handleSubmit, formState: {errors: {title: titleError, body: bodyError, image: imageError, tags: tagsError}}} = useForm<IFormData>({
        resolver: yupResolver(postSchema),
        mode: 'all'
    });

    const onSubmit = handleSubmit(({title, body, image, tags}) => {
        console.log(title, body, image, tags)
        // uploadPhoto({title, body, image: avatarFile as string, tags: tags.split(' ')})
    });

    const getPostImage = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files
        const avatarFile = !!files && files[0]

        if (!avatarFile) return

        const setPreviewImage = () => {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                const {result} = e.target as FileReader
                if (result) {
                    setAvatarFile(result as string)
                }
            }
            fileReader.readAsDataURL(avatarFile);
        }

        setPreviewImage()
    }

    const uploadPhoto = async (body: {
        title: string,
        body: string,
        image: string,
        tags: string[]
    }) => {
        const result = await createPost({body, token})

        navigate('/')
    }
    console.log(imageError)
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <FormGroup
                    sx={{width: '300px'}}
                >
                    <InputLabel htmlFor='title' error={!!titleError} sx={{my: 1}}>
                        Title
                    </InputLabel>
                    <OutlinedInput id='title' {...register('title')}/>
                    <InputLabel htmlFor='body' error={!!bodyError} sx={{my: 1}}>
                        Body
                    </InputLabel>
                    <OutlinedInput id='body' {...register('body')}/>
                    <Button
                        type='button'
                        sx={{my: 1}}
                        color={!!imageError ? 'error' : 'primary'}
                        //
                    >
                        <InputLabel error={!!imageError} sx={{cursor: 'pointer', color: 'inherit', width: '100%'}} htmlFor='image'>
                            Select a photo
                        </InputLabel>
                        <input
                            {...register('image')}
                            id='image'
                            type='file'
                            accept="image/*"
                            hidden
                            onChange={getPostImage}
                        />
                    </Button>
                    <InputLabel htmlFor='tags' error={!!tagsError} sx={{my: 1}}>
                        Tags
                    </InputLabel>
                    <OutlinedInput id='tags' {...register('tags')}/>
                    <Button type='submit' onClick={onSubmit} sx={{my: 1}}>
                        Отправить
                    </Button>
                </FormGroup>
                <Box
                    sx={{ml: 3}}
                >
                    <img width='400' src={avatarFile || ''}/>
                </Box>
            </Box>
        </Container>
    )
}