import React from 'react'
import { TimeLine } from './TimeLine'
import { YourComments } from './Yourcomments'
import { LikedContent } from '../LikedContent'
import { SavedContent } from './SavedContent'
import { Notifications } from './Notifications'

/**
 *  The parent container (Dashboard Home) will hold the view state
 * ie.. (currentView), and the useSate function (changeCurrentView).
 * The function will be to the DashboardTabs component as a prop.
 * 
 * The DashboardTabs component will hold the links to the different
 * views. When a link is clicked, the changeCurrentView function will
 * be called, and the currentView state will be updated, in the parent.
 * 
 * The currentView state will be passed to the DashboardView component,
 * this component will use a switch statement to determine which view
 * should be rendered.
 */



export const DashboardView = ({ currentView, profile, loading, user }) => {


  const getView = () => {

    switch (currentView) {
      case "timeline":
        return <TimeLine profile={profile} loading={loading} user={user} />
      case "your-comments":
        return <YourComments profile={profile} loading={loading} user={user} />
      case "liked-content":
        return <LikedContent />
      case "saved-content":
        return <SavedContent />
      case "notifications":
        return <Notifications />
      default:
        return <TimeLine />
    }
  }

  return (
    <div className='dash-view'>
      {getView()}
    </div>
  )
}
