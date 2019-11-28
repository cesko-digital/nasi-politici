import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Paper, InputBase, IconButton, AppBar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import LocalizedStrings from "react-localization";
import { SearchInput } from "../search-input";

let strings = {
  about: "O projektu",
  media: "Pro médiá"
};

export default class Header extends Component {
  render() {
    return (
      <AppBar>
        <Paper component="form">
          <Link to="/">
            <img
              src="/assets/img/np-logo-black.png"
              width="300px"
              alt="Logo NašiPolitici.cz"
            ></img>
          </Link>
          <Link to="/about">{strings.about}</Link>
          <Link to="/media">{strings.media}</Link>

          <SearchInput />
        </Paper>
      </AppBar>
    );
  }
}
