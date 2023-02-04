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
import useSx from "../../../../../../hooks/useSx";
import collectionStyles from "../../../../collectionStyles";

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

    const [updateInfo] = extendedCollectionsApi.useChangeCollectionInfoMutation()

    const {
        register,
        reset: resetForm,
        handleSubmit,
        formState: {errors: {title: titleError, tags: tagsError}}
    } = useForm<ICollectionFormData>({
        resolver: yupResolver(createCollectionValidationSchema),
        mode: 'all',
        defaultValues: {
            title: title,
            tags: tags
        }
    });

    const handleClose = () => {
        setIsEditing(false)
        resetForm()
    }
    const handleOpen = () => setIsEditing(true)

    const isErrors = !!(titleError || tagsError)

    const onSubmit = handleSubmit(async ({title, tags}) => {
        const formattedTags = tags.split(' ')

        await updateInfo({title, tags: formattedTags, collectionId})

        handleClose()
    })


    const {collectionSettingsInfo: styles} = useSx(collectionStyles)
    const {changeInfoForm: formStyles} = styles

    if (isAdmin && isEditing) {
        return (
            <FormGroup
                sx={formStyles.wrapper}
                onSubmit={onSubmit}
            >
                <InputLabel error={!!titleError} sx={formStyles.inputLabel} htmlFor='title'>Title</InputLabel>
                <OutlinedInput error={!!titleError} id='title' {...register('title')} sx={formStyles.input} fullWidth/>

                <InputLabel sx={formStyles.inputLabel} htmlFor='tags'>Tags</InputLabel>
                <TextField error={!!tagsError} id='tags' {...register('tags')} sx={formStyles.input} multiline minRows={2} fullWidth />

                <Box sx={formStyles.buttonsWrapper}>
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
        <Box sx={styles.wrapper}>
            <Box sx={styles.secondWrapper}>
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