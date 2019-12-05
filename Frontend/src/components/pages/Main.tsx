import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { resolveAPIEntity, Entities } from "../../api";
import strings from "../lang/strings";

interface IState {
  search: string;
  loaded: boolean;
}

class Main extends Component<RouteComponentProps, IState> {
  data: any = {};

  constructor(props: any) {
    super(props);
    console.log(this.props);
    this.state = {
      loaded: false,
      search: ""
    };
  }

  componentDidMount() {
    let search = this.getSearch();

    console.log("search-componentDidMount", search);

    resolveAPIEntity({
      entity: Entities.SearchResult,
      id: search
    })
      .then(response => {
        if (response !== undefined) {
          response.json().then(json => {
            console.log("json", json);
            this.data = json;

            this.setState(prevState => ({
              loaded: true
            }));
          });
        }
      })
      .catch(e => console.log("error: ", e));
  }

  getSearch(): string {
    let search = this.getUrlParams();
    return search.get("search") || "";
  }

  getUrlParams(): URLSearchParams {
    if (!this.props.location.search) return new URLSearchParams();
    return new URLSearchParams(this.props.location.search);
  }

  renderResults() {
    let items = this.renderResultItems();
    return (
      <div>
        <h2 className="mt-5">Results</h2>
        {items}
      </div>
    );
  }
  linkToPerson(data: any) {
    return "politik.html?id=" + data.id;
  }

  renderResultItems() {
    console.log("data", this.data);
    if (this.data.persons === undefined)
      return "Please write the person name to the search box and hit the search button";
    return this.data.persons.map((data: any) => {
      let link = this.linkToPerson(data);
      return (
        <div key={data.id} className="card card-primary mt-2">
          <div className="card-header">
            <h3 className="offset-md-2">
              <a href={link}>
                {data.firstName} {data.lastName}
              </a>
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <a href={link}>
                  <img
                    alt="PersonPhoto"
                    className="img-thumbnail"
                    src={data.photoUrl}
                  />
                </a>
              </div>
              <div className="col-md-10">{data.description}</div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    let search = this.getSearch();
    let results = this.renderResults();
    return (
      <div className="container">
        <form className="mt-5" method="get" action="search">
          <h1>{strings.mainHeading}</h1>
          <h2>{search}</h2>
          <div className="form-group">
            <label htmlFor="search">{strings.searchName}</label>
            <input
              className="form-control mr-sm-2"
              id="search"
              name="search"
              type="search"
              placeholder={strings.searchPlaceholder}
              aria-label={strings.search}
            />
          </div>

          <button
            className="btn btn-outline-primary my-2 my-sm-0 pt-2"
            type="submit"
          >
            {strings.search}
          </button>
        </form>
        {results}
      </div>
    );
  }
}

export default withRouter(Main);
