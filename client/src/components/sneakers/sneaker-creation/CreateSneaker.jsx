import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addSneaker } from "../../../actions/sneakerActions";
import { withRouter, Redirect } from "react-router-dom";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../layout/CommNavbar";
import { Widgetsetting } from "../../common/Cloudinary";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/*
  Component for displaying and implementing the ability
  to create an sneaker. This component is protected by a private
  route which  to see if an user is logged in
*/


export class CreateSneaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };

  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { profile } = this.props.profile;


    const newSneaker = {
      mainimage: this.state.mainimage,
      model: this.state.model,
      text: this.state.text,
      year: this.state.year,
      tags: this.state.tags,
      colorway: this.state.colorway,
      subimage_1: this.state.subimage_1,
      subimage_2: this.state.subimage_2,
      subimage_3: this.state.subimage_3,
      subimage_4: this.state.subimage_4,
      name: user.name,
      avatar: profile.avatar
    };

    this.props.addSneaker(newSneaker, this.props.history);

    this.setState({
      model: "",
      text: "",
      colorway: ""
    });
  }

  

    /*
    These functions (mainUploadWidget), and 
    (sub1_UploadWidget) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

  mainUploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            mainimage: result.info.url
          });
        }
      }
    );
  };

  sub1_UploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            subimage_1: result.info.url
          });
        }
      }
    );
  };


  sub2_UploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
  
          this.setState({
            subimage_2: result.info.url
          });
        }
      }
    );
  };

  sub3_UploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
     Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            subimage_3: result.info.url
          });
        }
      }
    );
  };

  sub4_UploadWidget = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            subimage_4: result.info.url
          });
        }
      }
    );
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (value) => {
    this.setState({ text: value })
  }

  render() {
    const { sneakers, loading } = this.props.sneaker;
    const { profile } = this.props.profile;

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

                <form onSubmit={this.onSubmit}>

                  <div className="uploadpreview" style={{margin: '0 auto' }}>
                    <p className="description">
                      Upload some pictures for your sneaker <br />
                      Your can include a main photo, and up to four additional
                      photos
                    </p>

                    <div className="profileHeaderPreview">
                        {this.state.mainimage === "" ? (
                            "  "
                          ) : (
                            <img
                              src={this.state.mainimage}
                              alt="..."
                            />
                        )}
                    </div>


                    <div className="upload-btn">
                      <button
                        id="upload_widget"
                        className="btn btn-lightblue"
                        onClick={this.mainUploadWidget}
                      >
                        Upload a main Image
                      </button>
                    </div>
                    

                    <div className="subImagesRow">

                      <div className="additional-img">
                          
                          <div className="imgholder">
                            {this.state.subimage_1 === "" ? (
                                "  "
                              ) : (
                                <img
                                  src={this.state.subimage_1}
                                  alt="..."
                                />
                            )}
                          </div>

                          <button
                            id="upload_widget"
                            className="btn btn-lightblue"
                            onClick={this.sub1_UploadWidget}
                          >
                            Upload 2nd Image
                          </button>

                      </div>

                      <div className="additional-img">
                          
                          <div className="imgholder">
                            {this.state.subimage_2 === "" ? (
                                "  "
                              ) : (
                                <img
                                  src={this.state.subimage_2}
                                  alt="..."
                                />
                            )}
                          </div>

                          <button
                            id="upload_widget"
                            className="btn btn-lightblue"
                            onClick={this.sub2_UploadWidget}
                          >
                            Upload 3rd Image
                          </button>

                      </div>

                      <div className="additional-img">
                          
                          <div className="imgholder">
                            {this.state.subimage_3 === "" ? (
                                "  "
                              ) : (
                                <img
                                  src={this.state.subimage_3}
                                  alt="..."
                                />
                            )}
                          </div>

                          <button
                            id="upload_widget"
                            className="btn btn-lightblue"
                            onClick={this.sub3_UploadWidget}
                          >
                            Upload 4th Image
                          </button>

                      </div>

                      <div className="additional-img">
                          
                          <div className="imgholder">
                            {this.state.subimage_4 === "" ? (
                                "  "
                              ) : (
                                <img
                                  src={this.state.subimage_4}
                                  alt="..."
                                />
                            )}
                          </div>

                          <button
                            id="upload_widget"
                            className="btn btn-lightblue"
                            onClick={this.sub4_UploadWidget}
                          >
                            Upload 5th Image
                          </button>

                      </div>
                   
                    </div>
                  </div>

                  <div className="form-group">
                    <TextFieldGroup
                      placeholder="Sneaker Model"
                      name="model"
                      value={this.state.model}
                      onChange={this.onChange}
                    />

                    <TextFieldGroup
                      placeholder="Sneaker Colorway"
                      name="colorway"
                      value={this.state.colorway}
                      onChange={this.onChange}
                    />

                    <TextFieldGroup
                      placeholder="Year Released"
                      name="year"
                      value={this.state.year}
                      onChange={this.onChange}
                    />

                    <ReactQuill
                      placeholder="Additional Info"
                      name="text"
                      value={this.state.text}
                      onChange={this.handleChange}
                    />

                    <TextFieldGroup
                        placeholder="* Tags"
                        name="tags"
                        value={this.state.tags}
                        onChange={this.onChange}
                        // error={errors.skills}
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
}

const mapStateToProps = state => ({
  auth: state.auth,
  sneaker: state.sneaker,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addSneaker, getCurrentProfile }
)(withRouter(CreateSneaker));
