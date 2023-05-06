import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRelatedPosts } from "actions/postActions";
import { Link } from "react-router-dom";
import { getRelated } from "utils/getRelated";
import { Panel } from "components/ui/Panel";

export const RelatedPosts = ({ tags, getRelatedPosts, postId, post: { posts } }) => {


  let related = getRelated(tags, getRelatedPosts, postId, posts)

  return (
    <Panel className="relatedposts">
      <h3 className="heading-3">Related Posts</h3>

      <ul>
        {related.map((post) => {
          return (
            <Link to={`/post/${post._id}`}>
              <div className="related-card " key={post._id}>
                <div className="top">{post.headerimage === "" ? "  " : <img src={post.headerimage} alt="..." />}</div>
                <div className="bottom">
                  <h3 className="heading-4">{post.headline}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </Panel>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRelatedPosts })(RelatedPosts);
