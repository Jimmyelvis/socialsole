import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../../cards/Card"
import Spinner from "../../common/Spinner";
import { getSneakers } from "../../../actions/sneakerActions";
import Navbar from "../../layout/CommNavbar";

/*
  Displays a list of all the sneakers, each sneaker is
  displayed in a card format, using an instance of a reusable card component
*/


export class AllSneakers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

   /*
    This function is called when an onchange event occurs when the user
    types a search parameter in the search bar component. This sets state of the search term
    which is then used by the (filteredSneakers) variable to filter
    through the sneeakers
  */

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  componentDidMount() {
    this.props.getSneakers();
  }

  render() {
    const { sneakers, loading } = this.props.sneaker;
    let sneakerContent;

    let filteredSneakers = sneakers.filter(sneaker => {
      return (
        sneaker.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1 || sneaker.colorway.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

    if (sneakers === null || loading) {

       /* 
        Checks to see if the sneaker state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */

      sneakerContent = <Spinner />;
    } else {

      sneakerContent = (
        <React.Fragment>
          {filteredSneakers.map(sneaker => {
              return <Card key={sneaker._id} sneaker={sneaker} cardtype={'sneaker'} />;
          })}
        </React.Fragment>
      )
     
    }

    return (
      <div className="communitysneakers">
        <Navbar />

        <div className="container">

            <div className="pageheading">
              <h2 className="heading-2">Sneakers From The Community</h2>
              <p>All the sneakers from our user's collection</p>
            </div>

          

          <div className="filteredSearch">
            <input
              type="text"
              placeholder="Filter By Model or Colorway"
              value={this.state.search}
              onChange={this.updateSearch}
              className="form-control"
            />
          </div>

          <div className="sneakeritems">{sneakerContent}</div>
          
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  sneaker: state.sneaker
});

export default connect(
  mapStateToProps,
  { getSneakers }
)(AllSneakers);
