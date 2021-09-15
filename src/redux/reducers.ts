import { combineReducers } from 'redux';
import moviesState from './moviesState';

export const rootReducer = combineReducers({ moviesState });

export type RootState = ReturnType<typeof rootReducer>;
