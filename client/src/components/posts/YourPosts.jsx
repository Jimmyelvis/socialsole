import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addPost } from "../../actions/postActions";
import UserPosts from "./UserPosts";
import { getCurrentProfile } from "../../actions/profileActions";
import Navbar from "../../components/layout/Navbar";

export class YourPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerimage: "",
      headline: "",
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      headerimage: this.state.headerimage,
      headline: this.state.headline,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({
      text: "",
      errors: {}
    });
  }

  fileselectedhandler = e => {
    e.preventDefault();

    let headerimage;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
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
          headerimage = result.info.url;
          console.log(headerimage);

          this.setState({
            headerimage: result.info.url
          });
        }
      }
    );
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, success } = this.state;
    const { posts, loading } = this.props.post;
    const { profile } = this.props.profile;

    if (!profile) {
      return null;
    }

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <UserPosts userId={profile.user._id} />;

      // console.log('====================================');
      // console.log(profile.user._id);
      // console.log('====================================');
    }

    return (
      <div className="yourPosts">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="post-form contentBody mb-3">
                <div className="card-header bg-info text-white">
                  Say Somthing...
                </div>
                <div className="card-body">


                  <form onSubmit={this.onSubmit}>
                  
                    <div className="headlinePic">
                      <h5>Upload a picture for your post</h5>

                      <div className="row">
                        <div className="col-md-4">
                          <button
                            id="upload_widget"
                            className="btn btn-sole"
                            onClick={this.fileselectedhandler}
                          >
                            Upload a picture
                          </button>
                        </div>

                        <div className="profileHeaderPreview col-md-8">
                          <img src={this.state.headerimage} />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <TextFieldGroup
                        placeholder="Headline goes here"
                        name="headline"
                        value={this.state.headline}
                        onChange={this.onChange}
                        error={errors.text}
                      />

                      <TextAreaFieldGroup
                        placeholder="Create a post"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
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
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addPost, getCurrentProfile }
)(YourPosts);
