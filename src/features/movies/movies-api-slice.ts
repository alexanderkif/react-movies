import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Movie {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
}

interface MoviesResponse {
  data: Array<Movie>;
  offset: number;
  limit: number;
  total: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://reactjs-cdp.herokuapp.com',
    // prepareHeaders(headers) {
    //   headers.set('x-api-key', DOGS_API_KEY);
    //   return headers;
    // }
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query<MoviesResponse, number | void>({
        query(limit = 10) {
          return `/movies?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchMoviesQuery } = apiSlice;
