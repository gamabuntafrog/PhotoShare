import {Theme} from "@mui/material";


const postsStyles = (theme: Theme) => {


    return {
        container: {
            py: 2,
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
            // width: '95%',
            // mx: 'auto',
            // my: 0,
            margin: 1
            // minHeight: '110vh'
        }
    }

}

export default postsStyles