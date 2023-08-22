import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY;
export default function useFetch(endpoint: string, query: object) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setLoading(true);
        fetchData();
    }

    return { data, loading, error, refetch }

}