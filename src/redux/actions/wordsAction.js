import {
  FETCH_ALL,
  CREATE,
  BYID,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes.js";
import { axios } from "axios";

export const fetchWords = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    alert(error);
  }
};

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

export const fetchWordByID = (data) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    dispatch({ type: BYID, payload: { word: data.data.data.word } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    alert(error);
  }
};
