import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import Head from 'next/head';

// components
import Spin from '../components/Spin';
import { Header, Footer } from './_partials';

// actions
import { authActions } from '../modules/auth/actions';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = { loadingPage: false };
  }

  componentDidMount() {
    this.initAuthorize();
    this.initRouteEventsCallback();
  }

  initAuthorize = () => {
    const { createSession, authorizeAccount } = this.props;
    const params = new URLSearchParams(document.location.search.substring(1));
    const token = params.get('request_token');
    const approved = params.get('approved');
    if (token && approved) {
      createSession(token);
    } else {
      authorizeAccount();
    }
  }

  initRouteEventsCallback = () => {
    Router.events.on('routeChangeStart', () => {
      this.setState({ loadingPage: true });
    });
    Router.events.on('routeChangeComplete', () => {
      this.setState({ loadingPage: false });
    });
    Router.events.on('routeChangeError', () => {
      this.setState({ loadingPage: false });
    });
  }

  render() {
    const { children } = this.props;
    const { loadingPage } = this.state;

    return (
      <Spin spinning={loadingPage} size="xl">
        <Head>
          <title>Vivant - Movie</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <div className="layout-wrapper">
          {/* Header */}
          <Header />

          {/* Page content */}
          <div className="content-wrapper">
            {children}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  accountId: auth.accountId,
  sessionId: auth.sessionId
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    authorizeAccount: authActions.authorizeAccount.request,
    createSession: authActions.createSession.request
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
