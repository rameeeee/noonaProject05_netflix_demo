import React, {useRef, useEffect, useState} from 'react';
import './MovieDetailPage.style.scss'
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';

import Trailer from './components/Trailer';
import YouTube from 'react-youtube';
import Alert from 'react-bootstrap/Alert';
import Review from './components/Review';
import RecommendationMovie from './components/RecommendationMovie';
import MovieLoading from '../../common/Loading/MovieLoading';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { data: movieDetail, isLoading: isDetailLoading, isError: isDetailError, error: detailError } = useMovieDetailQuery(id);
    
    const { data: genreData } = useMovieGenreQuery();
    const { data: trailerData } = useMovieTrailerQuery(id);
    
    
    const showGenre = (genreList) => {
        if (!Array.isArray(genreList) || !genreData) return [];

        return genreList.map((genre) => {
            const genreObj = genreData.find((g) => g.id === genre.id);
            return genreObj ? genreObj.name : 'Unknown';
        });
    };

    

    if (isDetailLoading) {
        return <MovieLoading />
    }

    if (isDetailError) {
        return <Alert variant="danger">{detailError.message}</Alert>;
    }

    

    

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    const onReady = (event) => {
        event.target.pauseVideo();
    };

    return (
        <div className="detail_page_wrap">
            {movieDetail ? (
                <div>
                    {trailerData && 
                        <div className="video_area_wrap">
                            <YouTube videoId={trailerData && trailerData.length > 0 ? trailerData[0].key : null} opts={opts} onReady={onReady} className="video_area"/>
                        </div>
                    }
                    <div className="modal_area">
                        <Trailer id={id}/>
                    </div>
                    <h1>{movieDetail.title}</h1>
                    <div className="movie_info_area">
                        <div className="movie_info_detail">
                            <div className="info_box">
                                <p className="info">Popularity : {movieDetail.popularity.toLocaleString()}</p>
                                <p className="info">Budget : ${movieDetail.budget.toLocaleString()}</p>
                                <p className="info">Release Date : {new Date(movieDetail.release_date).toLocaleDateString()}</p>
                                <p className="info">genre : 
                                    {showGenre(movieDetail.genres) 
                                    .map((name, index) => (
                                        <span key={index} className="badge badge-danger">{name}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="movie_info_thumb">
                            <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}`} alt={movieDetail.title} />
                        </div>
                    </div>
                    <div className="review_area">
                        <h2 className="middle_title">Reviews</h2>
                        <Review id={id} />
                    </div>
                    <div className="recommendation_area">
                        <h2 className="middle_title">Recommendations</h2>
                        <RecommendationMovie id={id} />
                        
                    </div>
                    
                </div>
            ) : (
                <p>Movie details not found</p>
            )}
        </div>
    );
};

export default MovieDetailPage;
