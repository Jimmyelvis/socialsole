import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import { editArticle, getCurrentArticle } from "../../../actions/articleActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import isEmpty from "../../../validation/is-empty";


/*
  Similar to the component CreateArticle only this edits an existing
  article. This component is protected by a private
  route which not only checks to see if an user is logged in
  but also checks to see if that user has a role of "author"
*/

export class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullheaderimage: "",
      articleheaderimage: "",
      address: "",
      headline: "",
      text: "",
      _id: "",
      tags: "",
      errors: {},
    };

  }

  componentDidMount() {

    if(this.props.match.params.id){

      const  id  = this.props.match.params.id;
      this.props.getCurrentArticle(id);
      this.props.getCurrentProfile();

      this.setState({
        _id: id
      })

    } 

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.article.article) {
      const article = nextProps.article.article;

      // Bring tags array back to CSV
      let tagsCSV

      if (typeof article.tags !== "undefined") {
        tagsCSV = article.tags.join(',');
      }


      article.headline = !isEmpty(article.headline) ? article.headline : "";
      article.articleheaderimage = !isEmpty(article.articleheaderimage) ? article.articleheaderimage : "";
      article.fullheaderimage = !isEmpty(article.fullheaderimage) ? article.fullheaderimage : "";
      article.text = !isEmpty(article.text) ? article.text : "";
      article.address = !isEmpty(article.address) ? article.address : "";
      article.tags = !isEmpty(article.tags) ? article.tags : "";


      this.setState({
        headline: article.headline,
        fullheaderimage: article.fullheaderimage,
        articleheaderimage:article.articleheaderimage,
        text: article.text,
        address: article.address,
        tags:tagsCSV
      });
    }


  }

  onSubmit = (e) => {

    e.preventDefault();

    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    const newArticle = {
      fullheaderimage:this.state.fullheaderimage,
      articleheaderimage:this.state.articleheaderimage,
      address:this.state.address,
      headline:this.state.headline,
      text:this.state.text,
      email:this.state.email,
      author: user.name,
      avatar: user.avatar,
      _id:this.state._id,
      tags:this.state.tags

    };

    this.props.editArticle(this.state._id, newArticle, this.props.history);
    this.setState({
      text: "",
      errors: {}
    });

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(value) {
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

    let avatar;

    const cloudname = "dwgjvssdt";
     const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local"
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
          avatar = result.info.url;
          console.log(avatar);

          this.setState({
            fullheaderimage: result.info.url
          });
        }
      }
    );
  };

  articleHeaderSubmit = e => {
    e.preventDefault();

    let avatar;

    const cloudname = "dwgjvssdt";
    const uploadpresent = "ndilj3e8";

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local"
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
          avatar = result.info.url;
          console.log(avatar);

          this.setState({
            articleheaderimage: result.info.url
          });
        }
      }
    );
  };


  render() {

    const { errors } = this.state;
    // const { articles, loading } = this.props.article;
    // const { profile } = this.props.profile;

    return (
      <React.Fragment>
        <Navbar />

        <div className="container">
          <div className="create-edit-body contentbody">
            <h2 className="heading-2">Edit Article</h2>

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

                  <div className="uploadpreview">

                    <h4 className="heading-4">
                      Upload A Full Header Image
                    </h4>

                      <div className="fullArticleHeaderPreview">
                        {isEmpty(this.state.fullheaderimage) ? null : (
                          <img src={this.state.fullheaderimage} alt="" />
                        )}
                      </div>

                      <small>{this.state.errors.fullheaderimage}</small>
                    
                      <div className="upload-btn">

                        <button
                          id="upload_widget"
                          className="btn btn-lightblue"
                          onClick={this.fullArticleHeaderSubmit}
                        >
                          Upload Photo
                        </button>

                      </div>
                    
                  </div>

                  <div className="uploadpreview">

                    <h4 className="heading-4">
                      Upload A Article Header Image
                    </h4>

                      <div className="articleHeaderPreview">
                        {isEmpty(this.state.articleheaderimage) ? null : (
                          <img src={this.state.articleheaderimage} alt="" />
                        )}
                      </div>

                      <small>{this.state.errors.articleheaderimage}</small>
                  
                      <div className="upload-btn">

                        <button
                          id="upload_widget"
                          className="btn btn-lightblue"
                          onClick={this.articleHeaderSubmit}
                        >
                          Upload Photo
                        </button>

                      </div>

                  </div>

                  <ReactQuill
                    value={this.state.text}
                    onChange={this.handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-lightblue"
                >
                  Submit
                </button>

                <small>{this.state.errors.text}</small>
              </form>
            
          </div>
        </div>
      </React.Fragment>
    );

  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  article: state.article,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentArticle, editArticle, getCurrentProfile })(withRouter (ArticleEdit));
