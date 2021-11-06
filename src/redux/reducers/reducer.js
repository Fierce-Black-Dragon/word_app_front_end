import { combineReducers } from "redux";
import wordReducer from "./wordReducer";
//  main reducer
const reducers = combineReducers({
  wordReducer,
});
export default reducers;
