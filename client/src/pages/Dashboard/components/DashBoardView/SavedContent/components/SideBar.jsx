import React, { useState} from "react";
import { Panel } from "components/ui/Panel";
import { ReactComponent as AddIcon } from "assets/img/add icon.svg"
import { ReactComponent as CheckMark } from "assets/img/Icon awesome-check.svg"
import { ReactComponent as Trash } from "assets/img/Icon material-delete.svg"
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { ImCheckmark } from "react-icons/im";
import { IoCloseCircle } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";



export const SideBar = ({ lists, setTheList, profileId, createList, deleteList }) => {

  /* Determines whether we show the create list input field */
  const [addingList, setAddingList] = useState(false)

  /* Holds the value of the create list input field */
  const [listName, setListName] = useState("");
  
  let content;

  const handleCreateListInput = (e) => {
    setListName(e.target.value);
  };


  /**
   * Creates a new list object which contains the
   * value of the listName state and the profileId of the
   * current user. Then calls the createList action
   * to create a new list in the database.
   */
  const createNewList = () => { 
    
    let newList = {
      name: listName,
      profileId: profileId,
    };

    createList(newList);

    // console.log("newList: ", newList);
   }

   /**
    * Deletes a currently saved list using the passed in
    * list object parameter. The list object will contain the 
    * list's id which will be used to delete the list from the database.
    */
   const deleteSavedList = (list) => {
      console.log("deleteSavedList: ", list);
      deleteList(list._id);
    };


  if (lists) {
    content = lists.map((list) => {
      return (
        <li 
          key={list._id} 
          id={list._id}
         
        >
          <h3
             onClick={() => {
              setTheList(list._id)
              }
            }
          >{list.name}</h3>

          <svg width="0" height="0">
            <linearGradient id={`orange-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#ff8c2e" offset="0%" />
              <stop stopColor="#fa7000" offset="100%" />
            </linearGradient>
          </svg>

          <AiTwotoneDelete className="icon icon-trash" onClick={() => deleteSavedList(list)} style={{ fill: `url(#orange-gradient)` }} />
        </li>
      );
    });
  } else {
    content = <h3>No Lists</h3>;
  }

  return (
    <Panel className="side-bar">
      <div className="add-list">
        <AddIcon className="add-icon" />

        <div className="list-creation">
          {
          /** 
           * If the addingList state is true that means that
           * the user is going to add a new list, so display the
           * text field and the checkmark icon. Otherwise, display the
           * Create New List button
           */
          
          addingList ? (
            <>
              <TextFieldGroup placeholder="Enter a name for your new list" name="listName" type="text" value={listName} onChange={handleCreateListInput} />

              <svg width="0" height="0">
                <linearGradient id={`green-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#47BEA9" offset="0%" />
                  <stop stopColor="#0A715F" offset="100%" />
                </linearGradient>
              </svg>

              <ImCheckmark 
                className="icon icon-check" 
                style={{ fill: `url(#green-gradient)` }}
                onClick={() => {
                  createNewList();
                }} 
              />

              <svg width="0" height="0">
                  <linearGradient id={`orange-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#ff8c2e" offset="0%" />
                    <stop stopColor="#fa7000" offset="100%" />
                  </linearGradient>
              </svg>

              <IoCloseCircle 
                className="icon icon-close"
                style={{ fill: `url(#orange-gradient)` }}
                onClick={() => {

                  /** Close the input form  */
                  setAddingList(!addingList);
                }}
              />
            </>
          ) : (
            <h3
              className="heading-3"
              onClick={() => {

                /** Show the input form so that the user can create a new
                  list */
                setAddingList(!addingList);
              }}
            >
              Create New List
            </h3>
          )}
        </div>
      </div>

      <ul className="lists">{content}</ul>
    </Panel>
  );
};
