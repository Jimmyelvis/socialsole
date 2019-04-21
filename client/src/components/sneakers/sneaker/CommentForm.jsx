import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/sneakerActions';



class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }


  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { sneakerId } = this.props;


    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(sneakerId, newComment);
    this.setState({ text: '', errors: {} });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {


    return (
      <div className="post-form">
          <div className="card-header bg-info text-white"> Make a comment...</div>
            <form className="commentForm" onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                    placeholder="Reply to post"
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
    )
  }
}

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  sneakerId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
