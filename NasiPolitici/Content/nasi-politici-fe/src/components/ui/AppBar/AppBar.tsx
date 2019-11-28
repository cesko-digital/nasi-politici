import React from 'react';
import { Link } from 'react-router-dom';
import { InputBase, IconButton, AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { useDesktop } from '../../../hooks';

const texts = {
    about: 'O projektu',
    media: 'Pro médiá'
};

const LeftAppBarSide = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > * {
        margin-right: ${props => props.theme.spacing(2)}px;
    }

    flex-grow: 1;
`;

const AppBar = () => {
    const isDesktop = useDesktop();

        return (
            <MuiAppBar color="default">
                <Toolbar>
                    <LeftAppBarSide>
                        <Link to="/">
                            {/* I belive that should not be an image */}
                            <img
                                src="/assets/img/np-logo-black.png"
                                width="300px"
                                alt="Logo NašiPolitici.cz"
                            ></img>
                        </Link>
                        <Link to="/about">{texts.about}</Link>
                        <Link to="/media">{texts.media}</Link>
                    </LeftAppBarSide>
                    {!isDesktop &&
                        <>
                        <InputBase placeholder="Search" inputProps={{ 'aria-label': 'Search' }} />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    </>
                    }
                </Toolbar>
            </MuiAppBar>
        );
};

export default AppBar;
