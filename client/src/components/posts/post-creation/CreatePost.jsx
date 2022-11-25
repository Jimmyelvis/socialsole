import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { withRouter, Redirect } from "react-router-dom";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addPost } from "../../../actions/postActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../layout/CommNavbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "../../common/Cloudinary";


/*
  Component for displaying and implementing the ability
  to create a post. This component is protected by a private
  route which checks to see if an user is logged in
*/

export const CreatePost = (
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
      tags: tags
    };

    addPost(newPost, history);
    
  }

  /*
    This function (fileselectedhandler) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

 const fileselectedhandler = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          setValues({
            ...values,
            headerimage: result.info.url
          });
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

    let postContent;

    return (
      <React.Fragment>
        <Navbar />

        <div className="container">
          
            <div className="create-edit-body contentbody">
               
                <h2 className="heading-2">Create a Post</h2>
                <div className="card-body">


                  <form onSubmit={onSubmit}>
                  
                    <div className="uploadpreview">
                      <h4 className="heading-4">Upload a picture for your post</h4>

                      <div className="profileHeaderPreview">
                        <img src={headerimage} alt="" />
                      </div>

                      <div className="upload-btn">
                        <button
                          id="upload_widget"
                          className="btn btn-lightblue"
                          onClick={fileselectedhandler}
                        >
                          Upload a picture
                        </button>
                      </div>
                      
                    </div>

                    <div className="form-group">
                      <TextFieldGroup
                        placeholder="Headline goes here"
                        name="headline"
                        value={headline}
                        onChange={onChange}
                      />

                      <ReactQuill
                        placeholder="Create a post"
                        value={text}
                        onChange={handleChange}
                        error={errors.text}
                      />

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
  
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addPost, getCurrentProfile }
)(withRouter (CreatePost));
