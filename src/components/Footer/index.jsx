import React from 'react';

//-------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

//-------------------------------
const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__logo">
        <FontAwesomeIcon className="footer__logo__icon" icon={faFilm} />
        <h1>
          MOVIE <span className="footer__text__star">Star</span>
        </h1>
      </div>

      <div className="footer__contact">
        <h2>Stay In Touch</h2>
        <ul>
          <li>
            <a href="mailto:2428kcr@gmail.com">2428kcr@gmail.com</a>
          </li>
          <li>
            <a href="tel:8217454919">8217454919</a> /{' '}
            <a href="tel:98441443228">98441443228</a>
          </li>
          <li className="footer__contact-soci">
            <a href="https://github.com/ChousinRahit" target="_blanck">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://twitter.com/KChousin" target="_blanck">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.linkedin.com/in/chousinrahitk/"
              target="_blanck"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__themoviedb">
        <div className="themovieorg__logo"></div>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </div>
    </footer>
  );
};

export default Footer;
