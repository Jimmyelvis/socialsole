import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import { editPost, getPost } from "../../../actions/postActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../../layout/CommNavbar";
import isEmpty from "../../../validation/is-empty";
import { Widgetsetting } from "../../common/Cloudinary";


/*
  Similar to the component CreatePost only this edits an existing
  post. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

export class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      headerimage: "",
      headline: "",
      text: "",
      tags: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }



  componentDidMount() {

    if (this.props.match.params.id) {

      const  id  = this.props.match.params.id;
      this.props.getPost(id);
      this.props.getCurrentProfile();


      this.setState({
      _id:id
      })
      
    } 
    
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.post.post) {
      const post = nextProps.post.post;

      // Bring tags array back to CSV
      let tagsCSV

      if (typeof post.tags !== "undefined") {
        tagsCSV = post.tags.join(',');
      }

      post.headline = !isEmpty(post.headline) ? post.headline : "";
      post.headerimage = !isEmpty(post.headerimage) ? post.headerimage : "";
      post.text = !isEmpty(post.text) ? post.text : "";
      post.tags = !isEmpty(post.tags) ? post.tags : "";
      


      this.setState({
        headline: post.headline,
        headerimage: post.headerimage,
        text: post.text,
        tags:tagsCSV
      })
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
      tags:this.state.tags
    };

    this.props.editPost(this.state._id, newPost, this.props.history );
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

  

    return (
      <React.Fragment>
        <Navbar />

        <div className="container">
          
            <div className="create-edit-body contentbody">

                <h2 className="heading-2">Edit Post</h2>

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
  { editPost, getPost, getCurrentProfile }
)(withRouter (EditPost));
