import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import BeatLoader from 'react-spinners/BeatLoader';
import Link from 'next/link';

// components
import Spin from './Spin';

// services
import { MovieDBService } from '../services';

// actions
import { SEARCH_MOVIES } from '../modules/search/actions';

// helpers
import { getImagePath } from '../helpers';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      currentPage: 1,
      totalResults: 0,
      totalPages: 0,
      showSearchResults: false
    };
  }

  componentDidMount() {
    this.initMovies();
  }

  componentDidUpdate(prevProps) {
    const { searchResults, searchKey } = this.props;
    if (this.shouldInitMovies(prevProps)) {
      this.initMovies();
    }
    if (searchResults !== prevProps.searchResults) {
      this.initSearchResults();
    }
    // switch display list depending on the length of search key
    if (searchKey !== prevProps.searchKey && searchKey.length !== 1) {
      this.setState({ showSearchResults: searchKey.length > 1 });
    }
  }

  shouldInitMovies = (prevProps) => {
    const { initialMovies, searchKey } = this.props;
    if (initialMovies !== prevProps.initialMovies) return true;
    // init movies when searchbar is cleared
    if (searchKey !== prevProps.searchKey && searchKey.length === 0) return true;
    return false;
  }

  initMovies = () => {
    const { initialMovies, totalResults, totalPages } = this.props;
    this.setState({ movies: initialMovies, totalResults, totalPages, currentPage: 1 });
  }

  initSearchResults = () => {
    this.setState({ ...this.props.searchResults, currentPage: 1 });
  }

  getMoviesByPage = async (page) => {
    try {
      const { getMovies, searchKey } = this.props;
      const { showSearchResults } = this.state;
      let movies = [];
      if (showSearchResults) {
        movies = MovieDBService.searchMovies(searchKey, page);
      } else {
        movies = await getMovies(page);
      }
      return movies;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  handleLoadMore = async () => {
    const { currentPage, movies } = this.state;
    const { results: nextMovies } = await this.getMoviesByPage(currentPage + 1);
    if (nextMovies.length > 0) {
      this.setState({
        movies: movies.concat(nextMovies),
        currentPage: currentPage + 1
      });
    }
  }

  handleAddFavorite = (mediaId) => {
    const { accountId, sessionId, favorite } = this.props;
    if (accountId && sessionId) {
      MovieDBService.markAsFavorite({ accountId, sessionId, mediaId, favorite })
      .then(() => {
        if (favorite) {
          // temporal alert, can be changed to notification later on
          alert('Successfully added to favorite list!');
        } else {
          this.setState(({ movies }) => ({
            movies: movies.filter(({ id }) => id !== mediaId)
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    const { currentPage, movies, totalResults, totalPages } = this.state;
    const { favorite, searchingMovies } = this.props;

    return (
      <Spin spinning={searchingMovies} size="xl">
        <div className="movie-list__wrapper">
          <p className="total-result">Results found: {totalResults}</p>
          <div className="movies-list">
            <div className="list-header">
              <span>Title</span>
              <span>Date</span>
              <span>Overview</span>
              <span>Rating</span>
              <span>Actions</span>
            </div>
            <div id="scrollableMovies" className="list-body">
              {movies && movies.length > 0 ? (
                <InfiniteScroll
                  scrollableTarget="scrollableMovies"
                  dataLength={movies.length}
                  hasMore={totalPages > currentPage}
                  loader={<BeatLoader color="#677992" />}
                  next={this.handleLoadMore}
                >
                  {movies.map(({ id, vote_average, poster_path, title, release_date, overview }, index) => (
                    <div key={index} className="list-row">
                      <span className="title">
                        <b>{title}</b>
                        <img src={getImagePath(poster_path)} alt="preview" />
                      </span>
                      <span className="date">{release_date}</span>
                      <span className="overview">{overview}</span>
                      <span className="rating">{vote_average}</span>
                      <span className="actions">
                        <Link href={`/view/${id}`}>
                          <button className="btn-link">
                            <img src="/static/images/link.svg" alt="link" />
                          </button>
                        </Link>
                        <button className="btn-favorite" onClick={() => this.handleAddFavorite(id)}>
                          <img src={`/static/images/${favorite ? 'favorite' : 'trash'}.svg`} alt="favorite" />
                        </button>
                      </span>
                    </div>
                ))}
                </InfiniteScroll>
            ) : (
              <div className="empty">
                <p className="description">
                  No results to display!
                </p>
                <img className="img-blank" src="/static/images/blank_list.svg" alt="blank-list" />
              </div>
            )}
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = ({ auth, search }) => ({
  accountId: auth.accountId,
  sessionId: auth.sessionId,
  searchKey: search.keyword,
  searchResults: search.results,
  searchingMovies: search[SEARCH_MOVIES].loading
});

export default connect(
  mapStateToProps,
  null
)(MovieList);
