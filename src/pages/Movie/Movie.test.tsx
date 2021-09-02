
import React from 'react';
import { shallow } from 'enzyme';
import useMovie from './hook/useMovie';
import { MovieView } from './view/MovieView';
import { movie1 } from '../../utils/constantsTest';

describe('Movie card test', () => {

  const setDialogOpenedHandler = jest.fn((a, b, c) => [a, b, c]);
  const history = { push: jest.fn() };
  const setUp = () => shallow(<MovieView {...useMovie(setDialogOpenedHandler, history)} movie={movie1} />);

  it('render Movie image', () => {
    const component = setUp();
    expect(component.find('img').prop("src")).toEqual(movie1.poster_path);
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
    expect(setDialogOpenedHandler.mock.results[0].value).toEqual([true, movie1, false]);
  });

  it('click Movie delete', () => {
    const component = setUp();
    component.find('.delete').simulate('click');
    expect(setDialogOpenedHandler.mock.results[1].value).toEqual([true, movie1, true]);
  });
})
