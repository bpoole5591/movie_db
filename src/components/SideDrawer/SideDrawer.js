import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SideDrawerThumb from '../../components/SideDrawerThumb/SideDrawerThumb';
import no_image from '../../assets/no_image.jpg';

import './SideDrawer.css';

const SideDrawer = props => {
  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={() => props.onClose(false)}
      className="sidedrawer-style"
    >
      <List component="nav" className="sidedrawer-style">
        <ListItem className="sidedrawer-label">My Movie List</ListItem>

        {props.myMovies.map((element, i) => {
          return (
            <div key={i} style={{ width: '50%' }}>
              <SideDrawerThumb
                key={i}
                clickable={false}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : `${no_image}`
                }
                movieId={element.id}
                movieName={element.original_title}
                removeMovie={props.removeMovie}
              />
              <hr />
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
