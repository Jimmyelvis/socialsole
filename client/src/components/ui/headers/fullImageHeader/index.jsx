import className from "classnames";

export const FullImageHeader = ({ image, ...rest }) => {

  const classees = className(
    "fullimageheader",
    rest.className
  )

  return (
    <div className={classees}>
      <img src={image} alt="" />
    </div>
  );
};
