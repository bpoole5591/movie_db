import React, { Component } from 'react';
import SideDrawer from '../SideDrawer/SideDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import tmdb_logo from '../../assets/tmdb_logo.png';
import logo from '../../assets/tmcd_logo.png';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  state = {
    drawerOpen: false,
    headerShow: false,
    myMovies: this.props.myMovies
  };
  componentDidMount() {
    if (localStorage.getItem('myMovies')) {
      const myMovies = JSON.parse(localStorage.getItem('myMovies'));
      this.setState({ myMovies: myMovies });
    }
  }
  componentDidUpdate() {
    if (this.state.myMovies !== this.props.myMovies) {
      this.setState({ myMovies: this.props.myMovies });
      return;
    }
  }
  toggleDrawer = value => {
    this.setState({ drawerOpen: value });
  };
  render() {
    return (
      <div className="header">
        <div className="my-list-button">
          <IconButton
            aria-label="Menu"
            color="inherit"
            onClick={() => this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <span className="my-list-label">My Movie List</span>
          <SideDrawer
            open={this.state.drawerOpen}
            onClose={value => this.toggleDrawer(value)}
            myMovies={this.state.myMovies ? this.state.myMovies : []}
            removeMovie={this.props.removeMovie}
          />
        </div>
        <div className="header-content">
          <div className="header-title">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: '150px',
                  marginBottom: '-22px',
                  paddingBottom: '3px'
                }}
              />
              &nbsp;the Movie Collection Database
            </Link>
          </div>
          <div className="tmdb-logo">
            <img src={tmdb_logo} alt="tmdb-logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
