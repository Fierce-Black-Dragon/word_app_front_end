import {
  FETCH_ALL,
  CREATE,
  BYID,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes.js";
import { axios } from "axios";
// to store all words in redux store
export const fetchWords = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    alert(error);
  }
};
// to  add created a new word in redux store
export const createWord = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    console.log(data);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
    // window.location.reload();
  } catch (error) {
    alert(error);
  }
};

// to get a word by id in redux store
export const fetchWordByID = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    dispatch({ type: BYID, payload: { word: data.data.data.word } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    alert(error);
  }
};
