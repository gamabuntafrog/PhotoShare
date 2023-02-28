import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {Button, Container, IconButton, InputLabel, Modal, OutlinedInput, Typography, useTheme} from "@mui/material";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {collectionValidationSchema} from "../../utils/validationSchemas";
import {updateSavesInfo} from "../../hooks/usePostsActions";
import CloseIcon from '@mui/icons-material/Close';
import useSx from "../../hooks/useSx";
import createCollectionStyles from "./createCollectionModalStyles";
import useShortTranslation from "../../hooks/useShortTranslation";
import StandardHelmet from "../StandardHelmet";
import MiniLoader from "../Loaders/MiniLoader";
import extendedCollectionsApi from "../../redux/api/extendedCollectionsApi";

interface ICollectionFormData {
    title: string,
    tags: string,
}

interface ICreateCollectionModalProps {
    closeModal: () => void,
    isModalOpen: boolean,
    onCreate?: updateSavesInfo,
    postId?: string,
    refetch?: () => void
}

const isFunction = (any: any): any is Function => typeof any === 'function'

export default function CreateCollectionModal(
    {
        closeModal,
        isModalOpen,
        onCreate,
        refetch,
        postId
    }: ICreateCollectionModalProps) {

    const [createCollection, {isLoading: isCollectionCreatingLoading}] = extendedCollectionsApi.useCreateCollectionMutation()

    const {
        register,
        reset: resetForm,
        handleSubmit,
        formState: {errors: {title: titleError, tags: tagsError}}
    } = useForm<ICollectionFormData>({
        resolver: yupResolver(collectionValidationSchema),
        mode: 'all'
    });

    const navigate = useNavigate()

    const onSubmit = handleSubmit(({title, tags}) => {
        const formattedTags = tags.split(' ')

        createNewUserCollection({title, tags: formattedTags})
    })

    const createNewUserCollection = async (body: { title: string, tags: string[] }) => {

        try {
            const response = await createCollection({body}).unwrap()

            resetForm()
            closeModal()

            if (isFunction(onCreate)) {
                onCreate(body.title, response.data.collection._id, postId as string)
            }

            if (isFunction(refetch)) {

                refetch()
                navigate(`/post/create/${response.data.collection._id}`)
            }

        } catch (e) {
        }
    }

    const styles = useSx(createCollectionStyles)

    const t = useShortTranslation({componentNameKey: 'CreateCollectionModal'})

    const titleLabel = titleError?.message ? t(titleError.message) : t('titleLabel')
    const tagsLabel = tagsError?.message ? t(tagsError.message) : t('tagsLabel')

    return (
        <>
            {/*{isModalOpen && (*/}
            {/*    <StandardHelmet keyOfTitle='createCollectionModal'/>*/}
            {/*)}*/}
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={styles.backdrop}
            >
                <Container
                    sx={styles.wrapper}
                    maxWidth='tablet'
                >
                    {isCollectionCreatingLoading ?
                        // <MiniLoader withMeta/>
                        null
                        :
                        <>
                            <IconButton color='error' sx={{alignSelf: 'end'}} onClick={closeModal}>
                                <CloseIcon/>
                            </IconButton>
                            <Typography
                                variant='h3'
                                sx={styles.title}
                            >
                                {t('title')}
                            </Typography>
                            <form style={styles.form} onSubmit={onSubmit}>
                                <InputLabel htmlFor='title' error={!!titleError} sx={styles.label}>
                                    {titleLabel}
                                </InputLabel>
                                <OutlinedInput fullWidth id='title' {...register('title')}/>
                                <InputLabel htmlFor='tags' error={!!tagsError} sx={styles.label}>
                                    {tagsLabel}
                                </InputLabel>
                                <OutlinedInput fullWidth id='tags' {...register('tags')}/>
                                <Button
                                    type='submit'
                                    variant='outlined'
                                        sx={styles.submitButton}
                                >
                                    {t('submitButton')}
                                </Button>
                            </form>
                        </>
                    }
                </Container>
            </Modal>
        </>
    )
}