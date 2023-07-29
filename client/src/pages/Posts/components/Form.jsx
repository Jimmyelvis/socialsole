import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { Button } from 'components/ui/buttons';
import { Link } from "react-router-dom";
import{ Panel } from "components/ui/Panel";



export const Form = ({ title, onSubmit, headerimage, fileselectedhandler, headline, onChange, text, handleChange, tags, editPage, matchUrl}) => {
  return (
    <div className="container">
      <Panel className="create-edit-body">
        <h2 className="heading-2">{title}</h2>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="uploadpreview">
              <h4 className="heading-4">Upload a picture for your post</h4>

              <div className="imgPreview">
                <img src={headerimage} alt="" />
              </div>

              <div className="upload-btn">
        
                <Button primary id="upload_widget" onClick={fileselectedhandler}>
                  Upload a picture
                </Button>
              </div>
            </div>

            <div className="form-group">
              <TextFieldGroup placeholder="Headline goes here" name="headline" value={headline} onChange={onChange} />

              <ReactQuill placeholder="Create a post" value={text} onChange={handleChange} />

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
              <Link to={`/post/${matchUrl}`}>
                <Button primary className="mx-4">
                  Back to Post
                </Button>
              </Link>
            )}
          </form>
        </div>
      </Panel>
    </div>
  );
}
