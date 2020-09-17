import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";
import PropTypes from "prop-types";


const Icon = props => {
  const { color, size, icon, className } = props;
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Icon.defaultProps = {
  className: "",
  color: "",
  size: "100%"
};

export default Icon;