![Markdown Logo](/githubphotos/landing-heading.jpg)

<!-- Tables -->
|      |         |
| -------- | -------------- |
| ![Markdown Logo](/githubphotos/featured-articles.jpg)| ![Markdown Logo](/githubphotos/latest-news.jpg)|
| ![Markdown Logo](/githubphotos/mostliked.jpg)| ![Markdown Logo](/githubphotos/sneaker-detail-yeezy.jpg)|
| [![](/githubphotos/login.jpg)](https://www.youtube.com/watch?v=Yop42FM6XA8)| ![Markdown Logo](/githubphotos/articles.jpg)|



# SocialSole

This is a very simple fictional social media site, built with the MERN stack based around the love of sneakers. It has a mock news section with articles, about this topic. And users can register post, and share their sneaker collection, in the community section of this site. 

## Recent Updates

There has been a slew of recent updates to this project. I added a filtering component that a user can use to filter through a list of items that is displayed on a page whether they're posts, articles, sneakers, profiles. Changed the look of some of the site, to it an overall cleaner look. Added a reuseable modal component that is used for logging in, or creating a new account. And could also be use in other areas of the site if necessary.

When a user clicks on an article, post, or sneaker listing, there will be section that displays links to items that are related to the currently loaded item. This is accomplished by using tags thats the currently loaded item has, and matching them to any item that may have any matching tag.

## Getting Started

To get started clone or download the repository. Run npm install to install the necessary dependencies, for the server side. Then CD into the client folder and repeat the same step for the client side. This project uses MongoDB for its database needs, so you can use a localized version, or signup for a free **[mlab](https://mlab.com/ "mlab")** account and store your database in the cloud. 

This project also uses the Cloudinary Widget for uploading and storage of media files, so it would necessary to sign up for free account here --> **[Cloudinary](https://cloudinary.com/users/register/free/ "Cloudinary")**. When you signup you will be given a **cloudname** which is a string. You will also need an upload present which is also a string. To get this, after you sign up and log in you will be directed to the cloudinary console page. Click on the settings icon top right. Then scroll down until you see this section referenced in the picture
below.

![alt text](/githubphotos/cloudinary-console.jpg)

After you obtain both you then want to look for the .env-sample file in the client folder. Paste both the cloudname, and upload present, then rename .env-sample to .env, then you are all set to use the Cloudinary Upload Widget.

## BUILT WITH
* Node.js
* React.js
* Express
* MongoDB
* Cloudinary

## Updates
  v-1.2
* Addded filtered search functionality for posts, profiles, and sneakers

![Markdown Logo](https://res.cloudinary.com/dwgjvssdt/image/upload/v1555621520/filter.gif)