import React, { Suspense } from 'react';
import Header from './components/Header';
import Movies from './components/Movies';
// import MovieInfo from './components/MovieInfo';
import Footer from './components/Footer';
import SearchedResults from './components/SearchResults';
import ScrollMemory from 'react-router-scroll-memory';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from './components/Loading';

const MovieInfo = React.lazy(() => import('./components/MovieInfo'));

const App = () => {
  console.log(window.innerHeight, window.innerWidth);

  return (
    <Router>
      <div>
        <ScrollMemory />
        <Header />
        <Switch>
          <Route path="Movie-Star-App/" exact component={Movies} />

          <Route
            path="Movie-Star-App/search"
            exact
            component={SearchedResults}
          />
          <Suspense
            fallback={
              <div className="loadingDiv">
                <Loading />
              </div>
            }
          >
            <Route path="Movie-Star-App/:movieId" exact component={MovieInfo} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
