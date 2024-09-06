import React from 'react'
import './MovieLoading.style.scss'
import Lottie from "lottie-react";
import movieLoadingLottie from "../../assets/lottie/movie_loading_lottie.json";

const MovieLoading = () => {
  return (
    <div className="loading_wrap">
      <div className="lottie_area">
            <Lottie 
                animationData={movieLoadingLottie} 
                loop={true}    
            />
            <p className="text">
                Loading...
            </p>
      </div>
    </div>
  )
}

export default MovieLoading

