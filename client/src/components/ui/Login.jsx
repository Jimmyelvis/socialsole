import React from "react";
import TextFieldGroup from "./Forms/TextFieldGroup";
import { Button } from "./buttons";

export const Login = ({ 
  onChange, 
  onLoginSubmit, 
  email,
  password,
}) => {
  return (
    <div className="login-modal">

      <div className="loginbody">
        <div className="left"></div>

        <div className="right">

          <h2 className="heading-2">Welcome</h2>
          <p>Sign in to your SocialSole account</p>

          <form className="form-group" onSubmit={onLoginSubmit}>

              <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
              />

              <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
              />


              <Button primary type="submit">
                Login
              </Button>

          </form>
        
        </div>

        <div className="bgimg">
          <img src="/assets/img/pexels-photo-2474507@2x.jpg" alt=""/>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};
