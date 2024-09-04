import './MoviePage.style.scss';
import React, {useState} from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useAllMoviesQuery } from '../../hooks/useAllMovies'; 
import { useSearchParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
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
    const [sortFilter, setSortFilter] = useState('정렬 기준');
    const [genreFilter, setGenreFilter] = useState('장르별 보기');
    const [selectedGenre, setSelectedGenre] = useState(''); // Track selected genre


    const {data: movieData, isLoading, isError, error} = useSearchMovieQuery({keyword, page});
    const { data: genres } = useMovieGenreQuery();
    const { data: allMovies } = useAllMoviesQuery({keyword});
    
    console.log('search data', movieData)

    const handlePageClick = ({selected}) => {
        console.log('page', page)
        setPage(selected + 1)
    };
    const handleFilterSort = (event) => {
        setSortFilter(event.target.innerText)
    }
    const handleFilterGenre = (genre) => {
        setGenreFilter(genre.name);
        setSelectedGenre(genre.id);
    };

    const filteredMovies = () => {
        let movies = selectedGenre
            ? movieData?.results.filter(movie => movie.genre_ids.includes(selectedGenre))
            : movieData?.results;

        if (sortFilter === '인기 많은순') {
            movies.sort((a, b) => b.popularity - a.popularity);
        } else if (sortFilter === '인기 적은순') {
            movies.sort((a, b) => a.popularity - b.popularity);
        }

        return movies;
    }


    console.log('allMovies', allMovies)



    if(isLoading) {
        return <h1>Loading...</h1>
    }
    if(isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }

    const moviesToDisplay = filteredMovies();

    return (
        <div className="movie_page_wrap">
            <Container>
                <Row>
                    <Col xs={12}>
                        <Row className='filter_menu_wrap'>
                                <Dropdown className="dropdown_menu">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic-sort">
                                        {sortFilter}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleFilterSort}>인기 많은순</Dropdown.Item>
                                        <Dropdown.Item onClick={handleFilterSort}>인기 적은순</Dropdown.Item>
                                    </Dropdown.Menu>
                                    
                                </Dropdown>
                                <Dropdown className="dropdown_menu">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic-genre">
                                        {genreFilter}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {genres.map(genre => (
                                            <Dropdown.Item key={genre.id} onClick={() => handleFilterGenre(genre)}>
                                                {genre.name}
                                            </Dropdown.Item>
                                        ))}
                                        
                                    </Dropdown.Menu>
                                </Dropdown>

                            
                        </Row>
                    </Col>
                </Row>
                <Row>
                    
                    <Col>
                        <Row>
                            {moviesToDisplay.map((movie, index) => 
                                <Col key={index} lg={3} xs={6}>
                                    <MovieCard movie={movie} />
                                </Col>)
                            }
                        </Row>
                        <div className="pagination_wrap">
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                pageCount={movieData?.total_pages} // 전체페이지수
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
