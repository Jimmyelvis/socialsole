import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { iconList } from "icomoon-react";
import Icon from "../../icons/Icon"
import iconSet from "../../icons/selection.json";
import { getLikedSneakers } from "../../../actions/sneakerActions"
import Spinner from "../../common/Spinner";
import Truncate from "react-truncate";




export class MostLikedSneakers extends Component {

  componentDidMount () {
    this.props.getLikedSneakers()
  }
 

  render() {
    console.log(iconList(iconSet));

    const { sneakers, loading } = this.props.sneaker
    let sneakerContent;


    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {

      sneakerContent = (
        <React.Fragment>
          {sneakers.map((sneaker, index) => (
            <div className="card-ver-overlay liked-item" id={"item-" + index}>
              <Link to={`/sneaker/${sneaker._id}`}>
                <div className="likes">
                  <div className="likescount">
                    <p>{sneaker.likeslength}</p>
                  </div>
                  <div className="thumb">
                    <Icon color="#AADDFF" icon="thumb_up" />
                  </div>
                </div>
                <img
                  className="cardbg"
                  src={sneaker.mainimage}
                  alt="..."
                />
                <div className="overlay"></div>
                <div className="darkeroverlay"></div>

                <div className="card-content">
                  <h3 className="heading-3">
                    {sneaker.model}
                  </h3>
                  <h4 className="heading-4">
                    {sneaker.colorway}
                  </h4>
                  <h5 className="heading-5">
                    {sneaker.year}
                  </h5>
                </div>

                <div className="back-content">
                  <h3 className="heading-3">
                    {sneaker.model}
                  </h3>
                  <h4 className="heading-4">
                    {sneaker.colorway}
                  </h4>
                  <h5 className="heading-5">
                    {sneaker.year}
                  </h5>
                  <p>
                      <Truncate
                      lines={5}
                      ellipsis={
                        <span>
                          ... 
                        </span>
                      }
                    >
                      {sneaker.text}
                    </Truncate>
                  </p>

              </div>

              </Link>


            </div>
          ))}
        </React.Fragment>
      );
     
    }


    return (
      <div className="mostliked">
        <div className="secheading">
          <h2 className="heading-2">Most Liked Sneakers</h2>
        </div>

        <div className="likedgrid">

        {sneakerContent}


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sneaker: state.sneaker
});

export default  connect(mapStateToProps, {getLikedSneakers})(MostLikedSneakers);
