import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { SaveOptions } from "../components/SaveOptions";
import { useState, useEffect } from "react";
import { useSaveOptions } from "context/saveOptions";

export const CardPost = ({ author, date, headline, excerpt, likesNumber, commentsNumber, postImage, useSavesList, contentId }) => {
  const { openMenu } = useSaveOptions();

  /**
   * We need to get most parent element of the card to send to the saveOptions context, via the openMenu function. This will alow us to determine which card the save menu is being opened from.
   */

  return (
    <div className="card-post" id={`${contentId} "parent"`}>
      <SaveOptions useSavesList={useSavesList}  />

      <div className="top">
        <div className="card-header">
          <AuthorHeader author={author} date={date} />

          <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" id={contentId} onClick={(e) => openMenu(e.currentTarget.parentElement.parentElement.parentElement.id)} />
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
