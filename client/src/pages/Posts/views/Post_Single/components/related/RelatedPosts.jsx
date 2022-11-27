import React, { Component } from "react";
import { connect } from "react-redux";
import { getRelatedPosts } from "actions/postActions";
import { Link } from "react-router-dom";

export class RelatedPosts extends Component {
  componentDidMount() {
    const { tags } = this.props;

    this.props.getRelatedPosts(tags);
  }

  render() {
    const { tags, postId } = this.props;
    const { posts } = this.props.post;


    /*
      Before we map through the post filter out the currently loaded post 
      from the related posts state
    */
    let related = posts.filter((post) => {
      return post._id !== postId._id;
    });

    return (
      
      <div className="relatedposts contentbody">
        <h3 className="heading-3">Related Posts</h3>

        <ul>
          {related.map((post) => {
            return (
              <Link to={`/post/${post._id}`}>
                <div className="card-ver-trad " key={post._id}>
                  <div className="top">
                    {post.headerimage === "" ? (
                      "  "
                    ) : (
                      <img src={post.headerimage} alt="..." />
                    )}
                  </div>
                  <div className="bottom">
                    <h3 className="heading-4">{post.headline}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    
    );

  }
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRelatedPosts })(RelatedPosts);
