
import React from 'react';
import { shallow } from 'enzyme';
import useMovie from './hook/useMovie';
import { MovieView } from './view/MovieView';

const movie = {
  id: 320288,
  title: "X-Men: Dark Phoenix",
  tagline: "",
  vote_average: 7,
  vote_count: 100,
  release_date: "2019-02-14",
  poster_path: "https://image.tmdb.org/t/p/w500/6qmsupE0opYPIaBGe7T5D2FBzLs.jpg",
  overview: "Gathered together by Professor Charles Xavier to protect a world that fears and hates them, the X-Men had fought many battles, been on adventures that spanned galaxies, grappled enemies of limitless might, but none of this could prepare them for the most shocking struggle they would ever face. One of their own members, Jean Grey, has gained power beyond all comprehension, and that power has corrupted her absolutely! Now, they must decide if the life of the woman they cherish is worth the existence of the entire universe!",
  budget: 200000,
  revenue: 300000,
  genres: ["Action", "Science Fiction"],
  runtime: 90,
}

describe('Movie card test', () => {

  const openMovieDialog = jest.fn();
  const handleMovieClick = jest.fn();
  const setUp = () => shallow(<MovieView {...useMovie(openMovieDialog)} handleMovieClick={handleMovieClick} movie={movie} />);

  it('render Movie image', () => {
    const component = setUp();
    expect(component.find('img').prop("src")).toEqual(movie.poster_path);
  });
})
