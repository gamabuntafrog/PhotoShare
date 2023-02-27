import {Theme} from "@mui/material";


const collectionStyles = (theme: Theme) => {


    return {
        backdrop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalWrapper: {
            bgcolor: 'background.paper',
            flexShrink: 0,
            width: '50vw',
            height: '100svh',
            overflow: 'auto',
            px: 0,
            // pt: 1,
            // pb: 3,
            color: 'text.primary',
            borderRadius: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            [theme.breakpoints.down('laptop')]: {
                width: '70vw',
            },
            [theme.breakpoints.down('tablet')]: {
                width: '100vw',
                borderRadius: 0,
                minHeight: '100svh',
            }
        },
        modalContainer: {
            px: 2,
            mb: 3,
        },
        closeIconWrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            pl: 2,
            pr: 1,
            pb: 1,
            borderBottom: `1px solid rgba(255, 255, 255, 0.2)`
        },
        closeIcon: {
            ml: 'auto'
        },
        errorContainer: {
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            maxHeight: '90vh'
        },
        title: {
            color: theme.palette.text.secondary
        },
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
        authorUsernameWrapper: {
            ml: 2,
            mr: 1,
        },
        avatar: {
            width: 60,
            height: 60
        },
        authorInfo: {
            closeIcon: {position: 'absolute', right: 20, top: 20},
            title: {padding: 1, textAlign: 'center', wordBreak: 'break-word'},
            listItem: {
                [theme.breakpoints.down('tablet')]: {
                    px: 0
                }
            },
            avatar: {
                width: 60,
                height: 60
            },
            authorUsernameWrapper: {
                ml: 2,
                mr: 1,
                cursor: 'pointer'
            },
            errorTitle: {padding: 1, textAlign: 'center', wordBreak: 'break-word'}
        },
        buttonsWrapper: {
            display: 'flex',
            justifyContent: 'center'
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
                alignItems: 'center',
                cursor: 'pointer'
            },
            authorContainerWrapper: {
                display: 'flex',
                alignItems: 'start',
                flexDirection: 'column',
            },
            userRole: {
                ml: 1,
                color: 'primary.main'
            },
            avatar: {width: '80px', height: '80px'},
            addNewPostButton: {mt: 3},
        },
        accordionWrapper: {
            borderRadius: '16px !important',
            mb: 1,
            '&:before': {
                display: 'none'
            }
        },
        accordionTitle: {
            width: '90%',
            flexShrink: 0,
        },
        togglePrivateContainer: {
            mt: 3,
            mb: 3,
            px: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        dangerButtonsWrapper: {
            display: 'flex',
            px: 1,
            mt: 3
        },
        collectionSettingsInfo: {
            changeInfoForm: {
                wrapper: {
                    mb: 2,
                    px: 1
                },
                inputLabel: {mb: 1},
                input: {mb: 1},
                buttonsWrapper: {
                    display: 'flex',
                    mt: 1,
                    [theme.breakpoints.down('tablet')]: {
                        flexDirection: 'column'
                    }
                },
                saveChangesButton: {
                    mr: 2,
                    [theme.breakpoints.down('tablet')]: {
                        mx: 0
                    }
                },
                cancelChangesButton: {
                    width: '25%',
                    [theme.breakpoints.down('tablet')]: {
                        width: '75%',
                        mx: 'auto',
                        mt: 1
                    }
                }
            },
            wrapper: {
                mb: 2,
                px: 1,
                display: 'flex',
                justifyContent: 'space-between',
                [theme.breakpoints.down('tablet')]: {
                    flexDirection: 'column'
                }
            },
            secondWrapper: {
                mr: 2,
                [theme.breakpoints.down('tablet')]: {
                    mr: 0,
                    mb: 1
                }
            }
        }
    }
}

export default collectionStyles