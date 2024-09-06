import React, {useState, useEffect, useRef} from 'react'
import './Review.style.scss'
import { useMovieReviewQuery } from '../../../hooks/useMovieReview';
import {Alert, Modal} from 'react-bootstrap';

const Review = ({id}) => {
    const { data: movieReview, isLoading: isReviewLoading, isError: isReviewError, error: reviewError } = useMovieReviewQuery(id);
    const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);
    const [expandedReviewIndexModal, setExpandedReviewIndexModal] = useState(null);
    const [showMoreButton, setShowMoreButton] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    console.log('detail Review', movieReview)
    const formatAuthorName = (author) => {
        const length = author.length;
        if (length <= 4) {
            return author + '*'.repeat(4);
        }
        return author.slice(0, 4) + '*'.repeat(4);
    };
    const reviewRefs = useRef([]);

    useEffect(() => {
        const newShowMoreButton = {};

        reviewRefs.current.forEach((ref, index) => {
            if (ref && ref.scrollHeight > ref.clientHeight) {
                newShowMoreButton[index] = true;
            } else {
                newShowMoreButton[index] = false;
            }
        });

        setShowMoreButton(newShowMoreButton);
    }, [movieReview, showModal]);

    const toggleExpandReview = (index) => {
        setExpandedReviewIndex(index === expandedReviewIndex ? null : index);
    };
    const toggleExpandReviewModal = (index) => {
        setExpandedReviewIndexModal(index === expandedReviewIndexModal ? null : index);
    };

    if (isReviewLoading) {
        return <h1>Loading...</h1>;
    }
    if (isReviewError) {
        return <Alert variant="danger">{reviewError.message}</Alert>;
    }


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const reviewsToShow = movieReview.slice(0, 4);
    const hasMoreReviews = movieReview.length > 4;

    return (
        <div>
            <ul className="review_list">
                {reviewsToShow.length > 0 ? (
                    reviewsToShow.map((review, index) => 
                        <li key={index} className="review_item">
                            
                            <div className="review_sub">
                                <span className="sub_info">{formatAuthorName(review.author)}</span>
                                <span className="sub_info">{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                           
                            <p
                                className={`review_text ${expandedReviewIndex === index ? 'expanded' : ''}`}
                                ref={(el) => (reviewRefs.current[index] = el)}
                            >
                                {review.content || review}
                            </p>
                            {showMoreButton[index] && (
                                <button className="more_button" onClick={() => toggleExpandReview(index)}>
                                    {expandedReviewIndex === index ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </li> 
                    )
                ) : (
                    <p>No reviews available.</p>
                )}
            </ul>
            {hasMoreReviews && (
                <button className="btn_all" onClick={handleShowModal}>
                    Show All Reviews
                </button>
            )}

            <Modal show={showModal} fullscreen={fullscreen} onHide={handleCloseModal} size="lg" className="review_modal">
                <Modal.Header closeButton>
                    <Modal.Title>All Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="review_list">
                        {movieReview.map((review, index) => (
                            <li key={index} className="review_item">
                                <div className="review_sub">
                                    <span className="sub_info">{formatAuthorName(review.author)}</span>
                                    <span className="sub_info">{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <p
                                    className={`review_text ${expandedReviewIndexModal === index ? 'expanded' : ''}`}
                                    ref={(el) => (reviewRefs.current[index] = el)}
                                >
                                    {review.content || review}
                                </p>
                                
                                {showMoreButton[index] && (
                                    <button className="more_button" onClick={() => toggleExpandReviewModal(index)}>
                                        {expandedReviewIndexModal === index ? 'Show Less' : 'Read More'}
                                    </button>
                                )}

                            </li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Review
