import {
  FETCH_ALL_POKEMON_REQUEST,
  FETCH_ALL_POKEMON_SUCCESS,
  FETCH_ALL_POKEMON_FAILURE
} from '../actions/allpokemons';

const initialState = {
  loading: true,
  pokemon: [],
  error: ''
};

const allPokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_POKEMON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ALL_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
        error: ''
      };
    case FETCH_ALL_POKEMON_FAILURE:
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

export default allPokemonsReducer;
