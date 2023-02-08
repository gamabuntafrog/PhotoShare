import * as Yup from "yup";
import * as yup from "yup";

export const MIN_POST_TITLE_LENGTH = 0
export const MAX_POST_TITLE_LENGTH = 48
export const MIN_BODY_LENGTH = 0
export const MAX_BODY_LENGTH = 200
export const MIN_TAG_LENGTH = 3
export const MAX_TAG_LENGTH = 30

export const validateTags = (string: string | undefined) => {
    const check = string?.split(' ').find((str) => {
        return str[0] === '#' && str.length > MIN_TAG_LENGTH && str.length < MAX_TAG_LENGTH
    })

    return !!check
}

export const imagePresenceValidation = (value: any) => {
    return !!value.length
}

export const imageSizeValidation = (value: FileList) => {
    const twentyMB = 20000000

    if (!value.length) {
        return true
    }

    return value[0].size < twentyMB
}

const oneImageValidationSchema = Yup.mixed().test('size', '', imageSizeValidation).required('').test('required', '', imagePresenceValidation)

// .test('size', 'Max image size is 20mb', imageSizeValidation).required('Image is required')


export const createPostValidationSchema = Yup.object({
    title: Yup.string().min(MIN_POST_TITLE_LENGTH, `titleMinLengthError`).max(MAX_POST_TITLE_LENGTH, `titleMaxLengthError`),
    body: Yup.string().min(MIN_BODY_LENGTH, `bodyMinLengthError`).max(MAX_BODY_LENGTH, `bodyMaxLengthError`),
    imageList: oneImageValidationSchema,
    tags: Yup.string().test('validation', `tagValidationError`, validateTags).required('tagIsRequired'),
    collectionIdIndex: Yup.number().min(0).required()
}).required()

export const MIN_COLLECTION_TITLE_LENGTH = 3
export const MAX_COLLECTION_TITLE_LENGTH = 48

export const collectionValidationSchema = Yup.object({
    title: Yup.string().min(MIN_COLLECTION_TITLE_LENGTH, 'titleMinLengthError').max(MAX_COLLECTION_TITLE_LENGTH, `titleMaxLengthError`).required('requiredTitle'),
    tags: Yup.string().required('requiredTags').test('validation', 'tagValidationError', validateTags)
}).required()

export const MIN_USERNAME_LENGTH = 4
export const MAX_USERNAME_LENGTH = 20
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 50

const passwordValidationSchema = yup.string().required('passwordIsRequired').min(MIN_PASSWORD_LENGTH, `passwordMinLengthError`)
    .max(MAX_PASSWORD_LENGTH, `passwordMaxLengthError`)

export const loginValidationSchema = yup.object({
    email: yup.string().required('requiredEmail').email('wrongEmail'),
    password: passwordValidationSchema,
}).required()


const usernameValidationSchema = Yup.string().min(MIN_USERNAME_LENGTH, `usernameMinLengthError`)
    .max(MAX_USERNAME_LENGTH, `usernameMaxLengthError`).required('usernameRequired')

export const registerValidationSchema = Yup.object({
    username: usernameValidationSchema,
    email: Yup.string().required('requiredEmail').email('wrongEmail'),
    password: passwordValidationSchema,
    repeatPassword: Yup.string().required('repeatPassword').oneOf([Yup.ref("password")], "passwordsDoNotMatch")
}).required()

export const changeProfileValidationSchema = Yup.object({
    username: usernameValidationSchema,
    imageList: Yup.mixed().test('size', 'Max image size is 20mb', imageSizeValidation)
})