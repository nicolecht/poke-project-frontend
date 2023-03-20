import {
  RELEASE_POKEMON_REQUEST,
  RELEASE_POKEMON_SUCCESS,
  RELEASE_POKEMON_FAILURE
} from '../actions/releasepokemon';

const initialState = {
  loading: true,
  pokemon: [],
  error: ''
};

const releasePokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELEASE_POKEMON_REQUEST:
      return {
        ...state,
        loading: true
      };
    case RELEASE_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
        error: ''
      };
    case RELEASE_POKEMON_FAILURE:
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

export default releasePokemonReducer;
