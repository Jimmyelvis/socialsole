import React, { useEffect } from "react";
import { Widgetsetting } from "components/common/Cloudinary";
import TextFieldGroup from './Forms/TextFieldGroup';
import { Panel } from './Panel';
import { Button } from './buttons';
import { faker } from '@faker-js/faker';


export const Register = ({ onChange, onRegisterSubmit, email, password, password2, name, avatar, setvalues, values }) => {
  /*
    This function (avatarUploadWidget) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

  const avatarUploadWidget = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setvalues({
          ...values,
          avatar: result.info.url,
        });
      }
    });
  };

  // useEffect(() => {
  //   setvalues({
  //     ...values,
  //     avatar: faker.image.avatar(),
  //     name: faker.name.fullName(),
  //     email: faker.internet.email(),
  //     password: "panther",
  //     password2: "panther",  
  //   });
  // }, [])
  

  return (
    <div className="register-modal">
      <div className="formbg"></div>

      <Panel className="register-body">

          <div className="pageheading">
            <h2 className="heading-2">Sign Up</h2>
            <p>Create your SocialSole account</p>
          </div>

          <form noValidate onSubmit={onRegisterSubmit}>
            <TextFieldGroup placeholder="Name" name="name" value={name} onChange={onChange} />

            <TextFieldGroup placeholder="Email" name="email" type="email" value={email} onChange={onChange} />

            <TextFieldGroup placeholder="Password" name="password" type="password" value={password} onChange={onChange} />

            <TextFieldGroup placeholder="Confirm Password" name="password2" type="password" value={password2} onChange={onChange} />

            <div className="uploadpreview">
              <h4 className="heading-4">Upload a photo for your avatar</h4>

              {
                avatar ? (
                  <div className="avatarHeaderPreview">
                    <img src={avatar} alt="" /> 
                  </div>
                ) : ""
              }

              <div className="upload-btn">
                {/* <button id="upload_widget" className="btn btn-lightblue" onClick={avatarUploadWidget}>
                  Upload files
                </button> */}

                <Button id="upload_widget" primary onClick={avatarUploadWidget}>
                  Upload files
                </Button>
              </div>
            </div>


            <Button primary type="submit" className="btn-submit">
              Submit
            </Button>
          </form>
     

      </Panel>

    </div>
  );
};
