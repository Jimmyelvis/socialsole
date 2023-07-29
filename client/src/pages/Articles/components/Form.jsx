import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { Button } from "components/ui/buttons";
import { Link } from "react-router-dom";
import isEmpty from "utils/is-empty";
import{ Panel } from "components/ui/Panel";




export const Form = ({ 
  fullheaderimage, 
  articleheaderimage, 
  address, 
  headline, 
  onSubmit, 
  errors, 
  editArticle, 
  matchUrl,
  text, 
  _id, 
  tags, 
  onChange, 
  handleChange, 
  fullArticleHeaderSubmit, 
  articleHeaderSubmit,
  newstype,
  price,
  colors,
  sizes,
  new_Release,
  setNew_Release,
  releaseDate,
  title
}) => {
  return (
    <div className="container">
      <Panel className="create-edit-body">

      <h2 className="heading-2">{title}</h2>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <TextFieldGroup placeholder="Headline goes here" name="headline" value={headline} onChange={onChange} />

            <TextFieldGroup
              placeholder="* Tags Please use comma separated values (eg.
                Nike, New Balance, Jordans"
              name="tags"
              value={tags}
              onChange={onChange}
              // error={errors.skills}
              info="Please use comma separated values (eg.
                        Nike, New Balance, Jordans)"
            />

            <TextFieldGroup placeholder="News Article Type" name="newstype" value={newstype} onChange={onChange} />

            <Button primary className="mx-4" onClick={(e) => {
              e.preventDefault()
              setNew_Release(!new_Release)
              }}>
                {
                  new_Release ? "Hide New Release Fields" : "Show New Release Fields"
                }
            </Button>


            {
              new_Release && (
                <div className="new-release-fields">
                  <TextFieldGroup placeholder="Price" name="price" value={price} onChange={onChange} />
          
                  <TextFieldGroup
                    placeholder="* Colors"
                    name="colors"
                    value={colors}
                    onChange={onChange}
                    info="Please use comma separated values for colors (eg.
                              Blue, Red Green, Sail)"
                  />
          
                  <TextFieldGroup
                    placeholder="* Sizes"
                    name="sizes"
                    value={sizes}
                    onChange={onChange}
                    info="Please use comma separated values for sizes (eg.
                              Mens, Women, Kids, Toddlers)"
                  />

                  <TextFieldGroup placeholder="Release Date (Use this format May 17 2023 )" name="releaseDate" value={releaseDate} onChange={onChange} />
                </div>
              )
            }

            <div className="uploadpreview article-upload-preview">
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
      </Panel>
    </div>
  );
}
