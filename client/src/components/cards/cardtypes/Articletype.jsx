import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


export class Articletype extends Component {

  render() {
    const { article } = this.props;


    return (
      <div className="card-ver-overlay-notrans">

        <Link to={`/article/${article._id}`}>

          <img src={article.fullheaderimage} className="cardbg" alt=""/>
          <div className="overlay"></div>

          <div className="card-content">

              <h3 className="heading-3">
                {article.headline}
              </h3>

              <div className="module">
                <p  dangerouslySetInnerHTML={{ __html: article.text }}>
                </p>
              </div>
                
          </div>
        
        </Link>
        
      </div>
    )
  }
}

export default Articletype;
