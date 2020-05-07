import {
  NULL_MOVIES,
  MOVIE_COULD_NOT_LOAD,
  UNEXPECTED_ERROR,
  CLEAR_ERROR,
} from '../actions/types';
const initialState = {
  errors: { nullMovies: false, netWorkError: false, otherError: null },
};

const errorsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case NULL_MOVIES:
      let newState = {
        ...state,
        errors: { ...state.errors, nullMovies: true },
      };
      return newState;

    case MOVIE_COULD_NOT_LOAD: {
      let newState = {
        ...state,
        errors: {
          ...state.errors,
          otherError: { message: 'Movie data did not found', code: 404 },
        },
      };
      return newState;
    }
    case UNEXPECTED_ERROR: {
      let newState = {
        ...state,
        errors: {
          ...state.errors,
          otherError: {
            message: payload.message || 'Unexpected Error occured',
            code: 400,
          },
        },
      };

      return newState;
    }
    case CLEAR_ERROR: {
      return initialState;
    }
    default:
      return state;
  }
};

export default errorsReducer;
