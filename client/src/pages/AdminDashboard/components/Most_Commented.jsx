import React, { useState, useEffect } from "react";
import { list } from "../../actions/comments";
import Link from "next/link";


const Most_Commented = () => {
  const [comments, setComments] = useState([]);

  const loadComments = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComments(data);
      }
    });
  };

  const getMostCommented = () => {
    /**
     * Reduce the comments array to an object with the comment id as the key and the number of comments as the value
     */

    const newData = comments.reduce((total, current) => {
      if (current.post) {
        const { _id } = current.post;

        if (!total[_id]) {
          total[_id] = { ...current.post, count: 1 };
        } else {
          total[_id].count++;
        }
      }

      return total;
    }, []);

    /**
     * Convert the object to an array then sort it by the count
     */
    const mostCommented = Object.values(newData)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);



    return mostCommented.map((entry, index) => (
      <div key={index} className="article_entry">
        <img src={entry.mainphoto} alt="" className="mainphoto" />

        <Link href={`/blogs/${entry.slug}`}>
          <a>
            <div className="article_info">
              <h4 className="admin_heading-4 title">{entry.title}</h4>
              <h5 className="admin_headling-5 subtitle">{entry.subtitle}</h5>
              <h5 className="admin_headling-5 author">{entry.postedBy && entry.postedBy.name}</h5>
            </div>
          </a>
        </Link>

        <div className="date">
          <span className="count">{entry.count}</span>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="card most_commented">
      <h3 className="admin_heading-3 index_card_heading">Most Commented Articles</h3>

      <div className="article_entries">{getMostCommented()}</div>

      <div className="admin_heading-3 view_all">
        <Link href="/admin/crud/blogs">
          <a>View All</a>
        </Link>
      </div>
    </div>
  );
};

export default Most_Commented;
