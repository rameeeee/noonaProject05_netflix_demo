import React, {useRef, useEffect, useState} from 'react';
import './MovieDetailPage.style.scss'
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import { useRecommendationMovieQuery } from '../../hooks/useRecommendationMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import Alert from 'react-bootstrap/Alert';
import Trailer from './components/Trailer';
import YouTube from 'react-youtube';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { data: movieDetail, isLoading: isDetailLoading, isError: isDetailError, error: detailError } = useMovieDetailQuery(id);
    const { data: movieReview, isLoading: isReviewLoading, isError: isReviewError, error: reviewError } = useMovieReviewQuery(id);
    const { data: recommendationMovie, isLoading: isRecommendationLoading, isError: isRecommendationError, error: recommendationError } = useRecommendationMovieQuery(id);
    const { data: genreData } = useMovieGenreQuery();
    const { data: trailerData } = useMovieTrailerQuery(id);
    console.log('detail Review', movieReview)
    console.log('detail recommendationMovie', recommendationMovie)
    
    const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
    const [showMoreButton, setShowMoreButton] = useState({});

    const reviewRefs = useRef([]);

    useEffect(() => {
        const newShowMoreButton = {};

        reviewRefs.current.forEach((ref, index) => {
            if (ref && ref.scrollHeight > ref.clientHeight) {
                newShowMoreButton[index] = true;
            } else {
                newShowMoreButton[index] = false;
            }
        });

        setShowMoreButton(newShowMoreButton);
    }, [movieReview]);

    const toggleExpandReview = (index) => {
        setExpandedReviewIndex(index === expandedReviewIndex ? null : index);
    };


    const showGenre = (genreList) => {
        if (!Array.isArray(genreList) || !genreData) return [];

        return genreList.map((genre) => {
            const genreObj = genreData.find((g) => g.id === genre.id);
            return genreObj ? genreObj.name : 'Unknown';
        });
    };

    const formatAuthorName = (author) => {
        const length = author.length;
        if (length <= 4) {
            return author + '*'.repeat(4);
        }
        return author.slice(0, 4) + '*'.repeat(4);
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
                    <div className="video_area_wrap">
                        <YouTube videoId={trailerData && trailerData.length > 0 ? trailerData[0].key : null} opts={opts} onReady={onReady} className="video_area"/>
                    </div>
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
                        <ul className="review_list">
                            {movieReview.length > 0 ? (
                                movieReview.map((review, index) => 
                                    <li key={index} className="review_item">
                                        
                                        <div className="review_sub">
                                            <span className="sub_info">{formatAuthorName(review.author)}</span>
                                            <span className="sub_info">{new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                        {/* <p className="review_text">
                                            {review.content || review}
                                        </p> */}
                                        <p
                                            className={`review_text ${expandedReviewIndex === index ? 'expanded' : ''}`}
                                            ref={(el) => (reviewRefs.current[index] = el)}
                                        >
                                            {review.content || review}
                                        </p>
                                        {showMoreButton[index] && (
                                            <button className="more_button" onClick={() => toggleExpandReview(index)}>
                                                {expandedReviewIndex === index ? 'Show Less' : 'Read More'}
                                            </button>
                                        )}
                                    </li> 
                                )
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </ul>
                    </div>
                    <div className="recommendation_area">
                        <h2 className="middle_title">Recommendations</h2>
                        <div className="other_movie_list_wrap">
                            {/* {recommendationMovie.length > 0 ?
                            (<Swiper
                                className="other_movie_list"
                                modules={[Scrollbar]}
                                scrollbar={{ draggable: true }}
                            >
                                {recommendationMovie.map((movie, index) =>
                                <SwiperSlide  key={index}>
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
                                </SwiperSlide>
                                )}
                            </Swiper>)
                            : <p>No recommendations available.</p>
                            } */}
                            <ul className="other_movie_list">
                                {recommendationMovie.length > 0 ? (
                                    recommendationMovie.map((movie, index) => 
                                        <li className="other_movie_item" key={index}>
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
                    </div>
                    
                </div>
            ) : (
                <p>Movie details not found</p>
            )}
        </div>
    );
};

export default MovieDetailPage;
