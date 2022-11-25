import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import { editPost, getPost } from "../../../actions/postActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../../layout/CommNavbar";
import isEmpty from "../../../validation/is-empty";
import { Widgetsetting } from "../../common/Cloudinary";

/*
  Similar to the component CreatePost only this edits an existing
  post. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

const EditPost = ({ getCurrentProfile, editPost, getPost,match, history, auth, errors, post: { post, loading  } }) => {
  
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
      fullheaderimage: fullheaderimage,
      articleheaderimage: articleheaderimage,
      address: address,
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
        this.setState({
          headerimage: result.info.url,
        });

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

      <div className="container">
        <div className="create-edit-body contentbody">
          <h2 className="heading-2">Edit Post</h2>

          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="uploadpreview">
                <h4 className="heading-4">Upload a picture for your post</h4>

                <div className="profileHeaderPreview">
                  <img src={headerimage} alt="" />
                </div>

                <div className="upload-btn">
                  <button id="upload_widget" className="btn btn-lightblue" 
                  onClick={fileselectedhandler}>
                    Upload a picture
                  </button>
                </div>
              </div>

              <div className="form-group">
                <TextFieldGroup placeholder="Headline goes here" name="headline" 
                value={headline} onChange={onChange}  />

                <ReactQuill placeholder="Create a post" value={text} onChange={handleChange}  />

                <TextFieldGroup
                  placeholder="* Tags"
                  name="tags"
                  value={tags}
                  onChange={onChange}
                  info="Please use comma separated values (eg.
                            Nike, New Balance, Jordans)"
                />
              </div>

              <button type="submit" className="btn btn-lightblue">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { editPost, getPost, getCurrentProfile })(withRouter(EditPost));
