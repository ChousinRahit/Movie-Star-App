import React, { useEffect } from 'react';
import Movie from './movie';
import Loader from '../Loading';
import Hero from '../Hero';
import { getMovies, loadMore } from '../../store/actions';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { LOADING } from '../../store/actions/types';

const Movies = () => {
  let { movies, loading } = useSelector((state) => state.movies);
  let { errors } = useSelector((state) => state.error);

  const history = useHistory();

  if (errors.nullMovies) {
    history.push('/Movie-Star-App/noResy');
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const onClickLoadMore = () => {
    dispatch(loadMore('popular'));
  };

  console.log(errors);

  if (errors.otherError) {
    return (
      <div className="ErrorDiv">
        <h1>{errors.otherError.message} :</h1>
        <h3>Try:</h3>
        <ul>
          <li>Reloading</li>
          <li>Checking your network</li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <Hero heroMovie={movies[0]} />
      <div className="movies outer-div">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <Loader />}
      <div className="movies__load-more">
        <button className="btn btn-white" onClick={onClickLoadMore}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Movies;
