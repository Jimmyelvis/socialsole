import React from "react";
import { Link } from "react-router-dom";
import { TimelineCard } from "../../TimeLine/components/TimelineCard";
import { SavedItemsCard } from "./SavedItemsCard";

export const ListView = ({ listItems }) => {
  return (
    <div className="list-items">
      {
         listItems.map((item) => {
          return (
            <SavedItemsCard
              key={item._id}
              model={item.model}
              colorway={item.colorway}
              year={item.year}
              text={item.text}
              headerimage={item.headerimage}
              mainimage={item.mainimage}
              type={item.itemType}
              fullheaderimage={item.fullheaderimage}
              user={item.user}
              headline={item.headline}
              date={item.date}
            />
          );
        })
      }
    </div>
  )
};
