import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import { setSelectedMenu, getMoviesDiscover, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Discover = ({
  geral,
  match,
  location,
  setSelectedMenu,
  getMoviesDiscover,
  clearMovies,
  movies,
}) => {
  const params = queryString.parse(location.search);
  const { secure_base_url } = geral.base.images;

  useEffect(() => {
    setSelectedMenu(match.params.name);
    return () => setSelectedMenu();
  }, [match.params.name, setSelectedMenu]);

  useFetchMoviesDiscover(
    match.params.name,
    getMoviesDiscover,
    params,
    clearMovies
  );

  if (movies.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${geral.selected} Movies`}</title>
      </Helmet>
      <Header title={geral.selected} subtitle="movies" />
      <MoviesList movies={movies} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

function useFetchMoviesDiscover(name, getMoviesDiscover, params, clearMovies) {
  const query = name.replace(/\s+/g, '_').toLowerCase();
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesDiscover(query, params.page);
    return () => clearMovies();
  }, [query, params.page, getMoviesDiscover, clearMovies]);
}

const mapStateToProps = ({ geral, movies }) => {
  return { geral, movies };
};

export default connect(
  mapStateToProps,
  { setSelectedMenu, getMoviesDiscover, clearMovies }
)(Discover);
