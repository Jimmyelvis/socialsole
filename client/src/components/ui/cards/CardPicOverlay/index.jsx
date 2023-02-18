import React from "react";

export const CardPicOverlay = ({ children, imgBg }) => {
  return (
    <div className="card-OverlayType">
      <div className="card-info">{children}</div>

      <div className="overlay"></div>
      <img src={imgBg} alt="" className="card-bg" />
    </div>
  );
};