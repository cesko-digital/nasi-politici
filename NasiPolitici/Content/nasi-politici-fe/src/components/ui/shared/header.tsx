import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Paper,InputBase,IconButton,AppBar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
  about:"About",
  media:"For media",
},
 cs: {
  about:"O projektu",
  media:"Pro médiá",
 }
});

export default class Header extends Component {
  
  render() {
    return (
      <AppBar>
    <Paper component="form" >
      <Link to="/"><img src="/assets/img/np-logo-black.png" width="300px" alt="Logo NašiPolitici.cz"></img></Link>
      <Link to="/about">{strings.about}</Link>
      <Link to="/media">{strings.media}</Link>
      
        <InputBase
          placeholder="Search"
          inputProps={{ 'aria-label': 'Search' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      </AppBar>
    );
  }
}