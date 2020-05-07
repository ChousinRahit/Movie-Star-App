import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Movie from '../Movies/movie';
import Loading from '../Loading';
import { getGenreId } from '../../utils/genres';
import { getQueriedMovies, clearError } from '../../store/actions';
import Pagination from './paginationComponent';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  // Selecting state from redux store
  const { quriedMovies, pageLoading, totalPages } = useSelector(
    (state) => state.movies
  );
  const { errors } = useSelector((state) => state.error);
  const { nullMovies } = errors;

  const dispatch = useDispatch();

  // router hook to know the current location
  const location = useLocation();

  const query = useQuery();

  const getType = useCallback((q) => {
    let type;
    const types = ['q', 'genre', 'lang', 'year'];
    for (let i = 0; i < types.length; i++) {
      type = q.get(types[i]);

      if (type) {
        return [types[i], type];
      }
    }
    return '';
  }, []);

  const typeInWords = getType(query)[1];
  const type = getGenreId(typeInWords);
  const value = getType(query)[0];
  const tempPage = parseInt(query.get('page'));
  const page = tempPage <= 0 ? 1 : tempPage;

  useEffect(() => {
    if ((type || typeInWords) && page && value) {
      const typeAndValue = [type || typeInWords, value];
      dispatch(getQueriedMovies(typeAndValue, page));
    }
    return () => {
      dispatch(clearError());
      console.log('clearing error');
    };
  }, [type, dispatch, typeInWords, value, page]);

  console.log(errors.otherError);

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

  const ShowingResultsHeading = (
    <h1 className="search__results-heading">
      <FontAwesomeIcon icon={faSearch} />
      &nbsp; &nbsp; Showing Results for{' '}
      <span>
        {type === 'q' ? `Keyword ${typeInWords}` : `Genre ${typeInWords}`}
      </span>
    </h1>
  );

  if (pageLoading) {
    return (
      <div className="loadingDiv">
        <Loading />
      </div>
    );
  }

  if (!pageLoading && nullMovies) {
    return (
      <div className="no_results">
        <h2>
          Sorry, we couldn't find any content for <span>"</span>
          {typeInWords}
          <span>"</span>
        </h2>

        <ul>
          <li>Check your spelling and try again</li>
          <li>Be less specific about long words</li>
        </ul>
      </div>
    );
  }

  //  Preparing Props to send for pagination
  const queryParam = location.search.split('&')[0];
  const path = `${location.pathname}${queryParam}&page=`;
  const paginationPages = {
    first: 1,
    prev: page - 1 <= 0 ? 1 : page - 1,
    var1: page,
    var2: page + 1 >= totalPages ? 0 : page + 1,
    var3: page + 2 >= totalPages ? 0 : page + 2,
    next: page + 1,
    last: totalPages,
  };
  return (
    <div>
      <div>{ShowingResultsHeading}</div>
      <div>
        {quriedMovies.length && (
          <div className="movies outer-div">
            {quriedMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <Pagination path={path} paginationPages={paginationPages} />
      </div>
    </div>
  );
};

export default SearchResults;
