import { combineReducers } from "redux";
import auth from "./auth";
import userpokemons from "./userpokemons";
import allpokemons from "./allpokemons"
import unownedpokemons from "./unownedpokemons"

export default combineReducers({
  auth,
  userpokemons,
  allpokemons,
  unownedpokemons,
});
