import React, { Component, Fragment } from "react";

// export const Widgetsetting = () => ({
  
//     cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
//     uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOADPRESENT,
//     sources: [
//       "local",
//       "url",
//       "camera",
//       "facebook",
//       "instagram",
//       "image_search",
//     ],
//     googleApiKey: "AIzaSyBR3OvQAh9PWHiNq4dQbQ096pqt2Pq1x_4",
//     showAdvancedOptions: true,
//     cropping: true,
//     multiple: false,
//     defaultSource: "local",
//     styles: {
//       palette: {
//         window: "#0265ba",
//         sourceBg: "#FFFFFF",
//         windowBorder: "#0265ba",
//         tabIcon: "#FFFFFF",
//         inactiveTabIcon: "#3ba5f7",
//         menuIcons: "#034398",
//         link: "#5BA6E6",
//         action: "#5333FF",
//         inProgress: "#5BA6E6",
//         complete: "#048A53",
//         error: "#cc3333",
//         textDark: "#034398",
//         textLight: "#ffffff",
//       },
//       fonts: {
//         default: null,
//         "'Poppins', sans-serif": {
//           url: "https://fonts.googleapis.com/css?family=Poppins",
//           active: true,
//         },
//       },
//     },
  
  
// });


export const Widgetsetting = () => {

  return {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
    uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOADPRESENT,
    sources: [
      "local",
      "url",
      "camera",
      "facebook",
      "instagram",
      "image_search",
    ],
    googleApiKey: process.env.REACT_APP_googleApiKey,
    showAdvancedOptions: true,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#0265ba",
        sourceBg: "#FFFFFF",
        windowBorder: "#0265ba",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#3ba5f7",
        menuIcons: "#034398",
        link: "#5BA6E6",
        action: "#5333FF",
        inProgress: "#5BA6E6",
        complete: "#048A53",
        error: "#cc3333",
        textDark: "#034398",
        textLight: "#ffffff",
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true,
        },
      },
  }
  
  };


};



