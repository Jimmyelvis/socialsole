import { Widgetsetting } from "components/common/Cloudinary";


export const fileselectedhandler = (e) => {
  e.preventDefault();

  window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
    if (result && result.event === "success") {
      setValues({
        ...values,
        headerimage: result.info.url,
      });
    }
  });
};

