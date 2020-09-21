import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';
import { getSneaker } from '../../../actions/sneakerActions';
import { getCurrentProfile } from "../../../actions/profileActions";
import SneakerDetail from './Sneaker-Detail';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Navbar from "../../../components/layout/CommNavbar";

/*
  This component is for displaying the overall Sneaker detail page. This also
  contains sub components that are responsible for different areas of
  the page. <SneakerDetail /> component which is responsible for displaying
  the details of a sneaker such as the mainimage, the model, the author
  details, text body.

  <CommentFeed /> which maps through the comments that are attached to this post and 
  displays them.

  <CommentForm /> which is responsible for displaying and implementing the form
  for posting comments.
*/

export class Sneaker extends Component {

  state = {
    currentSneaker: null,
  };
 
  componentDidMount() {
    this.props.getSneaker(this.props.match.params.id);

    this.props.getCurrentProfile();


    this.setState({
      currentSneaker: this.props.match.params.id
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== this.state.currentSneaker) {
      this.props.getSneaker(this.props.match.params.id);

      this.setState({
        currentSneaker: this.props.match.params.id,
      });
    }
  }


  render() {

    const { sneaker, loading } = this.props.sneaker;
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    let sneakerContent;

    if (sneaker === null || loading || Object.keys(sneaker).length === 0) {
      sneakerContent = <Spinner />;
    }else if (user === null || Object.keys(user).length === 0) {

      sneakerContent = (
        <div>
          <SneakerDetail sneaker={sneaker} showActions={false}/>

          <div className="container">

              {
                sneaker.comments.length > 0 ? 
                <div className="commentsarea contentbody">
                  <CommentFeed sneakerId={sneaker._id} comments={sneaker.comments} />
                </div>

                : ""
              }
           
          </div>
        </div>
      );

    } else {
        if (profile === null || Object.keys(profile).length === 0 ){
          sneakerContent = (
            <React.Fragment>
              <SneakerDetail sneaker={sneaker} showActions={true}/>

              <div className="container"> 
                {
                  sneaker.comments.length > 0 ? 
                  <div className="commentsarea contentbody">
                    <CommentFeed sneakerId={sneaker._id} comments={sneaker.comments} />
                  </div>

                  : ""
                }
              </div>


            </React.Fragment>
          );
      } 
      
      else {
        sneakerContent = (
          <React.Fragment>
            <SneakerDetail sneaker={sneaker} showActions={true}/>

            <div className="container"> 
              <div className="commentsarea postsneakerdetail contentbody">

                <CommentForm sneakerId={sneaker._id} handle={profile.handle} />
                <CommentFeed sneakerId={sneaker._id} comments={sneaker.comments} />
                
              </div>
            </div>


          </React.Fragment>
        );
      }
    }
    
  

    return (
      <React.Fragment>
        <Navbar />

        {sneakerContent}

      </React.Fragment>
    );
  }
}

Sneaker.propTypes = {
  getSneaker: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sneaker: state.sneaker,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getSneaker, getCurrentProfile })(Sneaker);
