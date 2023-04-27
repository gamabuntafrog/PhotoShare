import { useLayoutEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface IUseInfiniteScrollForSearchByTagsQueryProps {
  trigger: any
  isLoading: boolean
  isError: boolean
  tags: string[]
  data: any[]
}

export default function useInfiniteScrollForSearchByTagsQuery({
  trigger,
  isLoading,
  isError,
  tags,
  data
}: IUseInfiniteScrollForSearchByTagsQueryProps) {
  const [isEnd, setIsEnd] = useState(false)
  const [combinedValue, setCombinedValue] = useState(data)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '1000px'
  })

  useLayoutEffect(() => {
    setCombinedValue([])
    setIsEnd(false)
  }, [tags])

  useLayoutEffect(() => {
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
  }, [data])

  useLayoutEffect(() => {
    if (isError) return
    if (!inView || isLoading) return
    if (isEnd) return

    const arrayOfId = combinedValue.map((el) => el._id)
    trigger({ arrayOfId, tags })
  }, [inView, tags])

  useLayoutEffect(() => {
    trigger({ arrayOfId: [], tags })
  }, [])

  return { paginatedData: combinedValue, ref, isEnd }
}
