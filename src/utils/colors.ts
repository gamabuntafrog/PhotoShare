import colorTypes from "../types/colorTypes";
import {
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepPurple,
    green,
    indigo, lightBlue, lightGreen,
    orange,
    pink,
    red,
    teal,
    yellow,
} from "@mui/material/colors";
import {PaletteColorOptions} from "@mui/material";

export const colorsArray = [
    {
        string: 'blue',
        enum: colorTypes.blue,
        ref: blue[500]
    },
    {
        string: 'red',
        enum: colorTypes.red,
        ref: red[500]
    },
    {
        string: 'green',
        enum: colorTypes.green,
        ref: green[500]
    },
    {
        string: 'amber',
        enum: colorTypes.amber,
        ref: amber[500]
    },
    {
        string: 'blueGrey',
        enum: colorTypes.blueGrey,
        ref: blueGrey[500]
    },
    {
        string: 'orange',
        enum: colorTypes.orange,
        ref: orange[500]
    },
    {
        string: 'cyan',
        enum: colorTypes.cyan,
        ref: cyan[500]
    },
    {
        string: 'brown',
        enum: colorTypes.brown,
        ref: brown[500]
    },
    {
        string: 'deepPurple',
        enum: colorTypes.deepPurple,
        ref: deepPurple[500]
    },
    {
        string: 'pink',
        enum: colorTypes.pink,
        ref: pink[500]
    },
    {
        string: 'teal',
        enum: colorTypes.teal,
        ref: teal[500]
    },
    {
        string: 'indigo',
        enum: colorTypes.indigo,
        ref: indigo[500]
    },
    {
        string: 'lightBlue',
        enum: colorTypes.lightBlue,
        ref: lightBlue[500]
    },
    {
        string: 'yellow',
        enum: colorTypes.yellow,
        ref: yellow[500]
    },
    {
        string: 'lightGreen',
        enum: colorTypes.lightGreen,
        ref: lightGreen[500]
    },
]


export const getPrimaryTheme = (color: colorTypes, isLoggedIn: boolean) => {
    if (!isLoggedIn) {
        return indigo
    }

    switch (color) {
        case colorTypes.blue:
            return blue
        case colorTypes.red:
            return red
        case colorTypes.green:
            return green
        case colorTypes.amber:
            return amber
        case colorTypes.blueGrey:
            return blueGrey
        case colorTypes.orange:
            return orange
        case colorTypes.cyan:
            return cyan
        case colorTypes.brown:
            return brown
        case colorTypes.deepPurple:
            return deepPurple
        case colorTypes.pink:
            return pink
        case colorTypes.teal:
            return teal
        case colorTypes.indigo:
            return indigo
        case colorTypes.yellow:
            return yellow
        case colorTypes.lightBlue:
            return lightBlue
        case colorTypes.lightGreen:
            return lightGreen
        default:
            return blue
    }
}