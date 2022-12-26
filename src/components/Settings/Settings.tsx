import {
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    Typography,
    useTheme
} from "@mui/material";
import colorTypes from "../../types/colorTypes";
import {useAppDispatch} from "../../redux/hooks";
import {setPrimaryColor, toggleColorMode} from "../../redux/slices/themeSlice";
import {colorsArray} from "../../utils/colors";


export default function Settings() {
    const theme = useTheme();
    const dispatch = useAppDispatch()

    const changePrimaryColor = (color: colorTypes) => {
        dispatch(setPrimaryColor(color))
    }

    const changeColorMode = () => {
        dispatch(toggleColorMode())
    }

    const nextColorMode = theme.palette.mode === 'dark' ? 'light' : 'dark'

    return (
        <Container>
            <Typography variant='h1' sx={{fontWeight: '600', textAlign: 'center'}}>Settings</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2}}>
                <Typography  variant='h2'>Color</Typography>
                <Button variant='outlined' sx={{ml: 1, color: 'primary.main'}} onClick={changeColorMode} color="inherit">
                    Change mode to {nextColorMode}
                </Button>
                <List
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}
                >
                    {colorsArray.map((color) => {
                        return (
                            <ListItem
                                key={color.string}
                                sx={{width: 'auto'}}
                            >
                                <Button
                                    variant='contained'
                                    sx={{bgcolor: `${color.ref} !important`}}
                                    onClick={() => changePrimaryColor(color.enum)}
                                >
                                    {color.string}
                                </Button>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Container>
    )
}