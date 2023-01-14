import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { addSneaker } from "actions/sneakerActions";
import { withRouter, Redirect } from "react-router-dom";
import { getCurrentProfile } from "actions/profileActions";
import { Widgetsetting } from "components/common/Cloudinary";
import ReactQuill from "react-quill";
import { Form } from "../components/Form";
import "react-quill/dist/quill.snow.css";



/*
  Component for displaying and implementing the ability
  to create an sneaker. This component is protected by a private
  route which  to see if an user is logged in
*/

export const AddSneaker = (
  { getCurrentProfile, 
    addSneaker, 
    history, auth, sneaker, 
    profile: { profile } 
  }
  ) => {

    
  const [values, setValues] = useState({
    mainimage: "",
    model: "",
    text: "",
    tags: "",
    year: "",
    avatar: "",
    colorway: "",
    subimage_1: "",
    subimage_2: "",
    subimage_3: "",
    subimage_4: ""
  });

  const {mainimage, model, text, tags, year, avatar, colorway, subimage_1, subimage_2, subimage_3, subimage_4} = values;



   useEffect(() => {
    getCurrentProfile();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = auth;

    const newSneaker = {
      mainimage: mainimage,
      model: model,
      text: text,
      year: year,
      tags: tags,
      colorway: colorway,
      subimage_1: subimage_1,
      subimage_2: subimage_2,
      subimage_3: subimage_3,
      subimage_4: subimage_4,
      name: user.name,
      avatar: profile.avatar
    };

    addSneaker(newSneaker, history);

 
    setValues({
      model: "",
      text: "",
      colorway: ""
    });
  }

    /*
    These functions (mainUploadWidget), and 
    (sub1_UploadWidget) uses the cloudinary wiconstdet to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

 const mainUploadWidget = e => {
    e.preventDefault();

    let mainimage;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
        
          setValues({ ...values, mainimage: result.info.url });
        }
      }
    );
  };

 const sub1_UploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_1: result.info.url });
        }
      }
    );
  };

 const sub2_UploadWidget = e => {
    e.preventDefault();

      window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_2: result.info.url });
        }
      }
    );
  };

const sub3_UploadWidget = e => {
    e.preventDefault();

   window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_3: result.info.url });
        }
      }
    );
  };

const sub4_UploadWidget = e => {
    e.preventDefault();

       window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_4: result.info.url });
        }
      }
    );
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (value) => {

    setValues({
      ...values,
      text: value,
    });
  };


  if (!profile) {
    return null;
  }

  return (
    <React.Fragment>
  
      <Form
        onSubmit={onSubmit}
        model={model}
        colorway={colorway}
        year={year}
        text={text}
        tags={tags}
        mainimage={mainimage}
        subimage_1={subimage_1}
        subimage_2={subimage_2}
        subimage_3={subimage_3}
        subimage_4={subimage_4}
        onChange={onChange}
        handleChange={handleChange}
        sub1_UploadWidget={sub1_UploadWidget}
        sub2_UploadWidget={sub2_UploadWidget}
        sub3_UploadWidget={sub3_UploadWidget}
        sub4_UploadWidget={sub4_UploadWidget}
        mainUploadWidget={mainUploadWidget}
        title="Post a Sneaker from your collection"
        description={
          <>
            Upload some pictures for your sneaker <br />
            Your can include a main photo, and up to four additional photos
          </>
        }
      />
    </React.Fragment>
  );
  
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  sneaker: state.sneaker,
  profile: state.profile,
});

export const Add_Sneaker =  connect(mapStateToProps, { addSneaker, getCurrentProfile })(withRouter(AddSneaker));
