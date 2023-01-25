import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material";


const useMediaQueries = () => {

    const theme = useTheme()

    const isSmallerThanLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerThanTablet = useMediaQuery(theme.breakpoints.down('tablet'));
    const isSmallerThanMobile = useMediaQuery(theme.breakpoints.down('mobile'));


    return {
        isSmallerThanLaptop,
        isSmallerThanTablet,
        isSmallerThanMobile
    }
}

export default useMediaQueries