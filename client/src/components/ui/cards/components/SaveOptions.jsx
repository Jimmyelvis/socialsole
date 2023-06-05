import { useState, useEffect, useRef } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Scrollbars } from "react-custom-scrollbars-2";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import Createicon from "assets/img/create-list.svg";
import { ImCheckmark } from "react-icons/im";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useSaveOptions } from "context/saveOptions";
import { v4 as uuidv4 } from "uuid";
import { getListItems,
  getCurrentProfile,
  createList,
  deleteList,
  saveToList
} from 'actions/profileActions';
import { connect } from "react-redux";


  /**
   * Any component that uses the SaveOptions component will need to pass in the useSavesList prop. This prop will be an array of objects that will contain the user's saved lists. In addition a unique id will need to be passed in as the svgId prop. This will be used to identify the parent element of the save menu. We need this to generate unique ids for the svg elements they will be rendered in each parent component that uses the SaveOptions component.
   * 
   */



export const Save_Options = ({ 
  useSavesList,
  type,
  itemId,
  profile: { profile, loading, currentList },
  createList,
  deleteList,
  saveToList,
  parentRef
}) => {



  const { menuOpen, setMenuOpen, postOptionsMenuClasses, setpostOptionsMenuClasses, setInnerMenu, innerMenu, activeItem } = useSaveOptions();

  // const parentRef = useRef();


  /*
    Holds an array of lists that the user has created, we get this from
    the Redux profile state
  */
  const [userLists, setUserLists] = useState([]);

  /**  This will be used to generate unique ids for the svg elements they will be rendered in each parent component that uses the SaveOptions component.*/
  const [svgId, setSvgId] = useState(null) 
  
  /**
   * Temporary state to hold the created lists. This will be replaced with a database call to get the user's created lists.
   */
  const [createdLists, setCreatedLists] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {

    setUserLists(profile.lists);
    setSvgId(uuidv4())
  }, [menuOpen, innerMenu]);

  /**
   * To be able to achieve the fade out effect, we need to first apply the fade-out class to the save menu list, which will turn the opacity to 0. Then, after 1 second, we apply the default-list-menu-closed class to the save menu list, which will set the display to none.
   */
  const closeMenu = () => {
    setpostOptionsMenuClasses("default-list-menu fade-out");

    setTimeout(() => {
      setMenuOpen(!menuOpen);
      setpostOptionsMenuClasses("default-list-menu default-list-menu-closed");
      setInnerMenu(null);
    }, 1000);
  };

  /**
   * This function will handle the input from the create list input field.
   * We will eventually move this to a separate component.
   */
  const handleCreateListInput = (e) => {
    setListName(e.target.value);
  };

  const deleteSavedList = (id) => {
    
    deleteList(id);
    let newList = userLists.filter((list) => list._id !== id);
    setUserLists(newList);
  };

  /**
   * This function will add the list name to the createdLists array.
   * We will eventually move this to a separate component.
   * */
  const addToCreatedLists = () => {
    let obj = {
      name: listName,
      profileId: profile._id,
    };

    setCreatedLists([...createdLists, obj]);
    createList(obj);
    setListName("");
  };


  const savePostToList = (listId) => {
    
    const newSave ={
      itemType:type,
      itemId: itemId,
      listId: listId
    }

    saveToList(newSave)
    console.log("newSave", newSave )
  }

  const backToDefaultMenu = () => {
    setpostOptionsMenuClasses("default-list-menu default-list-menu-open");
    setInnerMenu("default-menu");
  };



  const showDefaultMenu = () => {

    return (
      <ul className="default-list">

        {/* <li className="default-list-item">
          <svg width="0" height="0">
            <linearGradient id={`blue-gradient-${svgId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#9ED7FF" offset="0%" />
              <stop stopColor="#3592D4" offset="100%" />
            </linearGradient>
          </svg>

          <BsFillHeartFill className="icon icon-heart" style={{ fill: `url(#blue-gradient-${svgId})` }} />

          <span className="label">Save to Favorites</span>
        </li> */}

        <li className="default-list-item" onClick={showSaveListsMenu}>
          <svg width="0" height="0">
            <linearGradient id={`blue-gradient-${svgId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#9ED7FF" offset="0%" />
              <stop stopColor="#3592D4" offset="100%" />
            </linearGradient>
          </svg>

          <FaThList className="icon icon-list" style={{ fill: `url(#blue-gradient-${svgId})` }} />
          <span className="label">Save to List</span>
        </li>
        <li className="default-list-item" onClick={showCreateListMenu}>
          <svg width="0" height="0">
            <linearGradient id={`blue-gradient-${svgId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#9ED7FF" offset="0%" />
              <stop stopColor="#3592D4" offset="100%" />
            </linearGradient>
          </svg>

          <MdPlaylistAdd className="icon icon-playlist" style={{ fill: `url(#blue-gradient-${svgId})` }} />
          <span className="label">Create New List</span>
        </li>
      </ul>
    );
  };


  const showSaveListsMenu = () => {
    setInnerMenu("saved-lists");

    getSaveLists();
  };

  const getSaveLists = () => {

    return (
      <ul className="save-list">
        <Scrollbars
          style={{ width: "100%", height: "100%" }}
          // autoHide
          // autoHideTimeout={5000}
          // autoHideDuration={200}
          renderTrackVertical={(props) => <div {...props} className="track-vertical" />}
          renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
        >
          <li className="choose">Choose List</li>

          {userLists.map((list) => {

            return (
              <li className="save-list-item" key={list._id}>
                 <span 
                    className="list-name"
                    onClick={() => {
                      savePostToList(list._id);
                    }}
                 >
                    {list.name}
                  </span> 

                <svg width="0" height="0">
                  <linearGradient id={`orange-gradient-${svgId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#ff8c2e" offset="0%" />
                    <stop stopColor="#fa7000" offset="100%" />
                  </linearGradient>
                </svg>

                <AiTwotoneDelete className="icon icon-trash" onClick={() => deleteSavedList(list._id)} style={{ fill: `url(#orange-gradient-${svgId})` }} />
              </li>
            );
          })}
        </Scrollbars>
      </ul>
    );
  };

  const showCreateListMenu = () => {
    setInnerMenu("create-list");
    setCreatedLists([]);

    getCreateSavedList();
  };

  const getCreateSavedList = () => {
    return (
      <div className="create-list">
        <h3 className="heading-3">Create a new list to save this post to.</h3>

        <TextFieldGroup 
          placeholder="Enter a name for your list" 
          name="listName" 
          value={listName} 
          onChange={handleCreateListInput} 
          icon={Createicon} 
          iconClickFunction={addToCreatedLists} 
        />

        <ul className="save-list">
          <Scrollbars
            style={{ width: "100%", height: "100%" }}
            autoHide
            autoHideTimeout={5000}
            autoHideDuration={200}
            renderTrackVertical={(props) => <div {...props} className="track-vertical" />}
            renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
          >
            {createdLists.map((list) => {
              return (
                <li className="save-list-item" key={list.id}>
                  {list.name}

                  <svg width="0" height="0">
                    <linearGradient id={`green-gradient-${svgId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop stopColor="#47BEA9" offset="0%" />
                      <stop stopColor="#0A715F" offset="100%" />
                    </linearGradient>
                  </svg>

                  <ImCheckmark className="icon icon-check" style={{ fill: `url(#green-gradient-${svgId})` }} />
                </li>
              );
            })}
          </Scrollbars>
        </ul>
      </div>
    );
  };



  /**
   * Use this function to determine if the current element
   * is the one that activeItem is referring to. We do this 
   * by getting the parent element's id of the current element
   * and comparing it to the activeItem.
   * 
   * If they are the same, then we return the postOptionsMenuClasses
   * which is the class that shows the menu. If they are not the same,
   * then we return the class "hidden" which hides the menu.
   * 
   */

  const getClickedElement = () => {
    /**
     * We need another prop passed in to determine whether this is coming from a post, sneaker, or article. Depending on which one we will then have to adjust the parentRef.current.parentElement.id to match the id of the element that is being clicked. So for some we may have to ajust how many parentElements we have to go up to get the id of the element that is being clicked.
     * 
     * For example with sneakers we have to go up 2 levels (parentRef.current.parentElement.parentElement), where as with post we only have to go up one level
     */

   if (parentRef && parentRef.current && parentRef.current.parentElement) {

      
      if (parentRef.current && parentRef.current.id === activeItem) {
        return postOptionsMenuClasses;
      } else {
        return "hidden";
      }

    } else {
      return `${postOptionsMenuClasses} lists-panel`;
    }

  
  }

 


  return (
    <div className={getClickedElement()} >
      <IoEllipsisHorizontalSharp className="icon icon-ellipsis close-menu" onClick={() => closeMenu()} />

      {
        innerMenu !== "default-menu" ? 
        <IoArrowUndoSharp className="icon icon-undo" 
        onClick={() => backToDefaultMenu()} /> : null
       }

      {/** Determine which menu to show */}

      {innerMenu === "default-menu" ? showDefaultMenu() : innerMenu === "saved-lists" ? getSaveLists() : innerMenu === "create-list" ? getCreateSavedList() : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});



export const SaveOptions = connect(mapStateToProps, { getListItems, getCurrentProfile, createList, deleteList, saveToList })(Save_Options);