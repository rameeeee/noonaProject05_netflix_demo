import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecommendationMovie = (id) => {
    return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendationMovieQuery = (id) => {
    return useQuery({
        queryKey: ['recommendation-movie', id],
        queryFn: () => fetchRecommendationMovie(id),
        select: (result) => result.data.results, 
    });
};
