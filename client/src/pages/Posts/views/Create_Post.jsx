import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import TextAreaFieldGroup from "components/ui/Forms/TextAreaFieldGroup";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { addPost } from "actions/postActions";
import { getCurrentProfile } from "actions/profileActions";
import Navbar from "components/layout/CommNavbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";

/*
  Component for displaying and implementing the ability
  to create a post. This component is protected by a private
  route which checks to see if an user is logged in
*/

const CreatePost = (
    { getCurrentProfile, 
    addPost, 
    history,
    auth,
    errors,
    post,
    profile : { profile},
  }
) => {
  const [values, setValues] = useState({
    headerimage: "",
    headline: "",
    text: "",
    tags: "",
  });

  const { headerimage, headline, text, tags } = values;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newPost = {
      headerimage: headerimage,
      headline: headline,
      text: text,
      name: user.name,
      avatar: user.avatar,
      tags: tags,
    };

    addPost(newPost, history);
  };

  /*
    This function (fileselectedhandler) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

  const fileselectedhandler = (e) => {
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

  let postContent;

  return (
    <React.Fragment>
      <Navbar />

      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        handleChange={handleChange}
        fileselectedhandler={fileselectedhandler}
        headerimage={headerimage}
        headline={headline}
        text={text}
        tags={tags}
        title="Create a Post"
      />

    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
  profile: state.profile,
});

export const Create_Post = connect(mapStateToProps, { addPost, getCurrentProfile })(withRouter(CreatePost));