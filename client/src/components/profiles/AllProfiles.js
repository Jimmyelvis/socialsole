import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import Navbar from "../layout/CommNavbar";
import Card from "../cards/Card"

/*
  View for displaying all the user profiles from the site. each post is
  displayed in a card format, using an instance of a reusable card component
*/


class Profiles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

   /*
    This function is called when an onchange event occurs when the user
    types a search parameter in the search bar component. This sets state of the search term
    which is then used by the (filteredProfiles) variable to filter
    through the profiles
  */

  updateSearch = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  
  render() {

    const { profiles, loading } = this.props.profile;
    let profileItems;

    let filteredProfiles = profiles.filter(profile => {
      return (
        profile.user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });


    if (profiles === null || loading) {

      /* 
        Checks to see if the post state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */

      profileItems = <Spinner />;
    } else {
      profileItems = (
        <React.Fragment>
          {filteredProfiles.map((profile) => (
            <Card key={profile._id} profile={profile}  cardtype={'profile'} />
          ))}
        </React.Fragment>
      );
    }

    return (
      <div className="profiles">
        <Navbar />

        <div className="container">

            <div className="pageheading">
              <h2 className="heading-2">Profiles</h2>
              <p>Browse and connect with sneaker lovers</p>
            </div>

            <div className="filteredSearch">
              <input
                type="text"
                placeholder="Filter By Name"
                value={this.state.search}
                onChange={this.updateSearch}
                className="form-control"
              />
            </div>

            <div className="profileItems">
              {profileItems}
            </div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
