import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SneakerItem from './SneakerItem';


export class SneakerFeed extends Component {


  render() {

    const { sneakers } = this.props;

    // return sneakers.map(sneaker => <PostItem key={sneaker._id} sneaker={sneaker} />);


    return (
      sneakers.slice(0, 6).map((sneaker, index) => (<SneakerItem key={sneaker._id} sneaker={sneaker} />))
    );

    
  }

  
}

SneakerFeed.propTypes = {
  sneakers: PropTypes.array.isRequired
};

export default SneakerFeed
