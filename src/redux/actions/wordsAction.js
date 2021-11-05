import {
  FETCH_ALL,
  CREATE,
  SELLERPRODUCTS,
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
    window.location.reload();

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
    window.location.reload(false);
  } catch (error) {
    alert(error);
  }
};
