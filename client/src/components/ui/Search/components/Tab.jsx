import classNames from "classnames";

export const Tab = ({ label, onClick, activeTab, count }) => {
  const classes = classNames("tab-list-item", {
    "tab-list-active": activeTab === label,
  });

  return (
    <li className={classes} onClick={() => onClick(label)}>
      <h3 className="heading-3 label">
          {label}
      </h3>

        <span className="count">
         {count}
        </span>
    
    </li>
  );
};