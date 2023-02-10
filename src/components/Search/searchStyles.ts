import {Theme} from "@mui/material";


const searchStyles = (theme: Theme) => {




    return {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        input: {
            mt: 10,
            mb: 2,
            width: theme.breakpoints.values.mobile
        },
        caption: {
            mt: 1,
            color: 'text.secondary'
        },
        linksWrapper: {
            padding: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            '& > a': {
                marginLeft: 3
            },
            [theme.breakpoints.down('tablet')]: {
                flexDirection: 'column',
                '& > a': {
                    marginTop: 1,
                    marginLeft: 0,
                }
            }
        },
        outletWrapper: {
            mt: 2,
            padding: 1,
            width: '100%'
        }
    }
}

export default searchStyles