import React, { Component } from "react";
import { FeaturedArticles } from "../components/FeaturedArticles";
import { Latestnews } from "../components/Latestnews";
import { LatestReleases } from "../components/LatestReleases";
import Mostliked from "../components/MostLikedSneakers";


const HomeView = () => {
  
   return (
     <React.Fragment>
       <div className="header header-landing">

         <div className="heading">
           <h1 className="heading-1">SOCIAL SOLE</h1>
           <p>Welcome to Social Sole. A exciting site where you can read about the latest news concerning, sneakers. And post about and share your sneaker collection.</p>
         </div>
       </div>

       <div className="container container-home">
         {/* After you initially clone this project from github, the links in the <FeaturedArticles />,
        <Latestnews /> components will not work because they will be referencing articles in MY database
        What can simply do is create some articles, and which ever ones you want to feature the components, 
        you can edit the entries in there to match the articles you created. */}

         <FeaturedArticles />
         <Latestnews />
         <LatestReleases />
         <Mostliked />
       </div>
     </React.Fragment>
   );
};


export default HomeView;