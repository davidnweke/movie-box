import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

import Logo from '../components/Logo';
import MenuItem from '../components/MenuItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid var(--border-color);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

const CopyRight = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  color: ${props => (props.mobile ? '#fff' : 'var(--color-primary-dark)')};
  margin-bottom: ${props => (props.mobile ? '2rem' : '')};
`;

const StyledLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  color: inherit;
`;

const Sidebar = ({ genres, staticCategories, selected }) => {
  return (
    <StickyBox>
      <Wrapper>
      <Logo/>
        <Heading>Discover</Heading>
        {renderStatic(staticCategories, selected)}
        <Heading>Genres</Heading>
        {renderGenres(genres, selected)}
      
        <CopyRight>
          Copyright ©
          <StyledLink href="https://www.github.com/davidnweke/movie-box">
            David Nweke
          </StyledLink>
        </CopyRight>
    
      </Wrapper>
    </StickyBox>
  );
};

function renderStatic(categories, selected, setisOpened) {
  return categories.map((category, i) => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/discover/${category}`}
      key={i}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={category}
        selected={category === selected ? true : false}
      />
    </LinkWrap>
  ));
}

function renderGenres(genres, selected, setisOpened) {
  return genres.map(genre => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
      key={genre.id}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={genre.name}
        selected={genre.name === selected ? true : false}
      />
    </LinkWrap>
  ));
}

const mapStateToProps = ({ geral }) => {
  return {
    staticCategories: geral.staticCategories,
    genres: geral.genres,
    selected: geral.selected,
  };
};

export default connect(mapStateToProps)(Sidebar);
