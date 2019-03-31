import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner';
import { getSneaker } from '../../../actions/sneakerActions';
import SneakerItem from './SneakerItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Navbar from "../../../components/layout/Navbar";


export class Sneaker extends Component {
 
  componentDidMount() {
    this.props.getSneaker(this.props.match.params.id);
  }


  render() {

    const { sneaker, loading } = this.props.sneaker;
    const { user } = this.props.auth;
    let sneakerContent;

    if (sneaker === null || loading || Object.keys(sneaker).length === 0) {
      sneakerContent = <Spinner />;
    }else if (user === null || Object.keys(user).length === 0) {

      sneakerContent = (
        <div>
          <SneakerItem sneaker={sneaker} showActions={false}/>
          <CommentFeed sneakerId={sneaker._id} comments={sneaker.comments} />
        </div>
      );

    } else{
        sneakerContent = (
          <div>
            <SneakerItem sneaker={sneaker} showActions={false}/>
            <CommentForm sneakerId={sneaker._id} />
            <CommentFeed sneakerId={sneaker._id} comments={sneaker.comments} />
          </div>
        );
    }


    return (
      <div className="sneakerSingle">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {sneakerContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sneaker.propTypes = {
  getSneaker: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sneaker: state.sneaker,
  auth: state.auth
});

export default connect(mapStateToProps, { getSneaker })(Sneaker);
