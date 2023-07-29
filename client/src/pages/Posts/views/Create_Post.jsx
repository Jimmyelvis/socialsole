import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TextAreaFieldGroup from "components/ui/Forms/TextAreaFieldGroup";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { addPost } from "actions/postActions";
import { getCurrentProfile } from "actions/profileActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";

/*
  Component for displaying and implementing the ability
  to create a post. This component is protected by a private
  route which checks to see if an user is logged in
*/

const CreatePost = ({
  getCurrentProfile,
  addPost,
  auth,
  errors,
  post,
  profile: { profile },
}) => {
  const navigate = useNavigate();
  const { headerimage, headline, text, tags } = useState({
    headerimage: "",
    headline: "",
    text: "",
    tags: "",
  });

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

    addPost(newPost, navigate);
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
        setState({
          ...state,
          headerimage: result.info.url,
        });
      }
    });
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (value) => {
    setState({
      ...state,
      text: value,
    });
  };

  if (!profile) {
    return null;
  }

  let postContent;

  return (
    <React.Fragment>
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

export const Create_Post = connect(mapStateToProps, {
  addPost,
  getCurrentProfile,
})(CreatePost);
