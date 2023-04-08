import React, { useState, useEffect } from "react";

const useFadeIn = (duration) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout;
 
    return () => clearTimeout(timeout);
  }, [isVisible, duration]);

  const style = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out`,
    height: isVisible ? "auto" : 0,
    // overflowY: "hidden",
  };

  return [style, isVisible, setIsVisible];
};

export default useFadeIn;
