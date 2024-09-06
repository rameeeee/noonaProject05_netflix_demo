import React, { useState } from 'react';
import './Trailer.style.scss';
import { Button, Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMovieTrailerQuery } from '../../../hooks/useMovieTrailer';


const TrailerModal = (props) => {
    const { trailerData } = props;


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
    console.log('trailerData 0번!!!!!', trailerData?.key)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Movie Trailer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <YouTube videoId={trailerData?.key} opts={opts} onReady={onReady} className="video_area"/>
            </Modal.Body>
        </Modal>
    );
};

const Trailer = ({id}) => {
    const [modalShow, setModalShow] = useState(false);
    const { data: trailerData } = useMovieTrailerQuery(id); 
    console.log('trailer', trailerData)
    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)} className="btn_modal">
                Watch In Modal
            </Button>

            <TrailerModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                trailerData={trailerData?.length > 0 ? trailerData[0] : null} 
            />
        </div>
    );
};

export default Trailer;
