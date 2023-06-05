import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "components/common/Spinner";
import { addArticle, addNewRelease } from "actions/articleActions";
import { getCurrentProfile } from "actions/profileActions";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";
import { Panel } from "components/ui/Panel";
import { NewRelease } from '../../../components/ui/cards/NewRelease';

/*
  Component for displaying and implementing the ability
  to create an article. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

const CreateArticle = ({ article: { article, loading }, profile, auth, addArticle, getCurrentProfile, addNewRelease, history, errors }) => {
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

  const { fullheaderimage, articleheaderimage, address, headline, text, _id, tags, newstype, price, colors, sizes, releaseDate } = values;

  const [newRelease, setNewRelease] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('====================================');
    console.log("called");
    console.log('====================================');

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
  
  
      addNewRelease(newArticle, history);
      
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
  
  
      addArticle(newArticle, history);

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
      <div className="create-edit-body">
        <h2 className="heading-2">Create Article</h2>

        <Panel className="create-edit-form">
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
          />
        </Panel>
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

export const Create_Article = connect(mapStateToProps, { addArticle, getCurrentProfile, addNewRelease })(withRouter(CreateArticle));
