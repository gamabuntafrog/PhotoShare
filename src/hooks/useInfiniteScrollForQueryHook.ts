import React, {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

export interface IUseInfiniteScrollForQueryHookProps {
    isLoading: boolean,
    data: any[],
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function useInfiniteScrollForQueryHook({isLoading, data, setPage}: IUseInfiniteScrollForQueryHookProps) {
    const [isEnd, setIsEnd] = useState(false);
    const [combinedValue, setCombinedValue] = useState(data);

    const {ref, inView} = useInView({
        threshold: 0,
        rootMargin: '1000px'
    });

    useEffect(() => {
        if (!data || isLoading) return
        if (data.length < 1 && combinedValue.length > 0) {
            setIsEnd(true)
            // console.log('isEnd')
            return
        }

        // console.log('data: ', data)

        setCombinedValue(prev => {
            if (prev.length < 1) return data

            const isNewDataNotSameToPrev = data.findIndex((el) => el._id === prev[prev.length - 1]._id) === -1

            if (isNewDataNotSameToPrev) {
                return [...prev, ...data]
            }

            return prev
        })
    }, [data, isLoading, inView]);

    useEffect(() => {
        if (!inView || isLoading) return

        setPage(prev => prev + 1)
    }, [inView]);

    return {paginatedData: combinedValue, isEnd, ref, inView}
}