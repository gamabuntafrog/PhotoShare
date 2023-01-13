import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {IUserSliceAuthorized} from "../../types/userSlice";
import {collectionsApi} from "../../redux/api/collectionsApi";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {Button, Container, InputLabel, Modal, OutlinedInput, Typography} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {createCollectionValidationSchema} from "../../utils/validationSchemas";
import {IResponseNotification, pushResponse} from "../../redux/slices/responseNotificationsSlice";


interface ICollectionFormData {
    title: string,
    tags: string,
}

export default function CreateCollectionModal({
                                                  closeModal,
                                                  isModalOpen,
                                                  refetch
                                              }: { closeModal: () => void, isModalOpen: boolean, refetch?: () => void }) {
    const {id: collectionId = ''} = useParams<{ id: string }>()!

    const {token, user: currentUser} = useAppSelector(state => state.userReducer) as IUserSliceAuthorized
    const [createCollection, {data, isLoading: isCollectionCreatingLoading}] = collectionsApi.useCreateMutation()

    const {
        register,
        watch,
        setValue,
        reset: resetForm,
        handleSubmit,
        formState: {errors: {title: titleError, tags: tagsError}}
    } = useForm<ICollectionFormData>({
        resolver: yupResolver(createCollectionValidationSchema),
        mode: 'all'
    });

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onSubmit = handleSubmit(({title, tags}) => {
        const formattedTags = tags.split(' ')

        createNewUserCollection({title, tags: formattedTags})
    })

    const createNewUserCollection = async (body: { title: string, tags: string[] }) => {

        try {
            const response = await createCollection({token, body}).unwrap()

            resetForm()
            closeModal()

            if (!!refetch) {
                refetch()
                navigate(response.data.collection._id)

                dispatch(pushResponse(response as IResponseNotification))

                console.log(response.data)
            }



        } catch (e) {
            dispatch(pushResponse(e as IResponseNotification))
        }
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container
                sx={{
                    bgcolor: 'background.default',
                    mx: 2,
                    py: 2,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCollectionCreatingLoading ? 'center' : 'center',
                    justifyContent: 'center',
                    minHeight: '50vh'
                }}
                maxWidth='tablet'

            >
                {isCollectionCreatingLoading ?
                    <Typography color='text.standard' variant='h1'>Loading...</Typography>
                    :
                    <>
                        <Button color='error' sx={{alignSelf: 'end'}} onClick={closeModal}>Close</Button>
                        <Typography color='text.standard' textAlign='center' mx='auto' my={2} variant='h3'>Create new
                            collection</Typography>
                        <form style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '90%',
                        }} onSubmit={onSubmit}>
                            <InputLabel htmlFor='title' error={!!titleError} sx={{my: 1}}>
                                {titleError?.message || 'Title'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='title' {...register('title')}/>
                            <InputLabel htmlFor='tags' error={!!tagsError} sx={{my: 1}}>
                                {tagsError?.message || 'Tags'}
                            </InputLabel>
                            <OutlinedInput fullWidth id='tags' {...register('tags')}/>
                            <Button type='submit' variant='outlined' sx={{alignSelf: 'end', mt: 2}}>Create</Button>
                        </form>

                    </>
                }
            </Container>
        </Modal>
    )
}