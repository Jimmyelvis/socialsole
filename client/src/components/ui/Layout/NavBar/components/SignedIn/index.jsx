import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'components/ui/avatar'

export const SignedIn = ({ user, onClick, profile }) => {

  // const { avatar, name } = user



  return (
    <div className="signedMenu">
      <Avatar avatar={user && user.avatar} />
      <h3 className="name">{user && user.name}</h3>

      <ul className="signinOptions">
        <li className="signinOption" onClick={onClick}>
          Sign out
        </li>

        <li className="signinOption">
          <Link to={`/profile/${profile && profile.handle}`}>Profile</Link>
        </li>
      </ul>
    </div>
  );
}
