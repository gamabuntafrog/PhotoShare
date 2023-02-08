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
        ref: blue
    },
    {
        title: {
            en: 'red',
            ua: 'червоний'
        },
        enum: colorTypes.red,
        ref: red
    },
    {
        title: {
            en: 'green',
            ua: 'зелений'
        },
        enum: colorTypes.green,
        ref: green
    },
    {
        title: {
            en: 'amber',
            ua: 'амбер'
        },
        enum: colorTypes.amber,
        ref: amber
    },
    {
        title: {
            en: 'blueGrey',
            ua: 'синьо-сірий'
        },
        enum: colorTypes.blueGrey,
        ref: blueGrey
    },
    {
        title: {
            en: 'orange',
            ua: 'помаранчевий'
        },
        enum: colorTypes.orange,
        ref: orange
    },
    {
        title: {
            en: 'cyan',
            ua: 'голубий'
        },
        enum: colorTypes.cyan,
        ref: cyan
    },
    {
        title: {
            en: 'brown',
            ua: 'коричневий'
        },
        enum: colorTypes.brown,
        ref: brown
    },
    {
        title: {
            en: 'deepPurple',
            ua: 'глубокий фіолетовий'
        },
        enum: colorTypes.deepPurple,
        ref: deepPurple
    },
    {
        title: {
            en: 'pink',
            ua: 'рожевий'
        },
        enum: colorTypes.pink,
        ref: pink
    },
    {
        title: {
            en: 'teal',
            ua: 'блакитний'
        },
        enum: colorTypes.teal,
        ref: teal
    },
    {
        title: {
            en: 'indigo',
            ua: 'індиго'
        },
        enum: colorTypes.indigo,
        ref: indigo
    },
    {
        title: {
            en: 'lightBlue',
            ua: 'світло-синій'
        },
        enum: colorTypes.lightBlue,
        ref: lightBlue
    },
    {
        title: {
            en: 'yellow',
            ua: 'жовтий'
        },
        enum: colorTypes.yellow,
        ref: yellow
    },
    {
        title: {
            en: 'lightGreen',
            ua: 'салатовий'
        },
        enum: colorTypes.lightGreen,
        ref: lightGreen
    },
]


export const getPrimaryTheme = (color: colorTypes) => {

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