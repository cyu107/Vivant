import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import Layout from '../layouts';

// services
import { MovieDBService } from '../services';

// helpers
import { getImagePath } from '../helpers';

// constants
import { imageSizes } from '../constants';

class MovieView extends Component {
  static async getInitialProps({ query }) {
    try {
      const { movieId } = query;
      const movieDetails = await MovieDBService.getMovieById(movieId);
      return { movieDetails };
    } catch (error) {
      console.log(error);
      return { movie: null };
    }
  }

  render() {
    const { movieDetails } = this.props;
    const {
      title,
      overview,
      release_date,
      backdrop_path,
      homepage,
      spoken_languages,
      popularity,
      vote_count,
      production_countries,
      production_companies,
      budget,
      revenue,
      runtime,
      adult,
      status
    } = movieDetails;

    return (
      <Layout>
        <div className="view-wrapper">
          <div className="page-background">
            <img src={getImagePath(backdrop_path, imageSizes.Original)} alt="backdrop" />
          </div>
          <div className="left-panel">
            <div className="backdrop">
              <img src={getImagePath(backdrop_path)} alt="backdrop" />
            </div>
            <div className="stats">
              <div className="stats-top">
                <span className="status">Status:<b>{status}</b></span>
                <span className="adult">
                  Adult: <img src={`/static/images/${adult ? 'check' : 'close'}.svg`} alt="adult" />
                </span>
              </div>
              <div className="stats-bottom">
                <span className="released-date">
                  <img src="/static/images/clock.svg" alt="clock" />
                  <b>{release_date}</b>
                </span>
                <span className="popularity">Popularity:<b>{popularity}</b></span>
                <span className="vote_count">Votes:<b>{vote_count}</b></span>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <div className="title">
              <h3>{title}</h3>
              {homepage && (
                <a href={homepage} target="_blank" rel="noopener noreferrer">
                  <img src="/static/images/link.svg" alt="link" />
                </a>
              )}
            </div>
            <div className="details">
              <p className="overview">{overview}</p>
              <p className="languages">
                <b>Languages:</b> {spoken_languages.map(({ name }) => name).join(', ')}
              </p>
              <p className="countries">
                <b>Production Countries:</b> {production_countries.map(({ name }) => name).join(', ')}
              </p>
              {production_companies.length > 0 && (
                <p className="companies">
                  <b>Production Countries:</b> {production_companies.map(({ name }) => name).join(', ')}
                </p>
              )}
              <p className="budget"><b>Budget:</b> {budget}</p>
              <p className="revenue"><b>Revenue:</b> {revenue}</p>
              <p className="runtime"><b>Runtime:</b> {runtime}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(state => state)(MovieView);
