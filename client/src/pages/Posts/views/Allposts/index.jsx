import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "components/ui/cards/Card";
import Spinner from "components/common/Spinner";
import { getPosts } from "actions/postActions";
import { All } from "./views/All";
import { Trending } from "./views/Trending";
import { Panel } from "components/ui/Panel";


const Posts = ({ post, getPosts, 
  profile: { profile, loading }
}) => {

  const [view, setView] = useState("All");  
 

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  

   return (
     <div className="communityposts">

       <div className="container">

          <Panel className="tabs">

              <li className="tab">
                <h3 className="heading-3"
                  onClick={() => setView("All")}
                >
                  All  Posts
                </h3>
              </li>

              <li className="tab">
                <h3 className="heading-3"
                  onClick={() => setView("Trending")}
                >
                  Trends
                </h3>
              </li>

          </Panel>

          {
            view === "All" ? (
              <All
                post={post}
                profile={profile}
              />
            ) : (
              <Trending
                post={post}
                profile={profile}
              />
            )
          }
     
       </div>
     </div>
   );
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});


export const Allposts = connect(mapStateToProps, { getPosts })(Posts)
