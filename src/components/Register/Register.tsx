import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCurrentUser, removeErrors, register as registerUser} from "../../redux/slices/userSlice";
import {
    Alert,
    Box,
    Button,
    Container,
    FormGroup, IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Typography
} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {registerValidationSchema} from "../../utils/validationSchemas";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import useSx from "../../hooks/useSx";
import registerStyles from "./registerStyles";
import {StyledHeaderNavLink} from "../Header/headerStyles";
import useShortTranslation from "../../hooks/useShortTranslation";

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
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<IFormData>({
        resolver: yupResolver(registerValidationSchema),
        mode: 'all'
    });

    const {
        username: usernameError,
        email: emailError,
        password: passwordError,
        repeatPassword: repeatPasswordError
    } = errors
    // console.log(errors)
    const dispatch = useAppDispatch()


    const onSubmit = handleSubmit(({email, password, username}) => {
        dispatch(registerUser({email, password, username}))
    });


    const isNotValidated = !!usernameError || !!emailError || !!passwordError || !!repeatPasswordError

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const styles = useSx(registerStyles)

    const t = useShortTranslation('Register')

    const emailLabel = emailError?.message ? t(emailError.message) : t('emailLabel')
    const usernameLabel = usernameError?.message ? t(usernameError.message) : t('usernameLabel')
    const passwordLabel = passwordError?.message ? t(passwordError.message) : t('passwordLabel')
    const repeatPasswordLabel = repeatPasswordError?.message ? t(repeatPasswordError.message) : t('repeatPasswordLabel')
    const submitButtonText = isNotValidated ? t('loginButtonDisabled') : t('loginButton')

    return (
        <Container
            sx={styles.container}
        >
            <Typography sx={styles.title} variant='h1'>{t('title')}</Typography>
            <FormGroup
                onSubmit={onSubmit}
                sx={styles.form}
            >
                <InputLabel
                    sx={styles.label}
                    error={!!usernameError}
                    htmlFor={`${htmlInputId.username}`}>
                    {usernameLabel}
                </InputLabel>
                <OutlinedInput
                    id={`${htmlInputId.username}`}
                    sx={styles.input}
                    error={!!usernameError}
                    type='name'
                    {...register('username')}
                />
                <InputLabel
                    sx={styles.label}
                    error={!!emailError}
                    htmlFor={`${htmlInputId.email}`}
                >
                    {emailLabel}
                </InputLabel>
                <OutlinedInput
                    id={`${htmlInputId.email}`}
                    sx={styles.input}
                    error={!!emailError}
                    type='email'
                    {...register('email')}
                />
                <InputLabel
                    sx={styles.label}
                    error={!!passwordError}
                    htmlFor={`${htmlInputId.password}`}>
                    {passwordLabel}
                </InputLabel>
                <OutlinedInput
                    id={`${htmlInputId.password}`}
                    sx={styles.input}
                    error={!!passwordError}
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{mr: '-4px'}}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <InputLabel
                    sx={styles.label}
                    error={!!repeatPasswordError}
                    htmlFor={`${htmlInputId.repeatPassword}`}
                >
                    {repeatPasswordLabel}
                </InputLabel>
                <OutlinedInput
                    id={`${htmlInputId.repeatPassword}`}
                    sx={styles.input}
                    error={!!repeatPasswordError}
                    type='password'
                    {...register("repeatPassword")}
                />
                <Button
                    type='submit'
                    variant='contained'
                    onClick={onSubmit}
                    disabled={isNotValidated}
                >
                    {submitButtonText}
                </Button>
                <StyledHeaderNavLink style={styles.signInLink} to='/'>
                    {t('hasUserAccount')}
                </StyledHeaderNavLink>
            </FormGroup>
        </Container>
    )
}