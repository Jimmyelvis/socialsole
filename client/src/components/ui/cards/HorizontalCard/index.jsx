import React from "react";
import { Panel } from "components/ui/Panel";
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

export const HorizontalCard = ({
  imgBg, headline, excerpt, contentId, index, label
}) => {
  return (
    <Panel className="h-card">

      <div className="content">

        <div className="left">
          <img src={imgBg} alt="" />
        </div>

        <div className="right">
          <h3 className="heading-3 headline">{headline}</h3>
          <div className="text">
          {parse(excerpt)}
          </div>

          <p className="readmore">
            <Link to={`/article/${contentId}`}>
              Read More
            </Link>
          </p>
        </div>

      </div>



    </Panel>
  );
};
