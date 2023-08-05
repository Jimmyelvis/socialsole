import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editArticle, getCurrentArticle } from "actions/articleActions";
import { getCurrentProfile } from "actions/profileActions";
import "react-quill/dist/quill.snow.css";
import isEmpty from "utils/is-empty";
import { setAlert } from "actions/alert";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";

const ArticleEdit = ({
  article: { article, loading },
  profile,
  auth,
  editArticle,
  getCurrentArticle,
  getCurrentProfile,
  setAlert,
  errors,
  match,
}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullheaderimage: "",
    articleheaderimage: "",
    address: "",
    headline: "",
    text: "",
    _id: "",
    tags: "",
  });

  const {
    fullheaderimage,
    articleheaderimage,
    address,
    headline,
    text,
    _id,
    tags,
  } = values;

  useEffect(() => {
    getCurrentArticle(match.params.id);

    setValues({
      fullheaderimage: !isEmpty(article.fullheaderimage)
        ? article.fullheaderimage
        : "",
      articleheaderimage: !isEmpty(article.articleheaderimage)
        ? article.articleheaderimage
        : "",
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

    editArticle(_id, newArticle, navigate);
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

export const Edit_Article = connect(mapStateToProps, {
  getCurrentArticle,
  editArticle,
  getCurrentProfile,
  setAlert,
})(ArticleEdit);
