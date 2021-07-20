export interface IMovieItem {
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

export interface IMovieButtonProps {
  text: string;
  active?: boolean;
  small?: boolean;
  clickHandler?(e: any): any;
}

export interface IListMoviesProps {
  movies?: Array<IMovieItem>;
  getMoviesProps?: any;
}

// export interface BaseSyntheticEvent<E = Event, C = any, T = any> {
//   nativeEvent: E
//   currentTarget: C
//   target: T
//   bubbles: boolean
//   cancelable: boolean
//   defaultPrevented: boolean
//   eventPhase: number
//   isTrusted: boolean
//   preventDefault(): void
//   isDefaultPrevented(): boolean
//   stopPropagation(): void
//   isPropagationStopped(): boolean
//   persist(): void
//   timeStamp: number
//   type: string
// }

// export type SyntheticEvent<T = Element, E = Event> = BaseSyntheticEvent<
//   E,
//   EventTarget & T,
//   EventTarget
// >
