import className from "classnames";

export const FullImageHeader = ({ 
  image, 
  children,
  overlay,
  ...rest
}) => {

  const classees = className(
    "fullimageheader",
    rest.className
  )

  return (
    <div className={classees}>
      {children}
      <div className="overlay"></div>
      <img src={image} alt="" />
    </div>
  );
};
