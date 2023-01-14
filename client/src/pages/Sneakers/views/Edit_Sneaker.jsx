import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { editSneaker, getSneaker } from "actions/sneakerActions";
import { getCurrentProfile } from "actions/profileActions";
import { Widgetsetting } from "components/common/Cloudinary";
import ReactQuill from "react-quill";
import isEmpty from "validation/is-empty";
import { Form } from "../components/Form";
import "react-quill/dist/quill.snow.css";

/*
  Similar to the component CreateSneaker only this edits an existing
  article. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

const EditSneaker = ({ editSneaker, getSneaker, sneaker: { sneaker, loading }, profile: { profile }, auth, history, match }) => {
  const [values, setValues] = useState({
    _id: "",
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
    subimage_4: "",
  });

  const { _id, mainimage, model, text, tags, year, avatar, colorway, subimage_1, subimage_2, subimage_3, subimage_4 } = values;

  useEffect(() => {
    getSneaker(match.params.id);

    setValues({
      ...values,
      _id: !isEmpty(sneaker._id) ? sneaker._id : "",
      model: !isEmpty(sneaker.model) ? sneaker.model : "",
      colorway: !isEmpty(sneaker.colorway) ? sneaker.colorway : "",
      year: !isEmpty(sneaker.year) ? sneaker.year : "",
      text: !isEmpty(sneaker.text) ? sneaker.text : "",
      mainimage: !isEmpty(sneaker.mainimage) ? sneaker.mainimage : "",
      subimage_1: !isEmpty(sneaker.subimage_1) ? sneaker.subimage_1 : "",
      subimage_2: !isEmpty(sneaker.subimage_2) ? sneaker.subimage_2 : "",
      subimage_3: !isEmpty(sneaker.subimage_3) ? sneaker.subimage_3 : "",
      subimage_4: !isEmpty(sneaker.subimage_4) ? sneaker.subimage_4 : "",
      tags: !isEmpty(sneaker.tags) ? sneaker.tags.join(",") : "",
    });

  }, [sneaker._id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = auth;

    const newSneaker = {
      _id: _id,
      model: model,
      colorway: colorway,
      year: year,
      text: text,
      mainimage: mainimage,
      subimage_1: subimage_1,
      subimage_2: subimage_2,
      subimage_3: subimage_3,
      subimage_4: subimage_4,
      tags: tags,
    };

    editSneaker(_id, newSneaker, history);
  };

  /*
    These functions (mainUploadWidget), and 
    (sub1_UploadWidget) uses the cloudinary wiconstdet to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

  const mainUploadWidget = (e) => {
    e.preventDefault();

    let mainimage;

    const cloudname = "dwgjvssdt";
    const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({ ...values, mainimage: result.info.url });
      }
    });
  };

  const sub1_UploadWidget = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({ ...values, subimage_1: result.info.url });
      }
    });
  };

  const sub2_UploadWidget = (e) => {
    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({ ...values, subimage_2: result.info.url });
      }
    });
  };

  const sub3_UploadWidget = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({ ...values, subimage_3: result.info.url });
      }
    });
  };

  const sub4_UploadWidget = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({ ...values, subimage_4: result.info.url });
      }
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

  return (
    <React.Fragment>
      <Form
        onSubmit={onSubmit}
        model={model}
        colorway={colorway}
        year={year}
        text={text}
        tags={tags}
        mainimage={mainimage}
        subimage_1={subimage_1}
        subimage_2={subimage_2}
        subimage_3={subimage_3}
        subimage_4={subimage_4}
        onChange={onChange}
        handleChange={handleChange}
        sub1_UploadWidget={sub1_UploadWidget}
        sub2_UploadWidget={sub2_UploadWidget}
        sub3_UploadWidget={sub3_UploadWidget}
        sub4_UploadWidget={sub4_UploadWidget}
        mainUploadWidget={mainUploadWidget}
        title="Make any changes to your sneaker"
        description={
          <>
            Upload some pictures for your sneaker <br />
            Your can include a main photo, and up to four additional photos
          </>
        }
        editPage
        matchUrl={sneaker._id}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sneaker: state.sneaker,
  profile: state.profile,
});

export const Edit_Sneaker = connect(mapStateToProps, { getSneaker, editSneaker, getCurrentProfile })(EditSneaker);
