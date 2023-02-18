/*
  A reuseable Text field group component that can be used across the application
*/

import className from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChangeFunction,
  disabled,
  icon,
  iconClassname,
  iconClickFunction,
  iconPosition,
  ...rest
}) => {

  const formClasses = className(
    'form-control',
    {},
  )

  const iconClasses = className(
    'inputField-icon',
    {
      'inputField-icon-right': iconPosition === 'right',
    },
  )

  if (icon) {
    return (
    <div className="field-group-with-icon">
      <img
        src={icon}
        alt=""
        className={iconClasses}
        onClick={iconClickFunction}
      />

      <input
        type={type}
        className={formClasses}
        value={value}
        onChange={onChangeFunction}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
    );
  } 
  
  else {
    return (
      <div className="field-group">
        <input
          type={type}
          className={formClasses}
          value={value}
          onChange={onChangeFunction}
          placeholder={placeholder}
          disabled={disabled}
      />
      </div>
    );
  }
  
  
};



TextFieldGroup.defaultProps = {
  type: 'text',
  iconPosition: 'left'
};


export default TextFieldGroup;
