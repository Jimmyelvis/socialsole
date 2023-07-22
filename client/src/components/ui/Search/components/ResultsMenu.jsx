import React from 'react'
import { Panel } from 'components/ui/Panel';

export const ResultsMenu = ({
  results,
  searchTerm
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
          {
            searchTerm === "" ? 0 : posts?.count
          }
        </span>
      </li>
  
      <li>
        <h3 className="heading-3 label">
          Sneakers
        </h3>
  
        <span className="count">
          {
            searchTerm === "" ? 0 : sneakers?.count
          }
        </span>
      </li>
  
      <li>
        <h3 className="heading-3 label">
          Articles
        </h3>
  
        <span className="count">
          {
            searchTerm === "" ? 0 : articles?.count
          }
        </span>
      </li>
  
    </Panel>
  )
} else {
  return null;

} 

}
