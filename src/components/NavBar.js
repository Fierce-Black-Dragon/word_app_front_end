import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Fuse from "fuse.js";
import "../styles/NavBar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Word } from "./Word";
export const NavBar = () => {
  const [search, setSearch] = useState(false);
  const { words, isLoading } = useSelector((state) => state.wordReducer);
  const navigate = useNavigate();
  const wordDetails = (id) => {
    navigate(`/word/${id}`);
  };
  //search
  const [query, updateQuery] = useState("");
  const fuse = new Fuse(words, {
    keys: ["wordName"],
    includeScore: true,
  });

  const results = query ? fuse.search(query) : "";

  const onSearch = ({ currentTarget }) => {
    updateQuery(currentTarget.value);
  };
  return (
    <div className="navBar">
      <div className="navBar__start">
        <Typography variant="h6" color="inherit">
          Vocabulary
        </Typography>
      </div>
      <div className="navbar_serach">
        {search ? (
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={onSearch}
          />
        ) : (
          ""
        )}
      </div>
      <div className="navBar_end">
        <button
          onClick={() => {
            setSearch(!search);
            updateQuery("");
          }}
        >
          {search ? <CloseIcon /> : <SearchIcon />}
        </button>
      </div>
      <div className="searchResults">
        {query
          ? results.map((character) => (
              <div
                className="searchResults__Links"
                onClick={() => {
                  wordDetails(character.item._id);
                }}
                key={character.item._id}
              >
                <Word
                  word={character.item.wordName}
                  def={character.item.definition}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
