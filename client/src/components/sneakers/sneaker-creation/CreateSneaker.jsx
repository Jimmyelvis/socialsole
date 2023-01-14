import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import TextAreaFieldGroup from "../../ui/Forms/TextAreaFieldGroup";
import TextFieldGroup from "../../ui/Forms/TextFieldGroup";
import { addSneaker } from "../../../actions/sneakerActions";
import { withRouter, Redirect } from "react-router-dom";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../layout/CommNavbar";
import { Widgetsetting } from "../../common/Cloudinary";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/*
  Component for displaying and implementing the ability
  to create an sneaker. This component is protected by a private
  route which  to see if an user is logged in
*/

export const CreateSneaker = (
  { getCurrentProfile, 
    addSneaker, 
    history, auth, sneaker, 
    profile: { profile } 
  }
  ) => {

    
  const [values, setValues] = useState({
    mainimage: "",
    model: "",
    text: "",
    tags: "",
    year: "",
    avatar: "",
    colorway: "",
    subimage_1: "",
    subimage_2: "",
    subimage_3: "",
    subimage_4: ""
  });

  const {mainimage, model, text, tags, year, avatar, colorway, subimage_1, subimage_2, subimage_3, subimage_4} = values;



   useEffect(() => {
    getCurrentProfile();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { user } = auth;

    const newSneaker = {
      mainimage: mainimage,
      model: model,
      text: text,
      year: year,
      tags: tags,
      colorway: colorway,
      subimage_1: subimage_1,
      subimage_2: subimage_2,
      subimage_3: subimage_3,
      subimage_4: subimage_4,
      name: user.name,
      avatar: profile.avatar
    };

    addSneaker(newSneaker, history);

 
    setValues({
      model: "",
      text: "",
      colorway: ""
    });
  }

    /*
    These functions (mainUploadWidget), and 
    (sub1_UploadWidget) uses the cloudinary wiconstdet to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

 const mainUploadWidget = e => {
    e.preventDefault();

    let mainimage;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
        
          setValues({ ...values, mainimage: result.info.url });
        }
      }
    );
  };

 const sub1_UploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_1: result.info.url });
        }
      }
    );
  };

 const sub2_UploadWidget = e => {
      window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_2: result.info.url });
        }
      }
    );
  };

const sub3_UploadWidget = e => {
    e.preventDefault();

   window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_3: result.info.url });
        }
      }
    );
  };

const sub4_UploadWidget = e => {
    e.preventDefault();

       window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
         
          setValues({ ...values, subimage_4: result.info.url });
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

  return (
    <React.Fragment>
      <Navbar />

      <div className="container">
        <div className="create-edit-body contentbody">
          <h2 className="heading-2">Post a Sneaker from your collection</h2>

          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="uploadpreview" style={{ margin: "0 auto" }}>
                <p className="description">
                  Upload some pictures for your sneaker <br />
                  Your can include a main photo, and up to four additional photos
                </p>

                <div className="profileHeaderPreview">{mainimage === "" ? "  " : <img src={mainimage} alt="..." />}</div>

                <div className="upload-btn">
                  <button id="upload_widget" className="btn btn-lightblue" onClick={mainUploadWidget}>
                    Upload a main Image
                  </button>
                </div>

                <div className="subImagesRow">
                  <div className="additional-img">
                    <div className="imgholder">{subimage_1 === "" ? "  " : <img src={subimage_1} alt="..." />}</div>

                    <button id="upload_widget" className="btn btn-lightblue" onClick={sub1_UploadWidget}>
                      Upload 2nd Image
                    </button>
                  </div>

                  <div className="additional-img">
                    <div className="imgholder">{subimage_2 === "" ? "  " : <img src={subimage_2} alt="..." />}</div>

                    <button id="upload_widget" className="btn btn-lightblue" onClick={sub2_UploadWidget}>
                      Upload 3rd Image
                    </button>
                  </div>

                  <div className="additional-img">
                    <div className="imgholder">{subimage_3 === "" ? "  " : <img src={subimage_3} alt="..." />}</div>

                    <button id="upload_widget" className="btn btn-lightblue" onClick={sub3_UploadWidget}>
                      Upload 4th Image
                    </button>
                  </div>

                  <div className="additional-img">
                    <div className="imgholder">{subimage_4 === "" ? "  " : <img src={subimage_4} alt="..." />}</div>

                    <button id="upload_widget" className="btn btn-lightblue" onClick={sub4_UploadWidget}>
                      Upload 5th Image
                    </button>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  sneaker: state.sneaker,
  profile: state.profile,
});

export default connect(mapStateToProps, { addSneaker, getCurrentProfile })(withRouter(CreateSneaker));
