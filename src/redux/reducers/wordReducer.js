import {
  FETCH_ALL,
  CREATE,
  START_LOADING,
  END_LOADING,
} from "../../constants/ActionTypes";
const wordReducer = (
  state = { isLoading: true, created: false, words: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        words: action.payload.data,
      };
    case CREATE:
      return {
        ...state,
        created: true,
        words: [...state.words, action.payload],
      };

    default:
      return state;
  }
};
export default wordReducer;
