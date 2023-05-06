import { Avatar } from "components/ui/avatar";
import { Button } from "components/ui/buttons";
import { Panel } from "components/ui/Panel";
import isEmpty from "utils/is-empty";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";


export const ProfileCard = ({
  id,
  name,
  avatar,
  favSneaker,
  location,
  bio,
  socials,
  handle
}) => {


  return (
    <Panel className="profileCard">
      <div className="left">
        <Avatar avatar={avatar} />

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

      <div className="right">
        <h2 className="heading-2 name">{name}</h2>
        <h3 className="heading-3 fav-sneaker">
          Favorite Sneaker:
          <span className="sneaker">{favSneaker}</span>
        </h3>
        <h3 className="heading-3 location">{location}</h3>
        <div className="bio">
          { bio && parse(bio)}
        </div>
      </div>

      <Link to={`/profile/${handle}`} className="view-profile">
        <Button primary rounded>View Profile</Button>
      </Link>

    </Panel>
  );
}
