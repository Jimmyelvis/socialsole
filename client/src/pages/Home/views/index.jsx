import React, { Component } from "react";
import { FeaturedArticles } from "../components/FeaturedArticles";
import { Latestnews } from "../components/Latestnews";
import { LatestReleases } from "../components/LatestReleases";
import { Newreleases } from "../components/Newreleases";
import Mostliked from "../components/MostLikedSneakers";
import { releases } from '../../../components/homepage/releases/firedenim';

export const Home = () => {

  const featured = [
    {
      id: "5f1372cbca2bda8fa1cc9246",
      title: "Does Resale hurt the consumer?",
      text: "An Indepth Look",
      image: "/assets/img/DCK43xpXoAQwLka.jpg",
    },
    {
      id: "5f2f63b726006e0625abe267",
      title: "Nike Unveils The PG3 With NASA Collaboration",
      text: "PG kicks off his next signature line with an out-of-this-world design.",
      image: "/assets/img/pg3.jpg",
    },
    {
      id: "5f2f683326006e0625abe26a",
      title: "Tinker Hatfield’s 19 Greatest Footwear Design",
      text: "What are your thoughts?.",
      image: "/assets/img/tinker.jpg",
    },
  ];

  const latest = [
    {
      id: "5f2f6d8e387b1f0f45e85ba9",
      title: "The Blue Games",
      subheadline: "Coming Soon",
      image: "https://res.cloudinary.com/dwgjvssdt/image/upload/v1594519720/pjoplwocrkoantv5lr2l.jpg",
      likes: 32,
      comments: 12,
    },
    {
      id: "5f30281d387b1f0f45e85baf",
      title: "Off White Air Jordan 4",
      subheadline: "Sub Headline",
      image: "https://res.cloudinary.com/dwgjvssdt/image/upload/v1596907074/vv3slidkvmbq6gwfbq88.webp",
      likes: 16,
      comments: 4,
    },
    {
      id: "5f2f6e71387b1f0f45e85baa",
      title: " This can make your white sneakers look brand new?",
      subheadline: "How to clean your white sneakers",
      image: "https://res.cloudinary.com/dwgjvssdt/image/upload/v1592100776/iararriz9asvzdjz8bqh.jpg",
      likes: 8,
      comments: 2,
    },
    {
      id: "5f2f6f0b387b1f0f45e85bab",
      title: "Grateful Dead, Nike team up on psychedelic sneakers",
      subheadline: "The Grateful Dead and Nike are teaming up.",
      image: "https://sneakernews.com/wp-content/uploads/2022/05/jordan-6-red-oreo-release-date-7.jpg",
      likes: 4,
      comments: 1,
    },
    {
      id: "5f302a70387b1f0f45e85bb0",
      title: "How do you wear your sneakers?",
      subheadline: "What are your thoughts?.",
      image: "https://images.unsplash.com/photo-1561909848-977d0617f275?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      likes: 2,
      comments: 4,
    }
  ];

  const releases = [
    {
      id: "5f2f6d8e387b1f0f45e85ba9",
      sneaker: "Nike Terminator High Noble Green",
      price: "$100",
      date: "01/26/2023",
      sizerun: "Mens",
      colors: ["Green", "White", "Black"],
      imgBg: "https://sneakernews.com/wp-content/uploads/2022/10/nike-terminator-high-noble-green-FD0650-100-6.jpg",
    },
    {
      id: "5f30281d387b1f0f45e85baf",
      sneaker: "The Next New Balance 990",
      price: "$100",
      date: "01/26/2023",
      sizerun: "Mens",
      colors: ["Swan", "Green", "Sail"],
      imgBg: "https://sneakernews.com/wp-content/uploads/2023/01/new-balance-990-made-in-usa-tan-green-m990tg1-4.jpg",
    },
    {
      id: "5f2f6e71387b1f0f45e85baa",
      sneaker: "Air Jordan 5 “Aqua”",
      price: "$190",
      date: "01/26/2023",
      sizerun: "Mens",
      colors: ["Aqua", "Black", "Gold"],
      imgBg: "https://editor.urbanlinx.net/wp-content/uploads/2022/12/air-jordan-5-black-aquatone-taxi-dd0587-047.webp?w=1024",
    },
    {
      id: "5f2f6e71387b1f0f45edvdsvs8",
      sneaker: "Air Jordan 1 Laney",
      price: "$190",
      date: "01/26/2023",
      sizerun: "Mens",
      colors: ["Blue", "Yellow", "Red"],
      imgBg: "https://pbs.twimg.com/media/FpBRJiQXgAEjOI8.jpg",
    },
  ]



  return (
    <React.Fragment>
      <div className="header header-landing">
        <div className="heading">
          <h1 className="heading-1">Social Sole</h1>
          <p>Welcome to Social Sole. A exciting site where you can read about the latest news concerning, sneakers. And post about and share your sneaker collection.</p>
        </div>

        <div className="overlay"></div>
      </div>

      <div className="container container-home">
        {/* After you initially clone this project from github, the links in the <FeaturedArticles />,
        <Latestnews /> components will not work because they will be referencing articles in MY database
        What can simply do is create some articles, and which ever ones you want to feature the components, 
        you can edit the entries in there to match the articles you created. */}

        <FeaturedArticles articles={featured} />
        <Latestnews articles={latest} />
        <Newreleases releases={releases} />
      </div>
    </React.Fragment>
  );
};
