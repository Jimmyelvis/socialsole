import className from 'classnames';
import { Link } from 'react-router-dom';
import { PiSneakerFill } from 'react-icons/pi';
import { BsFilePost } from 'react-icons/bs';
import { PiArticleMediumBold } from 'react-icons/pi';
import { ImUsers } from 'react-icons/im';
import card from '../../../../components/ui/cards/Card';


export const SmallDataCard = ({
  title,
  data,
  type,
  link,
  ...rest
}) => {

  const classes = className(
    'small-data',
    {
      'users-bg': type === 'users',
      'posts-bg': type === 'posts',
      'articles-bg': type === 'articles',
      'sneakers-bg': type === 'sneakers',
    },
    rest.className
  );

  const getIcon = () => {
    switch (type) {
      case "users":
        return (
          <div className="small-card-icon">
            <ImUsers className="icon icon-users" />
          </div>
        );
      case "posts":
        return (
          <div className="small-card-icon">
            <BsFilePost className="icon icon-posts" />
          </div>
        );
      case "articles":
        return (
          <div className="small-card-icon">
            <PiArticleMediumBold className="icon icon-articles" />
          </div>
        );
      case "sneakers":
        return (
          <div className="small-card-icon">
            <PiSneakerFill className="icon icon-sneakers" />
          </div>
        );
      default:
        return (
          <div className="small-card-icon">
            <ImUsers className="icon icon-users" />
          </div>
        );
    }
  };

   const getLinks = () => {
    
    switch (type) {
      case 'users':
        return <Link to="/admin/users">View All Users</Link>
      case 'posts':
        return <Link to="/admin/posts">View All Posts</Link>
      case 'articles':
        return <Link to="/admin/articles">View All Articles</Link>
      case 'sneakers':
        return <Link to="/admin/sneakers">View All Sneakers</Link>
      default:
        return <Link to="/admin/users">View All Users</Link>
   }

  }


  return (
    <div className={classes}>

      <div className="elem-data">

        <h3 className="heading-3">
          {title}
        </h3>

        <p className="data">
          {data}
        </p>

      </div>

      <div className="elem-icon">
        {getIcon()}
      </div>

      <div className="elem-link">
        {getLinks()}

      </div>


    </div>
  )
}
