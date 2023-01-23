import {Box, ImageList, ImageListItem, styled, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {ICollectionWithPosts} from "../../types/collection";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {ICollectionForIUser} from "../../types/user";

interface ICollectionItemProps {
    collections: ICollectionForIUser[]
}

const StyledCollectionItem = styled(NavLink)(({theme}) => ({
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '8px',
    overflow: 'hidden',
    [theme.breakpoints.up('tablet')]: {
        // height: '300px',
        // width: '300px'
    },
    [theme.breakpoints.down('tablet')]: {
        height: '150px',
        // width: '150px'

    }

}))

export default function Collections({collections}: ICollectionItemProps) {


    const theme = useTheme();
    const {palette: {primary: {main}}} = theme

    const isSmallerLaptop = useMediaQuery(theme.breakpoints.down('laptop'));
    const isSmallerTablet = useMediaQuery(theme.breakpoints.down('tablet'));
    const isSmallerMobile = useMediaQuery(theme.breakpoints.down('mobile'));

    const calculateRows = (isSmallerLaptop ? isSmallerTablet ? isSmallerMobile ? 1 : 2 : 3 : 5)

    if (collections.length === 0) {
        return (
            <Typography variant='h3' sx={{mt: '150px'}} textAlign='center'>
                There already no collections yet
            </Typography>
        )
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 3,
                [theme.breakpoints.up('laptop')]: {
                    gridTemplateColumns: `repeat(${5}, 1fr)`,
                },
                [theme.breakpoints.up('tablet')]: {
                    gridTemplateColumns: `repeat(${3}, 1fr)`,
                },
                [theme.breakpoints.down('tablet')]: {
                    gridTemplateColumns: `repeat(${2}, 1fr)`,
                }
            }}
        >
            {collections.map((collection, i) => {
                const {_id: collectionId, title, posts} = collection

                return (
                    <StyledCollectionItem key={collection._id} to={`/collections/${collection._id}`}>
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0, 0, 0, 0.2)',
                                zIndex: '99',
                            }}
                        />
                        <Typography
                            sx={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                textAlign: 'center',
                                zIndex: '100',
                                padding: 1,

                            }}
                            variant='h4'
                        >
                            {collection.title}
                        </Typography>
                        <ImageList
                            cols={2}
                            sx={{
                                overflow: 'hidden',
                                margin: 0,
                                background: 'rgba(0, 0, 0, 1)',
                            }}
                        >
                            {posts.map((post, i) => {
                                const isLengthSmall = posts.length < 2
                                const rows = i === 0 ? isLengthSmall ? 2 : 2 : 1
                                const cols = i === 0 ? isLengthSmall ? 2 : 1 : 1

                                return (
                                    <ImageListItem
                                        sx={{bgcolor: 'primary.main', overflow: 'hidden', height: 'auto'}}
                                        rows={rows}
                                        cols={cols}
                                        key={i}
                                    >
                                        <img src={post.image}/>
                                    </ImageListItem>
                                )
                            })}
                        </ImageList>
                    </StyledCollectionItem>
                )
            })}
        </Box>
    )
}