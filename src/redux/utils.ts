import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { IResponseNotification } from './slices/responseNotificationsSlice'

export const returnTransformedError = (baseQueryReturnValue: FetchBaseQueryError) => {
  return baseQueryReturnValue.data as IResponseNotification
}
