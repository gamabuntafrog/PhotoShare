import styles from './Posts.module.css'
import {Avatar, Box, Container, IconButton, List, ListItem, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import PostItem from "../PostItem/PostItem";
import {useAppSelector} from "../../redux/hooks";
import {postsApi} from "../../redux/api/postsApi";
import {IUserSliceAuthorized} from "../../types/userSlice";

export default function Posts() {
    const {data: result, isLoading, error} = postsApi.useFetchAllPostsQuery()
    const {user, token} = useAppSelector((state) => state.userReducer) as IUserSliceAuthorized
    console.log(result)

    if (isLoading) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Loading...</Typography>
            </Container>
        )
    }


    if (error) {
        return (
            <Container className={styles.posts} sx={{
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                maxHeight: '90vh'
            }}>
                <Typography variant='h1' sx={{textAlign: 'center'}}>Error</Typography>
            </Container>
        )
    }
    return (
        <Box sx={{overflowY: 'auto', height: '91vh'}}>
            <Container className={styles.posts}>
                <List sx={{
                    width: '340px',
                    margin: '0 auto'
                }}>
                    {result && result.data.posts.map((post) => <PostItem post={post} key={post._id}/>)}
                </List>

            </Container>
        </Box>
    )
}

