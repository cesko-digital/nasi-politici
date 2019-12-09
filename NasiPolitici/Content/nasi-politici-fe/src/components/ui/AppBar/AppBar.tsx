import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { useDesktop } from "../../../hooks";
import { SearchInput } from "../SearchInput";
import Grid from "@material-ui/core/Grid";

const texts = {
  about: "O projektu",
  media: "Pro médiá"
};

const Toolbar = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid gray;
  box-sizing: border-box;

  padding-top: 5px;
  padding-bottom: 5px;
`;

const AppBarLink = styled(Link)`
  & {
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 17px;
    color: black;
    cursor: pointer;
  }
`;

const ToolbarWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
    align-items: center;
  flex-wrap: wrap;
`;

const LeftAppBarSide = styled.span`
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
    <Toolbar>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <ToolbarWrapper>
            <LeftAppBarSide>
              <Link to="/">
                {/* I belive that should not be an image */}
                <img
                  src="/assets/img/np-logo-black.png"
                  width="300px"
                  alt="Logo NašiPolitici.cz"
                />
              </Link>
              <AppBarLink className="header-menu-item" to="/about">
                {texts.about}
              </AppBarLink>
              <AppBarLink className="header-menu-item" to="/media">
                {texts.media}
              </AppBarLink>
            </LeftAppBarSide>

            {isDesktop && (
              <>
                <SearchInput />
              </>
            )}
          </ToolbarWrapper>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default AppBar;
