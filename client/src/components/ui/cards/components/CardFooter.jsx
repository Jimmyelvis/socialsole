import React from 'react'
import thumbsUp from "assets/img/thumbsup.svg";
import comment from "assets/img/comments-icon.svg";
import "./cardfooter-styles.scss";
import { FaThumbsUp, FaComments } from "react-icons/fa";



export const CardFooter = ({ likesNumber, commentsNumber, dark}) => {
  return (
    <ul className="card-footer">
      <li className="item likes">
        <FaThumbsUp className={`${dark ? "icon-white" : "icon-blue"} likes-icon`} />

        <span className={`total ${dark ? "total-gold" : "total-midnight-blue"} likes-number`}>{likesNumber}</span>
      </li>

      <li className="item comments">
        <FaComments className={`${dark ? "icon-white" : "icon-blue"} comments-icon`} />
        <span className={`total ${dark ? "total-gold" : "total-midnight-blue"} comments-number `}>{commentsNumber}</span>
      </li>
    </ul>
  );
}
