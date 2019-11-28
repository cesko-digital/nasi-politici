import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Paper, InputBase, IconButton, AppBar, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import LocalizedStrings from "react-localization";
import { SearchInput } from "../search-input";
import styled from "styled-components";

let strings = {
  about: "O projektu",
  media: "Pro médiá"
};

const PaperStyled = styled(Paper)`
padding: 0 20px;
`

export default class Header extends Component {
  render() {
    return (
      <AppBar>
        <PaperStyled component="form">
          <Box display="flex" flexDirection="row" style={{maxHeight: '40px', padding: '10px 0'}}>
            <div>
            <Link to="/">
              <img
                src="/assets/img/np-logo-black.png"
                width="300px"
                alt="Logo NašiPolitici.cz"
              ></img>
            </Link>
            <Link to="/about">{strings.about}</Link>
            <Link to="/media">{strings.media}</Link>
            </div>

            <div style={{height: '35px'}}>
            <SearchInput />
            </div>
          </Box>
        </PaperStyled>
      </AppBar>
    );
  }
}
