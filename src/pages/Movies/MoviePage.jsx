import './MoviePage.style.scss';
import React, {useState} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import {Container, Row, Col} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

// 경로 2가지
// 1. nav바에서 클릭해서 온 경우 => popluarMovie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션
// 1. 페이지네이션 설치
// 2. page state 만들기
// 3. 페이지네이션 클릭할 때마다 page 바꿔주기
// 4. page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
    const [query, setQuery] = useSearchParams()
    const keyword = query.get("q")
    const [page, setPage] = useState(1);
    const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});
    console.log('search data', data)

    const handlePageClick = ({selected}) => {
        console.log('page', page)
        setPage(selected + 1)
    };


    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if(isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }

    return (
        <div className="movie_page_wrap">
            <Container>
                <Row>
                    <Col lg={4} xs={12}>필터</Col>
                    <Col lg={8} xs={12}>
                        <Row>
                            {data?.results.map((movie, index) => 
                            <Col key={index} lg={4} xs={12}>
                                <MovieCard movie={movie} />
                            </Col>)}
                        </Row>
                        <div className="pagination_wrap">
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                pageCount={data?.total_pages} // 전체페이지수
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                forcePage={page - 1}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MoviePage
