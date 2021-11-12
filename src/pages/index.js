import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import BasePage from '../layouts/BasePage';
import MovieList from '../components/MovieList';

// services
import { MovieDBService } from '../services';

class TopRated extends Component {
  static async getInitialProps(ctx) {
    try {
      const topRatedMovies = await MovieDBService.getTopRatedMovies();
      return {
        initialMovies: topRatedMovies.results,
        totalPages: topRatedMovies.total_pages,
        totalResults: topRatedMovies.total_results,
      };
    } catch (error) {
      console.log(error);
      return { initialMovies: [], totalPages: 0, totalResults: 0 };
    }
  }

  render() {
    const { initialMovies, totalPages, totalResults } = this.props;

    return (
      <BasePage>
        <div className="top-rated__wrapper">
          <MovieList
            favorite
            initialMovies={initialMovies}
            totalPages={totalPages}
            totalResults={totalResults}
            getMovies={MovieDBService.getTopRatedMovies}
          />
        </div>
      </BasePage>
    );
  }
}

export default connect(state => state)(TopRated);
