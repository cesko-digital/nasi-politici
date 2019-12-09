import React from "react";
import {
  Link,
  LinkProps,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { useDesktop } from "../../../hooks";
import { SearchInput } from "../SearchInput";
import Grid from "@material-ui/core/Grid";
import { ProjectLogo } from "../ProjectLogo";
import { ABOUT_ROUTE, MEDIA_ROUTE } from "../../../router";
import { If } from "../../If";
import { getQueryParams } from "../../../utils";

const texts = {
  about: "O projektu",
  media: "Pro médiá"
};

const Toolbar = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  min-height: 60px;
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
    color: black;
    font-weight: 600;
    cursor: pointer;
  }
`;

const ActiveAppBarLink = styled.span`
  & {
    color: #13548f;
    font-weight: 600;
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

type IAppBarProps = RouteComponentProps<{}>;

const AppBarImpl: React.FunctionComponent<IAppBarProps> = props => {
  const isDesktop = useDesktop();
  const queryParams = getQueryParams();
  console.log('appbarimpl: ', JSON.stringify(queryParams))
  const isMainPage =
    props.location.pathname === "/" && queryParams.query === undefined;
  const isAboutPage = props.location.pathname === ABOUT_ROUTE;
  const isForMediaPage = props.location.pathname === MEDIA_ROUTE;
  const isSearchResultsPage =
    props.location.pathname === "/" && queryParams.query !== undefined;

  return (
    <Toolbar>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          <ToolbarWrapper>
            <LeftAppBarSide>
              <If condition={!isMainPage}>
                <Link to="/">
                  <ProjectLogo />
                </Link>
              </If>

              <If condition={isAboutPage}>
                <ActiveAppBarLink>{texts.about}</ActiveAppBarLink>
              </If>

              <If condition={!isAboutPage}>
                <AppBarLink to="/about">{texts.about}</AppBarLink>
              </If>

              <If condition={isForMediaPage}>
                <ActiveAppBarLink>{texts.media}</ActiveAppBarLink>
              </If>

              <If condition={!isForMediaPage}>
                <AppBarLink to="/media">{texts.media}</AppBarLink>
              </If>
            </LeftAppBarSide>

            <If condition={isDesktop && !isSearchResultsPage && !isMainPage}>
              <SearchInput buttonLabel="Hledat politika" />
            </If>
          </ToolbarWrapper>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default withRouter(AppBarImpl);
