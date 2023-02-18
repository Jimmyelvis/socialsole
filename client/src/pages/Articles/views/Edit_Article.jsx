import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editArticle, getCurrentArticle } from "actions/articleActions";
import { getCurrentProfile } from "actions/profileActions";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import isEmpty from "utils/is-empty";
import { setAlert } from "actions/alert";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";



/*
  Similar to the component CreateArticle only this edits an existing
  article. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

const ArticleEdit = ({ article: { article, loading }, profile, auth, editArticle, getCurrentArticle, getCurrentProfile, history, match, setAlert, errors }) => {
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

  useEffect(() => {
    getCurrentArticle(match.params.id);

    setValues({
      ...values,
      fullheaderimage: !isEmpty(article.fullheaderimage) ? article.fullheaderimage : "",
      articleheaderimage: !isEmpty(article.articleheaderimage) ? article.articleheaderimage : "",
      address: !isEmpty(article.address) ? article.address : "",
      headline: !isEmpty(article.headline) ? article.headline : "",
      text: !isEmpty(article.text) ? article.text : "",
      _id: !isEmpty(article._id) ? article._id : "",
      tags: !isEmpty(article.tags) ? article.tags.join(",") : "",
      errors: {},
    });
  }, [article._id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newArticle = {
      fullheaderimage: fullheaderimage,
      articleheaderimage: articleheaderimage,
      address: address,
      headline: headline,
      text: text,
      author: user.name,
      avatar: user.avatar,
      _id: _id,
      tags: tags,
      errors: {},
    };

    editArticle(_id, newArticle, history);
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

    let avatar;

    const cloudname = "dwgjvssdt";
    const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: ["local"],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
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
        },
      },
      (error, result) => {
        if (result && result.event === "success") {
          avatar = result.info.url;
          console.log(avatar);

          setValues({
            ...values,
            fullheaderimage: result.info.url,
          });
        }
      }
    );
  };

  const articleHeaderSubmit = (e) => {
    e.preventDefault();

    let avatar;

    const cloudname = "dwgjvssdt";
    const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: ["local"],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
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
        },
      },
      (error, result) => {
        if (result && result.event === "success") {
          avatar = result.info.url;
          console.log(avatar);

          setValues({
            ...values,
            articleheaderimage: result.info.url,
          });
        }
      }
    );
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="create-edit-body contentbody">
          <h2 className="heading-2">Edit Article</h2>

          <Form
            onSubmit={onSubmit}
            onChange={onChange}
            fullheaderimage={fullheaderimage}
            articleheaderimage={articleheaderimage}
            headline={headline}
            text={text}
            tags={tags}
            handleChange={handleChange}
            fullArticleHeaderSubmit={fullArticleHeaderSubmit}
            articleHeaderSubmit={articleHeaderSubmit}
            editArticle
            matchUrl={article._id}
          />
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

export const Edit_Article = connect(mapStateToProps, { getCurrentArticle, editArticle, getCurrentProfile, setAlert })(withRouter(ArticleEdit));
