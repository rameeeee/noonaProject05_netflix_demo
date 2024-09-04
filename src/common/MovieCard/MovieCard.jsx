import React from 'react'
import './MovieCard.style.scss'
import {Badge} from 'react-bootstrap'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie}) => {
    const {data:genreData} = useMovieGenreQuery();
    // console.log('genre data', genreData)
    const navigate = useNavigate()
    const showDetail = () => {
        navigate(`/movies/${movie.id}`)
    }
    
    const showGenre = (genreIdList) => {
        if(!genreData) return []
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id)
            return genreObj.name
        })
        return genreNameList
    }

    return (
        <div className="movie_card_wrap" onClick={showDetail}>
            <div
                style={{backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}` + ")"}}
                className="movie_card"
            >
                <div className="overlay">
                    <h1 className="movie_title">{movie?.title}</h1>
                    <div className="badge_area">
                        {showGenre(movie.genre_ids)
                        .map((id,index) => (
                            <Badge key={index} bg="danger">{id}</Badge>
                        ))}
                    </div>
                    <div className="info_area">
                        <div className="vote_average">{movie?.vote_average.toFixed(1)}</div>
                        <div className="popular">{movie?.popularity.toFixed(1)}</div>
                        <div className="adult">{movie?.adult ? "over18" : "under18"}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
