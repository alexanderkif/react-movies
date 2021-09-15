/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { IMovieItem } from './types';

export const movie2: IMovieItem = {
  id: 872,
  title: "Singin' in the Rain",
  tagline: 'What a Glorious Feeling!',
  vote_average: 8,
  vote_count: 959,
  release_date: '1952-04-10',
  poster_path:
    'https://image.tmdb.org/t/p/w500/iQpOyAgbUzbO6Coh9OiHRxXjx2Y.jpg',
  overview:
    'In 1927 Hollywood, a silent film production company and cast make a difficult transition to sound.',
  budget: 2540800,
  revenue: 7200000,
  genres: ['Comedy', 'Music', 'Romance'],
  runtime: 103,
};

describe('App', () => {
  it('render app', async () => {
    render(<App />);
    const element = screen.getAllByText(/roulette/i)[0];
    // screen.debug();
    expect(element).toBeInTheDocument();
  });
});
