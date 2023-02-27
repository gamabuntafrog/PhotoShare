import React, {useEffect, useLayoutEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

export interface IUseInfiniteScrollForQueryHookProps {
    isLoading: boolean,
    data: any[],
    isError: boolean,
    triggerCallback: () => void,
    refetchDependencies?: any[]
}

export default function useInfiniteScrollForQueryHook({
                                                          isLoading,
                                                          data,
                                                          isError,
                                                          triggerCallback,
                                                          refetchDependencies = []
                                                      }: IUseInfiniteScrollForQueryHookProps) {
    const [isEnd, setIsEnd] = useState(false);
    const [combinedValue, setCombinedValue] = useState(data);
    const [page, setPage] = useState(1);

    const {ref, inView} = useInView({
        threshold: 0,
        rootMargin: '1000px',
    });

    useLayoutEffect(() => {
        setPage(1)
        setCombinedValue([])
        setIsEnd(false)
    }, [...refetchDependencies]);

    useLayoutEffect(() => {
        if (isError) return;
        if (data.length < 1 || isLoading) return
        if (data.length < 1 && combinedValue.length > 0) {
            setIsEnd(true)
            return
        }
        if (data.length < 15) {
            setIsEnd(true)
        }

        setCombinedValue(prev => {
            if (prev.length < 1) return data

            const isNewDataNotSameToPrev = data.findIndex((el) => el._id === prev[prev.length - 1]._id) === -1

            if (isNewDataNotSameToPrev) {
                return [...prev, ...data]
            }

            return prev
        })
    }, [data, isLoading, inView]);

    useLayoutEffect(() => {
        if (isError) return;
        if (!inView || isLoading) return;
        if (isEnd) return;

        setPage(prev => prev + 1)

    }, [inView]);

    useLayoutEffect(() => {
        triggerCallback()
    }, [page]);

    return {paginatedData: combinedValue, isEnd, ref, inView, page}
}