import {
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE
} from '../actions/userpokemons';

const initialState = {
  loading: true,
  pokemon: [],
  error: ''
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
        error: ''
      };
    case FETCH_POKEMON_FAILURE:
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

export default pokemonReducer;
