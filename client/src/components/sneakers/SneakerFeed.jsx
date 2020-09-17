import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SneakerItem from './SneakerItem';


class SneakerFeed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };


  render() {

    const { sneakers } = this.props;

    let filteredSneakers = sneakers.filter(sneaker => {
      return (
        sneaker.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1 || sneaker.colorway.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });


    return (
      <React.Fragment>
        <div className="row">
          <div className="filteredSearch col-md-6">
            <input
              type="text"
              placeholder="Filter By Model or Colorway"
              value={this.state.search}
              onChange={this.updateSearch}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
        {filteredSneakers.map(sneaker => {
            return <SneakerItem key={sneaker._id} sneaker={sneaker} />;
          })}
        </div>
      </React.Fragment>
    );
    
    
  }
}

SneakerFeed.propTypes = {
  sneakers: PropTypes.array.isRequired
};

export default SneakerFeed
