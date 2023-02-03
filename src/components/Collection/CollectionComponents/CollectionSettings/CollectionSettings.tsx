import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    IconButton,
    Modal, Switch,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import AddUserToCollection from "../AddAuthorToCollection";
import AuthorsInfo from "./CollectionSettingsComponents/AuthorsInfo";
import ViewersInfo from "./CollectionSettingsComponents/ViewersInfo";
import React, {useState} from "react";
import {IFullCollection} from "../../../../types/collection";
import useSx from "../../../../hooks/useSx";
import collectionStyles from "../../collectionStyles";
import {extendedCollectionsApi} from "../../../../redux/api/rootApi";
import AddUserToCollection from "./CollectionSettingsComponents/AddUserToCollection";
import CollectionInfo from "./CollectionSettingsComponents/CollectionInfo";

interface ICollectionSettingsProps {
    data: IFullCollection,
    closeSettingsModal: () => void,
    isSettingsOpen: boolean
}

export default function CollectionSettings({data, closeSettingsModal, isSettingsOpen}: ICollectionSettingsProps) {

    const {collection, currentUserStatus} = data
    const {_id: collectionId, title, tags, authors, isPrivate, viewers} = collection
    const styles = useSx(collectionStyles)

    const [changeIsPrivate] = extendedCollectionsApi.useChangeIsPrivateMutation()

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const openAddUserAccordion = () => setExpanded('panel1')

    const {isAuthor, isAdmin} = currentUserStatus

    const formattedTags = tags.join(' ')


    return (
        <Modal
            open={isSettingsOpen}
            onClose={closeSettingsModal}
            sx={styles.backdrop}
        >
            <Box
                sx={styles.modalWrapper}
            >
                <Box sx={styles.closeIconWrapper}>
                    <Typography variant='body1' sx={styles.title}>Settings</Typography>

                    <IconButton onClick={closeSettingsModal} sx={styles.closeIcon} color='error'>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box sx={styles.modalContainer}>
                    <CollectionInfo
                        collectionId={collectionId}
                        isAdmin={isAdmin}
                        title={title}
                        tags={formattedTags}
                    />
                    {isAdmin && (
                        <Accordion
                            sx={styles.accordionWrapper}
                            expanded={expanded === 'panel1'}
                            onChange={handleChange('panel1')}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color='primary'/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    Add users
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AddUserToCollection
                                    collectionId={collectionId}
                                />
                            </AccordionDetails>
                        </Accordion>
                    )}

                    <Accordion
                        sx={styles.accordionWrapper}
                        expanded={expanded === 'panel2'}
                        onChange={handleChange('panel2')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color='primary'/>}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Authors
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AuthorsInfo
                                isAdmin={isAdmin}
                                authors={authors}
                                collectionId={collectionId}
                                openAddUserAccordion={openAddUserAccordion}
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        sx={styles.accordionWrapper}
                        expanded={expanded === 'panel3'}
                        onChange={handleChange('panel3')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color='primary'/>}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Viewers
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ViewersInfo
                                isAdmin={isAdmin}
                                openAddUserAccordion={openAddUserAccordion}
                                viewers={viewers}
                                collectionId={collectionId}
                            />
                        </AccordionDetails>
                    </Accordion>
                    {isAdmin && (
                        <Box sx={styles.togglePrivateContainer}>
                            <Box>
                                <Typography>Private mode</Typography>
                                <Typography variant='caption' sx={{color: 'text.secondary'}}>
                                    Make your collection invisible for non-viewers and non-authors
                                </Typography>
                            </Box>
                            <Switch
                                checked={isPrivate}
                                onClick={() => changeIsPrivate({collectionId})}
                            />
                        </Box>
                    )}
                    <Box sx={{
                        display: 'flex',
                        px: 1,
                        mt: 3
                    }}>
                        {isAdmin && (
                            <Box sx={{
                                mr: 2
                            }}>
                                <Button
                                    // onClick={}
                                    color='error'
                                    variant='contained'
                                >
                                    Delete collection
                                </Button>
                            </Box>
                        )}
                        <Box>
                            <Button
                                // onClick={}
                                color='error'
                                variant='contained'
                            >
                                Leave collection
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}