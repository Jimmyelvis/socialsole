import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "components/ui/avatar";
import { Panel } from "components/ui/Panel";
import isEmpty from "validation/is-empty";

export const MobileMenu = ({ isAuthenticated, checked, changechecked, authLinks, guestLinks, user, onClick, profile }) => {

  const [showSignInOptions, setShowSignInOptions] = useState(false);

  /**
   * When the user signs out we want to close the
   * signIn options dropdown panel
   */
  const closeSignedMenu = (e) => {
    onClick(e);
    setShowSignInOptions(false);
  }

  return (
    <div className="mobile-menu-contain">
      <input 
        type="checkbox" 
        className="toggler" 
        autocomplete="off" 
        checked={checked}
        onClick={(e) => {
          changechecked()
        }
      } 
      />

      <div className="hamburger">
        <div> </div>
      </div>

      <div className={checked === true ? "mobile-menu mobile-menu-shown" : "mobile-menu"}>
        {isAuthenticated && (
          <div className="mobile-menu-avatar" onClick={() => setShowSignInOptions(!showSignInOptions)}>
            <Avatar avatar={user && user.avatar} />
          </div>
        )}

        <ul className={checked === true ? "mobileLinkshown" : "mobileLinkshide"}>{isAuthenticated ? authLinks : guestLinks}</ul>

        {/**
         * To be able to position the signIn options dropdown
         * panel relative to the mobile menu, and NOT the signIn
         * Menu coomponent. We need to create a version of it here
         * as well
         */}

        <ul className={`${showSignInOptions ? "signedMenu-mobile signedMenu-mobile-show" : "signedMenu-mobile"}`}>
          <Panel className="signedMenuPanel">
            <li className="signinOption" 
              onClick={(e) => closeSignedMenu(e)}
            >
              Sign out
            </li>

            {
              !isEmpty(profile) && (
                <li className="signinOption">
                  <Link to={`/profile/${profile && profile.handle}`}>Profile</Link>
                </li>
              )
            }
                      
          </Panel>
        </ul>
      </div>
    </div>
  );
};
