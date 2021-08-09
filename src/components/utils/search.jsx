import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SEARCH_CAREER} from './rutas';


export default function Search(career) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false);
    const [result, setResult] = useState([]);

    useEffect( () => {
        setLoading(true);
        setError(false);
        let cancel
        axios.get(SEARCH_CAREER,{
            params:{
                nombre: career
            },
            cancelToken: new axios.CancelToken((c) => {cancel = c})
        }).then(res => {
            setResult(prevState => {
                return [... new Set([...prevState, res.data])]
            })
            setHasMore(res.data.length > 0);
            setLoading(false);
        }).catch(e => {
            if (axios.isCancel(e)) return
            console.log(e);
            setError(true);
        })
        return () => cancel()
    }, [career]);

    return {loading, error, result, hasMore}
}
