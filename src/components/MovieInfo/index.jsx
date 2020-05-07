import React, { useEffect, Fragment } from 'react';
import Hero from '../Hero';
import Loading from '../Loading';
import { lang } from '../../utils/langs';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovie,
  getCredits,
  getSimilarMovies,
  clearError,
} from '../../store/actions';
import Cast from './cast';
import Movie from '../Movies/movie';

const MovieIfo = ({ match }) => {
  const dispatch = useDispatch();
  const { movie, loading = true, credits } = useSelector(
    (state) => state.movies
  );
  const { simiMovies } = useSelector((state) => state.simiMovies);

  const { errors } = useSelector((state) => state.error);

  console.log(errors, 'E{E}E{E}');

  useEffect(() => {
    dispatch(getMovie(match.params.movieId));
    dispatch(getCredits(match.params.movieId));
    dispatch(getSimilarMovies(match.params.movieId));
    window.scroll(0, 0);

    return () => {
      dispatch(clearError());
      console.log('clearing error');
    };
  }, [dispatch, match.params.movieId]);

  const genres = movie.genres?.map((g) => g.name);

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

  if (loading) {
    return (
      <div className="loadingDiv">
        <Loading />
      </div>
    );
  }

  let creditInfo = [
    {
      label: 'Language',
      value: `${lang[movie.original_language] || 'Unknown'}`,
    },
    {
      label: 'Rating',
      value: `${movie.vote_average || 'Unknown'}`,
    },
    {
      label: 'Budget',
      value: movie.budget
        ? `$ ${new Intl.NumberFormat('en-IN', {
            maximumSignificantDigits: 3,
          }).format(movie.budget)}`
        : 'Unkown',
    },
    {
      label: 'Revenue',
      value: movie.revenue
        ? `$ ${new Intl.NumberFormat('en-IN', {
            maximumSignificantDigits: 3,
          }).format(movie.revenue)}`
        : 'Unkown',
    },
    { label: 'Release Date', value: movie.release_date },
    { label: 'Status', value: movie.status },
    {
      label: 'Runtime',
      value: `${Math.floor(movie.runtime / 60)} hours - ${
        movie.runtime % 60
      } mins`,
    },
  ];

  if (movie.title !== movie.original_title) {
    creditInfo = [
      ...creditInfo,
      { label: 'Original Title', value: movie.original_title },
    ];
  }

  const getCreditInfo = (each) => (
    <li key={Math.random()}>
      <h2>
        {each.label}
        <span className="credits__info-values">{each.value || 'Unknown'}</span>
      </h2>
    </li>
  );
  return (
    <div>
      <div className="movieInfo">
        <Hero heroMovie={movie} genres={genres} tagline={movie.tagline} />
        <div className="outer-div">
          <div className="credits">
            <div className="credits__cast-word">CAST</div>
            <section className="credits__cast">
              {credits?.map((people) => (
                <Cast
                  profile_path={people.profile_path}
                  name={people.name}
                  character={people.character}
                  id={people.id}
                  key={people.id}
                  gender={people.gender}
                />
              ))}
            </section>
          </div>

          <div className="credits__info">
            <h2 className="credits__info-word">INFO</h2>
            <ul>{creditInfo.map((each) => getCreditInfo(each))}</ul>
          </div>

          {simiMovies?.length && (
            <Fragment>
              <div>
                <h2 className="credits__similar-word">Similar Movies</h2>
              </div>
              <div className="movies">
                {simiMovies.map((mov) => (
                  <Movie key={mov.id} movie={mov} />
                ))}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieIfo;
