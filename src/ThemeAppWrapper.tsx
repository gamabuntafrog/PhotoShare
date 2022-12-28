
import {useEffect, useMemo} from "react";
import App from "./App";
import {useAppSelector} from "./redux/hooks";
import {getPrimaryTheme} from "./utils/colors";
import {
    PaletteColor,
    TypeText,
    createTheme,
    useTheme,
    ThemeProvider
} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        // custom breakpoints
        laptop: true;
        tablet: true;
        mobile: true;
        desktop: true;
        // Remove default breakpoints
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
    }
}

let root = document.querySelector(':root') as HTMLElement

export default function ThemeAppWrapper() {
    const {primaryColor, mode} = useAppSelector((state) => state.themeReducer)
    const {isLoggedIn} = useAppSelector((state) => state.userReducer)

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: getPrimaryTheme(primaryColor, isLoggedIn),
                    background: {
                        default: mode === 'dark' ? '#161616' : '#ededed',
                        paper: mode === 'dark' ? '#242424' : '#cfcfcf'
                    },

                },
                breakpoints: {
                    values: {
                        mobile: 0,
                        tablet: 640,
                        laptop: 1024,
                        desktop: 1200,
                    }
                },
            }),
        [mode, primaryColor, isLoggedIn],
    );

    const {palette} = theme

    const setColorsInCss = () => {
        Object.keys(palette.primary).forEach((key) => {
            const color = palette.primary[key as keyof PaletteColor]
            root.style.setProperty(`--primary-${key}`, color)
        })
        Object.keys(palette.text).forEach((key) => {
            const color = palette.text[key as keyof TypeText]
            root.style.setProperty(`--text-${key}`, color)
        })
        Object.keys(palette.secondary).forEach((key) => {
            const color = palette.secondary[key as keyof PaletteColor]
            root.style.setProperty(`--secondary-${color}`, color)
        })
    }


    useEffect(() => {
        setColorsInCss()
    }, [primaryColor, mode, isLoggedIn]);

    return (
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    )

}

