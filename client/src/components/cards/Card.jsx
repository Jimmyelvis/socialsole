import React, { Component } from "react";
import Posttype from "./cardtypes/Posttype"
import Profiletype from "./cardtypes/Profiletype"
import Sneakertype from "./cardtypes/Sneakertype"
import Articletype from "./cardtypes/Articletype"

/*
  Card component for when a page needs to display a list of mapped 
  thorough items on a page. Such as a lists of posts, sneakers, 
  articles etc. What's passed into this component is a key, usually the ID,
  the mapped through item, and the card type. 
*/

export class card extends Component {

  render() {
    let cardContent;
    const { cardtype, post, profile, sneaker, article } = this.props;

      switch (cardtype) {
        case "post":
          cardContent = <Posttype key={post._id} post={post} />;
          break;
        case "sneaker":
          cardContent = <Sneakertype key={sneaker._id} sneaker={sneaker} />
          break;
        case "article":
          cardContent = <Articletype key={article._id} article={article} />
          break;
        default:
          cardContent = <Profiletype key={profile._id} profile={profile} />;
          break;
      }

    return <React.Fragment>{cardContent}</React.Fragment>;
  }
}

export default card;
