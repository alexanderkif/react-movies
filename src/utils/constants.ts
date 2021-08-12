import { SortByType } from "../types";

export const SORTS_BY: SortByType[] = [
  { key: 'release_date', name: 'release date' },
  { key: 'vote_average', name: 'rating' },
  { key: 'budget', name: 'budget' },
  { key: 'revenue', name: 'revenue' },
];

export const ALL_GENRES: string[] = [
  "Action",
  "adventure",
  "Science Fiction",
  "Fantasy",
  "Thriller",
  "Drama",
  "Family",
  "Comedy",
  "Horror",
  "TV Movie",
  "Documentary",
  "History",
  "Mystery",
  "Crime",
  "Romance",
  "Music",
  "Animation"
];

export const LIMIT_MOVIES_IN_SEARCH = 50;
export const LIMIT_MOVIES_IN_DETAILS = 25;
