import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PostFeed from "./profileposts/PostFeed";
import { getPostsByUser } from "actions/postActions";
import Spinner from "components/common/Spinner";
import Card from "components/ui/cards/Card";

export const ProfilePosts = ({ profile: { profile }, post: { posts, loading }, getPostsByUser }) => {
 
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (profile) {
      getPostsByUser(profile.user._id);
    }
  }, [profile]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const firstName = profile.user.name.trim().split(" ")[0];

  let postContent;

  let filteredPosts = posts.filter((post) => {
    return post.headline.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <React.Fragment>
        {filteredPosts.map((post) => {
          return <Card key={post._id} post={post} cardtype={"post"} />;
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="profilePosts">
      <div className="container">
        <div className="pageheading">
          <h2 className="heading-2">{firstName}'s Posts</h2>
        </div>

        <div className="filteredSearch">
          <input type="text" placeholder="Filter By Headline" value={search} onChange={updateSearch} className="form-control" />
        </div>

        <div className="posts">{postContent}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getPostsByUser })(ProfilePosts);

// export default ProfilePosts;
