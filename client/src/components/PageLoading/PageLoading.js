import React from 'react';
import Loader from 'react-loaders';
import './style.css';

const PageLoading = () => (
  <div className="page-loading">
    <Loader type="pacman" active />
  </div>
);

export default PageLoading;
