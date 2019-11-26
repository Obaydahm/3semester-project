import React, { useState } from "react";
import { Link } from "react-router-dom";
import magnifier from "./icons/magnifying-glass.svg";
import exit from "./icons/exit.svg";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Search({ searches, setSearches }) {

  const iconCloudStyle = {
    fontSize: '60px',
    color: '#f2f8ff'
  };

  const iconSunStyle = {
    fontSize: '30px',
    color: 'yellow',
    marginTop: '27px',
    marginLeft: '-5px',
  };

  const spanStyle = {
    padding: '45px 0px'
  };

  /*localStorage.setItem("searches", "");*/
  const [search, setSearch] = useState();
  function handleChange(event) {
    setSearch(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (localStorage.getItem("searches") !== null) {
      searches = localStorage.getItem("searches").split(",");
    }
    searches = searches.filter(s => s.toLowerCase() !== search.toLowerCase());

    searches.unshift(
      search.charAt(0).toUpperCase() + search.substring(1).toLowerCase()
    );

    if (searches.length > 5) {
      searches.pop();
    }
    setSearches(searches);
    setSearch("");
    localStorage.setItem("searches", searches);
  }
  return (
    <div className="search-wrapper">
      <Link to="/">
        <img alt="exit-icon" src={exit} className="search-exit" />
      </Link>

      <span className="fa-layers fa-fw" style={spanStyle}>
        <FontAwesomeIcon icon="circle" style={iconSunStyle} />
        <FontAwesomeIcon icon="cloud" style={iconCloudStyle} />
      </span>

      <h1>Search for a city</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            onChange={handleChange}
            type="text"
            value={search}
            placeholder="Search for a city ..."
          ></input>
          <button onClick={handleSubmit}>
            <FontAwesomeIcon icon={['fal', 'search-location']} size="2x" className="search-magnifier" />
          </button>
        </div>
      </form>
      <h4>Latest searches</h4>
      <ul>
        {
          localStorage.getItem("searches") !== null ? (
            localStorage
              .getItem("searches")
              .split(",")
              .map((search, index) => (
                <li key={index}>
                  <Link to={search}>{search}</Link>
                </li>
              ))
          ) : (
              <p>Nothing to see here <span role="img" aria-label="wink-smiley">&#128521;</span></p>
            )
        }
      </ul>
    </div>
  );
}

export default Search;
