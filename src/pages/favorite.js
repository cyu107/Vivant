import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import BasePage from '../layouts/BasePage';
import MovieList from '../components/MovieList';
import Spin from '../components/Spin';

// services
import { MovieDBService } from '../services';

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialMovies: [],
      totalPages: 0,
      totalResults: 0,
      loadingMovies: false
    };
  }

  componentDidMount() {
    this.initMovies();
  }

  componentDidUpdate(prevProps) {
    const { accountId, sessionId } = this.props;
    if (accountId !== prevProps.accountId || sessionId !== prevProps.sessionId) {
      this.initMovies();
    }
  }

  initMovies = () => {
    const { accountId, sessionId } = this.props;
    if (accountId && sessionId) {
      this.setState({ loadingMovies: true });

      MovieDBService.getFavoriteMovies({ accountId, sessionId })
      .then(({ results, total_pages, total_results }) => {
        this.setState({
          initialMovies: results,
          totalPages: total_pages,
          totalResults: total_results,
          loadingMovies: false
        });
      })
      .catch(err => {
        this.setState({ loadingMovies: false }, () => {
          console.log(err);
        });
      });
    }
  }

  render() {
    const { initialMovies, loadingMovies, totalPages, totalResults } = this.state;
    const { accountId, sessionId } = this.props;

    return (
      <Spin spinning={loadingMovies} size="xl">
        <BasePage>
          <div className="favorite-wrapper">
            <MovieList
              favorite={false}
              initialMovies={initialMovies}
              totalPages={totalPages}
              totalResults={totalResults}
              getMovies={(page) => MovieDBService.getFavoriteMovies({ accountId, sessionId, page })}
            />
          </div>
        </BasePage>
      </Spin>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  accountId: auth.accountId,
  sessionId: auth.sessionId
});

export default connect(
  mapStateToProps,
  null
)(Favorite);
