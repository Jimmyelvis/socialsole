import { AuthorHeader } from "components/ui/headers/authorHeader";
import { CardFooter } from "components/ui/cards/components/CardFooter";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { SaveOptions } from "../components/SaveOptions";
import { useState, useEffect } from "react";


export const CardPost = ({ author, date, headline, excerpt, likesNumber, commentsNumber, postImage, useSavesList  }) => {


  /*
   TODO: We need to move menuOpen, setMenuOpen, postOptionsMenuClasses, setpostOptionsMenuClasses, setInnerMenu, innerMenu to context or redux store So this state, and actions can be accessed by the SaveOptions component. If successful then we would just need to provide the SaveOptions component with the useSavesList prop. 
  */

  // /* Determine whether the save menu list is open or closed */
  const [menuOpen, setMenuOpen] = useState(false);

  /* We use the innerMenu state to determine which menu to display. If the innerMenu state is null, we display the default menu. If the innerMenu state is "create-list", we display the create list menu. */
  const [innerMenu, setInnerMenu] = useState(null);

  const [postOptionsMenuClasses, setpostOptionsMenuClasses] = useState("default-list-menu default-list-menu-closed");

  const openMenu = () => {
    setMenuOpen(!menuOpen);
    setpostOptionsMenuClasses("default-list-menu default-list-menu-open");
    setInnerMenu("default-menu");
  };

  return (
    <div className="card-post">
      <SaveOptions
        useSavesList={useSavesList}

        /*
          TODO: Pass the rest below to context api or redux store so they can be accessed by the SaveOptions component.
        */
       
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        postOptionsMenuClasses={postOptionsMenuClasses}
        setpostOptionsMenuClasses={setpostOptionsMenuClasses}
        setInnerMenu={setInnerMenu}
        innerMenu={innerMenu}
      />

      <div className="top">
        <div className="card-header">
          <AuthorHeader author={author} date={date} />
          <IoEllipsisHorizontalSharp className="icon icon-ellipsis open-menu" onClick={() => openMenu()} />
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
