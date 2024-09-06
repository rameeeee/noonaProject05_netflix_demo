import React from 'react'
import './RecommendationMovie.style.scss'
import Alert from 'react-bootstrap/Alert';
import { useRecommendationMovieQuery } from '../../../hooks/useRecommendationMovie';
import { useNavigate } from 'react-router-dom';


const RecommendationMovie = ({id}) => {
    const { data: recommendationMovie, isLoading: isRecommendationLoading, isError: isRecommendationError, error: recommendationError } = useRecommendationMovieQuery(id);
    console.log('detail recommendationMovie', recommendationMovie)
    const navigate = useNavigate();

    if (isRecommendationLoading) {
        return <h1>Loading...</h1>;
    }
    if (isRecommendationError) {
        return <Alert variant="danger">{recommendationError.message}</Alert>;
    }

    const showDetail = (id) => {
        navigate(`/movies/${id}`)
    }

    return (
        <div className="other_movie_list_wrap">
            <ul className="other_movie_list">
                {recommendationMovie.length > 0 ? (
                    recommendationMovie.map((movie, index) => 
                        <li className="other_movie_item" key={index} onClick={() => showDetail(movie.id)}>
                            <div className="item_wrap">
                                <div className="thumb">
                                    <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`} alt="poster" />
                                </div>
                                <div className="text_wrap">
                                    <div className="title">{movie.title}</div>
                                    <div className="vote_average">{movie?.vote_average.toFixed(1)}</div>
                                    <div className="popular">{movie?.popularity.toFixed(1)}</div>
                                </div>
                            </div>
                        </li> 
                    )
                ) : (
                    <p>No recommendations available.</p>
                )}
            </ul>
        </div>
    )
}

export default RecommendationMovie
