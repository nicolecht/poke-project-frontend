import axios from 'axios';

export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

const apiUrl = `${import.meta.env.VITE_API_URL}`;

export const fetchUserPokemon = (username) => async (dispatch) => {
	dispatch({ type: FETCH_POKEMON_REQUEST });

	const config = {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `JWT ${localStorage.getItem("access")}`,
		  Accept: "application/json",
		},
	  };

	const body = JSON.stringify({ username: username });
  
	try {
	  const response = await axios.get(`${apiUrl}/pokemon/pokemon/mypokemon/`, config, body);
	  const pokemon = response.data;
	  dispatch({
		type: FETCH_POKEMON_SUCCESS,
		payload: pokemon
	  });
	} catch (error) {
	  dispatch({
		type: FETCH_POKEMON_FAILURE,
		payload: error.message
	  });
	}
  };
