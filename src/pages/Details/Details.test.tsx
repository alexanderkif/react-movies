/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { store } from '../../App';
import Details from '.';
import useDetails from './hook/useDetails';
import { DetailsView } from './view/DetailsView';
import { stubMovie1, stubMoviesState } from '../../utils/stubsForTests';

window.scrollTo = jest.fn();
const dispatch = jest.fn();
const { result } = renderHook(() => useDetails(stubMovie1.id || 0, dispatch, stubMoviesState));

describe('Details test', () => {
  it('DetailsView mount test', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <DetailsView {...result.current} />
        </Router>
      </Provider>,
    );
    expect(
      component
        .find('button.button_active')
        .text()
        .includes(stubMoviesState.activeGenreDetails),
    ).toBeTruthy();
    component
      .find('button.button')
      .at(1)
      .simulate('click', { target: { innerText: 'Comedy' } });
    expect(dispatch).toBeCalledTimes(2);
  });

  it('Details render test', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Details />
        </Router>
      </Provider>,
    );
    // console.log(component.debug());
    expect(component.find({ href: '/' })).toHaveLength(2);
  });
});
