import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import PlaceholderImg from '../../images/avatar-0.png';

import './style.css';

const Avatar = ({
  src,
  size,
}) => {
  const avatarCN = cx('avatar', `avatar--${size}`);

  return (
    <div className={avatarCN}>
      <div className="avatar__img" style={{ backgroundImage: `url('${src}'), url('${PlaceholderImg}')` }} />
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'lg']),
};

Avatar.defaultProps = {
  src: PlaceholderImg,
  size: 'xs',
};

export default Avatar;
