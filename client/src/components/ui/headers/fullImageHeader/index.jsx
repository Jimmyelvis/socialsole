import className from "classnames";

export const FullImageHeader = ({ 
  image, 
  children,
  ...rest
}) => {

  const classees = className(
    "fullimageheader",
    rest.className
  )

  return (
    <div className={classees}>
      {children}
      <img src={image} alt="" />
    </div>
  );
};
