import React, { useState } from "react";
import { Tab } from "./Tab";
import { Panel } from "components/ui/Panel";

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="tabs">
      <Panel className="tab-list results-menuBar">
        {children.map((child) => {
          const { label } = child.props;

          /*
            When the overlay is first rendered, the child.props.children[0] is undefined, there is just the count variable, meaning no children array yet.
            Only after a query is made, and the results are returned, then we will get an array of children, and the count variable will be the first element in the array.
          */
          let count

          child.props.children[0] === undefined ? count = 0 :
          count = child.props.children[0]


          return (
            <Tab
              key={label}
              label={label}
              activeTab={activeTab}
              onClick={onClickTabItem}
              count={count}
            />
          );
        })}
      </Panel>


      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children[1];
        })}
      </div>
    </div>
  );
};

