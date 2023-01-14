import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../ui/Forms/TextFieldGroup";
import Navbar from "../../components/layout/Navbar";

const Login = ({ loginUser, auth, history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth.isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    loginUser(userData);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login contentbody">
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1>Log In</h1>
            <p>Sign in to your SocialSole account</p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup placeholder="Email Address" name="email" type="email" value={email} onChange={onChange} />

              <TextFieldGroup placeholder="Password" name="password" type="password" value={password} onChange={onChange} />

              <input type="submit" className="btn btn-sole btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
