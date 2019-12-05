import React from "react";
import strings from "../lang/strings";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { resolveAPIEntity, Entities } from "../../api";
import Moment from 'react-moment';

interface IState {
  search: string;
  loaded: boolean;
  newsLoaded: boolean;
}

class Person extends React.Component<RouteComponentProps, IState> {
  data: any = {};
  newsdata: any = {};
  constructor(props: any) {
    super(props);
    console.log(this.props);
  }

  componentDidMount() {
    let search = this.getSearch();

    console.log("search-componentDidMount", search);

    resolveAPIEntity({
      entity: Entities.Person,
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

    resolveAPIEntity({
      entity: Entities.News,
      id: search
    })
      .then(response => {
        if (response !== undefined) {
          response.json().then(json => {
            console.log("newsjson", json);
            this.newsdata = json;

            this.setState(prevState => ({
              newsLoaded: true
            }));
          });
        }
      })
      .catch(e => console.log("error: ", e));
  }

  getSearch(): string {
    let search = this.getUrlParams();
    return search.get("id") || "";
  }
  getUrlParams(): URLSearchParams {
    if (!this.props.location.search) return new URLSearchParams();
    return new URLSearchParams(this.props.location.search);
  }

  renderNews() {
    if (!this.state.newsLoaded)
      return <div className="card-body">Loading news..</div>;
    if (
      this.newsdata.news === undefined ||
      this.newsdata.news === null ||
      this.newsdata.news.length === 0
    ) {
      return (
        <div className="card-body">We have found no news for this person.</div>
      );
    }
    return this.newsdata.news.map((data: any) => {

      const dateToFormat = new Date(data.time*1000);
      return (
        <a
          className="list-group-item list-group-item-action"
          key={data.web}
          href={data.web}
        >
          <Moment format="DD.MM." date={dateToFormat}/>
          &nbsp;
          {data.source}
          &nbsp;
          {data.headline}
        </a>
      );
    });
  }

  render() {
    if (this.data.id === undefined)
      return (
        <div>
          <h1>{strings.loadingData}</h1>
        </div>
      );
    let news = this.renderNews();
    return (
      <div className="container">
        <h1>
          {this.data.firstName} {this.data.lastName}
        </h1>
        <div className="row">
          <div className="col-md-2">
            <img
              alt="PersonPhoto"
              className="img-thumbnail"
              src={this.data.photoUrl}
            />
          </div>
          <div className="col-md-10">{this.data.description}</div>
        </div>
        <div className="row">
          <div className="col-md-12">{this.data.companyConnection}</div>
          <div className="col-md-12">
            <a
              href={this.data.sourceUrl}
              className="btn btn-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zdroj
            </a>
          </div>
        </div>
        <div className="card card-light">
          <div className="card-header">
            <h3>Latest news</h3>
          </div>
          {news}
        </div>
      </div>
    );
  }
}

export default withRouter(Person);
