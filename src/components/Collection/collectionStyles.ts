import {Theme} from "@mui/material";


const collectionStyles = (theme: Theme) => {


    return {
        collectionWrapper: {
            py: 2,
            position: 'relative'
        },
        collectionPostsList: {
            width: '95%',
            py: 2,
            mx: 'auto'
        },
        addAuthorModal: {
            backdrop: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            modalWrapper: {
                bgcolor: 'background.paper',
                width: '50vw',
                maxHeight: '100vh',
                overflow: 'auto',
                padding: 2,
                pt: 8,
                color: 'text.primary',
                borderRadius: 2,
                position: 'relative',
                [theme.breakpoints.down('tablet')]: {
                    width: '80vw',
                }
            },
            loaderWrapper: {
                bgcolor: 'background.paper',
                width: '50vw',
                overflow: 'hidden',
                padding: 2,
                color: 'text.primary',
                borderRadius: 2,
                position: 'relative',
                [theme.breakpoints.down('tablet')]: {
                    width: '80vw',
                }
            },
            title: {
                padding: 1,
                textAlign: 'center',
                color: 'primary.main',
                wordBreak: 'break-word'
            },
            closeIcon: {position: 'absolute', right: 20, top: 20},
            notFound: {textAlign: 'center', padding: 2},
            userItem: {
                [theme.breakpoints.down('tablet')]: {
                    padding: 1
                }
            },
            avatarWrapper: {cursor: 'pointer', minWidth: 'auto'},
            avatar: {
                width: 60,
                height: 60,
                [theme.breakpoints.down('tablet')]: {
                    width: 40,
                    height: 40,
                }
            },
            usernameWrapper: {
                ml: 2,
                mr: 1,
                [theme.breakpoints.down('tablet')]: {
                    mx: 1
                },
                cursor: 'pointer'
            }
        },
        deleteAuthorModal: {
            backdrop: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            modalWrapper: {
                bgcolor: 'background.paper',
                width: '50vw',
                maxHeight: '100vh',
                overflow: 'auto',
                padding: 2,
                pt: 8,
                color: 'text.primary',
                borderRadius: 2,
                position: 'relative',
                [theme.breakpoints.down('tablet')]: {
                    width: '80vw',
                }
            },
            closeIcon: {position: 'absolute', right: 20, top: 20},
            title: {padding: 1, textAlign: 'center', wordBreak: 'break-word'},
            avatar: {
                width: 60,
                height: 60
            },
            authorUsernameWrapper: {
                ml: 2,
                mr: 1,
            },
            errorTitle: {padding: 1, textAlign: 'center', wordBreak: 'break-word'}
        },
        contextMenu: {
            openButton: {
                position: 'absolute',
                right: 20,
                top: 20
            },
            menuList: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                '& .MuiPaper-root': {
                    bgcolor: 'background.paper',
                    maxHeight: '300px',
                },
                '& .MuiMenu-list': {
                    bgcolor: 'background.paper',
                    py: 0
                }
            },
            menuItem: {
                bgcolor: 'background.paper',
                position: 'relative'
            }
        },
        collectionInfo: {
            wrapper: {mb: 2, mt: 6},
            title: {
                textAlign: 'center',
                wordBreak: 'break-word',
                [theme.breakpoints.down('tablet')]: {
                    fontSize: 50,
                },
                padding: 2
            },
            tags: {
                textAlign: 'center',
            },
            secondWrapper: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            authorLinkWrapper: {
                display: 'flex',
                alignItems: 'center'
            },
            avatar: {width: '80px', height: '80px'},
            addNewPostButton: {mt: 3}
        }

    }
}

export default collectionStyles