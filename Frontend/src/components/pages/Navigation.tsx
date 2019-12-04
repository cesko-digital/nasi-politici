import React from "react";
import strings from "../lang/strings";

export default class Navigation extends React.Component {
  render() {
    const imgStyle = {
      maxWidth: "200px"
    };
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img alt="Logo" src="assets/img/np-logo-black.png" style={imgStyle} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="o-projektu.html">
                  {strings.aboutHeading}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pro-media.html">
                {strings.mediaHeading}
                </a>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-lg-0"
              method="get"
              action="search.html"
            >
              <input
                className="form-control mr-sm-2"
                name="search"
                type="search"
                placeholder={strings.searchPlaceholder}
                aria-label={strings.search}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                {strings.search}
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
