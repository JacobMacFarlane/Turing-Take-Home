import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (query, event) => {
    event.preventDefault();
    props.search(query);
    clearInputs();
  };
  const clearInputs = () => {
    setQuery("");
  };

  return (
    <div className="search-container">
      <h2 className="search-header">News?</h2>
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search for News"
          name="query"
          id="searchQueryInput"
          className="search-field"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="searchQuerySubmit"
          id="spin-active"
          onClick={(event) => handleSubmit(query, event)}
        >
          🔎
        </button>
      </form>
    </div>
  );
};

export default Search