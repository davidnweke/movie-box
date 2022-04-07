import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import { setSelectedMenu, getMoviesGenre, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import SortBy from '../components/ShortBy';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Genre = ({
  geral,
  match,
  setSelectedMenu,
  getMoviesGenre,
  clearMovies,
  movies,
  location,
}) => {
  const [option, setOption] = useState({
    value: 'popularity.desc',
    label: 'Popularity',
  });
  const params = queryString.parse(location.search);
  const { secure_base_url } = geral.base.images;

  
  useEffect(() => {
    setSelectedMenu(match.params.name);
    return () => setSelectedMenu();
  }, [match.params.name, setSelectedMenu]);

  useFetchMoviesGenre(
    match.params.name,
    getMoviesGenre,
    params,
    option,
    clearMovies
  );

  if (movies.loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Helmet>
        <title>{`${geral.selected} Movies`}</title>
      </Helmet>
      <Header title={geral.selected} subtitle="movies" />
      <SortBy option={option} setOption={setOption} />
      <MoviesList movies={movies} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

function useFetchMoviesGenre(
  genre,
  getMoviesGenre,
  params,
  option,
  clearMovies
) {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    getMoviesGenre(genre, params.page, option.value);
    return () => clearMovies();
  }, [genre, params.page, option, getMoviesGenre, clearMovies]);
}

const mapStateToProps = ({ geral, movies }) => {
  return { geral, movies };
};

export default connect(
  mapStateToProps,
  { setSelectedMenu, getMoviesGenre, clearMovies }
)(Genre);
