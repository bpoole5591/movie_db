import React, { Component } from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import FontAwesome from 'react-fontawesome';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

class MovieInfo extends Component {
  render() {
    const { backdrop_path, poster_path, title, overview } = this.props.movie;
    return (
      <div
        className="movieinfo"
        style={{
          background: backdrop_path
            ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}')`
            : '#000000'
        }}
      >
        <div className="movieinfo-content">
          <div className="movieinfo-thumb">
            <MovieThumb
              image={
                poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`
                  : './images/no_image.jpg'
              }
              clickable={false}
            />
          </div>
          <div className="movieinfo-text">
            <h1>{title}</h1>
            <h3>PLOT</h3>
            <p>{overview}</p>
            <h3>IMDB RATING</h3>
            <div className="rating">
              <meter
                min="0"
                max="100"
                optimum="100"
                low="40"
                high="70"
                value={this.props.movie.vote_average * 10}
              />
              <p className="score">{this.props.movie.vote_average}</p>
            </div>
            {this.props.directors.length > 1 ? (
              <h3>DIRECTORS</h3>
            ) : (
              <h3>DIRECTOR</h3>
            )}
            {this.props.directors.map((element, i) => {
              return (
                <p key={i} className="director">
                  {element.name}
                </p>
              );
            })}
          </div>
          <button style={{ cursor: 'pointer' }} onClick={this.props.addMovie}>
            <FontAwesome className="fa-plus" name="plus-circle" size="5x" />
          </button>
        </div>
      </div>
    );
  }
}

export default MovieInfo;
