import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { subscribeToUser, unsubscribeFromUser } from '../redux/slices/userSlice'
import extendedUsersApi from '../redux/api/extendedUsersApi'
import { useEffect, useLayoutEffect, useState } from 'react'

const useToggleSubscribe = (authorId: string, subscribersInitCount: number) => {
  const [subscribersCount, setSubscribersCount] = useState(subscribersInitCount)

  useLayoutEffect(() => {
    setSubscribersCount(subscribersInitCount)
  }, [subscribersInitCount])

  const subscribes = useAppSelector((state) => state.userReducer.user!.subscribes) as string[]

  const isSubscribed = subscribes.some((id) => id === authorId)

  const dispatch = useAppDispatch()
  const [subscribe] = extendedUsersApi.useSubscribeToUserMutation()
  const [unsubscribe] = extendedUsersApi.useUnsubscribeFromUserMutation()

  const toggleSubscribe = async (authorId: string, isSubscribed: boolean) => {
    try {
      isSubscribed ? unsubscribe({ id: authorId }).unwrap() : subscribe({ id: authorId }).unwrap()

      isSubscribed ? dispatch(unsubscribeFromUser(authorId)) : dispatch(subscribeToUser(authorId))

      isSubscribed ? setSubscribersCount((prev) => --prev) : setSubscribersCount((prev) => ++prev)
    } catch (e) {
      console.log(e)
    }
  }

  return { toggleSubscribe, isSubscribed, subscribersCount }
}

export default useToggleSubscribe
