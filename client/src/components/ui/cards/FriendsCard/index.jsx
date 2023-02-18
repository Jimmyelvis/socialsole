import { Avatar } from "components/ui/avatar"
import isEmpty from "utils/is-empty";


export const FriendsCard = ({ name, avatar, profileHeader, city, socials }) => {

  return <div className="friends-card">



    <div className="top">

      <Avatar avatar={avatar} />
      
      <img src={profileHeader} alt="" className="imgBg" />
    </div>

    <div className="bottom">
      <div className="name">{name}</div>
      <div className="city">{city}</div>

      <ul className="socials">
        {
          isEmpty(socials && socials.youtube) ? null : <li><a href={socials.youtube} target="_blank" rel="noreferrer">youtube</a></li>
        }

        {
          isEmpty(socials && socials.facebook) ? null : <li><a href={socials.facebook} target="_blank" rel="noreferrer">facebook</a></li>
        }

        {
          isEmpty(socials && socials.twitter) ? null : <li><a href={socials.twitter} target="_blank" rel="noreferrer">twitter</a></li>
        }

        {
          isEmpty(socials && socials.instagram) ? null : <li><a href={socials.instagram} target="_blank" rel="noreferrer">instagram</a></li>
        }
      </ul>
    </div>
  </div>;
}
