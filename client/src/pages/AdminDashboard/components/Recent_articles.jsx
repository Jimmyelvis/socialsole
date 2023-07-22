import React, { useState, useEffect} from 'react'
import Link from "next/link";
import { list } from '../../actions/blog';
import moment from 'moment';

const Recent_articles = () => {

  const [blogs, setBlogs] = useState([]);

  const loadBlogs = () => {

    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data.slice(0, 3));
    
      }
    });

  };

  useEffect(() => { 
    loadBlogs() 
  }, []);

  const getTheMonth = (date) => {
    
    date = moment(date).format("MMM");
    return (
      date
    )
  }

  const getTheDay = (date) => {
    date = moment(date).format("DD");
    return date;
  };

  return (
    <div className="card recent_articles">
      <h3 className="admin_heading-3 index_card_heading">Recent Articles</h3>

      <div className="article_entries">

        {blogs.map((blog, index) => (
            <div key={index} className="article_entry">
              <img src={blog.mainphoto} alt="" className="mainphoto" />

              <Link href={`/blogs/${blog.slug}`}>
                <a>
                  <div className="article_info">
                    <h4 className="admin_heading-4 title">{blog.title}</h4>
                    <h5 className="admin_headling-5 subtitle">{blog.subtitle}</h5>
                    <h5 className="admin_headling-5 author">{blog.postedBy && blog.postedBy.name}</h5>
                  </div>
                </a>
              </Link>

              <div className="date">
                <span className="month">{getTheMonth(blog.createdAt)}</span>
                <span className="day">{getTheDay(blog.createdAt)}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="admin_heading-3 view_all">
        <Link href="/admin/crud/blogs">
          <a>View All</a>
        </Link>
      </div>
    </div>
  );
  
}

export default Recent_articles