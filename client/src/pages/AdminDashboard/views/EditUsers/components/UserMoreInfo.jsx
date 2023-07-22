import React, { useState, useEffect } from 'react'
import { Panel } from 'components/ui/Panel'
import { Avatar } from "components/ui/avatar";
import { Button } from 'components/ui/buttons';
import { changeUserRole } from 'actions/authActions';
import { connect } from 'react-redux';


const User_MoreInfo = ({
  user,
  changeUserRole
}) => {

  let selectOptions;

  const [role, setRole] = useState(null);

  const roles = [
    "subscriber",
    "author",
    "admin"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    changeUserRole(user._id, role)
  };


  return (
    <Panel className="user-more-info">
      <Avatar className="user-more-info__avatar" avatar={user.avatar} />

      <div className="user-more-info__content">
        <h3 className="heading-3 user-more-info__content-name">{user.name}</h3>
        <h4 className="heading-4 user-more-info__content-role">
         Role: <span className="user-role">{user.role}</span> 
        </h4>
        <h4 className="heading-4 user-more-info__content-id">
          User ID: <span className="user-id">{user._id}</span> 
        </h4>
        <h4 className="heading-4 user-more-info__content-email">
         Email: <span className="user-email">{user.email}</span>
        </h4>


        <div className="selector">
          <select
            className="select-input"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {/**
             * First get the current user role, then use the getuserRoles
             * helper to return the text
             */}
            <option value={user.role}>{user.role}</option>

            {/**
             * Get the other roles the is not currently assign to the user
             */}
            {(selectOptions = roles.filter((role) => role !== user.role))}

            {selectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div class="custom-arrow"></div>

        </div>

          <Button
            className="btn btn-submit"
            primary
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Change Role
          </Button>

      </div>

    </Panel>
  );
}

export const UserMoreInfo = connect(null, { changeUserRole })(User_MoreInfo);
