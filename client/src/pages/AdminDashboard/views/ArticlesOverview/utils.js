import parse from 'html-react-parser';
import { getTimefromNow } from 'utils/formatDate';

export const getTaggedArticles = (articles) => {
  const newData = articles.reduce((total, current) => {
    if (current.tags) {
      current.tags.map((tag) => {
        if (!total[tag]) {
          total[tag] = { tag, count: 1 };
        } else {
          total[tag].count++;
        }
      });
    }

    return total;
  }, []);

  const mostTags = Object.values(newData)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);


 return mostTags.map((tag) => {

    return (
      <li className="info-card__content-entry">
        <h4 className="heading-4 content-entry-title">{tag.tag}</h4>

        <h4 className="heading-4 info-card__content-entry-data">{tag.count}</h4>
      </li>
    );
  });
};

export const getMostCommentedArticles = (articles) => {

  const mostCommentedArticles = articles.sort((a, b) => b.comments.length - a.comments.length).slice(0, 5);

  return mostCommentedArticles.map((article) => {

    return (
      <li className="info-card__content-entry article-entry">
        <div className="article-img">
          <img src={article.fullheaderimage} alt="" />
        </div>

        <div className="article-entry-info">
          <h4 className="heading-4 content-entry-title">{article.headline}</h4>
          <h4 className="heading-4 article-author">
            By {article.user?.name}
          </h4>
          <p className="info-card__content-entry-data">{article.comments.length} Comments</p>

        </div>

      </li>
    );
  });

  
}

export const getMostLikedArticles = (articles) => {

  const mostLikedPosts = articles.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

  return mostLikedPosts.map((article) => {

    return (
      <li className="info-card__content-entry article-entry">
        <div className="article-img">
          <img src={article.fullheaderimage} alt="" />
        </div>

        <div className="article-entry-info">
          <h4 className="heading-4 content-entry-title">{article.headline}</h4>
          <h4 className="heading-4 article-author">
            By {article.user?.name}
          </h4>

          <p className="info-card__content-entry-data">{article.likes.length} Likes</p>

        </div>

      </li>
    );
  });
};



export const getLatestArticles = (articles) => {

  const latestPosts = articles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return latestPosts.map((article) => {

    return (
      <li className="info-card__content-entry article-entry">
        <div className="article-img">
          <img src={article.fullheaderimage} alt="" />
        </div>

        <div className="article-entry-info">
          <h4 className="heading-4 content-entry-title">{article.headline}</h4>
          <h4 className="heading-4 article-author">
            By {article.user?.name}
          </h4>
          <p className="info-card__content-entry-data">
            {getTimefromNow(article.date)}
          </p>

        </div>

      </li>
    );
  });
};