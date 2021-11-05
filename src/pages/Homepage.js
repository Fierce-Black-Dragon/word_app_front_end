import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import { NavBar } from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchWords, createWord } from "./../redux/actions/wordsAction";
import axios from "axios";
import { useNavigate } from "react-router";
import { Word } from "../components/Word";
const initialState = {
  wordName: "",
};
export const Homepage = () => {
  const [worsList, setWordslist] = useState([]);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [added, setAdded] = useState(false);
  useEffect(() => {
    axios({
      url: " http://localhost:5000/graphql",
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

    await axios
      .post(
        "http://localhost:5000/graphql",
        {
          query: `mutation{
          createWord(wordInput:{wordName:"${form.wordName}"}) {
            wordName

          }
        }`,
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
    console.log(id);
    navigate(`/word/${id}`);
  };
  const { words, isLoading } = useSelector((state) => state.wordReducer);
  return (
    <div>
      <NavBar />
      <div className="s">
        <div className="worsList">
          {words?.map((word) => {
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
          })}
        </div>
        <div className="button" onSubmit={handleSubmit}>
          <button>Add Word</button>
          <div className="form">
            <form>
              <input
                type="text"
                name="wordName"
                placeholder="Word"
                onChange={handleChange}
              />
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
