


export interface IUserInPost {
    username: string,
    avatar: string | null,
    age: number,
    posts: string[],
    createdAt: string,
    updatedAt: string,
    _id: string,
}

export interface IUserInOnePost {
    username: string,
    avatar: string | null,
    subscribersCount: number,
    createdAt: string,
    _id: string,
}

export interface IUser {
    username: string,
    email: string,
    avatar: {
        url: string | null,
        id: string | null
    },
    age: number,
    posts: IPost[] | string[],
    savedPosts: IPost[],
    likedPosts: IPost[],
    subscribes: string[],
    subscribers: string[],
    createdAt: string,
    updatedAt: string,
    token: string,
    _id: string,
}


export interface IPostForICollection {
    _id: string,
    image: string
}

export interface ICollectionForIUser {
    _id: string,
    title: string,
    posts: IPostForICollection[],
    authors: string[]
}

export interface IUserWithCollections {
    _id: string,
    username: string,
    avatar: string | null,
    email: string,
    subscribersCount: number,
    subscribesCount: number,
    postsCount: number,
    createdAt: string,
    canViewAllowedToViewCollections: boolean
}

export interface ICurrentUser {
    username: string,
    email: string,
    avatar: {
        url: string | null,
        id: string | null
    },
    collections: string[]
    age: number,
    posts: string[],
    savedPosts: { post: string, collection: string }[],
    likedPosts: string[],
    subscribes: string[],
    subscribers: string[],
    createdAt: string,
    updatedAt: string,
    token: string,
    _id: string,
}

export interface IUserForAddInCollection {
    _id: string,
    username: string,
    avatar: string | null
}

export interface IUserForSearchBar {
    _id: string,
    username: string,
    avatar: string | null
}

export interface IUserForUsers {
    _id: string,
    username: string,
    avatar: string | null,
    postsCount: number,
    collectionsCount: number,
    subscribesCount: number,
    subscribersCount: number
}

export type notificationActions =
    'subscribe'
    | 'unsubscribe'
    | 'likePost'
    | 'unlikePost'
    | 'addUserToCollection'
    | 'deleteUserFromCollection'
    | 'changeUserRoleInCollection'
    | 'acceptJoinToCollectionRequest'
    | 'declineJoinToCollectionRequest'
    | 'savePost'
    | 'addCommentToPost'
    | 'addReplyToComment'

export interface INotification {
    user: {
        _id: string,
        username?: string,
        avatarURL?: string | null
    },
    type: notificationActions,
    post: {
        _id: string,
        image?: string
    } | null,
    collection: {
        _id: string,
        title?: string
    } | null,
    checked: boolean,
    _id: string,
    comment?: {
        _id: string,
        text: string
    }
}


export interface IUserSlice {
    isLoggedIn: boolean,
    user: ICurrentUser | null,
    isLoading: boolean,
    token: null | string,
    language: 'en-US' | 'uk'
}

export interface IUserSliceAuthorized {
    isLoggedIn: true,
    user: ICurrentUser,
    isLoading: boolean,
    token: string,
}

export interface IReplyComment {
    _id: string,
    author: { _id: string, username: string, avatar: string },
    receiver: { _id: string, username: string},
    text: string,
}

export interface IComment {
    _id: string,
    author: { _id: string, username: string, avatar: string },
    text: string,
    replies: IReplyComment[]
}

export interface ISavesInfo {
    collectionId: string,
    title: string,
    isSaved: boolean
}

export interface IPost {
    savesCount: number,
    comments: IComment[],
    image: string,
    _id: string,
    author: IUserInPost,
    title: string,
    body: string,
    tags: string[],
    likesCount: number,
    createdAt: string,
    updatedAt: string,
    isLiked: boolean,
    isSomewhereSaved: boolean,
    savesInfo: ISavesInfo[]
}

export interface IOnePost {
    savesCount: number,
    comments: IComment[],
    image: string,
    _id: string,
    author: IUserInOnePost,
    title: string,
    body: string,
    tags: string[],
    likesCount: number,
    createdAt: string,
    updatedAt: string,
    isLiked: boolean,
    isSomewhereSaved: boolean,
    savesInfo: {
        collectionId: string,
        title: string,
        isSaved: boolean
    }[]
}

export interface ICollection {
    authors: string[],
    tags: string[],
    posts: string[],
    title: string,
    _id: string
}

type ROLES = 'ADMIN' | 'AUTHOR'

export interface IAuthorOfCollection {
    username: string,
    avatar: string | null,
    _id: string,
    subscribersCount: number,
    isAuthor: boolean,
    isAdmin: boolean
}

export interface IViewerOfCollection {
    username: string,
    avatar: string | null,
    _id: string,
}

export interface IUserFromRequestsOfCollection {
    username: string,
    avatar: string | null,
    _id: string,
}

export interface ICollectionWithPosts {
    authors: IAuthorOfCollection[],
    viewers: IViewerOfCollection[],
    tags: string[],
    posts: IPost[],
    title: string,
    _id: string,
    isPrivate: boolean,
}

export interface ICollectionWithoutPosts {
    authors: IAuthorOfCollection[],
    viewers: IViewerOfCollection[],
    requests: IUserFromRequestsOfCollection[],
    tags: string[],
    posts: string[],
    title: string,
    _id: string,
    isPrivate: boolean,
}

export interface IFullCollection {
    collection: ICollectionWithoutPosts,
    currentUserStatus: {
        isAuthor: boolean,
        isAdmin: boolean,
        isViewer: boolean,
        isInQueue: boolean
    }
}