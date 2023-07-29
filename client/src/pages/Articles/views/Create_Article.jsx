import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "components/common/Spinner";
import { addArticle, addNewRelease } from "actions/articleActions";
import { getCurrentProfile } from "actions/profileActions";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";
import { Panel } from "components/ui/Panel";
import { NewRelease } from "../../../components/ui/cards/NewRelease";

const CreateArticle = ({
  article: { article, loading },
  profile,
  auth,
  addArticle,
  getCurrentProfile,
  addNewRelease,
  errors,
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
    newstype: "news",
    price: "",
    colors: "",
    sizes: "",
    releaseDate: "",
  });

  const {
    fullheaderimage,
    articleheaderimage,
    address,
    headline,
    text,
    _id,
    tags,
    newstype,
    price,
    colors,
    sizes,
    releaseDate,
  } = values;

  const [newRelease, setNewRelease] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("====================================");
    console.log("called");
    console.log("====================================");

    const { user } = auth;

    if (newRelease) {
      const newArticle = {
        fullheaderimage: fullheaderimage,
        articleheaderimage: articleheaderimage,
        headline: headline,
        text: text,
        author: user.name,
        avatar: user.avatar,
        tags: tags,
        price: price,
        color: colors,
        sizeRun: sizes,
        newstype: newstype,
        releaseDate: releaseDate,
      };

      addNewRelease(newArticle, navigate);
    } else {
      const newArticle = {
        fullheaderimage: fullheaderimage,
        articleheaderimage: articleheaderimage,
        headline: headline,
        text: text,
        author: user.name,
        avatar: user.avatar,
        tags: tags,
        newstype: newstype,
      };

      addArticle(newArticle, navigate);
    }

    setValues({
      fullheaderimage: "",
      articleheaderimage: "",
      address: "",
      headline: "",
      text: "",
      _id: "",
      tags: "",
      price: "",
      colors: "",
      sizes: "",
      newstype: "news",
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

          <Form
            onSubmit={onSubmit}
            onChange={onChange}
            fullheaderimage={fullheaderimage}
            articleheaderimage={articleheaderimage}
            headline={headline}
            text={text}
            tags={tags}
            price={price}
            colors={colors}
            sizes={sizes}
            releaseDate={releaseDate}
            newstype={newstype}
            handleChange={handleChange}
            fullArticleHeaderSubmit={fullArticleHeaderSubmit}
            articleHeaderSubmit={articleHeaderSubmit}
            new_Release={newRelease}
            setNew_Release={setNewRelease}
            title="Create Article"
          />
        
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  article: state.article,
  profile: state.profile,
});

export const Create_Article = connect(mapStateToProps, {
  addArticle,
  getCurrentProfile,
  addNewRelease,
})(CreateArticle);
