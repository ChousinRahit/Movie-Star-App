import React from 'react';
// import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../../config';
import { MobileView, BrowserView } from 'react-device-detect';
import truncate from '../../utils/textTruncate';

const HeroComponent = ({ heroMovie, genres, tagline }) => {
  console.log(
    `${IMAGE_BASE_URL}${BACKDROP_SIZE}${
      heroMovie?.backdrop_path || heroMovie?.poster_path
    }`
  );

  let bgcStyle;
  if ( heroMovie?.backdrop_path || heroMovie?.poster_path) {
    bgcStyle = {
      width: '100%',
      height: '100%',
      background: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.4) 70%,
      rgba(0, 0, 0, 0.95) 100%
    ),
    url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${
        heroMovie?.backdrop_path || heroMovie?.poster_path
      })`,
      position: 'absolute',
      top: '0',
      left: '0',
    };
  }

  return (
    <div className="hero">
      <div className="hero__image" style={bgcStyle}></div>
      <div className="hero__text">
        <h2 className="hero__title">
          {heroMovie?.title}
          <span className="tagline">{tagline || ''}</span>
        </h2>
        <BrowserView>
          <p>{heroMovie?.overview}</p>
        </BrowserView>
        <MobileView>
          <p>{truncate(400, heroMovie?.overview)}</p>
        </MobileView>

        <div className="hero__genres">
          {genres?.map((genere) => (
            <p key={genere}>{genere}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
