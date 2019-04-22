import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import SneakerFeed from "./SneakerFeed";
import { getSneakersByUser } from "../../actions/sneakerActions";
import Spinner from "../common/Spinner";


export class UserSneakers extends Component {

  componentDidMount() {

    const { profile } = this.props.profile;
    const profileUserId = profile.user._id;
    // console.log('=================IN SNEAKER POSTS ============');
    // console.log(profileUserId);
    // console.log('====================================');
    
    this.props.getSneakersByUser(profileUserId);

  }

  render() {

    let sneakerContent;

    const { profile } = this.props.profile;
    const { sneakers, loading } = this.props.sneaker;
    const firstName = profile.user.name.trim().split(" ")[0];

    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = <SneakerFeed sneakers={sneakers} />;
    }


    return (
      <div className="container">

      <h3>Your Sneakers</h3>

           {sneakerContent}
      </div>
    );
  }
}

UserSneakers.propTypes = {
  getSneakersByUser: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  sneaker: state.sneaker
});


export default connect(mapStateToProps, { getSneakersByUser }) (UserSneakers);
