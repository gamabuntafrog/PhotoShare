import {
    Box,
    Button,
    FormGroup,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {createCollectionValidationSchema} from "../../../../../../utils/validationSchemas";
import {extendedCollectionsApi} from "../../../../../../redux/api/rootApi";

interface ICollectionInfoProps {
    title: string,
    tags: string,
    isAdmin: boolean,
    collectionId: string
}

interface ICollectionFormData {
    title: string,
    tags: string,
}

export default function CollectionInfo({title, tags, isAdmin, collectionId}: ICollectionInfoProps) {

    const [isEditing, setIsEditing] = useState(false);

    const handleClose = () => setIsEditing(false)
    const handleOpen = () => setIsEditing(true)

    const [updateInfo] = extendedCollectionsApi.useChangeCollectionInfoMutation()

    const {
        register,
        reset: resetForm,
        handleSubmit,
        formState: {errors: {title: titleError, tags: tagsError}}
    } = useForm<ICollectionFormData>({
        resolver: yupResolver(createCollectionValidationSchema),
        mode: 'all'
    });

    const isErrors = !!(titleError || tagsError)

    const onSubmit = handleSubmit(async ({title, tags}) => {
        const formattedTags = tags.split(' ')

        await updateInfo({title, tags: formattedTags, collectionId})

        handleClose()
    })

    const theme = useTheme()

    if (isAdmin && isEditing) {
        return (
            <FormGroup
                sx={{
                    mb: 2,
                    px: 1
                }}
                onSubmit={onSubmit}
            >
                <InputLabel sx={{mb: 1, color: titleError ? theme.palette.error.main : 'inherit' }} htmlFor='title'>Title</InputLabel>
                <OutlinedInput error={!!titleError} id='title' {...register('title')} sx={{mb: 1, color: titleError ? theme.palette.error.main : 'inherit' }} fullWidth defaultValue={title} />

                <InputLabel sx={{mb: 1, color: tagsError ? theme.palette.error.main : 'inherit' }} htmlFor='tags'>Tags</InputLabel>
                <TextField error={!!tagsError} id='tags' {...register('tags')} sx={{mb: 1}} multiline minRows={2} fullWidth defaultValue={tags}/>

                <Box sx={{display: 'flex', mt: 1}}>
                    <Button disabled={isErrors} sx={{mr: 2}}  variant='contained' type='submit' onClick={onSubmit} fullWidth >
                        Save changes
                    </Button>
                    <Button sx={{ width: '25%'}} color='error' variant='text' onClick={handleClose} >
                        Cancel
                    </Button>
                </Box>
            </FormGroup>
        )
    }

    return (
        <Box sx={{
            mb: 2,
            px: 1,
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Box sx={{
                mr: 2
            }}>
                <Typography variant='h6' textAlign='center'>{title}</Typography>
                <Typography color='text.secondary'>{tags}</Typography>
            </Box>
            {isAdmin && (
                <Button onClick={handleOpen} variant='contained'>
                    Edit
                </Button>
            )}
        </Box>
    )
}