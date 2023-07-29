import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { Button } from 'components/ui/buttons';
import { Link } from "react-router-dom";
import{ Panel } from "components/ui/Panel";



export const Form = (
  { title, onSubmit, model, colorway, year, mainimage, subimage_1, subimage_2, subimage_3, subimage_4,  mainUploadWidget, sub1_UploadWidget, sub2_UploadWidget, sub3_UploadWidget, sub4_UploadWidget, onChange, text, handleChange, tags, editPage, matchUrl, description}
  ) => {
  return (
    <div className="container">
      <Panel className="create-edit-body">
        <h2 className="heading-2">{title}</h2>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="uploadpreview" style={{ margin: "0 auto" }}>
              <p className="description">{description}</p>

              <div className="imgPreview">{mainimage === "" ? "  " : <img src={mainimage} alt="..." />}</div>

              <div className="upload-btn">
                <Button primary id="upload_widget" onClick={mainUploadWidget}>
                  Upload a main Image
                </Button>
              </div>

              <div className="subImagesRow">
                <div className="additional-img">
                  <div className="imgholder">{subimage_1 === "" ? "  " : <img src={subimage_1} alt="..." />}</div>

                  <Button primary id="upload_widget" onClick={sub1_UploadWidget}>
                    Upload 2nd Image
                  </Button>
                </div>

                <div className="additional-img">
                  <div className="imgholder">{subimage_2 === "" ? "  " : <img src={subimage_2} alt="..." />}</div>

                  <Button primary id="upload_widget" onClick={sub2_UploadWidget}>
                    Upload 3rd Image
                  </Button>
                </div>

                <div className="additional-img">
                  <div className="imgholder">{subimage_3 === "" ? "  " : <img src={subimage_3} alt="..." />}</div>

                  <Button primary id="upload_widget" onClick={sub3_UploadWidget}>
                    Upload 4th Image
                  </Button>
                </div>

                <div className="additional-img">
                  <div className="imgholder">{subimage_4 === "" ? "  " : <img src={subimage_4} alt="..." />}</div>
    
                  <Button primary id="upload_widget" onClick={sub4_UploadWidget}>
                    Upload 5th Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <TextFieldGroup placeholder="Sneaker Model" name="model" value={model} onChange={onChange} />

              <TextFieldGroup placeholder="Sneaker Colorway" name="colorway" value={colorway} onChange={onChange} />

              <TextFieldGroup placeholder="Year Released" name="year" value={year} onChange={onChange} />

              <ReactQuill placeholder="Additional Info" name="text" value={text} onChange={handleChange} />

              <TextFieldGroup
                placeholder="* Tags"
                name="tags"
                value={tags}
                onChange={onChange}
                info="Please use comma separated values (eg.
                        Nike, New Balance, Jordans)"
              />
            </div>

            <Button primary>Submit</Button>

            {editPage && (
              <Link to={`/sneaker/${matchUrl}`}>
                <Button primary className="mx-4">
                  Back to Sneaker
                </Button>
              </Link>
            )}
          </form>
        </div>
      </Panel>
    </div>
  );
}
