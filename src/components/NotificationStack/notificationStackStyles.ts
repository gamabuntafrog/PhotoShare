import {Theme} from "@mui/material";


const notificationStackStyles = (theme: Theme) => {


    return {
        list: {
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 1000
        }
    }
}

export default notificationStackStyles