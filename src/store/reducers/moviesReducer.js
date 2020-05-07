import {
  GETMOVIES,
  LOADMORE,
  LOADING,
  GETMOVIE,
  GETCREDITS,
  GETMOVIES_WITH_QUERY,
  PAGELOADING,
} from '../actions/types';

const initialState = {
  movies: [],
  page: { popular: 1 },
  loading: true,
  pageLoading: true,
  movie: {},
  credits: [],
  quriedMovies: [],
  totalPages: 0,
};

export default function moviesReducer(state = initialState, action) {
  const { type, payload } = action;

  let newState = { ...state };
  switch (type) {
    case LOADING:
      return { ...state, loading: true };

    case PAGELOADING:
      return { ...state, pageLoading: true };
    case GETMOVIES:
      newState = {
        ...state,
        movies: payload[0] || [],
        loading: false,
        page: { ...state.page, popular: payload[1] || state.page.popular },
      };
      if (payload[0] && payload[0].length) {
        sessionStorage.setItem('popMovies', JSON.stringify(payload[0]));
        sessionStorage.setItem(
          'popPage',
          JSON.stringify(payload[1] || state.page)
        );
      }
      return newState;

    case LOADMORE:
      newState = {
        ...state,
        movies: state.movies.concat(payload[0]),
        loading: false,
        page: { ...state.page, popular: payload[1] || state.page.popular },
      };
      sessionStorage.setItem(
        'popMovies',
        JSON.stringify(state.movies.concat(payload[0]))
      );
      sessionStorage.setItem(
        'popPage',
        JSON.stringify(payload[1] || state.page)
      );
      return newState;

    case GETMOVIE:
      newState = { ...state, movie: payload, loading: false };
      return newState;

    case GETCREDITS:
      newState = {
        ...state,
        credits: payload.cast,
      };
      return newState;

    case GETMOVIES_WITH_QUERY:
      newState = {
        ...state,
        quriedMovies: payload[0] || [],
        totalPages: payload[1],
        loading: false,
        pageLoading: false,
      };

      return newState;

    default:
      return state;
  }
}
