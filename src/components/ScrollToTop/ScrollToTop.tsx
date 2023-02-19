import {useEffect, useLayoutEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 0)
    }, [pathname]);


    return null;
}