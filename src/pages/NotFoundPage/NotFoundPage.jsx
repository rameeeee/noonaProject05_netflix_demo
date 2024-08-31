import './NotFoundPage.scss'
import React from 'react'
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lottie/loading_lottie.json";

const NotFoundPage = () => {
    return (
        <div className="not_found_page_wrap">
            <div className="lottie_wrap">
                <Lottie 
                    animationData={loadingLottie} 
                    loop={true}    
                />
            </div>
        </div>
    )
}

export default NotFoundPage
