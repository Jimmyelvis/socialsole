import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { withRouter, Redirect } from "react-router-dom";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import { addPost } from "../../../actions/postActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../layout/CommNavbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "../../common/Cloudinary";


/*
  Component for displaying and implementing the ability
  to create a post. This component is protected by a private
  route which checks to see if an user is logged in
*/

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerimage: "",
      headline: "",
      text: "",
      tags: "",
      errors: {}
    };


  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      headerimage: this.state.headerimage,
      headline: this.state.headline,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      tags: this.state.tags
    };

    this.props.addPost(newPost, this.props.history);
    this.setState({
      text: "",
      errors: {}
    });
  }

  /*
    This function (fileselectedhandler) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

  fileselectedhandler = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            headerimage: result.info.url
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
    const { errors, success } = this.state;
    const { posts, loading } = this.props.post;
    const { profile } = this.props.profile;

    if (!profile) {
      return null;
    }

    let postContent;

   

    return (
      <React.Fragment>
        <Navbar />

        <div className="container">
          
            <div className="create-edit-body contentbody">
               
                <h2 className="heading-2">Create a Post</h2>
                <div className="card-body">


                  <form onSubmit={this.onSubmit}>
                  
                    <div className="uploadpreview">
                      <h4 className="heading-4">Upload a picture for your post</h4>

                      <div className="profileHeaderPreview">
                        <img src={this.state.headerimage} alt="" />
                      </div>

                      <div className="upload-btn">
                        <button
                          id="upload_widget"
                          className="btn btn-lightblue"
                          onClick={this.fileselectedhandler}
                        >
                          Upload a picture
                        </button>
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

                      <ReactQuill
                        placeholder="Create a post"
                        value={this.state.text}
                        onChange={this.handleChange}
                        error={errors.text}
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
  errors: state.errors,
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addPost, getCurrentProfile }
)(withRouter (CreatePost));
