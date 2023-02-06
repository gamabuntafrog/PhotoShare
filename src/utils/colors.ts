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
        title: {
            en: 'blue',
            ua: 'синій'
        },
        enum: colorTypes.blue,
        ref: blue[500]
    },
    {
        title: {
            en: 'red',
            ua: 'червоний'
        },
        enum: colorTypes.red,
        ref: red[500]
    },
    {
        title: {
            en: 'green',
            ua: 'зелений'
        },
        enum: colorTypes.green,
        ref: green[500]
    },
    {
        title: {
            en: 'amber',
            ua: 'амбер'
        },
        enum: colorTypes.amber,
        ref: amber[500]
    },
    {
        title: {
            en: 'blueGrey',
            ua: 'синьо-сірий'
        },
        enum: colorTypes.blueGrey,
        ref: blueGrey[500]
    },
    {
        title: {
            en: 'orange',
            ua: 'оранжевий'
        },
        enum: colorTypes.orange,
        ref: orange[500]
    },
    {
        title: {
            en: 'cyan',
            ua: 'голубий'
        },
        enum: colorTypes.cyan,
        ref: cyan[500]
    },
    {
        title: {
            en: 'brown',
            ua: 'коричневий'
        },
        enum: colorTypes.brown,
        ref: brown[500]
    },
    {
        title: {
            en: 'deepPurple',
            ua: 'глубокий фіолетовий'
        },
        enum: colorTypes.deepPurple,
        ref: deepPurple[500]
    },
    {
        title: {
            en: 'pink',
            ua: 'розовий'
        },
        enum: colorTypes.pink,
        ref: pink[500]
    },
    {
        title: {
            en: 'teal',
            ua: 'блакитний'
        },
        enum: colorTypes.teal,
        ref: teal[500]
    },
    {
        title: {
            en: 'indigo',
            ua: 'індиго'
        },
        enum: colorTypes.indigo,
        ref: indigo[500]
    },
    {
        title: {
            en: 'lightBlue',
            ua: 'світло-синій'
        },
        enum: colorTypes.lightBlue,
        ref: lightBlue[500]
    },
    {
        title: {
            en: 'yellow',
            ua: 'жовтий'
        },
        enum: colorTypes.yellow,
        ref: yellow[500]
    },
    {
        title: {
            en: 'lightGreen',
            ua: 'салатовий'
        },
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