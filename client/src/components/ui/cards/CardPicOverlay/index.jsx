import React from "react";
import classNames from 'classnames';
import { useRef } from "react";
import { SaveOptions } from "components/ui/cards/components/SaveOptions";




export const CardPicOverlay = ({ children, imgBg, className, 
  contentId, profile, sneaker, index }) => {

  const parentRef = useRef();

  const classes = classNames(
    'card-OverlayType',
    index !== undefined ? `index-${index}` : '',
    className
  );

  return (
    <div className={classes} id={`${contentId}`} ref={parentRef}>

        {profile && (Object.keys(profile).length !== 0) && (
            <>
              <SaveOptions 
                useSavesList={profile.lists}
                type="sneaker"
                itemId={sneaker?._id}
                parentRef={parentRef}
              />
            </>
          )}

      <div className="card-info">{children}</div>

      <div className="overlay"></div>
      <img src={imgBg} alt="" className="card-bg" />
    </div>
  );
};