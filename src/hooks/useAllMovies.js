import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchAllMovies = () => {
    return api.get(`/discover/movie`)
}

export const useAllMoviesQuery = () => {
    return useQuery({
        queryKey: ['all-movies'],
        queryFn: fetchAllMovies,
        select: (result) => result.data,
    })
}