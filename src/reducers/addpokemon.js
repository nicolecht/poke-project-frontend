import {
  ADD_POKEMON_REQUEST,
  ADD_POKEMON_SUCCESS,
  ADD_POKEMON_FAILURE
} from '../actions/addpokemon';

const initialState = {
  loading: true,
  pokemon: [],
  error: ''
};

const addPokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POKEMON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
        error: ''
      };
    case ADD_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        pokemon: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default addPokemonReducer;
