import {MenuItem, styled} from "@mui/material";

const StyledCustomMenuItem = styled(MenuItem)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
}))

export default StyledCustomMenuItem