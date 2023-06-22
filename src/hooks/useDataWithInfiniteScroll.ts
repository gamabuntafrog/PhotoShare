import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

export type lazyQueryType = () => [
  ({ arrayOfId }: { arrayOfId: string[] }) => Promise<void>,
  { data: any[]; isLoading: boolean; isError: boolean }
]

export interface IUseDataWithInfiniteScroll {
  lazyQuery: lazyQueryType
  refetchDependencies?: any[]
  queryData?: object
}

export function useDataWithInfiniteScroll({
  lazyQuery,
  refetchDependencies = [],
  queryData = {}
}: IUseDataWithInfiniteScroll) {
  const [callback, { data = [], isLoading, isError }] = lazyQuery()
    
  const [isEnd, setIsEnd] = useState(false)
  const [combinedValue, setCombinedValue] = useState(data)
  const [isNextPostsLoading, setIsNextPostsLoading] = useState(false)
  const arrayOfId = useMemo(() => combinedValue.map((el) => el._id), [combinedValue])

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1000px'
  })

  useEffect(() => {
    setCombinedValue([])
    callback({ arrayOfId: [], ...queryData })
    setIsEnd(false)
  }, refetchDependencies)

  useEffect(() => {
    if (isError) return
    if (data.length < 1 || isLoading) return
    if (data.length < 1 && combinedValue.length > 0) {
      setIsEnd(true)
      return
    }
    if (data.length < 15) {
      setIsEnd(true)
    }

    setCombinedValue((prev) => {
      if (prev.length < 1) return data

      const isNewDataNotSameToPrev =
        data.findIndex((el) => el._id === prev[prev.length - 1]._id) === -1

      if (isNewDataNotSameToPrev) {
        return [...prev, ...data]
      }

      return prev
    })
  }, [data, isLoading, inView])

  useEffect(() => {
    if (isError) return
    if (!inView || isLoading) return
    if (isEnd) return
    if (combinedValue.length) {
      setIsNextPostsLoading(true)

      callback({ arrayOfId, ...queryData }).then(() => setIsNextPostsLoading(false))
    }
  }, [inView])

  return { data: combinedValue, isEnd, ref, inView, isLoading, isNextPostsLoading, error: isError }
}
