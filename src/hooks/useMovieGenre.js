import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesGenre = () => {
    return api.get(`/genre/movie/list`)
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchMoviesGenre,
        select: (result) => result.data.genres,
        staleTime: 300000, // 5분
    })
}