import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

// const fetchAllMovies = ({ genre, page }) => {
//     const url = genre ? `/discover/movie?with_genres=${genre}&page=${page}` : `/discover/movie?page=${page}`;
//     return api.get(url);
// };

const fetchAllMovies = ({ genre, page }) => {
    const url = genre ? `/discover/movie?with_genres=${genre}&page=${page}&include_adult=false` : `/discover/movie?page=${page}&include_adult=false`;
    return api.get(url);
};


export const useAllMoviesQuery = ({ genre, page }) => {
    return useQuery({
        queryKey: ['all-movies', genre, page],
        queryFn: () => fetchAllMovies({ genre, page }),
        select: (result) => result.data,
        keepPreviousData: true, // Keep previous data while fetching new data
    });
};