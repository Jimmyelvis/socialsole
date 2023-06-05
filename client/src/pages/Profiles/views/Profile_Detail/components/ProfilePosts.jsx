import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PostFeed from "./profileposts/PostFeed";
import { getPostsByUser } from "actions/postActions";
import Spinner from "components/common/Spinner";
import Card from "components/ui/cards/Card";
import { CardPost } from "components/ui/cards/CardPost";

export const ProfilePosts = ({ 
    displayedProfile , 
    profile: { profile },
    post: { posts, loading }, 
    getPostsByUser 
  }) => {
 
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (displayedProfile) {
      getPostsByUser(displayedProfile.user?._id);
    }
  }, [displayedProfile]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };


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
          return (
          <CardPost
            id={post._id}
            author={post.user}
            date={post.date}
            headline={post.headline}
            excerpt={post.text}
            postImage={post.headerimage}
            contentId={post._id}
            commentsNumber={post.comments.length}
            likesNumber={post.likes.length}
            useSavesList={profile?.lists}
          />
          )
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="profilePosts">
        <div className="filteredSearch">
          <input type="text" placeholder="Filter By Headline" value={search} onChange={updateSearch} className="form-control" />
        </div>

        <div className="posts">{postContent}</div>
     
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPostsByUser })(ProfilePosts);

// export default ProfilePosts;
