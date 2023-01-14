import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import TextAreaFieldGroup from "components/ui/Forms/TextAreaFieldGroup";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { editPost, getPost } from "actions/postActions";
import { getCurrentProfile } from "actions/profileActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "components/layout/CommNavbar";
import isEmpty from "validation/is-empty";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";

const EditPost = ({ getCurrentProfile, editPost, getPost, match, history, auth, errors, post: { post, loading } }) => {
  const [values, setValues] = useState({
    _id: "",
    headerimage: "",
    headline: "",
    text: "",
    tags: "",
  });

  const { headerimage, headline, text, _id, tags } = values;

  useEffect(() => {
    getPost(match.params.id);

    setValues({
      ...values,
      headerimage: !isEmpty(post.headerimage) ? post.headerimage : "",
      headline: !isEmpty(post.headline) ? post.headline : "",
      text: !isEmpty(post.text) ? post.text : "",
      _id: !isEmpty(post._id) ? post._id : "",
      tags: !isEmpty(post.tags) ? post.tags.join(",") : "",
    });
  }, [post._id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newPost = {
      headerimage: headerimage,
      headline: headline,
      text: text,
      _id: _id,
      tags: tags,
    };

    editPost(_id, newPost, history);
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
        title="Edit Your Post"
        editPage
        matchUrl={post._id}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile,
});

export const Edit_Post = connect(mapStateToProps, { editPost, getPost, getCurrentProfile })(EditPost);
