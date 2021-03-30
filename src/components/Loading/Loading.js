import React from 'react';
import './Loading.css';
import miniLogo from '../../assets/icon-pokeball.png';

function Loading() {
  return (
    <div className="Loading">
      <img alt="loading" src={miniLogo} />
    </div>
  );
}

export default Loading;
