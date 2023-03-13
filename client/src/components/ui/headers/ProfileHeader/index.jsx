import { Avatar } from "components/ui/avatar";
import { Panel } from "components/ui/Panel";
import isEmpty from "utils/is-empty";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

export const ProfileHeader = ({ name, id, avatar, favSneaker, location, socials }) => {
  return (
    <Panel frosted className="profileHeader">
      <div className="left">
        <Avatar avatar={avatar} />
      </div>

      <div className="middle">
        <h2 className="heading-2 name">{name}</h2>

        <h3 className="heading-3 fav-sneaker">
          Favorite Sneaker
          <span className="sneaker">{favSneaker}</span>
        </h3>
        <h3 className="heading-3 location">{location}</h3>
      </div>

      <div className="right">
        <ul className="socials">
          {isEmpty(socials && socials.youtube) ? null : (
            <li>
              <a href={socials.youtube} target="_blank" rel="noreferrer">
                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>

                <BsYoutube className="icon icon-youtube" style={{ fill: `url(#blue-gradient-${id})` }} />
              </a>
            </li>
          )}

          {isEmpty(socials && socials.facebook) ? null : (
            <li>
              <a href={socials.facebook} target="_blank" rel="noreferrer">
                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>

                <BsFacebook className="icon icon-facebook" style={{ fill: `url(#blue-gradient-${id})` }} />
              </a>
            </li>
          )}

          {isEmpty(socials && socials.twitter) ? null : (
            <li>
              <a href={socials.twitter} target="_blank" rel="noreferrer">
                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>

                <AiFillTwitterCircle className="icon icon-twitter" style={{ fill: `url(#blue-gradient-${id})` }} />
              </a>
            </li>
          )}

          {isEmpty(socials && socials.instagram) ? null : (
            <li>
              <a href={socials.instagram} target="_blank" rel="noreferrer">
                <svg width="0" height="0">
                  <linearGradient id={`blue-gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#9ED7FF" offset="0%" />
                    <stop stopColor="#3592D4" offset="100%" />
                  </linearGradient>
                </svg>

                <AiFillInstagram className="icon icon-instagram" style={{ fill: `url(#blue-gradient-${id})` }} />
              </a>
            </li>
          )}
        </ul>
      </div>
    </Panel>
  );
};
