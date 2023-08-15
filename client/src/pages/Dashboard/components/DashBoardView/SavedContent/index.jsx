import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { SideBar } from './components/SideBar';
import { getListItems,
  getCurrentProfile,
  createList,
  deleteList,
} from 'actions/profileActions';
import { ListView } from './components/ListView';


export const Saved_Content = ({ 
  getListItems, createList, deleteList,
  profile: { profile, loading, currentList }
}) => {

  const [theList, setTheList] = useState(null)
  const [theListItems, setTheListItems] = useState([])

  let content;


  /**
   * Check to see if the profile is loaded, if so 
   * then set the list that will be displayed to the first list
   * in the profile, by getting the id of the first list
   */
  useEffect(() => {
    if (profile && profile.lists) {

      if (profile.lists.length !== 0) {
        setTheList(profile.lists[0]._id);
      }
    }
  }, [profile]);


  /**
   * If the theList state has been set, then call the getListItems action
   * using the theList state as the parameter, this will get the list items
   * from the database and set the state of the currentList in the profile reducer
   * to the list items that were returned from the database.
   */
  useEffect(() => {
    if (theList) {
      getListItems(theList);

    }
  }, [theList]);

  /**
   * If the Redux currentList state has been set, then set the theListItems state
   * to the currentList state. This will cause the ListView component to re-render
   * with the new list items. 
   */
  useEffect(() => {
    if (currentList) {
      setTheListItems(currentList);
    }
  }, [currentList]);


  if (profile === null || loading) {
    content = <Spinner />
  } else {
    content = (
      <>
        <SideBar 
          lists={profile.lists}
          setTheList={setTheList}
          profileId={profile._id}
          createList={createList}
          deleteList={deleteList}
        />
        <ListView listItems={theListItems} />
      </>
    )
  }


  return (
    <div className='saved-content'>
      {content}
      
      <div className='empty-element'>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export const SavedContent = connect(mapStateToProps, { getListItems, getCurrentProfile, createList, deleteList })(Saved_Content);