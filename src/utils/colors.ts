import colorTypes from '../types/colorTypes'
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  red,
  teal,
  yellow
} from '@mui/material/colors'
import { PaletteColorOptions } from '@mui/material'

export const colorsArray = [
  {
    title: {
      'en-US': 'blue',
      uk: 'синій'
    },
    enum: colorTypes.blue,
    ref: blue
  },
  {
    title: {
      'en-US': 'red',
      uk: 'червоний'
    },
    enum: colorTypes.red,
    ref: red
  },
  {
    title: {
      'en-US': 'green',
      uk: 'зелений'
    },
    enum: colorTypes.green,
    ref: green
  },
  {
    title: {
      'en-US': 'amber',
      uk: 'амбер'
    },
    enum: colorTypes.amber,
    ref: amber
  },
  {
    title: {
      'en-US': 'blueGrey',
      uk: 'синьо-сірий'
    },
    enum: colorTypes.blueGrey,
    ref: blueGrey
  },
  {
    title: {
      'en-US': 'orange',
      uk: 'помаранчевий'
    },
    enum: colorTypes.orange,
    ref: orange
  },
  {
    title: {
      'en-US': 'cyan',
      uk: 'голубий'
    },
    enum: colorTypes.cyan,
    ref: cyan
  },
  {
    title: {
      'en-US': 'brown',
      uk: 'коричневий'
    },
    enum: colorTypes.brown,
    ref: brown
  },
  {
    title: {
      'en-US': 'deepPurple',
      uk: 'глубокий фіолетовий'
    },
    enum: colorTypes.deepPurple,
    ref: deepPurple
  },
  {
    title: {
      'en-US': 'pink',
      uk: 'рожевий'
    },
    enum: colorTypes.pink,
    ref: pink
  },
  {
    title: {
      'en-US': 'teal',
      uk: 'блакитний'
    },
    enum: colorTypes.teal,
    ref: teal
  },
  {
    title: {
      'en-US': 'indigo',
      uk: 'індиго'
    },
    enum: colorTypes.indigo,
    ref: indigo
  },
  {
    title: {
      'en-US': 'lightBlue',
      uk: 'світло-синій'
    },
    enum: colorTypes.lightBlue,
    ref: lightBlue
  },
  {
    title: {
      'en-US': 'yellow',
      uk: 'жовтий'
    },
    enum: colorTypes.yellow,
    ref: yellow
  },
  {
    title: {
      'en-US': 'lightGreen',
      uk: 'салатовий'
    },
    enum: colorTypes.lightGreen,
    ref: lightGreen
  }
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
