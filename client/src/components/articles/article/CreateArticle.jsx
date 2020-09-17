import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "../../common/Spinner";
import { addArticle } from "../../../actions/articleActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../../components/layout/CommNavbar";
import TextFieldGroup from "../../common/TextFieldGroup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import isEmpty from '../../../validation/is-empty';
import { Widgetsetting } from "../../common/Cloudinary";



/*
  Component for displaying and implementing the ability
  to create an article. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/


export class CreateArticle extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      fullheaderimage: "",
      articleheaderimage: "",
      headline: "",
      text: "",
      email: "",
      tags: "",
      errors: {}
    };

  }


  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {

    e.preventDefault();


    const { user } = this.props.auth;

    const newArticle = {
      fullheaderimage:this.state.fullheaderimage,
      articleheaderimage:this.state.articleheaderimage,
      headline:this.state.headline,
      text:this.state.text,
      email:this.state.email,
      author: user.name,
      avatar: user.avatar,
      tags: this.state.tags

    };

    this.props.addArticle(newArticle, this.props.history);
    this.setState({
      text: "",
      errors: {}
    });

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (value) => {
    this.setState({ text: value })
  }

  /*
    These functions (fullArticleHeaderSubmit), and 
    (articleHeaderSubmit) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */
  fullArticleHeaderSubmit = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            fullheaderimage: result.info.url
          });
        }
      }
    );
  };

  articleHeaderSubmit = e => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {

          this.setState({
            articleheaderimage: result.info.url
          });
        }
      }
    );
  };

  render() {

    const { errors, success } = this.state;
    const { articles, loading } = this.props.article;
    const { profile } = this.props.profile;

    return (
      <React.Fragment>
        <Navbar />

        <div className="container">
          <div className="create-edit-body contentbody">
            <h2 className="heading-2">Create Article</h2>

              <form onSubmit={this.onSubmit}>

                <div className="form-group">

                  <TextFieldGroup
                    placeholder="Headline goes here"
                    name="headline"
                    value={this.state.headline}
                    onChange={this.onChange}
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

                  {this.state.errors.address}


                  <div className="uploadpreview">

                    <h4 className="heading-4">
                      Upload A Full Header Image
                    </h4>

               
                      <div className="fullArticleHeaderPreview">
                        {
                          isEmpty(this.state.fullheaderimage) ? null : (
                            <img src={this.state.fullheaderimage} />
                          )
                        }
                        
                      </div>

                      <div className="upload-btn">
                        <button
                          id="upload_widget"
                          className="btn btn-lightblue"
                          onClick={this.fullArticleHeaderSubmit}
                        >
                          Upload Photo
                        </button>
                      </div>


                      <small className="errorsmsg"> {this.state.errors.fullheaderimage} </small>

                  </div>

                  <div className="uploadpreview">
                    
                    <h4 className="heading-4">
                      Upload A Article Header Image
                    </h4>

                    <div className="articleHeaderPreview">
                        {
                          isEmpty(this.state.articleheaderimage) ? null : (
                            <img src={this.state.articleheaderimage} />
                          )
                        }
                      </div>


                      <div className="upload-btn">

                        <button
                          id="upload_widget"
                          className="btn btn-lightblue"
                          onClick={this.articleHeaderSubmit}
                        >
                          Upload Photo
                        </button>

                      </div>

                     
                      <small className="errorsmsg"> {this.state.errors.articleheaderimage}</small>
                    
                  </div>

                  <ReactQuill
                    value={this.state.text}
                    onChange={this.handleChange}
                  />
                  
                </div>

                

                <button type="submit" className="btn btn-lightblue">
                  Submit
                </button>

                <small>
                          {this.state.errors.text}
                  </small>
              </form>
            
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  article: state.article,
  profile: state.profile
});


export default connect(
  mapStateToProps,
  { addArticle, getCurrentProfile }
)(withRouter (CreateArticle));