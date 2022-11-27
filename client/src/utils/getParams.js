import React, { useState, useEffect } from "react";

/**
 * A custom utility function that can be used to get the match.id.params
 * of a currently loaded article/post/sneaker detail. These will have
 * a related items component ie.. related posts that will use this state
 * to make an API call to get related content.
 */

export const getParams = (params, action, getCurrentProfile) => {
  /**
   * State for storing the match.params.id of the current post
   */
  const [state, setState] = useState(null);

  useEffect(() => {
    action(params);
    getCurrentProfile();
    setState(params);
  }, []);

  useEffect(() => {
    if (state !== params) {
      action(params);
      setState(params);
    }
  }, [params]);

};
