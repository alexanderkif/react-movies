/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../../App';
import Details from '.';
import useDetails from './hook/useDetails';
import { DetailsView } from './view/DetailsView';
import { renderHook } from '@testing-library/react-hooks'
import { movie1, moviesStateTest } from '../../utils/constantsTest';

window.scrollTo = jest.fn();
const dispatch = jest.fn();
const { result } = renderHook(() => useDetails(movie1.id || 0, dispatch, moviesStateTest));

describe('useDetails test', () => {
  it('useDetails start test', () => {
    expect(result.current.dialogOpened).toBeFalsy();
    expect(result.current.movie).toBe(movie1);
    expect(result.current.moviesByGenre?.length).toBeDefined();
    expect(result.current.activeGenreDetails).toBe(moviesStateTest.activeGenreDetails);
    expect(typeof result.current.setActiveMovieHandler).toBe('function');
  });
});

describe('DetailsView test', () => {
  it('DetailsView mount test', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <DetailsView {...result.current} />
        </Router>
      </Provider>
    );
    expect(component.find('button.button_active').text().includes(moviesStateTest.activeGenreDetails)).toBeTruthy();
    component.find('button.button').at(1).simulate('click', { target: { innerText: 'Comedy' } });
    expect(dispatch).toBeCalledTimes(2);
  });
});

describe('Details test', () => {
  it('Details render test', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Details />
        </Router>
      </Provider>
    );
    // console.log(component.debug());
    expect(component.find({ href: '/' })).toHaveLength(4);
  });
});
