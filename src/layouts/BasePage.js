import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import Link from 'next/link';
import cx from 'clsx';

// components
import Layout from '.';

// actions
import { searchActions } from '../modules/search/actions';

const tabLinks = [
  { path: '/all', label: 'All', icon: 'movie_all' },
  { path: '/', label: 'Top Rated', icon: 'movie_top_rated' },
  { path: '/up-coming', label: 'Up Coming', icon: 'movie_coming' },
  { path: '/favorite', label: 'Favorites', icon: 'movie_favorite' }
];

class BasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathname: '',
      searchKey: ''
    };
  }

  componentDidMount() {
    this.setState({ pathname: Router.pathname });
  }

  handleChangeSearchKey = (event) => {
    const searchKey = event.target.value;
    this.setState({ searchKey }, () => {
      this.props.searchMovies(searchKey);
    });
  }

  render() {
    const { pathname, searchKey } = this.state;
    const { children } = this.props;

    return (
      <Layout>
        <div className="base-page__wrapper">
          <div className="tabs--and--search">
            <div className="tabs">
              {tabLinks.map(({ path, label, icon }, index) => (
                <Link key={index} href={path}>
                  <div className={cx('tab', pathname === path && 'active')}>
                    <img src={`/static/images/${icon}.svg`} alt={icon} />
                    <span>{label}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="search-bar">
              <input
                className="input"
                placeholder="Enter search key..."
                value={searchKey}
                onChange={this.handleChangeSearchKey}
              />
              <button className="btn-search">
                <img src="/static/images/search.svg" alt="search" />
              </button>
            </div>
          </div>

          <div className="page-content">
            {children}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    searchMovies: searchActions.searchMovies.request
  }, dispatch)
);

export default connect(
  null,
  mapDispatchToProps
)(BasePage);
