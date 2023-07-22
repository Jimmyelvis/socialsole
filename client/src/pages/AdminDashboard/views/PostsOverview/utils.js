import parse from 'html-react-parser';
import { getTimefromNow } from 'utils/formatDate';

export const getTaggedPosts = (posts) => {
  const newData = posts.reduce((total, current) => {
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

export const getMostCommentedPosts = (posts) => {

  const mostCommentedPosts = posts.sort((a, b) => b.comments.length - a.comments.length).slice(0, 5);

  return mostCommentedPosts.map((post) => {

    return (
      <li className="info-card__content-entry post-entry">
        <div className="post-img">
          <img src={post.headerimage} alt="" />
        </div>

        <div className="post-entry-info">
          <h4 className="heading-4 content-entry-title">{post.headline}</h4>
          <h4 className="heading-4 post-author">
            By {post.user?.name}
          </h4>
          <p className="info-card__content-entry-data">{post.comments.length} Comments</p>

        </div>

      </li>
    );
  });

  
}

export const getMostLikedPosts = (posts) => {

  const mostLikedPosts = posts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

  return mostLikedPosts.map((post) => {

    return (
      <li className="info-card__content-entry post-entry">
        <div className="post-img">
          <img src={post.headerimage} alt="" />
        </div>

        <div className="post-entry-info">
          <h4 className="heading-4 content-entry-title">{post.headline}</h4>
          <h4 className="heading-4 post-author">
            By {post.user?.name}
          </h4>

          <p className="info-card__content-entry-data">{post.likes.length} Likes</p>

        </div>

      </li>
    );
  });
};



export const getLatestPosts = (posts) => {

  const latestPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return latestPosts.map((post) => {

    return (
      <li className="info-card__content-entry post-entry">
        <div className="post-img">
          <img src={post.headerimage} alt="" />
        </div>

        <div className="post-entry-info">
          <h4 className="heading-4 content-entry-title">{post.headline}</h4>
          <h4 className="heading-4 post-author">
            By {post.user?.name}
          </h4>
          <p className="info-card__content-entry-data">
            {getTimefromNow(post.date)}
          </p>

        </div>

      </li>
    );
  });
};