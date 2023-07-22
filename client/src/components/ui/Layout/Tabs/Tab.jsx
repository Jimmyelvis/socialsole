import classNames from "classnames";

export const Tab = ({ label, onClick, activeTab }) => {
  const classes = classNames("tab-list-item", {
    "tab-list-active": activeTab === label,
  });


  return (
    <li className={classes} onClick={() => onClick(label)}>
      {label}
    </li>
  );
};