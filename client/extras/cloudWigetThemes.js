/*
///  Twilight Theme
*/

function showUploadWidget() {
  cloudinary.openUploadWidget({
    cloudName: "cloudname",
    uploadPreset: "uploadpresent",
    sources: ["local", "url"],
    googleApiKey: "<image_search_google_api_key>",
    showAdvancedOptions: true,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#002D73",
        sourceBg: "#021A42",
        windowBorder: "#4F3AC1",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#4068B5",
        menuIcons: "#0082EC",
        link: "#28A6FF",
        action: "#5333FF",
        inProgress: "#0082FF",
        complete: "#03886B",
        error: "#cc3333",
        textDark: "#002D73",
        textLight: "#ffffff"
      },
      fonts: {
        default: null,
        "'Fira Sans', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Fira+Sans",
          active: true
        }
      }
    }
  }, (err, info) => {
    if (!err) {
      console.log("Upload Widget event - ", info);
    }
  });
}

/*
///  Purple Haze Theme
*/

function showUploadWidget() {
  cloudinary.openUploadWidget({
    cloudName: "cloudname",
    uploadPreset: "uploadpresent",
    sources: ["local", "url"],
    googleApiKey: "<image_search_google_api_key>",
    showAdvancedOptions: true,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#321756",
        sourceBg: "#FFFFFF",
        windowBorder: "#008CFF",
        tabIcon: "#E3E5FF",
        inactiveTabIcon: "#59348A",
        menuIcons: "#FFFFFF",
        link: "#008CFF",
        action: "#008CFF",
        inProgress: "#003CFF",
        complete: "#087375",
        error: "#FF0000",
        textDark: "#321756",
        textLight: "#FFFFFF"
      },
      fonts: {
        default: null,
        "'Acme', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Acme",
          active: true
        }
      }
    }
  }, (err, info) => {
    if (!err) {
      console.log("Upload Widget event - ", info);
    }
  });
}