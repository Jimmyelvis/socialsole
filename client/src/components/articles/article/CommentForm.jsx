import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../../actions/articleActions';
import CommentsSection from '../../common/CommentsSection'


export class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      msg: ''
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
    const { articleId} = this.props;
    const { handle } = this.props;


    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      handle: handle
    };

    this.props.addComment(articleId, newComment);
    this.setState({ text: '', errors: {} });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    
    const { errors } = this.state;



    return (
     <CommentsSection  
        errors={this.state.errors} 
        onSubmit={this.onSubmit} 
        text={this.state.text}
        onChange={this.onChange}
    />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);

