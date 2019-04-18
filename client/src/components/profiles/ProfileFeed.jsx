import React, { Component } from "react";
import ProfileItem from "./ProfileItem";


export class ProfileFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };

  render() {
    const { profiles } = this.props;

    let profileItems = profiles.filter(profile => {
      return (
        profile.user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <div className="filteredSearch col-md-6">
            <input
              type="text"
              placeholder="Filter By Name"
              value={this.state.search}
              onChange={this.updateSearch}
              className="form-control"
            />
          </div>
        </div>

        <br />

        <div className="row">
          {profileItems.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileFeed;
