import { combineReducers } from 'redux';

import moviesReducer from './moviesReducer';
import similarMovies from './similarMovies';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  simiMovies: similarMovies,
  error: errorsReducer,
});

export default rootReducer;
