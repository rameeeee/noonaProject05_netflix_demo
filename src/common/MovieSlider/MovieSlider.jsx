import React from 'react'
import './MovieSlider.style.scss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';



const MovieSlider = ({mainTitle, movies, responsive}) => {
    return (
        <div className="movie_slide_area">
            <h3 className="main_title">{mainTitle}</h3>
            <Carousel
                infinite={true}
                centerMode={"mobile" ? false : true}
                itemClass="movie-slider"
                containerClass="carousel-container"
                responsive={responsive}  
            >
                {movies.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </div>
    )
}

export default MovieSlider
