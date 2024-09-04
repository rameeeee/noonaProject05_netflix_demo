import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import { useRecommendationMovieQuery } from '../../hooks/useRecommendationMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import Alert from 'react-bootstrap/Alert';
import Trailer from './components/Trailer';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { data: movieDetail, isLoading: isDetailLoading, isError: isDetailError, error: detailError } = useMovieDetailQuery(id);
    const { data: movieReview, isLoading: isReviewLoading, isError: isReviewError, error: reviewError } = useMovieReviewQuery(id);
    const { data: recommendationMovie, isLoading: isRecommendationLoading, isError: isRecommendationError, error: recommendationError } = useRecommendationMovieQuery(id);
    const { data: genreData } = useMovieGenreQuery();
    
    console.log('detail recommendationMovie', recommendationMovie)
    

    const showGenre = (genreList) => {
        if (!Array.isArray(genreList) || !genreData) return [];

        return genreList.map((genre) => {
            const genreObj = genreData.find((g) => g.id === genre.id);
            return genreObj ? genreObj.name : 'Unknown';
        });
    };

    if (isDetailLoading || isReviewLoading || isRecommendationLoading) {
        return <h1>Loading...</h1>;
    }

    if (isDetailError) {
        return <Alert variant="danger">{detailError.message}</Alert>;
    }

    if (isReviewError) {
        return <Alert variant="danger">{reviewError.message}</Alert>;
    }

    if (isRecommendationError) {
        return <Alert variant="danger">{recommendationError.message}</Alert>;
    }

    return (
        <div>
            {movieDetail ? (
                <div>
                    <div>
                        <div className="badge_area">
                            {showGenre(movieDetail.genres) 
                            .map((name, index) => (
                                <span key={index} className="badge badge-danger">{name}</span>
                            ))}
                        </div>
                        <h1>{movieDetail.title}</h1>
                        <p>Popularity: {movieDetail.popularity.toLocaleString()}</p>
                        <p>Budget: ${movieDetail.budget.toLocaleString()}</p>
                        <p>Release Date: {new Date(movieDetail.release_date).toLocaleDateString()}</p>
                        <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`} alt={movieDetail.title} />
                    </div>
                    <div>
                        <h2>Reviews:</h2>
                        <ul>
                            {movieReview.length > 0 ? (
                                movieReview.map((review, index) => 
                                    <li key={index}>{review.content || review}</li> 
                                )
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2>Recommendations:</h2>
                        <ul>
                            {recommendationMovie.length > 0 ? (
                                recommendationMovie.map((movie, index) => 
                                    <li key={index}>{movie.title}</li> 
                                )
                            ) : (
                                <p>No recommendations available.</p>
                            )}
                        </ul>
                    </div>
                    <Trailer id={id}/>
                </div>
            ) : (
                <p>Movie details not found</p>
            )}
        </div>
    );
};

export default MovieDetailPage;
