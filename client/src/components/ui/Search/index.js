import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useModal } from "context/modalContext";
import { getResults } from "actions/searchActions";
import { connect } from "react-redux";
import { ResultsMenu } from "./components/ResultsMenu";

const Search = ({ search, getResults }) => {
  const refContainer = useRef(null);
  const timeoutRef = useRef(null);

  const [values, setValues] = useState({
    search: "",
    results: [],
    message: "",
  });

  const { search: searchTerm, results, message } = values;
  const { closeModal } = useModal();

  /**
   * Need another useEfect to acomplish this refer to dashboard timeline example
   */
  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        getResults(searchTerm);
      }, 800);
    }
  }, [searchTerm, getResults]);
  
  useEffect(() => {
    
    
    setValues({
      ...values,
      results: search.results,
      message: "",
    });
    
  }, [])
  

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
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
      search: "",
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

  const renderResults = () => {
    if (search.loading) {
      return <div>Loading...</div>;
    }

    if (search.results && search.results.length === 0) {
      return <div>No results found.</div>;
    }

    if (search.results) {
      return (
        <ul>
          {search.results.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      );
    }

    return null;
  };

  console.log('====================================');
  console.log('search', search);
  console.log('====================================');

  return (
    <div className="search-overlay">
      {searchForm()}

      <ResultsMenu
        results={results}
      />

      {/* {renderResults()} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps, { getResults })(Search);
