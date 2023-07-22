import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useModal } from "context/modalContext";
import { getResults } from "actions/searchActions";
import { connect } from "react-redux";
import { ResultsMenu } from "./components/ResultsMenu";
import { RenderResults } from "./components/RenderResults";

const Search = ({ search, getResults, 
  profile: { profile } 
}) => {

  const refContainer = useRef(null);
  const timeoutRef = useRef(null);

  const [values, setValues] = useState({
    searchTerm: "",
    results: [],
    message: "",
  });

  const { searchTerm, results, message } = values;
  const { closeModal } = useModal();



  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        getResults(searchTerm);
      }, 800);
    }
  }, [searchTerm, getResults]);
  
  useEffect(() => {
    
    if (search.results) {
      
      setValues({
        ...values,
        results: search.results,
        message: "",
      });
    }
    
    
  }, [search.results ])





  const handleChange = (e) => {
    setValues({
      ...values,
      searchTerm: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      results: [],
      message: "",
    });

    if (searchTerm.trim()) {
      getResults(searchTerm);
    }
  };

  const closeAndClear = () => {
    closeModal();
    setValues({
      searchTerm: "",
      results: [],
      message: "",
    });

    refContainer.current.value = "";
  };

  const searchForm = () => (
    <form onSubmit={handleSearch}>
      <div className="search-icon">
        <BsSearch color="#BAC3E6" />
      </div>

      <input
        className="form-control"
        placeholder="Search blogs"
        onChange={handleChange}
        value={searchTerm}
        ref={refContainer}
      />
    </form>
  );





  return (
    <div 
      className="search-overlay"
      
    >
      {searchForm()}

      <RenderResults
        results={results}
        searchTerm={searchTerm}
        loading={search.loading}
        profile={profile}
        closeAndClear={closeAndClear}
      />

    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.search,
  profile: state.profile,
});

export default connect(mapStateToProps, { getResults })(Search);