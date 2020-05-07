import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilm } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch } from 'react-redux';
//-------------------------------

// import logo from '../../img/logo1.png';
import { genres } from '../../utils/genres';

//-------------------------------

const Header = () => {
  //-------------------------------
  // Drawer state and logic
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [queryYear, setQueryYear] = useState('');
  const [isCategoriesShowing, setIsCategoriesShowing] = useState(false);
  //-------------------------------

  const history = useHistory();

  let drawerClass = ['drawer'];
  let drawerContentClass = ['drawer-content'];
  if (isDrawerOpen) {
    drawerClass.push('drawer__open');
    drawerContentClass.push('drawer-content__open');
  }

  //-------------------------------

  // Disableing scroll when menu is open
  useEffect(() => {
    let overflow;
    if (isDrawerOpen) {
      overflow = 'hidden';
    } else {
      overflow = 'unset';
    }
    document.body.style.overflow = overflow;
  }, [isDrawerOpen]);

  //-------------------------------

  const onYearSubmitClick = (e) => {
    e.preventDefault();
    if (queryYear >= 1881) {
      history.push(`/Movie-Star-App/search?year=${queryYear}&page=1`);
      setIsDrawerOpen(false);
    }
  };

  const GenresList = () => {
    return genres.map((gen) => (
      <li
        key={gen.name}
        onClick={() => {
          setIsDrawerOpen(false);
          setIsCategoriesShowing(false);
        }}
      >
        <Link
          to={`/Movie-Star-App/search?genre=${gen.name.toLowerCase()}&page=1`}
        >
          {gen.name}
        </Link>
      </li>
    ));
  };

  const LanguageListObj = {
    en: 'English',
    hi: 'Hindi',
    kn: 'Kannada',
    te: 'Telugu',
    cn: 'Chinese',
    ko: 'Korean',
  };
  const LanguageList = () => {
    return Object.keys(LanguageListObj).map((langCode) => (
      <li
        key={langCode}
        onClick={() => {
          setIsDrawerOpen(false);
          setIsCategoriesShowing(false);
        }}
      >
        <Link to={`/Movie-Star-App/search?lang=${langCode}&page=1`}>
          {LanguageListObj[langCode]}
        </Link>
      </li>
    ));
  };

  const linksClassNameDependingOnScreenSize = isDrawerOpen
    ? ['header__nav-list-item', 'drawer-header__nav-list-item'].join(' ')
    : 'header__nav-list-item';

  const categoriesListClassName = isCategoriesShowing
    ? 'header__nav-list-item_categories_list'
    : ['header__nav-list-item_categories_list', 'displayNone'].join(' ');

  const onYearChange = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setQueryYear(e.target.value);
    } else {
      setQueryYear(queryYear);
    }
  };
  const Links = (
    <Fragment>
      <li
        className={linksClassNameDependingOnScreenSize}
        onClick={() => {
          history.push('/Movie-Star-App/');
          setIsDrawerOpen(false);
        }}
      >
        <Link to="/Movie-Star-App/">Popular</Link>
      </li>
      <li
        className={linksClassNameDependingOnScreenSize}
        onMouseOver={() => setIsCategoriesShowing(true)}
        onMouseLeave={() => setIsCategoriesShowing(false)}
      >
        <a className="header__nav-list-item_categories">Categories</a>
        <div
          onMouseOver={() => setIsCategoriesShowing(true)}
          className={categoriesListClassName}
        >
          <ul className="header__nav-list-item_categories_sublist">
            <h3>Genre</h3>
            <GenresList />
          </ul>
          <ul className="header__nav-list-item_categories_sublist-2">
            <h3>Popular Languages</h3>
            <LanguageList />
          </ul>
          <div>
            <p>Year</p>
            <form className="year__input__form">
              <input
                className="yearInput"
                maxLength="4"
                type="year"
                placeholder="year"
                value={queryYear}
                onChange={onYearChange}
              />

              <button
                onClick={(e) => onYearSubmitClick(e)}
                className="btn btn-yearInput"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </li>
      <li className={linksClassNameDependingOnScreenSize}>
        <a href="#footer" onClick={() => setIsDrawerOpen(false)}>
          About
        </a>
      </li>
    </Fragment>
  );

  const onSubmitSearch = (e) => {
    e.preventDefault();
    e.target.children[0].blur();
    if (searchKey) {
      setIsDrawerOpen(false);
      history.push(`/Movie-Star-App/search?q=${searchKey}&page=1`);
    }
  };

  return (
    <header>
      <section className="header">
        <div
          className="header__logo-wrapper"
          onClick={() => history.push('/Movie-Star-App/')}
        >
          <h1 className="header__heading">
            MOVIE <span className="header__text__star">Star</span>
          </h1>
          <FontAwesomeIcon className="header__logo" icon={faFilm} />
        </div>
        <form className="search" onSubmit={(e) => onSubmitSearch(e)}>
          <input
            type="text"
            className="search__input"
            placeholder="Search Movies"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button type="submit" className="search__button">
            <FontAwesomeIcon className="search__icon" icon={faSearch} />
          </button>
        </form>
        <nav className="header__nav">
          <ul className="header__nav-list">{Links}</ul>
        </nav>
        <input
          type="checkbox"
          checked={isDrawerOpen}
          onChange={() => setIsDrawerOpen(!isDrawerOpen)}
          id="menurad"
          className="header__menu-radio"
        />
        <div
          className="header__menu-icon"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <label>
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </section>
      <aside className={drawerClass.join(' ')}>
        <div className={drawerContentClass.join(' ')}>
          <form className="drawer-search" onSubmit={(e) => onSubmitSearch(e)}>
            <input
              type="text"
              className="drawer-search__input"
              placeholder="Search Movies"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />

            <button className="drawer-search__button">
              <FontAwesomeIcon
                className="drawer-search__icon"
                icon={faSearch}
              />
            </button>
          </form>
          <nav className="drawer-header__nav">
            <ul className="drawer-header__nav-list">{Links}</ul>
          </nav>
        </div>
      </aside>
    </header>
  );
};

export default Header;
