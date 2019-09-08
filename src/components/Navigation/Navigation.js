import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = props => {
  return (
    <div className="navigation">
      <div className="navigation-content">
        <Link to="/">
          <p>Home</p>
          <p>/</p>
          <p>{props.movie}</p>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
