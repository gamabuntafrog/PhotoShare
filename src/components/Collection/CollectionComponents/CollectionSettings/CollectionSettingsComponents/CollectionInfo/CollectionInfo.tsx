import {
  Box,
  Button,
  FormGroup,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { collectionValidationSchema } from '../../../../../../utils/validationSchemas'
import useSx from '../../../../../../hooks/useSx'
import collectionStyles from '../../../../collectionStyles'
import useShortTranslation from '../../../../../../hooks/useShortTranslation'
import extendedCollectionsApi from '../../../../../../redux/api/extendedCollectionsApi'

interface ICollectionInfoProps {
  title: string
  tags: string
  isAdmin: boolean
  collectionId: string
}

interface ICollectionFormData {
  title: string
  tags: string
}

export default function CollectionInfo({
  title,
  tags,
  isAdmin,
  collectionId
}: ICollectionInfoProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [updateInfo] = extendedCollectionsApi.useChangeCollectionInfoMutation()

  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: {
      errors: { title: titleError, tags: tagsError }
    }
  } = useForm<ICollectionFormData>({
    resolver: yupResolver(collectionValidationSchema),
    mode: 'all',
    defaultValues: {
      title: title,
      tags: tags
    }
  })

  const handleClose = () => {
    setIsEditing(false)
    resetForm()
  }
  const handleOpen = () => setIsEditing(true)

  const isErrors = !!(titleError || tagsError)

  const onSubmit = handleSubmit(async ({ title, tags }) => {
    const formattedTags = tags.split(' ')

    await updateInfo({ title, tags: formattedTags, collectionId })

    handleClose()
  })

  const { collectionSettingsInfo: styles } = useSx(collectionStyles)
  const { changeInfoForm: formStyles } = styles

  const t = useShortTranslation({
    componentNameKey: 'Collection.CollectionSettings.CollectionInfo'
  })
  const tForm = useShortTranslation({
    componentNameKey: 'Collection.CollectionSettings.CollectionInfo.form'
  })

  const titleLabel = titleError?.message ? tForm(titleError.message) : tForm('titleLabel')
  const tagsLabel = tagsError?.message ? tForm(tagsError.message) : tForm('tagsLabel')

  if (isAdmin && isEditing) {
    return (
      <FormGroup sx={formStyles.wrapper} onSubmit={onSubmit}>
        <InputLabel error={!!titleError} sx={formStyles.inputLabel} htmlFor="title">
          {titleLabel}
        </InputLabel>
        <OutlinedInput
          error={!!titleError}
          id="title"
          {...register('title')}
          sx={formStyles.input}
          fullWidth
        />

        <InputLabel sx={formStyles.inputLabel} htmlFor="tags">
          {tagsLabel}
        </InputLabel>
        <TextField
          error={!!tagsError}
          id="tags"
          {...register('tags')}
          sx={formStyles.input}
          multiline
          minRows={2}
          fullWidth
        />

        <Box sx={formStyles.buttonsWrapper}>
          <Button
            disabled={isErrors}
            sx={formStyles.saveChangesButton}
            variant="contained"
            type="submit"
            onClick={onSubmit}
            fullWidth
          >
            {tForm('saveChangesButton')}
          </Button>
          <Button
            sx={formStyles.cancelChangesButton}
            color="error"
            variant="text"
            onClick={handleClose}
          >
            {tForm('cancelChangesButton')}
          </Button>
        </Box>
      </FormGroup>
    )
  }

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.secondWrapper}>
        <Typography variant="h6" textAlign="center">
          {title}
        </Typography>
        <Typography color="text.secondary">{tags}</Typography>
      </Box>
      {isAdmin && (
        <Button onClick={handleOpen} variant="contained">
          {t('editButton')}
        </Button>
      )}
    </Box>
  )
}
