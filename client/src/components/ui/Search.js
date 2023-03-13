import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useModal } from "context/modalContext";


const Search = () => {
  const refContainer = useRef(null);

  const [values, setValues] = useState({
    search: undefined,
    results: [],
    message: "",
  });

  const { search, results, searched, message } = values;
  const {  closeModal } = useModal();

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
    });
  };

  
  const closeAndClear = () => {
    closeModal();
    mobileMenu_InActive();
    setValues({
      ...values,
      results: [],
      message: ``,
    });

    refContainer.current.value = "";
  };

  
  const searchForm = () => (
    <form>
      <div className="search-icon">
        <BsSearch color="#BAC3E6" />
      </div>

      <input className="form-control" placeholder="Search blogs" onChange={handleChange} ref={refContainer} />
    </form>
  );

  return (
    <div className="search-overlay">
      {searchForm()}

    </div>
  );
};

export default Search;
