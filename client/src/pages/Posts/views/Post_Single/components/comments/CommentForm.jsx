import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from 'components/common/TextAreaFieldGroup';
import { addComment } from 'actions/postActions';
import { getCurrentProfile } from 'actions/profileActions';
import { setAlert } from 'actions/alert';





class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    const { profile } = this.props.profile;
    const { postId } = this.props;


    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: profile.user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: '', errors: {} });
    this.props.setAlert('Comment Added', 'danger');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {

    const { errors } = this.state;

    return (
      <React.Fragment>
          <div className="commentsheader"> 
            Make a comment...
          </div>
            <form className="commentForm" onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                    placeholder="Reply to  post"
                    name="text"
                    value={this.state.text}
                    onChange={this.onChange}
                    error={errors.text}
                  />
              </div>
              <button type="submit" className="btn btn-lightblue">
                Submit
              </button>
            </form>
      </React.Fragment>
    )
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment, getCurrentProfile, setAlert })(CommentForm);
