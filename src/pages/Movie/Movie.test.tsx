
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

  const setDialogOpenedHandler = jest.fn((a, b, c) => [a, b, c]);
  const history = { push: jest.fn() };
  const setUp = () => shallow(<MovieView {...useMovie(setDialogOpenedHandler, history)} movie={movie} />);

  it('render Movie image', () => {
    const component = setUp();
    expect(component.find('img').prop("src")).toEqual(movie.poster_path);
  });

  it('click Movie image', () => {
    const component = setUp();
    component.find('.picture').simulate('click');
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('click Movie nameYear', () => {
    const component = setUp();
    component.find('.nameYear').simulate('click');
    expect(history.push).toHaveBeenCalledTimes(2);
  });

  it('click Movie genre', () => {
    const component = setUp();
    component.find('.genre').simulate('click');
    expect(history.push).toHaveBeenCalledTimes(3);
  });

  it('click Movie edit', () => {
    const component = setUp();
    component.find('.edit').simulate('click');
    expect(setDialogOpenedHandler.mock.results[0].value).toEqual([true, movie, false]);
  });

  it('click Movie delete', () => {
    const component = setUp();
    component.find('.delete').simulate('click');
    expect(setDialogOpenedHandler.mock.results[1].value).toEqual([true, movie, true]);
  });
})
