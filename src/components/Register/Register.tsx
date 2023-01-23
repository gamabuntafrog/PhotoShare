import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCurrentUser, removeErrors, register as registerUser} from "../../redux/slices/userSlice";
import {Alert, Box, Button, Container, FormGroup, InputLabel, OutlinedInput, Snackbar, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { registerValidationSchema } from "../../utils/validationSchemas";

interface IFormData {
    username: string,
    email: string,
    password: string,
    repeatPassword: string
}

enum htmlInputId {
    username,
    email,
    password,
    repeatPassword
}



export default function Register() {
    const {authError} = useAppSelector(state => state.userReducer.errors)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IFormData>({
        resolver: yupResolver(registerValidationSchema),
        mode: 'all'
    });
    const {username: usernameError, email: emailError, password: passwordError, repeatPassword: repeatPasswordError} = errors
    console.log(errors)
    const dispatch = useAppDispatch()


    const onSubmit = handleSubmit(({email, password, username}) => {
        dispatch(registerUser({email, password, username}))
    });

    const background = 'https://images.unsplash.com/photo-1534484374439-6b8cd79be97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'

    const isNotValidated = !!usernameError || !!emailError || !!passwordError || !!repeatPasswordError


    return (
        <Box
            sx={{
                background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
                minHeight: '100vh',
                backgroundPositionY: 'center',
                backgroundSize: 'cover',
            }}
        >
            <Container
                sx={{
                    py: 3,
                }}
            >
                <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant='h1'>Register</Typography>
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
                    <InputLabel sx={{whiteSpace: 'unset'}} error={!!usernameError} htmlFor={`${htmlInputId.username}`}>{usernameError?.message || 'Username'}</InputLabel>
                    <OutlinedInput id={`${htmlInputId.username}`} sx={{mt: 1, mb: 2}} error={!!usernameError} type='name' {...register('username')}/>
                    <InputLabel sx={{whiteSpace: 'unset'}} error={!!emailError} htmlFor={`${htmlInputId.email}`}>{emailError?.message || 'Email'}</InputLabel>
                    <OutlinedInput id={`${htmlInputId.email}`} sx={{mt: 1, mb: 2}} error={!!emailError} type='email' {...register('email')}/>
                    <InputLabel sx={{whiteSpace: 'unset'}} error={!!passwordError} htmlFor={`${htmlInputId.password}`} >{passwordError?.message || 'Password'}</InputLabel>
                    <OutlinedInput id={`${htmlInputId.password}`} sx={{mt: 1, mb: 2}} error={!!passwordError} type='password'  {...register('password')} />
                    <InputLabel sx={{whiteSpace: 'unset'}} error={!!repeatPasswordError} htmlFor={`${htmlInputId.repeatPassword}`} >{repeatPasswordError?.message || 'Repeat password'}</InputLabel>
                    <OutlinedInput id={`${htmlInputId.repeatPassword}`} sx={{mt: 1, mb: 2}} error={!!repeatPasswordError} type='password'  {...register("repeatPassword")} />
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