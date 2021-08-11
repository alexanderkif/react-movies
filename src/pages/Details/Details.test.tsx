/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useDetails from './hook/useDetails';
import { store } from '../../App';

describe('DetailsView test', () => {
  const wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );
  const id = 424785;
  const { result } = renderHook(() => useDetails(id), { wrapper });

  it('color with vote = 0', () => {
    const vote = 0;
    expect(result.current.getColors(vote).borderColor).toBe('rgba(200,80,0,1)');
    expect(result.current.getColors(vote).color).toBe('rgba(200,80,0,1)');
  });

  it('color with vote = 5', () => {
    const vote = 5;
    expect(result.current.getColors(vote).borderColor).toBe('rgba(140,140,0,1)');
    expect(result.current.getColors(vote).color).toBe('rgba(140,140,0,1)');
  });

  it('color with vote = 10', () => {
    const vote = 10;
    expect(result.current.getColors(vote).borderColor).toBe('rgba(80,200,0,1)');
    expect(result.current.getColors(vote).color).toBe('rgba(80,200,0,1)');
  });

});
