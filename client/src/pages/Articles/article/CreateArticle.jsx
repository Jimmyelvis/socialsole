import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addArticle } from "../../../actions/articleActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../../components/layout/CommNavbar";
import TextFieldGroup from "../../ui/Forms/TextFieldGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import isEmpty from "../../../validation/is-empty";
import { Widgetsetting } from "../../common/Cloudinary";

/*
  Component for displaying and implementing the ability
  to create an article. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

const CreateArticle = ({ article: { article, loading }, profile, auth, addArticle, getCurrentProfile, history, errors }) => {
  const [values, setValues] = useState({
    fullheaderimage: "",
    articleheaderimage: "",
    address: "",
    headline: "",
    text: "",
    _id: "",
    tags: "",
  });

  const { fullheaderimage, articleheaderimage, address, headline, text, _id, tags } = values;



  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newArticle = {
      fullheaderimage: fullheaderimage,
      articleheaderimage: articleheaderimage,
      headline: headline,
      text: text,
      author: user.name,
      avatar: user.avatar,
      tags: tags,
    };

    addArticle(newArticle, history);

    setValues({
      fullheaderimage: "",
      articleheaderimage: "",
      address: "",
      headline: "",
      text: "",
      _id: "",
      tags: "",
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

  /*
    These functions (fullArticleHeaderSubmit), and 
    (articleHeaderSubmit) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */
  const fullArticleHeaderSubmit = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({
          ...values,
          fullheaderimage: result.info.url,
        });
      }
    });
  };

  const articleHeaderSubmit = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({
          ...values,
          articleheaderimage: result.info.url,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Navbar />

      <div className="container">
        <div className="create-edit-body contentbody">
          <h2 className="heading-2">Create Article</h2>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextFieldGroup placeholder="Headline goes here" name="headline" value={headline} onChange={onChange} error={errors.text} />

              <TextFieldGroup
                placeholder="* Tags"
                name="tags"
                value={tags}
                onChange={onChange}
                // error={errors.skills}
                info="Please use comma separated values (eg.
                    Nike, New Balance, Jordans)"
              />

              <div className="uploadpreview">
                <h4 className="heading-4">Upload A Full Header Image</h4>

                <div className="fullArticleHeaderPreview">{isEmpty(fullheaderimage) ? null : <img src={fullheaderimage} />}</div>

                <div className="upload-btn">
                  <button id="upload_widget" className="btn btn-lightblue" onClick={fullArticleHeaderSubmit}>
                    Upload Photo
                  </button>
                </div>
              </div>

              <div className="uploadpreview">
                <h4 className="heading-4">Upload A Article Header Image</h4>

                <div className="articleHeaderPreview">{isEmpty(articleheaderimage) ? null : <img src={articleheaderimage} />}</div>

                <div className="upload-btn">
                  <button id="upload_widget" className="btn btn-lightblue" onClick={articleHeaderSubmit}>
                    Upload Photo
                  </button>
                </div>
              </div>

              <ReactQuill value={text} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-lightblue">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  article: state.article,
  profile: state.profile,
});

export default connect(mapStateToProps, { addArticle, getCurrentProfile })(withRouter(CreateArticle));
