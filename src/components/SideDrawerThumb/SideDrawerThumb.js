import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './SideDrawerThumb.css';

const SideDrawerThumb = ({
  image,
  movieId,
  movieName,
  clickable,
  removeMovie
}) => {
  return (
    <div className="sidedrawerthumb">
      {clickable ? (
        <Link
          to={{
            pathname: `/${movieId}`,
            movieName: `${movieName}`
          }}
        >
          <img src={image} alt="sidedrawerthumb" />
          <div className="movie-title">{movieName}</div>
        </Link>
      ) : (
        <>
          <img src={image} alt="sidedrawerthumb" />
          <div className="movie-title">{movieName}</div>
          <span>
            <button
              className="sidedrawer-button"
              onClick={() => removeMovie(movieId)}
            >
              <FontAwesome className="fa-minus" name="minus-circle" />
            </button>
          </span>
        </>
      )}
    </div>
  );
};

SideDrawerThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string
};

export default SideDrawerThumb;
