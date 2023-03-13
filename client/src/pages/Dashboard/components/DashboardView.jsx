import React from 'react'

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

/*
  switch (currentView) {
    case "timeline":
      return <TimelineView />
    case "edit-profile":
      return <EditProfileView />
    case "create-post":
      return <CreatePostView />
    case "create-sneaker":
      return <CreateSneakerView />
    case "your-comments":
      return <YourCommentsView />
    default:
      return <TimelineView />
  }
  

*/

export const DashboardView = () => {
  return (
    <div>DashboardView</div>
  )
}
