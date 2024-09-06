import React from 'react'
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import {responsive} from '../../../../constants/responsive'




const UpcomingMovieSlide = () => {
    const {data, isLoading, isError, error} = useUpcomingMoviesQuery();
    console.log('upcoming data', data)

    // if(isLoading) {
    //     return <h1>Loading...</h1>
    // }
    if(isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }
    if(!isLoading) {
        return (
            <>
                <MovieSlider mainTitle="Upcoming Movies" movies={data?.results || []} responsive={responsive} />
            </>
        )
    }
}

export default UpcomingMovieSlide
