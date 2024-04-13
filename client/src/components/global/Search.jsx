import "./global.css";
import searchImg from "../../assets/search.svg";
import menuImg from "../../assets/menu.svg";
import { useState } from "react";

const Search = ({ setIsSearch }) => {
  const [searchText, SetSearchText] = useState("");

  const handleSearchChange = (e) => {
    setIsSearch(e.target.value);
    if (e.target.value != "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  return (
    <div className="search">
      <div className="search-input-container">
        <img src={searchImg} />
        <input
          type="text"
          placeholder="Search ..."
          autoFocus
          onChange={handleSearchChange}
        />
      </div>
      <div className="menu-icon-container">
        <img src={menuImg} />
      </div>
    </div>
  );
};

export default Search;
