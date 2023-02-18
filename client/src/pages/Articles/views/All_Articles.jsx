import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "components/ui/cards/Card";
import Spinner from "components/common/Spinner";
import { getArticles } from "actions/articleActions";

/*
  Displays a list of all the articles, each article is
  displayed in a card format, using an instance of a reusable card component
*/

const Allarticles = ({ getArticles, article }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  /*
    This function is called when an onchange event occurs when the user
    types a search parameter in the search bar component. This sets state of the search term
    which is then used by the (filteredArticles) variable to filter
    through the articles
  */
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const { articles, loading } = article;
  let articleContent;

  let filteredArticles = articles.filter((article) => {
    return article.headline.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  if (articles === null || loading) {
    /* 
        Checks to see if the article state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */
    articleContent = <Spinner />;
  } else {
    articleContent = (
      <React.Fragment>
        {filteredArticles.map((article) => {
          return <Card key={article._id} article={article} cardtype={"article"} />;
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="allarticles">

      <div className="container">
        <div className="pageheading">
          <h2 className="heading-2">Articles</h2>
          <p>News and opinions on sneakers and sneaker culture</p>
        </div>

        <div className="filteredSearch">
          <input type="text" placeholder="Filter By Headline" value={search} onChange={updateSearch} className="form-control" />
        </div>

        <div className="articleitems">{articleContent}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export const  All_Articles = connect(mapStateToProps, { getArticles })(Allarticles);
