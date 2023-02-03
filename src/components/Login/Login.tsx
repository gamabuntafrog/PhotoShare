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
import {loginValidationSchema} from "../../utils/validationSchemas";
import useSx from "../../hooks/useSx";
import loginStyles from "./loginStyles";
import {NavLink} from "react-router-dom";
import { StyledHeaderNavLink } from "../Header/headerStyles";


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


    const onSubmit = handleSubmit(({email, password}) => {
        dispatch(login({email, password}))
    });


    const isNotValidated = !!emailError || !!passwordError

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const styles = useSx(loginStyles)

    return (
        <Box
            sx={styles.backdrop}
        >
            <Box sx={styles.loginContainer}>
                <Typography sx={styles.title} variant='h1'>Login</Typography>
                <FormGroup
                    onSubmit={onSubmit}
                    sx={styles.form}
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
                        sx={styles.formInput}
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
                        sx={styles.formInput}
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
                        sx={styles.signInButton}
                    >
                        {isNotValidated ? 'Fill in the fields' : 'Let\'s go!'}
                    </Button>
                    <StyledHeaderNavLink style={styles.signUpLink} to='/register'>
                        Don't have an account?
                    </StyledHeaderNavLink>
                </FormGroup>
            </Box>
        </Box>
    )
}