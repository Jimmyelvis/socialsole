import parse from 'html-react-parser';
import { getTimefromNow } from 'utils/formatDate';

export const getTaggedSneakers = (sneakers) => {
  const newData = sneakers.reduce((total, current) => {
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

export const getMostCommentedSneakers = (sneakers) => {

  const mostCommentedSneakers = sneakers.sort((a, b) => b.comments.length - a.comments.length).slice(0, 5);

  return mostCommentedSneakers.map((sneaker) => {

    return (
      <li className="info-card__content-entry sneaker-entry">
        <div className="sneaker-img">
          <img src={sneaker.mainimage} alt="" />
        </div>

        <div className="sneaker-entry-info">
          <h4 className="heading-4 content-entry-title">{sneaker.model}</h4>
          <h4 className="heading-4 sneaker-author">
            By {sneaker.user?.name}
          </h4>
          <p className="info-card__content-entry-data">{sneaker.comments.length} Comments</p>

        </div>

      </li>
    );
  });

  
}

export const getMostLikedSneakers = (sneakers) => {

  const mostLikedPosts = sneakers.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

  return mostLikedPosts.map((sneaker) => {

    return (
      <li className="info-card__content-entry sneaker-entry">
        <div className="sneaker-img">
          <img src={sneaker.mainimage} alt="" />
        </div>

        <div className="sneaker-entry-info">
          <h4 className="heading-4 content-entry-title">{sneaker.model}</h4>
          <h4 className="heading-4 sneaker-author">
            By {sneaker.user?.name}
          </h4>

          <p className="info-card__content-entry-data">{sneaker.likes.length} Likes</p>

        </div>

      </li>
    );
  });
};



export const getLatestSneakers = (sneakers) => {

  const latestPosts = sneakers.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return latestPosts.map((sneaker) => {

    return (
      <li className="info-card__content-entry sneaker-entry">
        <div className="sneaker-img">
          <img src={sneaker.mainimage} alt="" />
        </div>

        <div className="sneaker-entry-info">
          <h4 className="heading-4 content-entry-title">{sneaker.model}</h4>
          <h4 className="heading-4 sneaker-author">
            By {sneaker.user?.name}
          </h4>
          <p className="info-card__content-entry-data">
            {getTimefromNow(sneaker.date)}
          </p>

        </div>

      </li>
    );
  });
};