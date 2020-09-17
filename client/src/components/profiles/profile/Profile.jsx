import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileHeader from "./profile-components/ProfileHeader";
import ProfileAbout from "./profile-components/ProfileAbout";
import ProfilePosts from "./profile-components/ProfilePosts";
import ProfileSneakers from "./profile-components/ProfileSneakers";
import ProfileFriends from "./profile-components/ProfileFriends";

import Spinner from "../../common/Spinner";
import { getProfileByHandle } from "../../../actions/profileActions";
import Navbar from "../../../components/layout/CommNavbar";

/*
  This component is for displaying the overall Profile detail page. This also
  contains sub components that are responsible for different areas of
  the page. <ProfileAbout /> component which is responsible for displaying
  the user's bio. <ProfilePosts /> for displaying posts that was created by the 
  user.

  <ProfileSneakers /> for displaying sneakers created by the user. 
*/

export class Profile extends Component {

  state = {
    about: 'show',
    posts: '',
    sneakers: '',
    friends: ''
  }

  
  componentDidMount() {

    const { profile } = this.props.profile;

    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;


    let profileContent;
    let profileHeader;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {

        profileHeader = (
          <ProfileHeader 
          profile={profile}
            showAbout={() => this.setState({
              about: 'show',
              posts: '',
              sneakers: '',
              friends: ''
            })}
            showPosts={() => this.setState({
              about: '',
              posts: 'show',
              sneakers: '',
              friends: ''
            })} 
            showSneakers={() => this.setState({
              about: '',
              posts: '',
              sneakers: 'show',
              friends: ''
            })}
            showFriends={() => this.setState({
              about: '',
              posts: '',
              sneakers: '',
              friends: 'show'
            })}  
        />
        )

        if (this.state.about === 'show') {
          
          profileContent = (
            <React.Fragment>

              <div className="fullimageheader">
                <img src={profile.profilephoto} alt="" />
              </div>

              <div className="container">
                {profileHeader}
                <ProfileAbout profile={profile} />
              </div>

            </React.Fragment>
          )
        } else if (this.state.posts === 'show'){
          profileContent = (
            <React.Fragment>

              <div className="fullimageheader">
                <img src={profile.profilephoto} alt="" />
              </div>

              <div className="container">
                {profileHeader}              
                <ProfilePosts profile={profile} />
              </div>

            </React.Fragment>
          )
        } else if (this.state.sneakers === 'show'){
          profileContent = (
            <React.Fragment>

              <div className="fullimageheader">
                <img src={profile.profilephoto} alt="" />
              </div>

              <div className="container">
                {profileHeader}
                <ProfileSneakers profile={profile} />
              </div>

            </React.Fragment>
          )
        } else if (this.state.friends === 'show'){
          profileContent = (
            <React.Fragment>

              <div className="fullimageheader">
                <img src={profile.profilephoto} alt="" />
              </div>

              <div className="container">
                {profileHeader}
                <ProfileFriends />
              </div>

            </React.Fragment>
          )
        }
      
    }

    return (
      <div className="profile">
        <Navbar />

        
        {profileContent}
      </div>
    );
  }
}



const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
