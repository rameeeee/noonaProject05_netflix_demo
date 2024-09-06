import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import './Banner.style.scss'
import Alert from 'react-bootstrap/Alert';
import MovieLoading from '../../../../common/Loading/MovieLoading';

const Banner = () => {
   const {data, isLoading, isError, error} = usePopularMoviesQuery()
   console.log('banner data', data)

   if(isLoading) {
       return <MovieLoading />
   }
   if(isError) {
        return <Alert variant="danger">{error.message}</Alert>
   }
  return (
    <div style={{
            backgroundImage: "url(" + `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0].poster_path}` + ")"
        }}
        className="banner_wrap"
    >
        <div className="banner_content">
            <div className="banner_text_area">
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    </div>
  )
}

export default Banner
