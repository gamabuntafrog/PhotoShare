import {
    Avatar,
    Box,
    Button,
    Container,
    FormGroup, Grid,
    Input,
    InputLabel,
    List,
    ListItem,
    OutlinedInput,
    Typography
} from "@mui/material";
import {useParams} from "react-router-dom";
import {usersApi} from "../../redux/api/usersApi";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {ChangeEvent, useEffect, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import convertImageToString from "../../utils/convertImageToString";
import setPreviewImage from "../../utils/setPreviewImage";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';


const userSchema = Yup.object({
    imageList: Yup.mixed(),
    username: Yup.string().min(6).required()
})

interface IFormData {
    imageList: FileList,
    username: string
}

export default function UserProfile() {
    const {id = ''} = useParams<{ id: string }>()!

    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized

    const {data: user, isLoading, error} = usersApi.useGetByIdQuery({id, token, posts: true})
    const [updateUser] = usersApi.useUpdateByIdMutation()
    const [subscribe] = usersApi.useSubscribeMutation()
    const [unsubscribe] = usersApi.useUnsubscribeMutation()

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors: {username: usernameError}}
    } = useForm<IFormData>({
        resolver: yupResolver(userSchema),
        mode: 'all'
    });

    const theme = useTheme();
    const {palette: {primary: {main}}} = theme

    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));

    console.log(isSmallerLaptop)

    const [avatarFile, setAvatarFile] = useState<null | string>(null);
    const [isChangingMode, setIsChangingMode] = useState(false);


    const saveChanges = async ({username, imageList}: { username: string, imageList: FileList }) => {
        const avatar = await convertImageToString(imageList)

        await updateUser({token, body: {username, avatar: avatarFile}})
        setIsChangingMode(false)

        document.location.reload()
    }

    const onSubmit = handleSubmit(({username, imageList}) => saveChanges({username, imageList}));

    const toggleSubscribe = async (userId: string, token: string, isSubscribed: boolean) => {
        isSubscribed ? unsubscribe({userId, token}) : subscribe({userId, token})
    }

    useEffect(() => setPreviewImage(watch('imageList'), setAvatarFile), [watch('imageList')]);

    if (isLoading) {
        return (
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h1'>Loading...</Typography>
            </Box>
        )
    }

    if (!user || error || !currentUser) {
        return (
            <Box sx={{
                bgcolor: 'background.default',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h1'>404</Typography>
            </Box>
        )
    }


    const {avatar, username, age, email, createdAt, _id: userId, posts, subscribes, subscribers} = user
    const avatarURL = avatar.url || avatarFile || ''
    const [month, day, year] = new Date(createdAt).toLocaleDateString('en-US').split('/')
    const formattedCreatedAt = [day, month, year].join('.')

    const {_id: currentUserId} = currentUser

    const isProfileOfCurrentUser = currentUserId === userId
    const isSubscribed = !!subscribers.find((id) => id === currentUserId)

    const turnOnChangingMode = () => setIsChangingMode(true)
    const turnOffChangingMode = () => {
        setAvatarFile(null)
        setValue('username', username)
        setIsChangingMode(false)
    }


    return (
        <Box
            sx={{overflowY: 'auto', height: '92vh'}}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: 3
                }}
            >
                <Avatar sx={{width: '200px', height: '200px'}} src={avatarFile || avatarURL}/>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        ml: 2
                    }}
                >
                    {isChangingMode ? <FormGroup
                            sx={{
                                ml: 1
                            }}
                        >
                            <Button
                                type='button'
                                sx={{my: 1}}
                            >
                                <InputLabel sx={{cursor: 'pointer', color: 'inherit', width: '100%'}} htmlFor='avatar'>
                                    Change avatar
                                </InputLabel>
                                <input
                                    {...register('imageList')}
                                    id='avatar'
                                    type='file'
                                    accept="image/*"
                                    hidden
                                />
                            </Button>

                            <InputLabel error={!!usernameError} htmlFor='username'>Username</InputLabel>
                            <OutlinedInput defaultValue={username} error={!!usernameError} {...register('username')}
                                           id='username' sx={{
                                my: 1
                            }}/>
                            <Button
                                type='button'
                                color='error'
                                sx={{mb: 1}}
                                onClick={turnOffChangingMode}
                            >
                                Cancel Changing
                            </Button>
                            <Button
                                type='submit'
                                onClick={onSubmit}>
                                Save changes
                            </Button>
                        </FormGroup>
                        :
                        <>
                            <Typography variant='h4'>{username}</Typography>
                            <Typography variant='body1'>{email}</Typography>
                            <Box sx={{display: 'flex', margin: 1}}>
                                <Typography sx={{mx: 1}}>{posts.length} posts</Typography>
                                <Typography sx={{mx: 1}}>{subscribes.length} subscribes</Typography>
                                <Typography sx={{mx: 1}}>{subscribers.length} subscribers</Typography>
                            </Box>
                            <Typography>Created at {formattedCreatedAt}</Typography>
                        </>
                    }
                    {isProfileOfCurrentUser && !isChangingMode &&
                        <Button onClick={turnOnChangingMode}>Change profile</Button>}
                    {!isProfileOfCurrentUser &&
                        <Button
                            variant='outlined'
                            sx={{mt: 1}}
                            onClick={() => toggleSubscribe(id, token, isSubscribed)}>
                            {!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                        </Button>
                    }

                </Box>
            </Box>
            <Box
                sx={{
                    width: '95%',
                    // maxWidth: '1000px',
                    mx: 'auto',
                    mb: 2
                }}
            >
                {posts.length > 0 ?
                    <Box
                        sx={{
                            columnCount: isSmallerLaptop ? isSmallerTablet ? 2 : 3 : 5,
                            columnGap: 3,

                        }}
                    >
                        {posts.map((post) => {

                            const {_id: postId, author, title, body, tags, image: {url}} = post
                            const formattedTags = tags.join(' ')

                            return (
                                <Box
                                    key={postId}
                                    sx={{
                                        display: 'inline-block',
                                        width: '100%',
                                        mb: 1,
                                        borderRadius: '8px',

                                    }}
                                >
                                    <img
                                        src={url}
                                        style={{
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            backgroundColor: main
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            px: 0.5
                                        }}
                                    >
                                        <Typography variant='h6'>{title}</Typography>
                                        <Typography variant='body1'>{formattedTags}</Typography>
                                    </Box>
                                </Box>
                            )

                        })}
                    </Box>
                    :
                    <Typography variant='h3' sx={{mt: '150px'}} textAlign='center'>
                        There already no posts yet
                    </Typography>
                }
            </Box>
        </Box>
    )
}