import * as Yup from "yup";
import * as yup from "yup";

const MIN_POST_TITLE_LENGTH = 0
const MAX_POST_TITLE_LENGTH = 48
const MIN_BODY_LENGTH = 0
const MAX_BODY_LENGTH = 200
const MIN_TAG_LENGTH = 3
const MAX_TAG_LENGTH = 30

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

const oneImageValidationSchema = Yup.mixed().test('size', 'Max image size is 20mb', imageSizeValidation).required('Image is required').test('required', 'Image is required', imagePresenceValidation)

// .test('size', 'Max image size is 20mb', imageSizeValidation).required('Image is required')

export const createPostValidationSchema = Yup.object({
    title: Yup.string().min(MIN_POST_TITLE_LENGTH, `Min length is ${MIN_POST_TITLE_LENGTH} symbols`).max(MAX_POST_TITLE_LENGTH, `Max length is ${MAX_POST_TITLE_LENGTH} symbols`),
    body: Yup.string().min(MIN_BODY_LENGTH, `Min length is ${MIN_BODY_LENGTH} symbols`).max(MAX_BODY_LENGTH, `Max length is ${MAX_BODY_LENGTH} symbols`),
    imageList: oneImageValidationSchema,
    tags: Yup.string().test('validation', `Every tag must have "#", min length is ${MIN_TAG_LENGTH} and max is ${MAX_TAG_LENGTH}`, validateTags).required('Min 1 tag'),
    collectionIdIndex: Yup.number().min(0).required()
}).required()

export const MIN_COLLECTION_TITLE_LENGTH = 3
export const MAX_COLLECTION_TITLE_LENGTH = 48

export const createCollectionValidationSchema = Yup.object({
    title: Yup.string().min(MIN_COLLECTION_TITLE_LENGTH).max(MAX_COLLECTION_TITLE_LENGTH, `Max title length is ${MAX_COLLECTION_TITLE_LENGTH} symbols`).required(),
    tags: Yup.string().required().test('validation', 'Every tag must have "#" ang min length 3 symbols', validateTags)
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