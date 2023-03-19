import axios from 'axios';

export const FETCH_UNOWNED_POKEMON_REQUEST = 'FETCH_UNOWNED_POKEMON_REQUEST';
export const FETCH_UNOWNED_POKEMON_SUCCESS = 'FETCH_UNOWNED_POKEMON_SUCCESS';
export const FETCH_UNOWNED_POKEMON_FAILURE = 'FETCH_UNOWNED_POKEMON_FAILURE';

export const fetchUnownedPokemon = (username) => async (dispatch) => {
	dispatch({ type: FETCH_UNOWNED_POKEMON_REQUEST });

	const config = {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `JWT ${localStorage.getItem("access")}`,
		  Accept: "application/json",
		},
	  };

	const body = JSON.stringify({ username: username });
  
	try {
	  const response = await axios.get(`http://127.0.0.1:8000/pokemon/pokemon/unownedpokemon/`, config, body);
	  const pokemon = response.data;
	  dispatch({
		type: FETCH_UNOWNED_POKEMON_SUCCESS,
		payload: pokemon
	  });
	} catch (error) {
	  dispatch({
		type: FETCH_UNOWNED_POKEMON_FAILURE,
		payload: error.message
	  });
	}
  };
