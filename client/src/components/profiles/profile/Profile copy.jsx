import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileHeader from "./profile-components/ProfileHeader";
import ProfileAbout from "./profile-components/ProfileAbout";
import ProfilePosts from "./profile-components/ProfilePosts";
import ProfileSneakers from "./profile-components/ProfileSneakers";
import Spinner from "../../common/Spinner";
import { getProfileByHandle } from "../../../actions/profileActions";
import Navbar from "../../../components/layout/Navbar";



export class Profile extends Component {

  state = {
    about: 'show',
    posts: '',
    sneakers: '',
    friends: ''
  }
  
  componentDidMount() {

    const { profile } = this.props.profile;

      // const profileUserId = profile.user._id;
  
      // console.log(profileUserId);

    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      // this.props.getPostsByUser(profileUserId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          {/* <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>

            </div>

            <div className="col-md-6" />
          </div> */}

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfilePosts profile={profile} />
          <ProfileSneakers profile={profile} />

        </div>
      );
    }

    return (
      <div className="profile">
        <Navbar />
        
        <div className="container">
          {/* <p>{profile.user._id}</p> */}
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
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
  { getProfileByHandle }
)(Profile);
