import {IComment} from "../types/post";
import extendedPostsApi from "../redux/api/extendedPostsApi";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {commentValidationSchema, replyValidationSchema} from "../utils/validationSchemas";

export enum commentsType {
    comment = 'comment',
    reply = 'reply'
}

interface ICommentFormData {
    text: string
}

interface IReplyFormData {
    text: string,
    commentId: string,
    receiverId: string
}

export default function useCommentsActions({initComments, postId}: { initComments: IComment[], postId: string }) {
    const [createComment] = extendedPostsApi.useCreateCommentMutation()
    const [createReply] = extendedPostsApi.useCreateReplyMutation()

    const [commentType, setCommentType] = useState<commentsType>(commentsType.comment);
    const [comments, setComments] = useState(initComments);

    useEffect(() => {
        setComments(initComments)
    }, [JSON.stringify(initComments)])

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        reset,
        formState: {},
    } = useForm<ICommentFormData | IReplyFormData>({
        resolver: commentType === commentsType.comment ? yupResolver(commentValidationSchema) : yupResolver(replyValidationSchema),
        mode: 'all',
        defaultValues: commentType === commentsType.comment ? {text: ''} : {
            text: '',
            commentId: '',
            receiverId: ''
        }
    });

    const chooseComment = () => {
        setCommentType(commentsType.comment)
        setValue('receiverId', '')
        setValue('commentId', '')
    }
    const chooseReply = ({receiverId, commentId}: { receiverId: string, commentId: string }) => {
        setCommentType(commentsType.reply)
        setValue('receiverId', receiverId)
        setValue('commentId', commentId)
    }

    const onSubmit = handleSubmit(async (props) => {
        const {text} = props

        if (commentType === commentsType.reply) {
            const {commentId, receiverId} = props as IReplyFormData
            const res = await createReply({text, postId, commentId, receiverId})

            if (res && 'data' in res) {
                setComments(prev => {
                    return prev.map((comment) => {
                        if (comment._id !== commentId) return comment
                        return {...comment, replies: [...comment.replies, res.data]}
                    })
                })
            }
        } else {
            const res = await createComment({text, postId})
            if (res && 'data' in res) {
                setComments(prev => [...prev, res.data])
            }
        }

        reset()
        setCommentType(commentsType.comment)
    });

    const receiver = comments.find((comment) => {
        return comment.author._id === watch('receiverId')
    }) || comments.find((comment) => comment.replies.find((reply) => reply.author._id === watch('receiverId')))

    return {receiver, onSubmit, chooseComment, chooseReply, register, commentType, comments}
}