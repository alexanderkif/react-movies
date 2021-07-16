import { ADD_MOVIES_TO_STORE } from './types'

const initialState = {
  movies: [],
}

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIES_TO_STORE:
      return {
        ...state,
        movies: action.movies,
      }
    // case ADD_TODO_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: null,
    //     todos: [...state.todos, action.payload]
    //   }
    // case ADD_TODO_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error
    //   }
    default:
      return state
  }
}
