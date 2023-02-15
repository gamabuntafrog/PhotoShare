import {Theme} from "@mui/material";


const searchStyles = (theme: Theme) => {


    return {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            overflowX: 'none'
        },
        input: {
            mt: 10,
            mb: 2,
            width: theme.breakpoints.values.mobile,
            [theme.breakpoints.down('mobile')]: {
                width: '100%',
                mx: 0.5,
                '& *': {
                    textAlign: 'center',
                    ml: 0
                }
            }
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
        } as const,
        outletWrapper: {
            mt: 2,
            padding: 1,
            width: '100%',
            minHeight: '60vh'
        },
        users: {
            usersList: {
                display: 'flex',
                width: '100%'
            },
            item: {
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
                bgcolor: 'background.paper',
                margin: 1,
                borderRadius: 4,
                cursor: 'pointer',
                padding: 2,
                '&:hover': {
                    bgcolor: 'primary.main',
                    color: '#121212'
                },
                [theme.breakpoints.down('tablet')]: {
                    width: '50%',
                    padding: 1
                }
            },
            avatar: {
                width: 100,
                height: 100,
                mx: 'auto',
                [theme.breakpoints.down('tablet')]: {
                    width: '95%',
                    height: 'auto',
                }
            },
            title: {
                [theme.breakpoints.down('tablet')]: {
                    fontSize: '25px'
                }
            }
        },
        posts: {
            list: {
                width: '20%',
                mx: 'auto',
                mb: 0,
                mt: 2
            },
            title: {
                [theme.breakpoints.down('tablet')]: {
                    fontSize: '25px'
                }
            }
        },
        collections: {
            title: {
                [theme.breakpoints.down('tablet')]: {
                    fontSize: '25px'
                }
            }
        }
    }
}

export default searchStyles