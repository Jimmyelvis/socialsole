import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAdmin, editFeatured } from "actions/articleActions";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { Link } from "react-router-dom";
import { Button } from "components/ui/buttons";
import { ReactComponent as CheckCircle } from 'assets/img/check-circle-v2.svg';
import { useModal } from "context/modalContext";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";




export const Other_Articles = ({ 
  profile: { profile, profiles, loading }, 
  article: { articles }, 
  auth: { user }, 
  getArticlesAdmin, editFeatured,
  choosenArticle,
  choosenArticleNumber
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
    getArticlesAdmin();
  }, []);

  /* map through articles and return articles that are not featured */
  const getOtherArticles = () => {
    const otherPosts = articles.filter((article) => article.featured < 1);

    return otherPosts.map((article) => {
      return (
        <>
        

        <CardPicOverlay className="article-card sneaker-card article-card" 
          imgBg={article.fullheaderimage} 
          contentId={article._id}
          >
             <div className="info">
              { <AuthorHeader author={article.user} />}

              <h2 className="heading-2 headline">
                <Link to={`/article/${article._id}`}>{article.headline}</Link>
              </h2>
              
            </div>


            {
                activeItem === article._id ? 
                (
                  <div className="overlay">

                    <CheckCircle className="check-circle" />

                    <h3 className="heading-3">
                      Click submit to save your changes
                    </h3>
                    
                  </div>
                ) : ( "" )
              }

            <div className="button-group">

              <Button
                onClick={() => {
                  setChanges({
                    prevPostId: choosenArticle,
                    nextPostId: article._id,
                    nextPostPosNumber: choosenArticleNumber,
                  });
                  setActiveItem(article._id);
                }}
                primary
                rounded
                className="btn btn-change"
              >
                Change
              </Button>


              {
                activeItem === article._id ? 
                (
                  <Button
                    onClick={() => {
                      editFeatured(prevPostId, nextPostId, nextPostPosNumber, "Article")
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

          </CardPicOverlay>
        
        </>


      );
    });
  };

  return (
    <div className="other-articles">

     { getOtherArticles() }
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  article: state.article,
});

export const OtherArticles = connect(mapStateToProps, {
  getArticlesAdmin, editFeatured
})(Other_Articles);
