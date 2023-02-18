import className from "classnames";
import { Avatar } from "components/ui/avatar";

export const AuthorHeader = ({ author, date }) => {

  const classes = className(
    "author-header", 
    {
      "author-header--with-date": date,
    }
  );


  return (
    <div className={classes}>
      <Avatar avatar={author && author.image} />

      <h3 className="heading-3 author-name">{author && author.name}</h3>
      {date && <span className="post-date">{date}</span>}
    
    </div>
  );
};
