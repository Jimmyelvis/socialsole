import React, { useState, useEffect } from 'react'
import { CardPost } from "components/ui/cards/CardPost";
import Spinner from "components/common/Spinner";
import useFadeIn from "hooks/useFadin";



export const All = ({
  post: { posts, loading },
  profile
}) => {

  const [search, setSearch] = useState("");
  const [style, isVisible , setIsVisible] = useFadeIn(2000);

 
    useEffect(() => {
      setIsVisible(true);

    console.log("useEffect");
    }, []);


  /*
   This function is called when an onchange event occurs when the user
   types a search parameter in the search bar component. This sets state of the search term
   which is then used by the (filteredPosts) variable to filter
   through the posts
 */

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  // const { posts, loading } = post;
  let postContent;

  if (posts) {
    let filteredPosts = posts.filter((post) => {
      return post.headline.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    
    if (posts === null || loading) {
      /* 
       Checks to see if the post state is null, if so then a loading spinner
       is displayed, this helps undefined error on first render
     */
      postContent = <Spinner />;
    } else {
      postContent = (
        <React.Fragment>
          {filteredPosts.map((post) => {
            return( 
            <CardPost 
               key={post._id}
               id={post._id}
               contentId={post._id}
               author={post.user}
               date={post.date}
               headline={post.headline}
               excerpt={post.text}
               likesNumber={post.likes.length}
               commentsNumber={post.comments.length}
               postImage={post.headerimage}
               useSavesList={profile && profile.lists}
             />
            );
          })}
        </React.Fragment>
      );
    }

  }




  return (
    
        <div className="all-posts" style={style}>
          <div className="pageheading">
            <h2 className="heading-2">Posts From The Community</h2>
            <p>All the posts from our community</p>
          </div>

          <div className="filteredSearch">
            <input type="text" placeholder="Filter By Headline" value={search} onChange={updateSearch} className="form-control" />
          </div>

          <div className="posts">{postContent}</div>
        </div>
      
        
  )
}

