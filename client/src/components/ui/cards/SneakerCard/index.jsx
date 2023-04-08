import React from 'react'
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useSaveOptions } from "context/saveOptions";
import { SaveOptions } from 'components/ui/cards/components/SaveOptions';

export const SneakerCard = (
  { author, model, colorway, year,
     imgBg, useSavesList, contentId, saveOptions }
  ) => {
  const { openMenu } = useSaveOptions();

  /**
   * We need to get most parent element of the card to send to the saveOptions context, via the openMenu function. This will alow us to determine which card the save menu is being opened from.
   */

  return (
    <CardPicOverlay imgBg={imgBg} className={"sneaker-card"}>
      <div className="info" id={`${contentId} "parent"`}>

        {
          author && (
            <AuthorHeader author={author} />
          )
        }
        {
          saveOptions && (
          <>
            <SaveOptions useSavesList={useSavesList} />

            <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" id={contentId} onClick={(e) => openMenu(e.currentTarget.parentElement.id)} />
          </>
          )
        }

        <h2 className="heading-2 model">{model}</h2>
        <h3 className="heading-3 colorway">{colorway}</h3>
        <h4 className="heading-4 year">{year}</h4>
      </div>
    </CardPicOverlay>
  );
};

/**default props */
SneakerCard.defaultProps = {
  author: true
}
