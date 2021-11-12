import React from 'react';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="links">
        <ul className="list-line__left">
          <li><a href="#">Contact</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Terms of Use</a></li>
        </ul>
        <div className="logo">
          <img src="/static/images/logo.svg" alt="logo" />
        </div>
        <ul className="list-line__right">
          <li><a href="#">API</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="social">
        <a
          className="facebook"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/static/images/facebook.svg" alt="facebook" />
        </a>
        <a
          className="twitter"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/static/images/twitter.svg" alt="twitter" />
        </a>
      </div>
      <div className="copyright">
        <p>© Vivant Moive, 2020 . All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
