import {
  FETCH_UNOWNED_POKEMON_REQUEST,
  FETCH_UNOWNED_POKEMON_SUCCESS,
  FETCH_UNOWNED_POKEMON_FAILURE
} from '../actions/unownedpokemons';

const initialState = {
  loading: true,
  pokemon: [],
  error: ''
};

const unownedPokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNOWNED_POKEMON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_UNOWNED_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
        error: ''
      };
    case FETCH_UNOWNED_POKEMON_FAILURE:
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

export default unownedPokemonReducer;
