import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import Card from "components/ui/cards/Card";
import { getProfiles } from "actions/profileActions";
import { ProfileCard } from "components/ui/cards/ProfileCard";



/*
  View for displaying all the user profiles from the site. each post is
  displayed in a card format, using an instance of a reusable card component
*/

const Profiles = ({ getProfiles, profile }) => {

    const [search, setSearch] = useState("");

    /*
    This function is called when an onchange event occurs when the user
    types a search parameter in the search bar component. This sets state of the search term
    which is then used by the (filteredProfiles) variable to filter
    through the profiles
  */

    const updateSearch = (e) => {
      setSearch(e.target.value);
    };

    useEffect(() => {
      getProfiles();
    }, [getProfiles]);

  const { profiles, loading } = profile;

  let profileItems;

  let filteredProfiles = profiles.filter((profile) => {
    return profile.user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

   if (profiles === null || loading) {
    /* 
        Checks to see if the post state is null, if so then a loading spinner
        is displayed, this helps undefined error on first render
      */

    profileItems = <Spinner />;
  } else {
    profileItems = (
      <React.Fragment>
        {filteredProfiles.map((profile) => (
          // <Card key={profile._id} profile={profile} cardtype={"profile"} />
          <ProfileCard 
            key={profile._id} 
            id={profile._id}
            name={profile.user.name}
            avatar={profile.user.avatar}
            favSneaker={profile.favsneaker}
            bio={profile.bio}
            socials={profile.social}
            location={profile.location}
            handle={profile.handle}
          />
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className="profiles">

        <div className="pageheading">
          <h2 className="heading-2">Profiles</h2>
          <p>Browse and connect with sneaker lovers</p>
        </div>

        <div className="filteredSearch">
          <input type="text" placeholder="Filter By Name" value={search} onChange={updateSearch} className="form-control" />
        </div>

        <div className="profileItems">{profileItems}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});



export const AllProfiles = connect(mapStateToProps, { getProfiles })(Profiles);
