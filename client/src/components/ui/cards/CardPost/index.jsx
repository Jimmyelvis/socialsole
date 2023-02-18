import { useState, useEffect } from "react";
import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { BsFillHeartFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Scrollbars } from "react-custom-scrollbars-2";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import Createicon from "assets/img/create-list.svg";
import { ImCheckmark } from "react-icons/im";
import { AiTwotoneDelete } from "react-icons/ai";


export const CardPost = ({ author, date, headline, excerpt, likesNumber, commentsNumber, postImage, useSavesList  }) => {


  /* Determine whether the save menu list is open or closed */
  const [menuOpen, setMenuOpen] = useState(false);

  /* We use the postOptionsMenuClasses state to determine which class to apply to the save menu list */
  const [postOptionsMenuClasses, setpostOptionsMenuClasses] = useState("default-list-menu default-list-menu-closed");

  /* We use the innerMenu state to determine which menu to display. If the innerMenu state is null, we display the default menu. If the innerMenu state is "create-list", we display the create list menu. */
  const [innerMenu, setInnerMenu] = useState(null);

  const [userLists, setUserLists] = useState([])


  /**
   * Temporary state to hold the created lists. This will be replaced with a database call to get the user's created lists.
   */
  const [createdLists, setCreatedLists] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    setUserLists(useSavesList)
  }, [])

  
  

  /**
   * To be able to achieve the fade out effect, we need to first apply the fade-out class to the save menu list, which will turn the opacity to 0. Then, after 1 second, we apply the default-list-menu-closed class to the save menu list, which will set the display to none.
   */
  const closeMenu = () => {

    setpostOptionsMenuClasses("default-list-menu fade-out");

    setTimeout(() => {
      setMenuOpen(!menuOpen);
      setpostOptionsMenuClasses("default-list-menu default-list-menu-closed");
      setInnerMenu(null)
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

    let newList = userLists.filter((list) => list.id !== id);

    setUserLists(newList);

  };

  /**
   * This function will add the list name to the createdLists array.
   * We will eventually move this to a separate component.
   * */
  const addToCreatedLists = () => { 

    let obj = {
      id: Math.floor(Math.random() * 1000),
      itemsnumber: Math.floor(Math.random() * 1000),
      name: listName,
    };

    setCreatedLists([...createdLists, obj]);
    setUserLists([...userLists, obj]);
    setListName("");
    console.log("created lists", createdLists);
   }

  const backToDefaultMenu = () => { 
    setpostOptionsMenuClasses("default-list-menu default-list-menu-open");
    setInnerMenu("default-menu")
   }


  const openMenu = () => { 
    setMenuOpen(!menuOpen);
    setpostOptionsMenuClasses("default-list-menu default-list-menu-open");
    setInnerMenu("default-menu")
  }

  const showDefaultMenu = () => { 
    
    return (
      <ul className="default-list">
        <li className="default-list-item">
          <svg width="0" height="0">
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#9ED7FF" offset="0%" />
              <stop stopColor="#3592D4" offset="100%" />
            </linearGradient>
          </svg>

          <BsFillHeartFill className="icon icon-heart" style={{ fill: "url(#blue-gradient)" }} />
          <span className="label">Save to Favorites</span>
        </li>
        <li className="default-list-item" onClick={showSaveListsMenu}>
          <svg width="0" height="0">
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#9ED7FF" offset="0%" />
              <stop stopColor="#3592D4" offset="100%" />
            </linearGradient>
          </svg>

          <FaThList className="icon icon-list" style={{ fill: "url(#blue-gradient)" }} />
          <span className="label">Save to List</span>
        </li>
        <li className="default-list-item" onClick={showCreateListMenu}>
          <svg width="0" height="0">
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#9ED7FF" offset="0%" />
              <stop stopColor="#3592D4" offset="100%" />
            </linearGradient>
          </svg>

          <MdPlaylistAdd className="icon icon-playlist" style={{ fill: "url(#blue-gradient)" }} />
          <span className="label">Add to Playlist</span>
        </li>
      </ul>
    );
   }

  const postOptionsMenu = () => { 
    return (
      <div className={postOptionsMenuClasses}>
        <IoEllipsisHorizontalSharp className="icon icon-ellipsis close-menu" onClick={() => closeMenu()} />

        {innerMenu !== "default-menu" ? <IoArrowUndoSharp className="icon icon-undo" onClick={() => backToDefaultMenu()} /> : null }
        
        {/**
          Determine which menu to show
         */}
        {innerMenu === "default-menu" ? showDefaultMenu() : innerMenu === "saved-lists" ? getSaveLists() : innerMenu === "create-list" ? getCreateSavedList() : null }

        
        
      </div>
    );
  }

  const showSaveListsMenu = () => {
    
    setInnerMenu("saved-lists")
    getSaveLists()
  }

  const getSaveLists = () => {

    console.log("called getSaveLists");
    
    return (
      <ul className="save-list">
        <Scrollbars 
          style={{ width: "100%", height: "100%" }}
          // autoHide
          // autoHideTimeout={5000}
          // autoHideDuration={200}
          renderTrackVertical={props => <div {...props} className="track-vertical"/>}
          renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
        >

          <li className="choose">Choose List</li>

          {userLists.map((list) => {

            console.log("called map");

            return (
            <li className="save-list-item" key={list.id}>
              {list.name}

              <svg width="0" height="0">
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#ff8c2e" offset="0%" />
                  <stop stopColor="#fa7000" offset="100%" />
                </linearGradient>
              </svg>

              <AiTwotoneDelete 
                className="icon icon-trash" 
                onClick={() => deleteSavedList(list.id)} 
                style={{ fill: "url(#blue-gradient)" }} 
              />
                
            </li>
            );
          })}
        </Scrollbars>

      
      </ul>
    );
  }
  

  const showCreateListMenu = () => {
    setInnerMenu("create-list")
    setCreatedLists([])

   getCreateSavedList()
  };

 const getCreateSavedList = () => {
    return (
      <div className="create-list">
        <h3 className="heading-3">Create a new list to save this post to.</h3>

        <TextFieldGroup
          placeholder="Enter a name for your list"
          name="listName"
          value={listName}
          onChangeFunction={handleCreateListInput}
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
                    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop stopColor="#47BEA9" offset="0%" />
                      <stop stopColor="#0A715F" offset="100%" />
                    </linearGradient>
                  </svg>

                  <ImCheckmark className="icon icon-check" style={{ fill: "url(#blue-gradient)" }} />
                </li>
              );
            })}
          </Scrollbars>
        </ul>
      </div>
    );
  }


  return (
    <div className="card-post">
      
      {postOptionsMenu()}

      <div className="top">
        <div className="card-header">
          <AuthorHeader author={author} date={date} />
          <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" 
          onClick={() => openMenu()} />
        </div>

        <div className="headline">
          <h3 className="heading-3">{headline}</h3>
        </div>

        <div className="post-image">
          <img src={postImage} alt="post" />
        </div>
      </div>

      <div className="bottom">
        <p className="excerpt">{excerpt}</p>

        <CardFooter likesNumber={likesNumber} commentsNumber={commentsNumber} />
      </div>

    </div>
  );
};
