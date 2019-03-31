import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import SneakerFeed from "./SneakerFeed";
import { getSneakers } from '../../actions/sneakerActions';
import Spinner from '../common/Spinner';


class Sneakers extends Component {

  componentDidMount() {
    this.props.getSneakers();
  }

  render() {

    const { sneakers, loading } = this.props.sneaker;
    let sneakerContent;

    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = <SneakerFeed sneakers={sneakers} />
      
    }



    return (
      <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {sneakerContent}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  sneaker: state.sneaker
});

export default connect(mapStateToProps, { getSneakers })(Sneakers);
