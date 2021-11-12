import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';

// store
import { wrapper } from '../store';

// styles
import '../styles/main.scss';

class WrappedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (<Component {...pageProps} />);
  }
}

export default wrapper.withRedux(WrappedApp);
