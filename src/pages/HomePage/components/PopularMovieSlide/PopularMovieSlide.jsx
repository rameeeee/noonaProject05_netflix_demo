import React from 'react'
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import {responsive} from '../../../../constants/responsive'




const PopularMovieSlide = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();

    // if(isLoading) {
    //     return <h1>Loading...</h1>
    // }
    if(isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }
    if(!isLoading) {
        return (
            <>
                <MovieSlider mainTitle="Popular Movies" movies={data?.results || []} responsive={responsive} />
            </>
        )
    }
}

export default PopularMovieSlide
