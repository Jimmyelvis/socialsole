import React from "react";
import classNames from 'classnames';


export const CardPicOverlay = ({ children, imgBg, className }) => {

  const classes = classNames(
    'card-OverlayType',
    className
  );

  return (
    <div className={classes}>
      <div className="card-info">{children}</div>

      <div className="overlay"></div>
      <img src={imgBg} alt="" className="card-bg" />
    </div>
  );
};