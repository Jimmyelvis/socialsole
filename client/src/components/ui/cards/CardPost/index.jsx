import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { SaveOptions } from "../components/SaveOptions";
import { useState, useEffect } from "react";



import { BsFillHeartFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Scrollbars } from "react-custom-scrollbars-2";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import Createicon from "assets/img/create-list.svg";
import { ImCheckmark } from "react-icons/im";
import { AiTwotoneDelete } from "react-icons/ai";

/**
 * We need to figure out how to pass the openMenu function to the parent component.
 * We may need to use the Context API to pass the function to the parent component.
 * We may also need to use the Redux store to pass the function to the parent component.
 */


export const CardPost = ({ author, date, headline, excerpt, likesNumber, commentsNumber, postImage, useSavesList  }) => {

  /* Determine whether the save menu list is open or closed */
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div className="card-post">
      <SaveOptions useSavesList={useSavesList} menuOpen={menuOpen} />

      <div className="top">
        <div className="card-header">
          <AuthorHeader author={author} date={date} />
          <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" onClick={() => openMenu()} />
        </div>

        <div className="headline">
          <h3 className="heading-3">{headline}</h3>
        </div>

        <div className="post-image">
          <img src={postImage} alt="post" />
        </div>
      </div>

      <div className="bottom">
        <p className="excerpt">{excerpt}</p>

        <CardFooter likesNumber={likesNumber} commentsNumber={commentsNumber} />
      </div>
    </div>
  );
};
