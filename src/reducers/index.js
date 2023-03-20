import { combineReducers } from "redux";
import auth from "./auth";
import userpokemons from "./userpokemons";
import allpokemons from "./allpokemons"
import unownedpokemons from "./unownedpokemons"
import releasepokemon from "./releasepokemon"
import addpokemon from "./addpokemon"

export default combineReducers({
  auth,
  userpokemons,
  allpokemons,
  unownedpokemons,
  releasepokemon,
  addpokemon,
});
