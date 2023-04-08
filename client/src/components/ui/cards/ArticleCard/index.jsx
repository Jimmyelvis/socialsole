import React from 'react'
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useSaveOptions } from "context/saveOptions";
import { SaveOptions } from 'components/ui/cards/components/SaveOptions';
import parse from 'html-react-parser';


export const ArticleCard = ({
  author, headline, subheadline, excerpt, imgBg, useSavesList, contentId, saveOptions
}) => {
  return (
    <CardPicOverlay imgBg={imgBg}>
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

        <h2 className="heading-2 headline">{headline}</h2>
        <h3 className="heading-3 subheadline">{subheadline}</h3>
        <div className="excerpt">
          {
            parse(excerpt)
          }
        </div>
      </div>
    </CardPicOverlay>
  )
}
