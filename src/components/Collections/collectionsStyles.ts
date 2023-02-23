import {Theme} from "@mui/material";


const collectionsStyles = (theme: Theme) => {


    return {
        container: {
            width: '90%',
            mx: 'auto',
            pb: 2,
        },
        wrapper: {
            display: 'grid',
            gap: 3,
            color: theme.palette.text.light,
            [theme.breakpoints.up('laptop')]: {
                gridTemplateColumns: `repeat(${5}, 1fr)`,
            },
            [theme.breakpoints.up('tablet')]: {
                gridTemplateColumns: `repeat(${3}, 1fr)`,
            },
            [theme.breakpoints.down('tablet')]: {
                gridTemplateColumns: `repeat(${2}, 1fr)`,
            }
        },
        itemWrapper: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: '99',
        },
        title: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            textAlign: 'center',
            zIndex: '100',
            padding: 1,

        },
        postsList: {
            overflow: 'hidden',
            margin: 0,
            background: 'rgba(0, 0, 0, 1)',
            height: '100%',
        },
        postItem: {
            bgcolor: 'primary.main',
            overflow: 'hidden',
            height: 'auto',
        },
    }
}

export default collectionsStyles