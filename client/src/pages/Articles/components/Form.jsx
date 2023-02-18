import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { Button } from "components/ui/buttons";
import { Link } from "react-router-dom";
import isEmpty from "utils/is-empty";



export const Form = ({ fullheaderimage, articleheaderimage, address, headline, onSubmit, errors, editArticle, matchUrl,
text, _id, tags, onChange, handleChange, fullArticleHeaderSubmit, articleHeaderSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <TextFieldGroup placeholder="Headline goes here" name="headline" value={headline} onChange={onChange} />

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

      {editArticle && (
        <Link to={`/article/${matchUrl}`}>
          <Button primary className="mx-4">
            Back to Article
          </Button>
        </Link>
      )}
    </form>
  );
}
