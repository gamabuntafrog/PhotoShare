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
    Alert, IconButton, InputAdornment
} from "@mui/material";
import {useEffect, useState} from "react";
import {disableLoading, getCurrentUser, login, removeErrors} from "../../redux/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useForm} from "react-hook-form";
import {Image, Visibility, VisibilityOff} from "@mui/icons-material";
import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from 'yup'
import CloseIcon from '@mui/icons-material/Close';
import {IResponseNotification, pushResponse} from "../../redux/slices/responseNotificationsSlice";
import {loginValidationSchema} from "../../utils/validationSchemas";


interface IFormData {
    email: string,
    password: string
}

enum htmlInputId {
    email,
    password
}


export default function Login() {

    const {register, handleSubmit, formState: {errors}} = useForm<IFormData>({
        resolver: yupResolver(loginValidationSchema),
        mode: 'all'
    });

    const {email: emailError, password: passwordError} = errors

    const dispatch = useAppDispatch()

    const tryLogin = async (email: string, password: string) => {
        await dispatch(login({email, password}))
    }

    const onSubmit = handleSubmit(({email, password}) => {
        tryLogin(email, password)
    });

    const background = 'https://images.unsplash.com/photo-1534484374439-6b8cd79be97c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'

    const isNotValidated = !!emailError || !!passwordError

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
                backgroundPositionY: 'center',
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch'
            }}
        >
            <Box sx={{
                py: 2,
            }}>
                <Typography sx={{textAlign: 'center', fontWeight: 'bold'}} variant='h1'>Login</Typography>
                <FormGroup
                    onSubmit={onSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '70vw',
                        mx: 'auto',
                        bgcolor: 'background.default',
                        padding: 3,
                        mt: 2,
                        borderRadius: 1
                    }}
                >
                    <InputLabel
                        sx={{whiteSpace: 'unset'}}
                        error={!!emailError}
                        htmlFor={`${htmlInputId.email}`}
                    >
                        Email
                    </InputLabel>
                    <OutlinedInput
                        id={`${htmlInputId.email}`}
                        sx={{mt: 1, mb: 2}}
                        error={!!emailError}
                        type='email'
                        {...register('email')}
                    />
                    <InputLabel
                        sx={{whiteSpace: 'unset'}}
                        error={!!passwordError}
                        htmlFor={`${htmlInputId.password}`}
                    >
                        {passwordError?.message || 'Password'}
                    </InputLabel>
                    <OutlinedInput
                        id={`${htmlInputId.password}`}
                        sx={{mt: 1, mb: 2}}
                        error={!!passwordError}
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment  position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{mr: '-4px'}}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        onClick={onSubmit}
                        disabled={isNotValidated}
                    >
                        {isNotValidated ? 'Fill in the fields' : 'Let\'s go!'}
                    </Button>
                </FormGroup>
            </Box>
        </Box>
    )
}