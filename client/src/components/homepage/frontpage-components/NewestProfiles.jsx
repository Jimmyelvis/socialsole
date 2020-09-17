import React, { Component } from 'react'
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { getNewestProfiles } from "../../../actions/profileActions";
import { Link } from 'react-router-dom';


export class NewestProfiles extends Component {

  componentDidMount() {
    this.props.getNewestProfiles();
  }


  render() {

    const { profiles, loading } = this.props.profile;
    let profileContent;

    if (profiles === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <React.Fragment>
          {profiles.map((profile) => (
            <div className="card-ver-overlay-notrans">
              <Link to={`/profile/${profile.handle}`} >
                <img className="cardbg" src={profile.user.avatar} alt="..." />
                <div className="overlay"></div>
                <div className="card-content">
                  <h3 className="heading-3">{profile.user.name}</h3>
                  {
                    profile.favsneaker ? (
                      <React.Fragment>
                        <h4 className="heading-4">Favorite Sneaker: </h4>
                        <h4 className="heading-4"> 
                          <span className="favsneaker">{profile.favsneaker}</span>
                        </h4>
                      </React.Fragment>
                    ) : ("")
                  }
                </div>
              </Link>
            </div>
          ))}
        </React.Fragment>
      );
    }


    return (
      <div className="newestprofiles">
        <div className="secheading">
          <h2 className="heading-2">Newest Profiles</h2>
        </div>

        <div className="profiles">
          {profileContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getNewestProfiles })(NewestProfiles);
