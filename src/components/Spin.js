import React from 'react';
import cx from 'clsx';

/**
 * @param {boolean} spinning - default: false, indiciate if displays the loader or not
 * @param {string} size  - default: md, xl, lg, sm, xs
 */
const Spin = ({ spinning, size, children, className }) => {
  return (
    <div className={cx('spin-wrapper', spinning && 'active', className)}>
      <img className={size} src="/static/images/loader.svg" alt="loader" />

      {children}
    </div>
  );
};

export default Spin;
