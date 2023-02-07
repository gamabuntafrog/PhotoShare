import {useEffect, useMemo} from "react";
import App from "./App";
import {useAppSelector} from "./redux/hooks";
import {getPrimaryTheme} from "./utils/colors";
import {
    PaletteColor,
    TypeText,
    createTheme,
    useTheme,
    ThemeProvider, TypeBackground
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

    interface TypeText {
        standard: string,
        light: string
    }

    interface PaletteColorOptions {
        standard: string,
        standardReversed: string
    }

    interface PaletteColor {
        standard: string,
        standardReversed: string

    }

    interface SimplePaletteColorOptions {
        darker?: string;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        standard: true,
        standardReversed: true
    }

}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        standard: true,
        standardReversed: true
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        standard: true,
        standardReversed: true
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
                    primary: {
                        ...getPrimaryTheme(primaryColor),
                        standard: mode === 'dark' ? 'white' : 'black',
                        standardReversed: mode === 'dark' ? 'black' : 'white',
                    },
                    background: {
                        default: mode === 'dark' ? '#161616' : '#D3D3D3',
                        paper: mode === 'dark' ? '#242424' : '#D3D3D3'
                    },
                    text: {
                        standard: mode === 'dark' ? 'white' : 'black',
                        light: 'white'
                    }
                },
                breakpoints: {
                    values: {
                        mobile: 360,
                        tablet: 640,
                        laptop: 1024,
                        desktop: 1200,
                    }
                },
            }),
        [mode, primaryColor, isLoggedIn],
    );

    const {palette} = theme
    console.log(palette.primary.standard)
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
            root.style.setProperty(`--secondary-${key}`, color)
        })
        Object.keys(palette.background).forEach((key) => {
            const color = palette.background[key as keyof TypeBackground]

            root.style.setProperty(`--background-${key}`, color)
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

