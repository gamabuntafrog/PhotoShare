import {Theme} from "@mui/material";


const postsStyles = (theme: Theme) => {


    return {
        container: {
            py: 2
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
            width: '95%',
            mx: 'auto',
            my: 0
        }
    }

}

export default postsStyles