![Markdown Logo](/githubphotos/2023-update/HD/Home-pg-header.jpg)

<!-- Tables -->
|      |         |
| -------- | -------------- |
| ![Markdown Logo](/githubphotos/2023-update/HD/Front-latest-news.jpg)| ![Markdown Logo](/githubphotos/2023-update/HD/Article-section.jpg)|
| ![Markdown Logo](/githubphotos/2023-update/HD/Sneaker-pg.jpg)| ![Markdown Logo](/githubphotos/2023-update/HD/Sneaker-detail.jpg)|
| ![Markdown Logo](/githubphotos/2023-update/HD/Dashboard-pg-saved-content.jpg)| ![Markdown Logo](/githubphotos/2023-update/HD/Posts-detail.jpg)|
| ![Markdown Logo](/githubphotos/2023-update/HD/Article-detail.jpg)| ![Markdown Logo](/githubphotos/2023-update/HD/Search-results.jpg)|



# SocialSole - A Sneaker Enthusiast Social Media Site

SocialSole is a fictional social media site built with the MERN stack, centered around the passion for sneakers. The site features a mock news section with articles related to sneakers, and users can register, post, and share their sneaker collections in the community section.

## I've implemented some significant updates to SocialSole. Here's what's new:

1. Complete Site Redesign: SocialSole now sports a modern and sleek design, enhancing the overall user experience.

2. Revamped Navbar Component: The Navbar has been redesigned for improved navigation and ease of use.

3. Realtime Search Overlay: Users can now perform searches in real-time through a dynamic overlay, providing quick and relevant results.

4. Redesigned Articles Section: The Articles section has been refined with a cleaner and more polished interface.

5. Enhanced User Dashboard: The user dashboard has received some significant additions:

  * Timeline: Users can now view not only their content but also posts from users they follow, keeping them up-to-date with their network's activities.

  * Centralized Comment View: All user comments are conveniently accessible in one place.

  * Liked Content Collection: Users can access all content they have liked, making it simple to revisit their favorites.

  * Custom Lists: Users can now create and manage custom lists, allowing them to save articles, posts, and sneakers for future reference.


## Getting Started

To get started clone or download the repository. Run npm install to install the necessary dependencies, for the server side. Then CD into the client folder and repeat the same step for the client side. This project uses MongoDB for its database needs, so you can use a localized version, or signup for a free **[mlab](https://mlab.com/ "mlab")** account and store your database in the cloud. 

This project also uses the Cloudinary Widget for uploading and storage of media files, so it would necessary to sign up for free account here --> **[Cloudinary](https://cloudinary.com/users/register/free/ "Cloudinary")**. When you signup you will be given a **cloudname** which is a string. You will also need an upload present which is also a string. To get this, after you sign up and log in you will be directed to the cloudinary console page. Click on the settings icon top right. Then scroll down until you see this section referenced in the picture
below.

![alt text](/githubphotos/cloudinary-console.jpg)

After you obtain both you then want to look for the .env-sample file in the client folder. Paste both the cloudname, and upload present, then rename .env-sample to .env, then you are all set to use the Cloudinary Upload Widget.

## SocialSole was built using the following technologies:
* Node.js
* React.js
* Express
* MongoDB
* Cloudinary
