import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { SaveOptions } from "../components/SaveOptions";
import { useRef } from "react";
import { useSaveOptions } from "context/saveOptions";
import parse from 'html-react-parser';
 import { Link } from "react-router-dom";


export const CardPost = ({ id, author, date, headline, excerpt, likesNumber, commentsNumber, postImage, useSavesList, contentId, closeAndClear }) => {
  const { openMenu } = useSaveOptions();

  const parentRef = useRef();

  /**
   * We need to get most parent element of the card to send to the saveOptions context, via the openMenu function. This will alow us to determine which card the save menu is being opened from. We also need to make sure we get the contentID prop which should be the id of the post.
   */

  return (
    <div className="card-post" id={`${contentId} "parent"`} 
      ref={parentRef}
    >

      {
        useSavesList && (
          <>
            <SaveOptions 
              useSavesList={useSavesList}
              type="post"
              itemId={id}
              parentRef={parentRef}
            />
          </>
        )
      }

      <div className="top">
        <div className="card-header">
          <AuthorHeader author={author} date={date} />

          {
            useSavesList && (
              <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" id={contentId} onClick={(e) => openMenu(e.currentTarget.parentElement.parentElement.parentElement.id)} />
            )
          }
        
        </div>

        <div className="headline">
          <h3 className="heading-3" onClick={closeAndClear}>
            <Link to={`/post/${id}`}>
              {headline}
            </Link>
          </h3>
        </div>

        <div className="post-image">
          <img src={postImage} alt="post" />
        </div>
      </div>

      <div className="bottom">
        <div className="excerpt">
          {
            excerpt && parse(excerpt)
          }
        </div>

        <CardFooter likesNumber={likesNumber} commentsNumber={commentsNumber} />
      </div>
    </div>
  );
};
