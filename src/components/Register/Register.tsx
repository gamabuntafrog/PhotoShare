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
    console.log(errors)
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

    return (
        <Container
            sx={styles.container}
        >
            <Typography sx={styles.title} variant='h1'>Register</Typography>
            <FormGroup
                onSubmit={onSubmit}
                sx={styles.form}
            >
                <InputLabel
                    sx={styles.label}
                    error={!!usernameError}
                    htmlFor={`${htmlInputId.username}`}>
                    {usernameError?.message || 'Username'}
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
                    {emailError?.message || 'Email'}
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
                    {passwordError?.message || 'Password'}
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
                    {repeatPasswordError?.message || 'Repeat password'}
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
                    {isNotValidated ? 'Fill in the fields' : 'Let\'s go!'}
                </Button>
                <StyledHeaderNavLink style={styles.signInLink} to='/login'>
                    Already have an account?
                </StyledHeaderNavLink>
            </FormGroup>
        </Container>
    )
}