import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchWordByID } from "./../redux/actions/wordsAction";
import { useParams } from "react-router";

export const WordDetailPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    axios({
      url: " http://localhost:5000/graphql",
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
  console.log(word);
  return (
    <div>
      <h1>{word.wordName}</h1>
      <h5>{word.definition}</h5>
      <h6>{word.Grammer}</h6>
      <p>{word.examples}</p>
    </div>
  );
};
