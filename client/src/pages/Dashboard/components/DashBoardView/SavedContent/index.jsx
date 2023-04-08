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

  useEffect(() => {
    if (profile && profile.lists) {
      setTheList(profile.lists[0]._id);
    }
  }, [profile]);


  useEffect(() => {
    if (theList) {
      // memoizedGetListItems(theList);
      getListItems(theList);

    }
  }, [theList /*, memoizedGetListItems*/]);

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