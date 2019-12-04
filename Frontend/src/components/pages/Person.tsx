import React from "react";
import strings from "../lang/strings";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { resolveAPIEntity, Entities } from "../../api";

interface IState {
  search: string;
  loaded: boolean;
}

class Person extends React.Component<RouteComponentProps, IState> {
  data: any = {};
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
        response.json().then(json => {
          console.log("json", json);
          this.data = json;

          this.setState(prevState => ({
            loaded: true
          }));
        });
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

  render() {
    if (this.data.id === undefined)
      return (
        <div>
          <h1>{strings.loadingData}</h1>
        </div>
      );

    return (
      <div className="container">
        <h1>
          {this.data.firstName} {this.data.lastName}
        </h1>
        <div className="row">
          <div className="col-md-2">
            <img alt="PersonPhoto" className="img-thumbnail" src={this.data.photoUrl} />
          </div>
          <div className="col-md-10">{this.data.description}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.data.companyConnection}
          </div>
          <div className="col-md-12">
              <a href={this.data.sourceUrl} className="btn btn-light" target="_blank" rel="noopener noreferrer">Zdroj</a>
          </div>
        </div>
        
      </div>
    );
  }
}

export default withRouter(Person);
