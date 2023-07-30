import { Avatar } from "components/ui/avatar"
import isEmpty from "utils/is-empty";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";


export const FriendsCard = ({ name, avatar, profileHeader, city, socials, id, handle }) => {

  return (
    <div className="friends-card">
      <div className="top">
        <Avatar avatar={avatar} />

        <img src={profileHeader} alt="" className="imgBg" />
      </div>

      <div className="bottom">
        <Link to={`/profile/${handle}`} className="link">
          <div className="name">{name}</div>
        </Link>
        <div className="city">{city}</div>

        <ul className="socials">
          {isEmpty(socials && socials.youtube) ? null : (
            <li>
              <a href={socials.youtube} target="_blank" rel="noreferrer">
                <FaYoutube className="icon icon-list" style={{ fill: `url(#blue-gradient-${id})` }} />

                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>
              </a>
            </li>
          )}

          {isEmpty(socials && socials.facebook) ? null : (
            <li>
              <a href={socials.facebook} target="_blank" rel="noreferrer">
                <FaFacebook className="icon icon-list" style={{ fill: `url(#blue-gradient-${id})` }} />

                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>
              </a>
            </li>
          )}

          {isEmpty(socials && socials.twitter) ? null : (
            <li>
              <a href={socials.twitter} target="_blank" rel="noreferrer">
                <FaTwitter className="icon icon-list" style={{ fill: `url(#blue-gradient-${id})` }} />

                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>
              </a>
            </li>
          )}

          {isEmpty(socials && socials.instagram) ? null : (
            <li>
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <FaInstagram className="icon icon-list" style={{ fill: `url(#blue-gradient-${id})` }} />

                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
