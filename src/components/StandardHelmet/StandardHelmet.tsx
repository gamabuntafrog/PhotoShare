import {Helmet} from "react-helmet";
import React from "react";
import useShortTranslation from "../../hooks/useShortTranslation";

interface IStandardHelmetProps {
    keyOfTitle?: string,
    keyOfOther?: string,
    options?: object
}

export default function StandardHelmet({keyOfTitle, keyOfOther, options}: IStandardHelmetProps) {
    const translateTitle = useShortTranslation({componentNameKey: 'Helmet.titles'})
    const translateOther = useShortTranslation({componentNameKey: 'Helmet'})

    if (keyOfTitle) {
        return (
            <Helmet>
                <title>{translateTitle(keyOfTitle, options)}</title>
            </Helmet>
        )
    }

    if (keyOfOther) {
        return (
            <Helmet>
                <title>{translateOther(keyOfOther, options)}</title>
            </Helmet>
        )
    }

    return (
        <Helmet>
            <title>PhotoShare</title>
        </Helmet>
    )
}