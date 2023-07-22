import React from 'react'
import { Tabs } from './Tabs';
import { CardPost } from 'components/ui/cards/CardPost';
import { SneakerCard } from 'components/ui/cards/SneakerCard';
import { CardPicOverlay } from 'components/ui/cards/CardPicOverlay';
import { AuthorHeader } from 'components/ui/headers/authorHeader';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';


export const RenderResults = ({
  results,
  searchTerm,
  loading,
  profile,
  closeAndClear
}) => {

  const renderResults = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (results && results.length === 0) {

      {
        console.log({
          "results": results,
          "results.length": results.length
        });
      }

      let count = 0;


      return (
        
        <Tabs>
          <div label="Posts">
          { count }

          </div>

          <div label="Sneakers">
          { count }

          </div>

          <div label="Articles">
          { count }

          </div>
        </Tabs>
      );
    }

    if (results) {

      const { posts, sneakers, articles } = results;

      let count;


      return (
        <Tabs>
          <div label="Posts">
            {searchTerm === "" ? (count = 0) : (count = posts?.count)}

            {searchTerm === ""
              ? ""
              : results.posts.posts.map((post) => {
                  return (
                    <CardPost
                      key={post._id}
                      headline={post.headline}
                      postImage={post.headerimage}
                      likesNumber={post.likes.length}
                      commentsNumber={post.comments.length}
                      author={post.user}
                      excerpt={post.text}
                      date={post.date}
                      id={post._id}
                      contentId={post._id}
                      useSavesList={profile?.lists}
                      closeAndClear={closeAndClear}
                    />
                  );
                })}
          </div>

          <div label="Sneakers">
            {searchTerm === "" ? (count = 0) : (count = sneakers?.count)}

            {
              searchTerm === "" ? "" : results.sneakers.sneakers.map((sneaker) => {
                return (
                  <SneakerCard
                    key={sneaker._id}
                    id={sneaker._id}
                    author={sneaker.user}
                    model={sneaker.model}
                    colorway={sneaker.colorway}
                    imgBg={sneaker.mainimage}
                    year={sneaker.year}
                    contentId={sneaker._id}
                    profile={profile}
                    closeAndClear={closeAndClear}
                  />
                );
              } )
            }
          </div>

          <div label="Articles">
            {searchTerm === "" ? (count = 0) : (count = articles?.count)}

            {
              searchTerm === "" ? "" : results.articles.articles.map((article) => {
                return (
                  <CardPicOverlay 
                    key={article._id}
                    imgBg={article.fullheaderimage}
                    className="article-card"
                  >

                    <AuthorHeader
                      author={article.user}
                      date={article.date}
                    />

                    <h3 
                      className="heading-3 article-title"
                      onClick={closeAndClear}
                    >
                      <Link to={`/article/${article._id}`}>
                        {article.headline}
                      </Link>
                    </h3>

                    <div className="article-excerpt">{parse(article.text)}</div>

                  </CardPicOverlay>
                );
              })
            }
          </div>
        </Tabs>
      );
    }

    return null;
  };



  return (
    <div className='render-results'>
      { renderResults()}
    </div>
  )
}
