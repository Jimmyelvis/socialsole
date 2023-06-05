import React from 'react'
import { Panel } from 'components/ui/Panel';

export const ResultsMenu = ({
  results
}) => {

if (results) {
  const { posts, sneakers, articles } = results;


  return (
    <Panel className="results-menuBar">
  
      <li>
        <h3 className="heading-3 label">
          Posts
        </h3>
  
        <span className="count">
          {posts?.count ? posts.count : 0}
        </span>
      </li>
  
      <li>
        <h3 className="heading-3 label">
          Sneakers
        </h3>
  
        <span className="count">
          {sneakers?.count}
        </span>
      </li>
  
      <li>
        <h3 className="heading-3 label">
          Articles
        </h3>
  
        <span className="count">
          {articles?.count}
        </span>
      </li>
  
    </Panel>
  )
} else {
  return null;

} 

}
