
import './MoviePage.style.scss';
import React, { useState, useEffect } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useAllMoviesQuery } from '../../hooks/useAllMovies';
import { useSearchParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import MovieLoading from '../../common/Loading/MovieLoading';

const MoviePage = () => {
    const [query] = useSearchParams();
    const keyword = query.get("q");
    const [page, setPage] = useState(1);
    const [sortFilter, setSortFilter] = useState('정렬 기준');
    const [genreFilter, setGenreFilter] = useState('장르별 보기');
    const [selectedGenre, setSelectedGenre] = useState(''); // Track selected genre

    const { data: genres } = useMovieGenreQuery();

    // Fetch data based on search or genre filter
    const { data: searchMovieData, isLoading: searchLoading, isError: searchError, error: searchErrorObj } = useSearchMovieQuery({ keyword, page, genre: selectedGenre });
    const { data: allMoviesData, isLoading: allMoviesLoading, isError: allMoviesError, error: allMoviesErrorObj } = useAllMoviesQuery({ genre: selectedGenre, page });

    // Determine which data to use
    const isSearching = Boolean(keyword);
    const movieData = isSearching ? searchMovieData : allMoviesData;
    const isLoading = isSearching ? searchLoading : allMoviesLoading;
    const isError = isSearching ? searchError : allMoviesError;
    const error = isSearching ? searchErrorObj : allMoviesErrorObj;

    useEffect(() => {
        // Reset page and genre filter when keyword changes
        setPage(1);
        setSelectedGenre('');
        setGenreFilter('장르별 보기');
    }, [keyword]);
    useEffect(() => {
        setPage(1); // Reset page to 1 when keyword or genre changes
    }, [selectedGenre]);

    // const filteredMovies = () => {
    //     if (!movieData) return [];

    //     let movies = movieData.results || [];

    //     if (selectedGenre) {
    //         movies = movies.filter(movie => movie.genre_ids.includes(selectedGenre));
    //     }

    //     if (sortFilter === '인기 많은순') {
    //         movies.sort((a, b) => b.popularity - a.popularity);
    //     } else if (sortFilter === '인기 적은순') {
    //         movies.sort((a, b) => a.popularity - b.popularity);
    //     }

    //     return movies;
    // };
    const filteredMovies = () => {
        if (!movieData) return [];
    
        let movies = movieData.results || [];
    
        if (selectedGenre) {
            movies = movies.filter(movie => movie.genre_ids.includes(selectedGenre));
        }
    
        if (sortFilter === '인기 많은순') {
            movies.sort((a, b) => b.popularity - a.popularity);
        } else if (sortFilter === '인기 적은순') {
            movies.sort((a, b) => a.popularity - b.popularity);
        }
    
        return movies;
    };
    

    
    const handlePageClick = ({ selected }) => {
        setPage(selected + 1); // Adjust for zero-based index
    };

    const handleFilterSort = (event) => {
        setSortFilter(event.target.innerText);
    };

    const handleFilterGenre = (genre) => {
        setGenreFilter(genre.name);
        setSelectedGenre(genre.id);
    };

    

    

    if (isLoading) {
        return <MovieLoading />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const moviesToDisplay = filteredMovies();
    const pageCount = Math.ceil(movieData?.total_results / 20); // 페이지당 20개 데이터

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
                            {/* {moviesToDisplay.length > 0 ? (
                                moviesToDisplay.map((movie, index) => (
                                    <Col key={index} lg={3} xs={6}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <div className="no_result">No results found.</div>
                                </Col>
                            )} */}
                            {moviesToDisplay.length > 0 ? (
                                moviesToDisplay?.map((movie, index) => (
                                    <Col key={index} lg={3} xs={6}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <div className="no_result">No results found.</div>
                                </Col>
                            )}
                        </Row>
                        <div className="pagination_wrap">
                            {/* <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                pageCount={movieData?.total_pages || 0} // Ensure this reflects total pages
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
                            /> */}
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                pageCount={pageCount || 0} // 전체 페이지 수
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
    );
};

export default MoviePage;


