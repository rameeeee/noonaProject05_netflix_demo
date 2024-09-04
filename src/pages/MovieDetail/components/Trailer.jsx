import React, { useState } from 'react';
import './Trailer.scss';
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
                <h4>Centered Modal</h4>
                <YouTube videoId={trailerData?.key} opts={opts} onReady={onReady} className="video_area"/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const Trailer = ({id}) => {
    const [modalShow, setModalShow] = useState(false);
    const { data: trailerData } = useMovieTrailerQuery(id); 
    console.log('trailer', trailerData)
    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
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
