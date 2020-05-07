import axios from 'axios';
import {
  GETMOVIES,
  LOADING,
  LOADMORE,
  GETMOVIE,
  GETCREDITS,
  GETMOVIES_WITH_QUERY,
  PAGELOADING,
  NULL_MOVIES,
  MOVIE_COULD_NOT_LOAD,
  UNEXPECTED_ERROR,
  CLEAR_ERROR,
} from './types';
import { API_KEY, API_URL } from '../../config';
import fetchItems from '../../utils/fetchItems';

// const API_KEY = process.env.REACT_APP_THEMOVIEDB_API_KEYTHEMOVIEDB_API_KEY;

export const getMovies = (searchKeyword) => async (dispatch) => {
  console.log('[iam in getMovies]');

  const sessionPopMovies = sessionStorage.getItem('popMovies');
  const sessionPopPage = sessionStorage.getItem('popPage');

  if (sessionPopMovies && sessionPopPage) {
    let movies = JSON.parse(sessionPopMovies);
    dispatch({
      type: GETMOVIES,
      payload: [movies, parseInt(sessionPopPage)],
    });
  } else {
    dispatch({
      type: LOADING,
    });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    try {
      const res = await fetchItems(endpoint);
      if (res?.message?.startsWith('Error')) {
        let payload = res.message.split(':')[1];
        console.log(payload);

        dispatch({
          type: UNEXPECTED_ERROR,
          payload: { message: payload },
        });
      }

      const { movies, page } = res;
      if (!res) {
        return dispatch({
          type: NULL_MOVIES,
        });
      }
      dispatch({
        type: GETMOVIES,
        payload: [movies, page],
      });
    } catch (err) {
      console.log(err, '[gwrrhte]a');
    }
  }
};

export const loadMore = () => async (dispatch, getState) => {
  console.log('[iam in loadMore]');
  dispatch({
    type: LOADING,
  });

  const prevPage = getState().movies.page.popular;
  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
    prevPage + 1
  }`;
  const { movies, page } = await fetchItems(endpoint);
  dispatch({
    type: LOADMORE,
    payload: [movies, page],
  });
};

export const getMovie = (movieId) => async (dispatch) => {
  if (isNaN(Number(movieId))) {
    return;
  }
  console.log('[iam in getMovie]');
  dispatch({
    type: LOADING,
  });
  const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  try {
    const movie = await axios.get(endpoint);
    dispatch({
      type: GETMOVIE,
      payload: movie.data,
    });
  } catch (err) {
    dispatch({
      type: MOVIE_COULD_NOT_LOAD,
    });
    console.log(err);
  }
};

export const getCredits = (movieId) => async (dispatch) => {
  if (isNaN(Number(movieId))) {
    return;
  }
  console.log('[iam in getCredits]');
  const endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

  const res = await axios.get(endpoint);
  dispatch({
    type: GETCREDITS,
    payload: res.data,
  });
};

export const getQueriedMovies = (queryType, page) => async (dispatch) => {
  console.log('[iam in getQueriedMovies]');

  dispatch({
    type: PAGELOADING,
  });
  const [value, typeOfQuery] = queryType;

  let endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US`;

  switch (typeOfQuery) {
    case 'q':
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=${page}`;
      break;
    case 'genre':
      endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${value}&page=${page}`;
      break;
    case 'lang':
      endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_original_language=${value}&page=${page}`;
      break;
    case 'year':
      endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=${value}&page=${page}`;
      break;
    default:
      break;
  }

  try {
    const res = await axios.get(endpoint);
    let movies = res.data.results;
    const totalPages = res.data.total_pages;

    if (movies.length === 0) {
      dispatch({
        type: NULL_MOVIES,
      });
    }

    // Sorting movies on the vote_average
    movies.sort((a, b) => b.vote_average - a.vote_average);

    dispatch({
      type: GETMOVIES_WITH_QUERY,
      payload: [movies, totalPages],
    });
  } catch (err) {
    dispatch({
      type: UNEXPECTED_ERROR,
      payload: { message: err.message },
    });
  }
};

export const clearError = () => async (dispatch) => {
  console.log('[iam in clearError]');
  dispatch({
    type: CLEAR_ERROR,
  });
};
