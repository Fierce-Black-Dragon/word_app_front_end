import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchWordByID } from "./../redux/actions/wordsAction";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "../styles/WordDetail.css";

import CancelIcon from "@mui/icons-material/Cancel";
export const WordDetailPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // to fetch the word by id through api cal
    axios({
      url: "https://graphql-aord-api.herokuapp.com/graphql",
      method: "post",
      data: {
        query: `
        query{
          word(wordId:"${id}"){
            wordName
            _id
              definition
              synonyms
              Grammer
              examples
          }}
          `,
      },
    })
      .then((result) => {
        if (result.status !== 200 && result.status !== 201) {
          throw new Error("Failed!");
        }
        dispatch(fetchWordByID(result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, id]);
  const { word, isLoading } = useSelector((state) => state.wordReducer);

  return (
    <div className="wordDetail">
      <div className="wordDetail__nav">
        <button onClick={() => navigate("/")}>
          <CancelIcon />
        </button>
      </div>
      <div className="wordDetail__main">
        <h1 className="heading">{word.wordName}</h1>
        <p className="g">{word.Grammer}</p>
        <div className="wordItem">
          <h5>Definition :</h5>
          <p>{word.definition}</p>
        </div>

        <div className="wordItem">
          <h5>Synonyms :</h5>
          {word?.synonyms?.length < 0 ? (
            <p>No synonyms</p>
          ) : (
            word?.synonyms?.map((synonym) => {
              return <p>{synonym}</p>;
            })
          )}
        </div>
        <div className="wordItem">
          <h5>Examples :</h5>
          <p>{word.examples}</p>
        </div>
      </div>
    </div>
  );
};
