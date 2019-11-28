import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, InputBase, IconButton, AppBar as MuiAppBar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const texts = {
    about: 'O projektu',
    media: 'Pro médiá'
};

export default class AppBar extends Component {
    render() {
        return (
            <MuiAppBar>
                <Paper component="form">
                    <Link to="/">
                        <img
                            src="/assets/img/np-logo-black.png"
                            width="300px"
                            alt="Logo NašiPolitici.cz"
                        ></img>
                    </Link>
                    <Link to="/about">{texts.about}</Link>
                    <Link to="/media">{texts.media}</Link>

                    <InputBase placeholder="Search" inputProps={{ 'aria-label': 'Search' }} />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </MuiAppBar>
        );
    }
}
