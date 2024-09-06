import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';


// const fetchSearchMovie = ({ keyword, page, genre }) => {
//     if (keyword) {
//         let url = `search/movie?query=${encodeURIComponent(keyword)}&page=${page}`;
//         if (genre) {
//             url += `&with_genres=${genre}`;
//         }
//         return api.get(url);
//     }
//     return api.get(`/movie/popular?page=${page}`);
// };

const fetchSearchMovie = ({ keyword, page, genre }) => {
    if (keyword) {
        let url = `search/movie?query=${encodeURIComponent(keyword)}&page=${page}&include_adult=false`;
        if (genre) {
            url += `&with_genres=${genre}`;
        }
        return api.get(url);
    }
    return api.get(`/movie/popular?page=${page}&include_adult=false`);
};



export const useSearchMovieQuery = ({ keyword, page, genre }) => {
    return useQuery({
        queryKey: ['movie-search', { keyword, page, genre }],
        queryFn: () => fetchSearchMovie({ keyword, page, genre }),
        select: (result) => result.data,
        keepPreviousData: true, // Keep previous data while fetching new data
    });
};
