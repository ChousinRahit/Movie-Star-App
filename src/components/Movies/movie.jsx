import React, { useState, useEffect } from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { lang } from '../../utils/langs';
import { getGenre } from '../../utils/genres';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { MobileView, BrowserView } from 'react-device-detect';
import NoImage from '../../img/no_pic_Movie.jpg';
import truncate from '../../utils/textTruncate';

// import { useDispatch } from 'react-redux';
const Movie = ({ movie }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let pless,
    sfont,
    thumbheight,
    plessforinfo = '';
  if (screenWidth < 1400 && screenWidth > 600) {
    pless = 'p-less';
    sfont = 's-font';
    thumbheight = 'thumb-height-less';
    plessforinfo = 'pless-for-info';
  }

  if (screenWidth < 1100 && screenWidth > 600) {
    thumbheight = 'thumb-height-less-x2';
  }

  if (screenWidth > 1500) {
    thumbheight = 'thumb-height-more';
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
    return () =>
      window.removeEventListener('resize', setScreenWidth(window.innerWidth));
  });

  return (
    <div className="movies__movie">
      <Link to={`/Movie-Star-App/${movie.id}`}>
        <img
          className={`movies__movie__tumb ${thumbheight} ${thumbheight}`}
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          alt={movie.title}
        />
      </Link>

      <div className={`movies__movie_txt ${plessforinfo}`}>
        <Link
          to={`/Movie-Star-App/${movie.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <h1 className={`movies__movie_txt_name ${sfont}`}>
            {truncate(screenWidth < 960 ? 23 : 30, movie.title)}
            <span className="movies__movie_year">
              {new Date(movie.release_date).getFullYear().toString()}
            </span>
          </h1>
          <BrowserView>
            <p className={`movies__movie_txt_desc ${pless}`}>
              {truncate(
                screenWidth < 1400 ? (screenWidth < 1100 ? 80 : 100) : 160,
                movie.overview
              )}
            </p>
          </BrowserView>

          <MobileView>
            <p className={`movies__movie_txt_desc ${pless}`}>
              {truncate(80, movie.overview)}
            </p>
          </MobileView>
        </Link>
        <div className="movies__movie_info">
          <ul className="movies__movie_info_genre">
            {movie?.genre_ids.map((id) => (
              <li key={id}>
                <Link
                  to={`/Movie-Star-App/search?genre=${getGenre(id).toLowerCase()}&page=1`}
                  className="btn btn-text"
                >
                  {getGenre(id)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="movies__movie_meta">
          <ul>
            <li>{truncate(15, lang[movie.original_language]) || 'Unknown'}</li>
            <li>
              <FontAwesomeIcon icon={faStarHalfAlt} />
              {movie.vote_average}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Movie;
