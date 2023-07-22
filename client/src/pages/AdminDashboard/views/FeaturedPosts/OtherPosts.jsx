import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts, editFeatured } from "actions/postActions";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Button } from "components/ui/buttons";
import { ReactComponent as CheckCircle } from 'assets/img/check-circle-v2.svg';
import { useModal } from "context/modalContext";



export const Other_Posts = ({ 
  profile: { profile, profiles, loading }, 
  post: { posts }, 
  auth: { user }, 
  getPosts, editFeatured,
  choosenPost,
  choosenPosNumber
}) => {

 const {  closeModal } = useModal();


  const [newPost, setnewPost] = useState("")
  const [changes, setChanges] = useState({
    prevPostId: "",
    nextPostId: "",
    nextPostPosNumber: "",
  });

  const { prevPostId, nextPostId, nextPostPosNumber } = changes;

  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  /* map through posts and return posts that are not featured */
  const getOtherPosts = () => {
    const otherPosts = posts.filter((post) => post.featured < 1);

    return otherPosts.map((post) => {
      return (
        <div className="card-post" key={post._id}>
          <div className="top">
            <div className="card-header">
              <AuthorHeader author={post.user} date={post.date} />
            </div>

            <div className="headline">
              <h3 className="heading-3">
                <Link to={`/post/${post._id}`}>{post.headline}</Link>
              </h3>
            </div>

            <div className="post-image">
              <img src={post.headerimage} alt="post" />
            </div>
            
            {
              activeItem === post._id ? 
              (
                <div className="overlay">

                  <CheckCircle className="check-circle" />

                  <h3 className="heading-3">
                    Click submit to save your change
                  </h3>
                  
                </div>
              ) : ( "" )
            }
          </div>

          <div className="bottom">

            <div className="button-group">

                <Button
                  onClick={() => {
                    setChanges({
                      prevPostId: choosenPost,
                      nextPostId: post._id,
                      nextPostPosNumber: choosenPosNumber,
                    });
                    setActiveItem(post._id);
                  }}
                  primary
                  rounded
                  className="btn btn-change"
                >
                  Change
                </Button>


                {
                  activeItem === post._id ? 
                  (
                    <Button
                      onClick={() => {
                        editFeatured(prevPostId, nextPostId, nextPostPosNumber, "Post")
                        closeModal()
                      }}
                      rounded
                      primaryDarker
                      className="btn btn-submit"
                    >
                      Submit
                    </Button>
                  ) 
                    : 
                  ( "" )
                }
              
            </div>


            <CardFooter likesNumber={post.likes.length} commentsNumber={post.comments.length} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="other-posts">

     { getOtherPosts() }
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export const OtherPosts = connect(mapStateToProps, {
  getPosts, editFeatured
})(Other_Posts);
