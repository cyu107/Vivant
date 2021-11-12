import React, { Component } from 'react';

const Header = () => {
  return (
    <div className="header-wrapper">
      <header>
        <a className="logo" href="/">
          <img src="/static/images/logo.svg" alt="logo" />
        </a>
        <div className="sign-in">
          <button>Sign In</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
