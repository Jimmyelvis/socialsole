import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addSneaker } from "../../actions/sneakerActions";
import UserSneakers from "./UserSneakers";
import { getCurrentProfile } from "../../actions/profileActions";
import Navbar from "../../components/layout/Navbar";

export class YourSneakers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainimage: "",
      model: "",
      text: "",
      year: "",
      colorway: "",
      subimage_1: "",
      subimage_2: "",
      subimage_3: "",
      subimage_4: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;

    const newSneaker = {
      mainimage: this.state.mainimage,
      model: this.state.model,
      text: this.state.text,
      year: this.state.year,
      colorway: this.state.colorway,
      subimage_1: this.state.subimage_1,
      subimage_2: this.state.subimage_2,
      subimage_3: this.state.subimage_3,
      subimage_4: this.state.subimage_4,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addSneaker(newSneaker);

    this.setState({
      model: "",
      text: "",
      colorway: ""
    });
  }

  mainUploadWidget = e => {
    e.preventDefault();

    let mainimage;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
          "url",
          "camera",
          "facebook",
          "dropbox",
          "instagram",
          "image_search"
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          mainimage = result.info.url;
          console.log(mainimage);

          this.setState({
            mainimage: result.info.url
          });
        }
      }
    );
  };

  sub1_UploadWidget = e => {
    e.preventDefault();

    let subimage_1;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
          "url",
          "camera",
          "facebook",
          "dropbox",
          "instagram",
          "image_search"
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          subimage_1 = result.info.url;
          console.log(subimage_1);

          this.setState({
            subimage_1: result.info.url
          });
        }
      }
    );
  };

  sub1_UploadWidget = e => {
    e.preventDefault();

    let subimage_1;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
          "url",
          "camera",
          "facebook",
          "dropbox",
          "instagram",
          "image_search"
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          subimage_1 = result.info.url;
          console.log(subimage_1);

          this.setState({
            subimage_1: result.info.url
          });
        }
      }
    );
  };

  sub2_UploadWidget = e => {
    e.preventDefault();

    let subimage_2;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
          "url",
          "camera",
          "facebook",
          "dropbox",
          "instagram",
          "image_search"
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          subimage_2 = result.info.url;
          console.log(subimage_2);

          this.setState({
            subimage_2: result.info.url
          });
        }
      }
    );
  };

  sub3_UploadWidget = e => {
    e.preventDefault();

    let subimage_3;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
          "url",
          "camera",
          "facebook",
          "dropbox",
          "instagram",
          "image_search"
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          subimage_3 = result.info.url;
          console.log(subimage_3);

          this.setState({
            subimage_3: result.info.url
          });
        }
      }
    );
  };

  sub4_UploadWidget = e => {
    e.preventDefault();

    let subimage_4;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
          "url",
          "camera",
          "facebook",
          "dropbox",
          "instagram",
          "image_search"
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          subimage_4 = result.info.url;
          console.log(subimage_4);

          this.setState({
            subimage_4: result.info.url
          });
        }
      }
    );
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { sneakers, loading } = this.props.sneaker;
    const { profile } = this.props.profile;

    if (!profile) {
      return null;
    }

    let sneakerContent;

    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = <UserSneakers userId={profile.user._id} />;
    }

    return (
      <div className="yourSneakers">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="post-form contentBody mb-3">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>

              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="sneakerPictures">
                    <h5>
                      Upload some pictures for your sneaker <br />
                      Your can include a main photo, and up to four additional
                      photos
                    </h5>

                    <div className="mainImageRow">
                      <div className="col-md-12">
                        <div className="row">
                          <button
                            id="upload_widget"
                            className="btn btn-sole"
                            onClick={this.mainUploadWidget}
                          >
                            Upload a main Image
                          </button>

                          {this.state.mainimage === "" ? (
                            "  "
                          ) : (
                            <img
                              src={this.state.mainimage}
                              alt="..."
                            />
                          )}

                        </div>
                      </div>
                    </div>

                    <div className="subImagesRow row">
                      <div className="col-md-3">
                        <div className="row">
                          <button
                            id="upload_widget"
                            className="btn btn-sole"
                            onClick={this.sub1_UploadWidget}
                          >
                            Upload 2nd Image
                          </button>
                        </div>

                        <div className="row mt-2">
                          
                          {this.state.subimage_1 === "" ? (
                              "  "
                            ) : (
                              <img
                                src={this.state.subimage_1}
                                alt="..."
                              />
                          )}

                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="row">
                          <button
                            id="upload_widget"
                            className="btn btn-sole"
                            onClick={this.sub2_UploadWidget}
                          >
                            Upload 3rd Image
                          </button>
                        </div>

                        <div className="row mt-2">
                          {this.state.subimage_2 === "" ? (
                                "  "
                              ) : (
                                <img
                                  src={this.state.subimage_2}
                                  alt="..."
                                />
                            )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="row">
                          <button
                            id="upload_widget"
                            className="btn btn-sole"
                            onClick={this.sub3_UploadWidget}
                          >
                            Upload 4th Image
                          </button>
                        </div>

                        <div className="row mt-2">
                          {this.state.subimage_3 === "" ? (
                                  "  "
                                ) : (
                                  <img
                                    src={this.state.subimage_3}
                                    alt="..."
                                  />
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="row">
                          <button
                            id="upload_widget"
                            className="btn btn-sole"
                            onClick={this.sub4_UploadWidget}
                          >
                            Upload 5th Image
                          </button>
                        </div>

                        <div className="row mt-2">
                           {this.state.subimage_4 === "" ? (
                                "  "
                              ) : (
                                <img
                                  src={this.state.subimage_4}
                                  alt="..."
                                />
                            )}
                        </div>
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

                    <TextAreaFieldGroup
                      placeholder="Additional Info"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-sole">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="row">
            {sneakerContent}
          </div>
        </div>
      </div>
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
)(YourSneakers);
