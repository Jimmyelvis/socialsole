import { Panel } from 'components/ui/Panel'
import { Avatar } from 'components/ui/avatar'
import { Sectionheading } from 'components/ui/headers/Sectionheading';

export const FollowersModal = ({
  followers
}) => {

  const renderFollowers = () => {

    return followers.map((follower, index) => {
      return (
        <div className="follower" key={follower.email}>
          <Avatar avatar={follower.user.avatar} />

          <h3 className="heading-3">
            {follower.user.name}
          </h3>
        </div>
      )
    })
  }


  return (
    <Panel className="followers-modal">
      <Sectionheading
        heading="Followers"
      />

      <div className="followers">
        {renderFollowers()}
      </div>

    </Panel>
  )
}
