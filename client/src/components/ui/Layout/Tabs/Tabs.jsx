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
      <Panel className="tab-list">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              key={label}
              label={label}
              activeTab={activeTab}
              onClick={onClickTabItem}
            />
          );
        })}
      </Panel>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

