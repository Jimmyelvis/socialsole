import React, { useEffect } from "react";

export const getRelated = (tags, actionCall, postId, items) => {
  useEffect(() => {
    actionCall(tags);
  }, [tags]);

  /*
    Before we map through the post filter out the currently loaded post 
    from the related posts state
  */
  let related = items.filter((post) => {
    return post._id !== postId._id;
  });

  return related;
};
