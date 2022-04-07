import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import { getMoviesSearch, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = ({
  geral,
  match,
  location,
  getMoviesSearch,
  clearMovies,
  movies,
}) => {
  const { query } = match.params;
  const params = queryString.parse(location.search);
  const { secure_base_url } = geral.base.images;

  useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies);

  if (movies.loading) {
    return <Loader />;
  }

  else if (movies.total_results === 0) {
    return (
      <NotFound
        title="Sorry!"
        subtitle={`There were no results for ${query}...`}
      />
    );
  }

  else {
    return (
      <Wrapper>
        <Helmet>
          <title>{`${query} - search results`}</title>
        </Helmet>
        <Header title={query} subtitle="search results" />
        <MoviesList movies={movies} baseUrl={secure_base_url} />;
      </Wrapper>
    );
  }
};

function useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies) {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesSearch(query, params.page);
    return () => clearMovies();
  }, [query, params.page, getMoviesSearch, clearMovies]);
}

const mapStateToProps = ({ geral, movies }) => {
  return { geral, movies };
};

export default connect(
  mapStateToProps,
  { getMoviesSearch, clearMovies }
)(Search);
