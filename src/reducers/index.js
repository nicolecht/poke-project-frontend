import { combineReducers } from "redux";
import auth from "./auth";
import userpokemons from "./userpokemons";

export default combineReducers({
  auth,
  userpokemons,
});
