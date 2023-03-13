import React, { useState, useEffect } from "react";
import starwars from "../APIs/starwars";
import "./mainFunctional.css";
function MainFunctional() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let itemType = "people";
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    starwars.getPeople().then((response) => {
      console.log("response", response);
      setData(response);
    });
    // const fetchCharacters = async () => {
    //   const characters = await starwars.getPeople();
    //   setData(characters);
    // };
    // fetchCharacters();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = data.filter((character) =>
      character.name.toLowerCase().includes(value)
    );
    setData(results);
  };

  const handleSort = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    const sortedCharacters = [...data].sort((a, b) => {
      if (value === "ascending") {
        return a.name.localeCompare(b.name);
      } else if (value === "descending") {
        return b.name.localeCompare(a.name);
      } else {
        return 0;
      }
    });
    setData(sortedCharacters);
  };

  const getItem = (item) => {
    itemType = item;
  };

  const handleFilter = (event) => {
    const value = event.target.checked;
    const filteredCharacters = data.filter(
      (character) => character.available === value
    );
    setData(filteredCharacters);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSortOrder("");
    // setData(characters);
  };
  return (
    <div className="App">
      <div className="navbar">
        <ul>
          <li onClick={() => getItem("people")}>People</li>
          <li onClick={() => getItem("planet")}>Planet</li>
          <li onClick={() => getItem("starship")}>StartShip</li>
        </ul>
      </div>

      <header className="App-header">
        <h1>Star Wars Characters</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="sort-container">
          <label>Sort by:</label>
          <select value={sortOrder} onChange={handleSort}>
            <option value="">Select an option</option>
            <option value="ascending">Name (A-Z)</option>
            <option value="descending">Name (Z-A)</option>
          </select>
        </div>
        <div className="filter-container">
          <label>
            <input
              type="checkbox"
              onChange={handleFilter}
              checked={data.available}
            />
            Available only
          </label>
        </div>
        <div className="characters-container">
          {data.map((character) => (
            <div key={character.url} className="character-card">
              <h2>{character.name}</h2>
              <p>Birth Year: {character.birth_year}</p>
              <p>Gender: {character.gender}</p>
              <p>Height: {character.height} cm</p>
              <p>Mass: {character.mass} kg</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default MainFunctional;
