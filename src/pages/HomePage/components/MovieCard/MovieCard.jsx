import React from 'react'
import './MovieCard.style.scss'
import {Badge} from 'react-bootstrap'

const MovieCard = ({movie}) => {
    return (
        <div
            style={{backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}` + ")"}}
            className="movie_card"
        >
            <div className="overlay">
                <h1 className="movie_title">{movie?.title}</h1>
                <div className="badge_area">
                    {movie?.genre_ids.map((id,index) => (
                        <Badge key={index} bg="danger">{id}</Badge>
                    ))}
                </div>
                <div className="info_area">
                    <div className="vote_average">{movie?.vote_average}</div>
                    <div className="popular">{movie?.poplularity}</div>
                    <div className="adult">{movie?.adult ? "over18" : "under18"}</div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
