import { SIMILAR_MOVIES, MOVIE_COULD_NOT_LOAD } from './types';
import { API_KEY, API_URL } from '../../config';
import fetchItems from '../../utils/fetchItems';

export const getSimilarMovies = (movie_id) => async (dispatch) => {
  if (isNaN(Number(movie_id))) {
    return;
  }
  console.log('[iam in getSimilarMovies]');
  
  const endpoint = `${API_URL}movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US`;
  try {
    const { movies } = await fetchItems(endpoint);
    // Sorting by vote_average and slicing to 6 movies
    let sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
    if (movies.length > 6) {
      sortedMovies = sortedMovies.slice(0, 6);
    }
    dispatch({
      type: SIMILAR_MOVIES,
      payload: sortedMovies,
    });
  } catch (err) {
    dispatch({
      type: MOVIE_COULD_NOT_LOAD,
    });
    console.log('[simiAc]', err);
  }
};
