import {Theme} from "@mui/material";


const postsStyles = (theme: Theme) => {


    return {
        container: {
            py: 2,
            px: 1,
            display: 'flex',
            flexDirection: 'row',

            // height: '200vh'
        },
        errorContainer: {
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            maxHeight: '90vh'
        },
        postsList: {
            width: '20%',
            [theme.breakpoints.down('laptop')]: {
                width: '33.33%'
            },
            [theme.breakpoints.down('tablet')]: {
                width: '50%'
            },
            // mx: 'auto',
            // my: 0,
            margin: 1
            // minHeight: '110vh'
        }
    }

}

export default postsStyles