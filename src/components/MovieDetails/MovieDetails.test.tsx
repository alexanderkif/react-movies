/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MovieDetails from '.';

const movie = {
  id: 447365,
  title: 'Guardians of the Galaxy Vol. 3',
  tagline: '',
  vote_average: 0,
  vote_count: 9,
  release_date: '2020-05-01',
  poster_path:
    'https://image.tmdb.org/t/p/w500/ldoY4fTZkGISMidNw60GHoNdgP8.jpg',
  overview: "The third film based on Marvel's Guardians of the Galaxy.",
  budget: 0,
  revenue: 0,
  genres: ['Action', 'Adventure', 'Science Fiction'],
  runtime: 5,
};

describe('MovieDetails', () => {
  it('no image MovieDetails', async () => {
    const component = render(<MovieDetails movie={movie} />);
    const img = component.getByRole('img') as HTMLImageElement;
    img.alt = 'test component';
    fireEvent.error(img);
    expect(img).toHaveAttribute('alt', 'noImage');
  });
});
