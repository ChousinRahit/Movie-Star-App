import { SIMILAR_MOVIES } from '../actions/types';

const initalState = {
  simiMovies: []
};

export default function similarMovies(state = initalState, action) {
  switch (action.type) {
    case SIMILAR_MOVIES:
      const newState = { ...state, simiMovies: action.payload };
      return newState;
    default:
      return state;
  }
}
