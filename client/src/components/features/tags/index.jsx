import React from 'react'
import Icon from "components/icons/Icon";


export const Tags = ({ element }) => {

  const tags = element.tags.map((tag, index) => <li key={index}>{tag}</li>);

  return (
    <div className="tags">
      <ul> 
      <Icon icon="price-tags" className="tagicon" />
        {tags} 
      </ul>
    </div>
  );
}
