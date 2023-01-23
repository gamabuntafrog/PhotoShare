import {Button, FormGroup, InputLabel, OutlinedInput} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import convertImageToString from "../../utils/convertImageToString";
import {IResponseNotification, pushResponse} from "../../redux/slices/responseNotificationsSlice";
import {extendedUsersApi} from "../../redux/api/rootApi";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {changeProfileValidationSchema} from "../../utils/validationSchemas";
import {ICurrentUser} from "../../types/user";
import {Dispatch, SetStateAction, useEffect} from "react";
import setPreviewImage from "../../utils/setPreviewImage";

interface ChangeUserProfile {
    turnOffChangingMode: () => void,
    setAvatarFile: Dispatch<SetStateAction<string | null>>,
    setIsUserUpdating: Dispatch<SetStateAction<boolean>>
}

interface IFormData {
    imageList: FileList,
    username: string
}

export default function ChangeUserProfile({turnOffChangingMode, setAvatarFile, setIsUserUpdating}: ChangeUserProfile) {
    const currentUser = useAppSelector(state => state.userReducer.user) as ICurrentUser

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<IFormData>({
        resolver: yupResolver(changeProfileValidationSchema),
        mode: 'all'
    });

    const {username: usernameError, imageList: avatarError} = errors
    const isErrors = !!(usernameError || avatarError)

    const [updateUser] = extendedUsersApi.useUpdateCurrentUserMutation()

    const saveChanges = async ({username, imageList}: { username: string, imageList: FileList }) => {
        setIsUserUpdating(true)

        const avatar = imageList.length ? await convertImageToString(imageList) : ''

        try {
            await updateUser({body: {username, avatar}}).unwrap()

            document.location.reload()
        } catch (e) {
            setIsUserUpdating(false)
        }

    }

    useEffect(() => setPreviewImage(watch('imageList'), setAvatarFile), [watch('imageList')]);


    const onSubmit = handleSubmit(({username, imageList}) => saveChanges({username, imageList}));



    return (
        <FormGroup
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

            <InputLabel error={!!usernameError}
                        htmlFor='username'>{usernameError?.message || 'Username'}</InputLabel>
            <OutlinedInput defaultValue={currentUser.username} error={!!usernameError} {...register('username')}
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
                disabled={isErrors}
                type='submit'
                onClick={onSubmit}>
                Save changes
            </Button>
        </FormGroup>
    )
}