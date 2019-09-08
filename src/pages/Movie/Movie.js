import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import MovieInfoBar from '../../components/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../../components/FourColGrid/FourColGrid';
import Actor from '../../components/Actor/Actor';
import Spinner from '../../components/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false,
    myMovies: []
  };

  componentDidMount() {
    if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
      const state = JSON.parse(
        localStorage.getItem(`${this.props.match.params.movieId}`)
      );
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      // Fetch the movie
      const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchItems(endpoint);
    }

    if (localStorage.getItem('myMovies')) {
      const myMovies = JSON.parse(localStorage.getItem('myMovies'));
      this.setState({ myMovies: myMovies });
    }
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.state_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            // Fetch actors in the setState callback function
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const directors = result.crew.filter(
                  member => member.job === 'Director'
                );

                this.setState(
                  {
                    actors: result.cast,
                    directors,
                    loading: false
                  },
                  () => {
                    localStorage.setItem(
                      `${this.props.match.params.movieId}`,
                      JSON.stringify(this.state)
                    );
                  }
                );
              });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };

  addMovie = () => {
    this.setState(
      { myMovies: [...this.state.myMovies, this.state.movie] },
      () => {
        localStorage.setItem('myMovies', JSON.stringify(this.state.myMovies));
      }
    );
  };

  removeMovie = movieId => {
    const myMovies = this.state.myMovies;
    // Store movie object to delete into variable
    // This filter method takes a callback with a destructured prop (myMovies.id in this case) and filters out all movies without the id that equals the passed in movieId
    const movieToRemove = myMovies.find(({ id }) => id === movieId);
    // Store the result of filtering movieToRemove out of this.state.myMovies into variable
    const newMyMovies = myMovies.filter(movie => movie !== movieToRemove);
    // Set the state of myMovies to the previous variable
    this.setState({ myMovies: newMyMovies }, () => {
      localStorage.setItem('myMovies', JSON.stringify(this.state.myMovies));
    });
  };

  render() {
    return (
      <div className="movie">
        <Header myMovies={this.state.myMovies} removeMovie={this.removeMovie} />
        {this.state.movie ? (
          <div>
            <Navigation movie={this.state.movie.title} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
              addMovie={this.addMovie}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}
        {this.state.actors ? (
          <div className="movie-grid">
            <FourColGrid header={'Actors'}>
              {this.state.actors.map((element, i) => {
                return <Actor key={i} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found!</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
