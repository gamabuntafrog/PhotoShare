import {
    Box,
    Button,
    Container,
    Input,
    Typography,
    FormGroup,
    OutlinedInput,
    InputLabel,
    Snackbar,
    Alert, IconButton
} from "@mui/material";
import {useEffect} from "react";
import {disableLoading, getCurrentUser, removeErrors} from "../../redux/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import { useForm } from "react-hook-form";
import {Image} from "@mui/icons-material";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup'
import CloseIcon from '@mui/icons-material/Close';



interface IFormData {
    email: string,
    password: string
}

enum htmlInputId {
    email,
    password
}

const loginSchema = yup.object({
    email: yup.string().required('Email is a required').email('Wrong email'),
    password: yup.string().required('Password is a required').min(3, 'Minimium passwords length is 3 symbols').max(24)
}).required()

export default function Login() {
    const {authError} = useAppSelector(state => state.userReducer.errors)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'all'
    });
    const {email: emailError, password: passwordError} = errors
    console.log(errors)
    const dispatch = useAppDispatch()

    const tryLogin = async (email: string, password: string) => {
        await dispatch(getCurrentUser({email, password}))
    }

    const onSubmit = handleSubmit(({email, password}) => {
        tryLogin(email, password)
    });

    const background = 'https://images.unsplash.com/photo-1534484374439-6b8cd79be97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'

    const isNotValidated = !!emailError || !!passwordError



    return (
        <Box
            sx={{
                background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
                height: '92vh',
                backgroundPositionY: 'center',
                backgroundSize: 'cover',
                overflowY: 'auto'
            }}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={authError}
                autoHideDuration={6000}
                onClose={() => dispatch(removeErrors())}
                sx={{alignItems: 'center'}}
            >
                <Alert onClose={() => dispatch(removeErrors())} severity="error" >
                    <Typography variant='h6'>Email or password is wrong</Typography>
                </Alert>
            </Snackbar>
            <Container
                sx={{
                    height: '100%',
                    backdropFilter: 'blur(4px)',
                    pt: 3,
                    mb: 3

                }}
            >
                <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant='h1'>Login</Typography>
                <FormGroup
                    onSubmit={onSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '600px',
                        mx: 'auto',
                        bgcolor: 'background.default',
                        padding: 3,
                        mt: 2,
                        borderRadius: 1
                    }}
                >
                    <InputLabel sx={{whiteSpace: 'unset'}} error={!!emailError} htmlFor={`${htmlInputId.email}`}>Email</InputLabel>
                    <OutlinedInput id={`${htmlInputId.email}`} sx={{mt: 1, mb: 2}} error={!!emailError} type='email' {...register('email')}/>
                    <InputLabel sx={{whiteSpace: 'unset'}} error={!!passwordError} htmlFor={`${htmlInputId.password}`} >{passwordError?.message || 'Password'}</InputLabel>
                    <OutlinedInput id={`${htmlInputId.password}`} sx={{mt: 1, mb: 2}} error={!!passwordError} type='password'  {...register('password')} />
                    <Button
                        type='submit'
                        variant='contained'
                        onClick={onSubmit}
                        disabled={isNotValidated}
                    >{isNotValidated ? 'Fill in the fields' : 'Let\'s go!'}</Button>
                </FormGroup>
            </Container
>
        </Box>
    )
}