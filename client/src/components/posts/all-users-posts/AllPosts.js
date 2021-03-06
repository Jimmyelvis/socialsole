import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../../cards/Card"
import Spinner from "../../common/Spinner";
import { getPosts } from "../../../actions/postActions";
import Navbar from "../../layout/CommNavbar";

/*
  View for displaying all the user posts from the site. each post is
  displayed in a card format, using an instance of a reusable card component
*/

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

   /*
    This function is called when an onchange event occurs when the user
    types a search parameter in the search bar component. This sets state of the search term
    which is then used by the (filteredPosts) variable to filter
    through the posts
  */

  updateSearch = e => {
    this.setState({ search: e.target.value });
  };

  
  render() {

    const { posts, loading } = this.props.post;
    let postContent;

    let filteredPosts = posts.filter(post => {
      return (
        post.headline.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });


    if (posts === null || loading) {

      /* 
        Checks to see if the post state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */
      postContent = <Spinner />;
    } 
    else {

      postContent = (
        <React.Fragment>
          {filteredPosts.map(post => {
            return <Card key={post._id} post={post} cardtype={'post'} />;
          })}
        </React.Fragment>
      )
    }

    return (
      <div className="communityposts">
        <Navbar />

        <div className="container">
          
          <div className="pageheading">
              <h2 className="heading-2">Posts From The Community</h2>
              <p>All the posts from our community</p>
          </div>

          <div className="filteredSearch">
            <input
              type="text"
              placeholder="Filter By Headline"
              value={this.state.search}
              onChange={this.updateSearch}
              className="form-control"
            />
          </div>
          
          <div className="posts">{postContent}</div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
