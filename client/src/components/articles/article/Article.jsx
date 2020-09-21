import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../../../components/layout/Navbar";
import { getCurrentArticle } from "../../../actions/articleActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import ArticleItem from "./ArticleItem";

/*
  This component is for displaying the overall Article detail page. This also
  contains sub components that are responsible for different areas of
  the page. <PostDetail /> component which is responsible for displaying
  the details of a post such as the headerimage, the title, the author
  details, text body.

  <CommentFeed /> which maps through the comments that are attached to this post and 
  displays them.

  <CommentForm /> which is responsible for displaying and implementing the form
  for posting comments.
*/


export class Article extends Component {

  state = {
    currentArticle: null,
  };


  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCurrentArticle(this.props.match.params.id);
    }

    this.props.getCurrentProfile();

    this.setState({
      currentArticle: this.props.match.params.id,
    });

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== this.state.currentArticle) {
      this.props.getCurrentArticle(this.props.match.params.id);

      this.setState({
        currentArticle: this.props.match.params.id,
      });
    }
  }



  render() {

    const { article, loading, msg } = this.props.article;
    const { profile } = this.props.profile;
    const { user } = this.props.auth;
    let articleContent;

   
    if(article === null || loading || Object.keys(article).length === 0){
      articleContent  = <Spinner />
    } 
    
    else if (user === null || Object.keys(user).length === 0){
      articleContent = (
        <React.Fragment>
          
          <ArticleItem article={article} />

          <div className="container">

            {
              article.comments.length > 0 ? 
              <div className="commentsarea contentbody">
                <CommentFeed articleId={article._id} comments={article.comments} />
              </div>

              : <div className="marginspace"></div>
            }

          </div>

        </React.Fragment>
      )
    }
    
    else {

      if (profile === null || Object.keys(profile).length === 0) {
        articleContent = (

          <React.Fragment>
            
            <ArticleItem article={article} />

            <div className="container">

              {
                article.comments.length > 0 ? 
                <div className="commentsarea contentbody">
                  <CommentFeed articleId={article._id} comments={article.comments} />
                </div>

                : <div className="marginspace"></div>
              }
              
            </div>
       
  
          </React.Fragment>
        );
        
      } else {
     
        articleContent = (

          <React.Fragment>
            
            <ArticleItem article={article} />

            <div className="container">

              <div className="commentsarea contentbody">           
                <CommentForm articleId={article._id} handle={profile.handle}  />
                <CommentFeed articleId={article._id}  comments={article.comments}  />
              </div>

            </div>
       
  
          </React.Fragment>
        );
      }
      

    }


    return (
      <div className="newsItem">
        <Navbar />

        {articleContent}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentArticle, getCurrentProfile }
)(Article);
