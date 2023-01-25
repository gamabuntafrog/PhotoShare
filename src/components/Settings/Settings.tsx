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
import useSx from "../../hooks/useSx";
import settingsStyles from "./settingsStyles";


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

    const styles = useSx(settingsStyles)

    return (
        <Container
            sx={styles.container}
        >
            <Typography variant='h1' sx={styles.title}>Settings</Typography>
            <Box sx={styles.wrapper}>
                <Typography variant='h2'>Color</Typography>
                <Button
                    variant='outlined'
                        sx={styles.colorModeButton}
                    onClick={changeColorMode}
                        color="inherit"
                >
                    Change mode to {nextColorMode}
                </Button>
                <List
                    sx={styles.colorsList}
                >
                    {colorsArray.map((color) => {
                        return (
                            <ListItem
                                key={color.string}
                                sx={styles.colorItem}
                            >
                                <Button
                                    variant='contained'
                                    sx={styles.colorButton(color.ref)}
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