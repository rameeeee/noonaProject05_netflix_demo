import React from 'react'
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import {responsive} from '../../../../constants/responsive'




const TopRatedMovieSlide = () => {
    const {data, isLoading, isError, error} = useTopRatedMoviesQuery();
    console.log('top rated data', data)
    
    console.log('test data')
    // if(isLoading) {
    //     return <h1>Loading...</h1>
    // }
    if(isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }
    if(!isLoading) {
        return (
            <>
                <MovieSlider mainTitle="Top Rated Movies" movies={data?.results || []} responsive={responsive} />
            </>
        )
    }
}

export default TopRatedMovieSlide;
