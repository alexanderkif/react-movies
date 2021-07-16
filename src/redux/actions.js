import { ADD_MOVIES_TO_STORE } from './types'
import axios from 'axios'

export const getMovies = ({ limit }) => {
  return dispatch => {
    axios
      .get(`https://reactjs-cdp.herokuapp.com/movies?limit=${limit}`)
      .then(res => {
        console.log('axios res', res, res.data.data)
        dispatch(getMoviesSuccess(res.data.data))
      })
      .catch(err => {
        // dispatch(getMoviesFailure(err.message))
        console.log('axios err', err, err.message)
      })
  }
}

const getMoviesSuccess = movies => ({
  type: ADD_MOVIES_TO_STORE,
  movies: movies,
})

// const addTodoStarted = () => ({
//   type: ADD_TODO_STARTED
// })

// const getMoviesFailure = error => ({
//   type: ADD_TODO_FAILURE,
//   payload: {
//     error
//   }
// })
