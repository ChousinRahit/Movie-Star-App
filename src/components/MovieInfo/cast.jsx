import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
// import NoImage from '../../img/noimages.png';
import No_Pic_M from '../../img/no_pic_M.jpeg';
import No_Pic_F from '../../img/no_pic_F.jpg';
// import { genres } from '../../utils/genres';

const Cast = ({ profile_path, name, character, gender, id }) => {
  let imgSrc = `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`;
  let placeholderImageHeight = '';
  if (!profile_path) {
    placeholderImageHeight = 'placeholder-image-height';
    if (gender === 2) {
      imgSrc = No_Pic_M;
    } else {
      imgSrc = No_Pic_F;
    }
  }
  return (
    <div className="cast__wrapper">
      <img
        className={`cast__img ${placeholderImageHeight}`}
        src={imgSrc}
        alt={name}
      />
      <div className="cast__name">
        <h2>{name}</h2>
        {character && <p>as</p>}
        <h3>{character}</h3>
      </div>
    </div>
  );
};

export default Cast;
