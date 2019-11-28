import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

export default class Header extends Component {
  
  render() {
    return (
    <Paper component="form" >
      <Link to="/"><img src="/img/np-logo-black.png" width="300px" alt="Logo NašiPolitici.cz"></img></Link>
      <Link to="/about">About</Link>
      <Link to="/media">For media</Link>
      
        <InputBase
          placeholder="Search"
          inputProps={{ 'aria-label': 'Search' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}