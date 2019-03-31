import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SneakerItem from './SneakerItem';


class SneakerFeed extends Component {


  render() {

    const { sneakers } = this.props;

    return sneakers.map(sneaker => <SneakerItem key={sneaker._id} sneaker={sneaker} />)
  }
}

SneakerFeed.propTypes = {
  sneakers: PropTypes.array.isRequired
};

export default SneakerFeed
