import React, { useEffect, useState } from "react";

import { NavBar } from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchWords, createWord } from "./../redux/actions/wordsAction";
import axios from "axios";
import { useNavigate } from "react-router";
import { Word } from "../components/Word";
import "../styles/Homepage.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
const initialState = {
  wordName: "",
};
export const Homepage = () => {
  const [clicked, setClicked] = useState(false);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setClicked(!clicked);
  };
  // const [added, setAdded] = useState(false);
  useEffect(() => {
    axios({
      url: " https://graphql-aord-api.herokuapp.com/graphql",
      method: "post",
      data: {
        query: `
        query{
          words{
            _id
            wordName
            definition
          }
        }
          `,
      },
    })
      .then((result) => {
        if (result.status !== 200 && result.status !== 201) {
          throw new Error("Failed!");
        }
        dispatch(fetchWords(result.data.data.words));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await axios
      .post(
        "https://graphql-aord-api.herokuapp.com/graphql",
        {
          query: `
        mutation {
          createWord(wordInput:{wordName:"${form.wordName}"}) {
            wordName
            
           
          }
        }
        `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        //
        if (result.status !== 200 && result.status !== 201) {
          throw new Error("Failed!");
        }
        dispatch(createWord(result));
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const wordDetails = (id) => {
    navigate(`/word/${id}`);
  };
  const { words, isLoading } = useSelector((state) => state.wordReducer);
  return (
    <div className="homePage">
      <div className="homepage__nav">
        <NavBar />
      </div>

      <div className="homePage__main">
        <h3>Words List</h3>
        <hr />
        <div className="homePage__worsList">
          {isLoading ? (
            <div>Loading...</div>
          ) : words?.length > 0 ? (
            words?.map((word) => {
              return (
                <div
                  className=""
                  key={word._id}
                  onClick={() => {
                    wordDetails(word._id);
                  }}
                >
                  <Word word={word.wordName} def={word.definition} />
                </div>
              );
            })
          ) : (
            <div>No words found</div>
          )}
        </div>
        <div className="button_" onSubmit={handleSubmit}>
          <button onClick={handleClick}>+</button>
        </div>
        {clicked ? (
          <div className="AddWord__form">
            <h2>Form</h2>
            {/* {console.log(form)} */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="wordName"
                placeholder="Word"
                onChange={handleChange}
              />
              <button type="submit">submit</button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
